import { transporter } from "../lib/nodemailer.config";
import { passwordResetTemplate } from "../lib/template/emailTemplate";
import { UserPayload } from "../models/interface";

interface EmailFormat {
  user: UserPayload['email']
  resetLink: string
}

export class EmailService {
    public async sendResetPassword(data: EmailFormat) {
        try {

        const mailOptions = {
            from: process.env.EMAIL_SENDER,
            to: data.user,
            subject: 'Reset Password Instructions',
            html: passwordResetTemplate(data.user, data.resetLink)
        }
            await transporter.sendMail(mailOptions)
            return { message: "Email sent" };
        } catch (error) {
            throw new Error("Failed to send email");
        }
    }
}