import { Request, Response, NextFunction } from "express"
import { IBody, IUser, IToken } from "../interface/User"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import { User, Token, UserAnime } from "../schema/userSchema"
import { sendEmail } from "../utils/emailTransporter"
import { sendVerificationEmail } from "../utils/sendVerificationEmail"
import { Types } from "mongoose"
import jwt from "jsonwebtoken"

dotenv.config()

    /**
    * function to create account
    * @param {Request} req - the request object containing the user detail
    * @param {Response} res - the response object to send to the response
    * @return {Promise<void>} - this return a promise
    */
    async function createAccount(req: Request, res: Response): Promise<void> {
        try {

            const {username, password, email}: IUser = req.body
            
            const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALTROUNDS as string))

            const user: IBody = {
                username,
                email,
                password: hashedPassword
            }
            
            const token = jwt.sign(user, process.env.SECRET as string)
            console.log("this is the token",token)

            sendVerificationEmail(email, token , 300000)
             
            
            res.status(200).json({message: `verify code has been sent to email`})
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
      
    }

     /**
    * function to create account
    * @param {Request} req - the request object containing the user detail
    * @param {Response} res - the response object to send to the response
    * @return {Promise<Response | undefined>} - this return a promise
    */
    async function generateToken(req: Request, res: Response): Promise<Response | undefined> {
        const email = req.params.email
        try {
            const oldToken = await Token.findOne({email})
            if(oldToken) {
                await Token.deleteOne({ token: oldToken.token });
            } else {
                return res.status(400).json({message: "you need to sign up first"})
            }
        
            await sendVerificationEmail(email, oldToken?.encryptedToken as string, 300000)

            return res.status(200).json({message: "verification code has been sent"})
            
        } catch (error) {
            console.error(error)
        }
    }

      /**
    * function to create account
    * @param {Request} req - the request object containing the user detail
    * @param {Response} res - the response object to send to the response
    * @return {Promise<string | Response>} - this return a promise
    */
    async function verify(req: Request, res: Response): Promise<string | Response> {
        const { code } = req.params;

        if ( !code ) {
            return res.status(401).json({ message: "you need to enter a code" });
        }
    
        try {
            const databaseToken = await Token.findOne({ token: code });
    
            if (!databaseToken) {
                return res.status(404).json({ message: "token has expired" });
            }
    
            const currentTime = Date.now();
            const tokenCreationTime = databaseToken.createdAt?.getTime();
    
            if (!tokenCreationTime) {
                return res.status(400).json({ message: "Token has no set time" });
            }
    
            const timeDifferenceInMinutes = (currentTime - tokenCreationTime) / (1000 * 60);
    
            if (timeDifferenceInMinutes > 5) {
                databaseToken.isExpired == true
                databaseToken.save()
                return res.status(401).json({ message: "Token has expired" });
            }

            // i need to decode the token here 
            const user = jwt.verify(databaseToken.encryptedToken, process.env.SECRET as string)

            await Token.deleteOne({ token: databaseToken.token });
            
            console.log(user)

            if (typeof user === "string") {
                return user
            }

            const newUser = user as IBody

            const newUserAnime = new UserAnime()
            const userAnime = await newUserAnime.save()

            new User<IBody>({
                username: newUser.username,
                email: newUser.email,
                password: newUser.password,
                trackingAnimeId: userAnime._id
            }).save()

            return res.status(200).json({ message: "account created successfully" });
    
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

      /**
    * function to create account
    * @param {Request} req - the request object containing the user detail
    * @param {Response} res - the response object to send to the response
    * @return {Promise<Response | undefined>} - this return a promise
    */
    async function changePassword(req: Request, res: Response): Promise<Response | undefined> {
        try {
            
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Internal server error" })
        }
    }

     /**
    * function to create account
    * @param {Request} req - the request object containing the user detail
    * @param {Response} res - the response object to send to the response
    * @return {Response<Record<string, string>>} - this return a promise
    */
    function login (req: Request, res: Response): Response<Record<string, string>> {
        return res.status(200).send({message: "logged in"})
    }

     /**
    * function to create account
    * @param {Request} req - the request object containing the user detail
    * @param {Response} res - the response object to send to the response
    * @return {void} - this return a promise
    */
    function logout (req: Request, res: Response): void {
        res.clearCookie('connect.sid'); 
        req.logout((err) => {
            console.log(err)
            req.session.destroy((err) => {
                res.status(200).json({message: "logged out"})
            });
        });
    }

    export {
        createAccount,
        generateToken,
        verify,
        changePassword,
        login,
        logout
    }