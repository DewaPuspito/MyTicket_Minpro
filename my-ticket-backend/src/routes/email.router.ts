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
    this.router.get('/email/blast', this.emailController.blastEmail.bind(this.emailController));
  }
}