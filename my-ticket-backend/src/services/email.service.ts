import { transporter } from "../lib/nodemailer.config";
import { passwordResetTemplate } from "../lib/template/emailTemplate";
import { prisma } from "../prisma/client";

interface EmailFormat {
    subject: string,
    message: string,
}

export class EmailService {
    public async sendBlastEmail(data: EmailFormat) {4

        const result = await prisma.user.findMany({
            select: {
                email: true
            }
        })

        const recipients = result.map((user) => user.email)

        const mailOptions = {
            from: 'HR',
            to: recipients,
            subject: data.subject,
            html: passwordResetTemplate(data.subject, data.message)
        }

        const info = await transporter.sendMail(mailOptions)
        return info
    }
}