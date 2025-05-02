import { Request, Response } from 'express';
import { ProfileService } from '../services/profile.service';
import { UserProfile } from '../models/interface';

export class ProfileController {
  private profileService = new ProfileService();

  public async getProfile(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.profileService.getProfile(Number(id));

      if (!result) {
        res.status(404).json({
          message: "User profile not found",
        })
      } 

        res.status(200).json({
          message: "Profile displayed successfully",
          data: result,
        });

    } catch (error) {
      res.status(404).json({
        message: "Failed to fetch profile data",
        detail: error,
      });
    }
  }

  public async updateProfile(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: Partial<UserProfile> = req.body;

      if (!id || isNaN(Number(id))) {
        throw new Error("Invalid user ID");
      }

      const result = await this.profileService.updateProfile(Number(id), data);
      
      res.status(200).json({
        message: "User profile updated",
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        message: "Failed to update user profile",
        detail: error,
      });
    }
  }
}