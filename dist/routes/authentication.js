"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = require("../controller/authentication");
const express_1 = __importDefault(require("express"));
require("../strategies/local-strategy");
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.post('/createAccount', passport_1.default.authenticate("local"), (req, res) => (0, authentication_1.createAccount)(req, res));
exports.default = router;
