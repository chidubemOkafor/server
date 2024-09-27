import { Document, Schema, Types } from "mongoose"
import { IAnimeContent } from "./AnimeArray"


interface IBody {
    username: string
    password: string
    email: string,
}

interface IUser extends Document {
    _id?: Types.ObjectId,
    username: string,
    profilePicture?: string | null,
    email: string,
    password: string,
    trackingAnimes: String[]
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