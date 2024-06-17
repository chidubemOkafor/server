import { Schema, Types, model } from "mongoose";
import { IUser, VerifyUser, IToken } from "../interface/User";
import { IAnimeArray, IAnimeContent } from "../interface/AnimeArray";

const userSchema: Schema<IUser> = new Schema({
    username: { 
        type: String, 
        required: true 
    },
    profilePicture: {
        type: String, 
        default: null 
    },
    trackingAnimeId: { 
        type: Schema.Types.ObjectId, ref: 'UserAnime', required: true,
    },
    email: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    isSubscribed: {
        type: Boolean,  
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const AnimeContent: Schema<IAnimeContent> = new Schema({
    name: String 
})

const userAnime: Schema<IAnimeArray> = new Schema({
    trackingAnime: {
        type: [AnimeContent],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const tokenSchema: Schema<IToken> = new Schema({
    token: {
        type: String,
        required: true
    },
    encryptedToken: {
        type: String,
        required: true
    },
    isExpired: {
        type: Boolean,
        required: true,
        default: false
    },
    email: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Token = model("token", tokenSchema);
const User = model("User", userSchema)
const UserAnime = model("UserAnime", userAnime)

export {Token, User, UserAnime}