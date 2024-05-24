"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Token = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
const tokenSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    token: {
        type: String,
        required: true
    }
});
exports.Token = (0, mongoose_1.model)("token", tokenSchema);
exports.User = (0, mongoose_1.model)("User", userSchema);
