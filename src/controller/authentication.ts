import { Request, Response } from "express"
import { IBody, IUser } from "../interface/User"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import { User } from "../schema/userSchema"
import { sendEmail } from "../utils/emailTransporter"
import { sendVerificationEmail } from "../utils/sendVerificationEmail"

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

    export function login () {}


