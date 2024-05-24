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
exports.generateVerificationCodeAndSaveToDatabase = void 0;
const randomstring_1 = __importDefault(require("randomstring"));
const userSchema_1 = require("../schema/userSchema");
const generateVerificationCodeAndSaveToDatabase = (user, duration) => __awaiter(void 0, void 0, void 0, function* () {
    const verificationCode = randomstring_1.default.generate(8);
    const storeToken = new userSchema_1.Token({
        userId: user.id,
        token: verificationCode,
        duration: new Date(Date.now() + 300000)
    });
    const storedToken = yield storeToken.save();
    if (!storedToken) {
        return " ";
    }
    return storeToken.token;
});
exports.generateVerificationCodeAndSaveToDatabase = generateVerificationCodeAndSaveToDatabase;
