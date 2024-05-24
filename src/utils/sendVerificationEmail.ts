import { sendEmail } from "./emailTransporter"
import { generateVerificationCodeAndSaveToDatabase } from "./generateVerificationCode"
import { Types } from "mongoose"

export const sendVerificationEmail = (to: string, _id: Types.ObjectId, _duration: number) => {
    const subject = "verification email"
    const text = `
    This is your verification code ${generateVerificationCodeAndSaveToDatabase(_id, _duration)} it will expire in the next 5min`
    sendEmail(to,subject,text)
}

