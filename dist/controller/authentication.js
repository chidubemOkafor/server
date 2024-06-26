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
exports.login = exports.createAccount = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const userSchema_1 = require("../schema/userSchema");
dotenv_1.default.config();
function createAccount(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, email, password } = req.body;
            const checkUser = yield userSchema_1.User.findOne({ email });
            if (checkUser) {
                throw new Error("user already exist");
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, parseInt(process.env.SALTROUNDS));
            const user = {
                username,
                email,
                password: hashedPassword
            };
            const result = new userSchema_1.User(user);
            const newUserResult = yield result.save();
            // this is where i genereate 
            res.status(200).json({ message: `account created for ${newUserResult.username}` });
        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    });
}
exports.createAccount = createAccount;
function login() { }
exports.login = login;
