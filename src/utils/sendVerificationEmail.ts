import { sendEmail } from "./emailTransporter"
import { generateVerificationCodeAndSaveToDatabase } from "./generateVerificationCode"
import { Types } from "mongoose"

export const sendVerificationEmail = async(_to: string, _encriptedToken: string, _duration: number) => {
    const subject = "verification email"
    const text = `
    This is your verification code ${await generateVerificationCodeAndSaveToDatabase(_to, _encriptedToken, _duration)} it will expire in the next 5min`
    sendEmail(_to,subject,text)
}

