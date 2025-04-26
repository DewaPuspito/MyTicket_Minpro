import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthenticationMiddleware } from '../middlewares/authentication.middleware';

export class AuthRouter {
  public router: Router;
  private authController: AuthController;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.routes();
  }

  private routes(): void {
    this.router.post('/auth/login', this.authController.login.bind(this.authController));
    this.router.post('/auth/register', this.authController.register.bind(this.authController));
    this.router.put('/auth/reset-password', AuthenticationMiddleware.checkOwnership, this.authController.resetPassword.bind(this.authController));
  }
}