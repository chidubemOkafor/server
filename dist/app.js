"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./connection");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const authentication_1 = __importDefault(require("./routes/authentication"));
const connection_1 = require("./connection");
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("./strategies/local-strategy");
dotenv_1.default.config();
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)("token"));
const sessionStore = connect_mongo_1.default.create({
    mongoUrl: connection_1.CONNECTION_URL,
    collectionName: "sessions"
});
app.use((0, express_session_1.default)({
    secret: process.env.SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 // 24hrs
    }
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use('/api/v1', authentication_1.default);
app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`);
});
