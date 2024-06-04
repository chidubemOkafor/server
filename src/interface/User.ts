import { Document, Schema, Types } from "mongoose"


interface IBody {
    username: string
    password: string
    email: string
}

interface IUser extends Document {
    _id?: Types.ObjectId,
    username: string,
    profile_picture?: string | null,
    tracking_anime?: Array<string> | null,
    email: string,
    password: string,
    isSubscribed?: boolean,
    createdAt?: Date,
    updatedAt?: Date
}

interface IToken extends Document {
    _id?: Types.ObjectId,
    token: string,
    encryptedToken: string,
    email: string,
    isExpired: boolean,
    createdAt?: Date,
    isValid: boolean
}

interface VerifyUser extends IUser {
    isVerified: boolean
}

export { IUser , IBody, VerifyUser, IToken }