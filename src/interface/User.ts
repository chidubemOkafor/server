import { Document, Schema, Types } from "mongoose"


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
    isSubscribed: boolean
}

interface IToken extends Document {
    userId: Schema.Types.ObjectId,
    token: string,
}

interface VerifyUser extends IUser {
    isVerified: boolean
}

export { IUser , IBody, VerifyUser, IToken }