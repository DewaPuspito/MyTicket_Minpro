import { Request, Response } from 'express';
import { EmailService } from '../services/email.service';

export class EmailController {
  private emailService = new EmailService();

  public async resetPassword(req: Request, res: Response): Promise<void> {
    try {

      const {email, resetLink} = req.body

      if (!email || !resetLink) {
        res.status(400).json({
            message: 'Email and reset link are required'
        })
      }

      const info = await this.emailService.sendResetPassword({
        user: email,  
        resetLink: resetLink
      })

      res.status(200).json({
        message: 'Email successfully sent',
        detail: info
      })
    } catch (error) {
      res.status(400).json({
        message: 'Failed to send email',
        detail: error
      });
    }
  }
}