import { Schema, model } from "mongoose";
import { IUser, VerifyUser, IToken } from "../interface/User";

const userSchema: Schema<IUser> = new Schema({
    username: { 
        type: String, 
        required: true 
    },
    profile_picture: {
        type: String, 
        default: null 
    },
    tracking_anime: { 
        type: [String],
        default: [] 
    },
    email: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    isVerified: {
        type: Boolean, 
        default: false
    },
    isSubscribed: {
        type: Boolean,  
        default: false
    }
});

const tokenSchema: Schema<IToken> = new Schema({
    userId: { 
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    token: {
        type: String,
        required: true
    }

})


export const Token = model("token", tokenSchema);
export const User = model("User", userSchema)
