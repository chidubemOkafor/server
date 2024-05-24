import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

export const sendEmail = async(to: string, subject: string, text: string):Promise<void>  => {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                secure: true,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASSWORD,
                },
            })

            const mailOptions = {
                from: process.env.EMAIL,
                to,
                subject,
                text
              };

            transporter.sendMail(mailOptions, (error, info) => {
                if(error) {
                    console.log(error)
                } else {
                    console.log(`Email sent: ${info.response}`)
                }
            })
            
        } catch (error) {
            console.log(error)
        }
}