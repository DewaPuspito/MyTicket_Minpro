import { transporter } from "../lib/nodemailer.config";
import { passwordResetTemplate } from "../lib/template/emailTemplate";
import { UserPayload } from "../models/interface";

interface EmailFormat {
  user: UserPayload['email']
  resetLink: string
}

export class EmailService {
    // Fungsi untuk mengenkripsi email
    private encryptEmail(email: string) {
        return Buffer.from(email).toString('base64');
    }

    public async sendResetPassword(data: EmailFormat) {
        try {
            // Generate reset link dengan email terenkripsi
            const resetLink = `${process.env.FRONTEND_URL}/auth/reset-password/new-password-input?email=${this.encryptEmail(data.user)}`;

            const mailOptions = {
                from: process.env.EMAIL_SENDER,
                to: data.user,
                subject: 'Reset Password Instructions',
                html: passwordResetTemplate(data.user, resetLink)
            }
            
            await transporter.sendMail(mailOptions)
            return { message: "Email sent" };
        } catch (error) {
            throw new Error("Failed to send email");
        }
    }
}