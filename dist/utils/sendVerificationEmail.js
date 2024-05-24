"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emailTransporter_1 = require("./emailTransporter");
const generateVerificationCode_1 = require("./generateVerificationCode");
const sendVerificationEmail = (to, user) => {
    const subject = "verification email";
    const text = `
    This is your code ${(0, generateVerificationCode_1.generateVerificationCode)(user)}
    `;
    (0, emailTransporter_1.sendEmail)(to, subject, text);
};
