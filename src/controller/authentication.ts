import { Request, Response, NextFunction } from "express"
import { IBody, IUser } from "../interface/User"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import { User, Token } from "../schema/userSchema"
import { sendEmail } from "../utils/emailTransporter"
import { sendVerificationEmail } from "../utils/sendVerificationEmail"
import { Types } from "mongoose"

dotenv.config()



    export async function createAccount(req: Request, res: Response):Promise<void> {
        try {
            const {username, email, password}: IBody = req.body

            const checkUser = await User.findOne({email})
    
            if (checkUser) {
                throw new Error("user already exist")
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
             
            
            res.status(200).json({message: `account created for ${newUserResult.username}`})
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
      
    }

    export async function generateToken(req: Request, res: Response) {
        const userId = req.params.userId
        try {
            const user = req.user

            if(!user) {
                return res.status(400).json({message: "user not found"})
            }

            await Token.updateMany({ userId }, { $set: { isValid: false } })

            const sentmail = await sendVerificationEmail(user.email, user._id, 5)

            return res.send(200).json(sentmail)
            
        } catch (error) {
            console.error(error)
        }
    }

    export async function verify(req: Request, res: Response) {
        const {token, userId} = req.params
        if (!(token && userId)) {
            return res.status(401).json({message: "invalid credentials"})
        }

        const databaseToken = await Token.findOne({ userId, token })

        if (!databaseToken) {
            return res.status(404).json({message: "no token in database"})
        }

        if (!databaseToken.isValid) {
            return res.status(401).json({message: "token has expired"})
        }

        // this is where i check the time and delete the token if the time has expired
        const currentTime = Date.now()
        const tokenCreationTime = databaseToken.createdAt?.getTime()

        if(!tokenCreationTime) {
           return res.status(400).json({message: "token has no set time"})
        }

        const timeDifferenceInSeconds = (currentTime - tokenCreationTime) / 1000;
        
        if((timeDifferenceInSeconds / 60) > 5) {
            return res.status(404).json({message: "token has expired"})
        }

        // for security measure i still need to check if the user exists

        const user = await User.find({_id: userId})

        if(!user) {
           
        }
       
    }

    export function login () {}


