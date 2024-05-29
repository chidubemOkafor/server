import { Request, Response, NextFunction } from "express"
import { IBody, IUser } from "../interface/User"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import { User, Token } from "../schema/userSchema"
import { sendEmail } from "../utils/emailTransporter"
import { sendVerificationEmail } from "../utils/sendVerificationEmail"
import { Types } from "mongoose"

dotenv.config()

    export async function createAccount(req: Request, res: Response) {
        try {
            const {username, email, password}: IBody = req.body

            const checkUser = await User.findOne({email})

            if (checkUser) {
                if(!checkUser.isVerified) {
                    await User.deleteOne({email})
                } 
                else {
                    
                    if (checkUser.username === username) {
                        return res.status(400).json({message: "username exists"})
                    }

                    if (checkUser.email === email) {
                        return res.status(400).json({message: "user with email already exists"})
                    }

                }
            
                
            }
            
            const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALTROUNDS as string))
    
            const user = {
                username,
                email,
                password: hashedPassword
            }

            const result = new User(user)
            const newUserResult = await result.save()

            // this is where i send the email to the user
            sendVerificationEmail(newUserResult.email, newUserResult._id, 5)
             
            
            res.status(200).json({message: `verify account for ${newUserResult.username} to complete creation`})
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
      
    }

    export async function generateToken(req: Request, res: Response) {
        const userId = req.params.userId
        try {
            const user = req.user as IUser

            if(user.isVerified) {
                return res.status(400).json({message: "user is already verified"})
            }

            await Token.updateMany({ userId }, { $set: { isValid: false } })

            await sendVerificationEmail(user.email, user._id, 5)

            return res.status(200).json({message: "verification code has been sent"})
            
        } catch (error) {
            console.error(error)
        }
    }

    export async function verify(req: Request, res: Response) {
        const { token, userId } = req.params;

        if (!(token || userId)) {
            return res.status(401).json({ message: "incomplete credential" });
        }
    
        try {
            const user = req.user as IUser;

            const databaseToken = await Token.findOne({ userId, token });
    
            if (!databaseToken) {
                return res.status(404).json({ message: "generate new token" });
            }
    
            const currentTime = Date.now();
            const tokenCreationTime = databaseToken.createdAt?.getTime();
    
            if (!tokenCreationTime) {
                return res.status(400).json({ message: "Token has no set time" });
            }
    
            const timeDifferenceInMinutes = (currentTime - tokenCreationTime) / (1000 * 60);
    
            if (timeDifferenceInMinutes > 5) {
                await Token.deleteOne({ _id: databaseToken._id });
                return res.status(401).json({ message: "Token has expired" });
            }
    
            user.isVerified = true;
            await user.save();

            return res.status(200).json({ message: "account created successfully" });
    
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    export function login (req: Request, res: Response) {}


