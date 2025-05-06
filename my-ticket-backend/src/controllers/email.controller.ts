import { Request, Response } from 'express';
import { EmailService } from '../services/email.service';

export class EmailController {
  private emailService = new EmailService();

  public async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;

      if (!email) {
          res.status(400).json({
              message: 'Email is required'
          });
          return;
      }

      const info = await this.emailService.sendResetPassword({
          user: email,
          resetLink: `${process.env.FRONTEND_URL}/auth/reset-password/new-password-input`
      });

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