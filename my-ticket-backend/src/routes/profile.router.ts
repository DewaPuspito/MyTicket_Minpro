import { Router } from 'express';
import { ProfileController } from '../controllers/profile.controller';
import { AuthenticationMiddleware } from '../middlewares/authentication.middleware';

export class ProfileRouter {
  public router: Router;
  private profileController: ProfileController;

  constructor() {
    this.router = Router();
    this.profileController = new ProfileController();
    this.routes();
  }

  private routes(): void {
    this.router.get('/profile/show_profile/:id', AuthenticationMiddleware.verifyToken, this.profileController.getProfile.bind(this.profileController));
    this.router.put('/profile/update_profile/:id', AuthenticationMiddleware.verifyToken, AuthenticationMiddleware.checkOwnership, this.profileController.updateProfile.bind(this.profileController));
  }
}