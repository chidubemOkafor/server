"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const userSchema_1 = __importDefault(require("../schema/userSchema"));
require("../connection");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.default = passport_1.default.use(new passport_local_1.Strategy({ usernameField: "email" }, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ "email": email, "password": password });
    try {
        const user = yield userSchema_1.default.findOne({ email });
        if (!user)
            throw new Error("user is not found");
        const checkPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!checkPassword)
            throw new Error("invalid credentials");
        console.log("password is correct");
        done(null, user);
    }
    catch (err) {
        done(err, false);
    }
})));
passport_1.default.serializeUser((user, done) => {
    console.log("seriremail", user);
    done(null, user._id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userSchema_1.default.findOne({ _id: id });
    done(null, user);
}));
