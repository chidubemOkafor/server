import { Request, Response } from "express";
import { IUser } from "../interface/User";

export async function getProfile (req: Request, res: Response) {
    const userDetail = req.user as IUser
    try {
        if(userDetail) {
            const username = userDetail.username
            const email = userDetail.email
            return res.status(200).json({ message: {username, email} })
        }
        return res.status(500).json({ message: "login" })
    } catch (error) {
        res.status(500).json({message: "internal server error", error})
    }
}