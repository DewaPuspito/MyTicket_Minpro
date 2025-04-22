import { Request, Response } from 'express';
import { EmailService } from '../services/email.service';

export class EmailController {
  private emailService = new EmailService();

  public async blastEmail(req: Request, res: Response): Promise<void> {
    try {

      const {subject, message} = req.body

      if (!subject || !message) {
        res.status(400).json({
            message: 'Invalid subject or message'
        })
      }

      const info = await this.emailService.sendBlastEmail({
        subject: subject,
        message: message
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