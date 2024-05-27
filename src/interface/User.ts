import { Document, Schema, Types } from "mongoose"
import { User } from "../schema/userSchema"


interface IBody {
    username: string
    password: string
    email: string
}

interface IUser extends Document {
    _id: Types.ObjectId,
    username: string,
    profile_picture?: string | null,
    tracking_anime?: Array<string> | null,
    email: string,
    password: string,
    isVerified: boolean,
    isSubscribed: boolean,
    createdAt?: Date,
    updatedAt?: Date
}

declare module 'express-serve-static-core' {
    interface Request {
        user?: IUser; // Adjust the type according to your User schema
    }
}


interface IToken extends Document {
    userId: Schema.Types.ObjectId,
    token: string,
    createdAt?: Date,
    isValid: boolean
}

interface VerifyUser extends IUser {
    isVerified: boolean
}

export { IUser , IBody, VerifyUser, IToken }