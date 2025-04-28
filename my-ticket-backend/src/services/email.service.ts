import { transporter } from "../lib/nodemailer.config";
import { passwordResetTemplate } from "../lib/template/emailTemplate";
import { UserPayload } from "../models/interface";

interface EmailFormat {
  user: UserPayload['name']
  resetLink: string
}

export class EmailService {
    public async sendResetPassword(data: EmailFormat) {

        const mailOptions = {
            from: process.env.EMAIL_SENDER,
            to: data.user,
            subject: 'Reset Password Instructions',
            html: passwordResetTemplate(data.user, data.resetLink)
        }

        const info = await transporter.sendMail(mailOptions)
        return info
    }
}