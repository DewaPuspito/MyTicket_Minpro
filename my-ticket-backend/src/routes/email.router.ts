import { Router } from 'express';
import { EmailController } from '../controllers/email.controller';

export class EmailRouter {
  public router: Router;
  private emailController: EmailController;

  constructor() {
    this.router = Router();
    this.emailController = new EmailController();
    this.routes();
  }

  private routes(): void {
    this.router.post('/email/reset-password', this.emailController.resetPassword.bind(this.emailController));
  }
}