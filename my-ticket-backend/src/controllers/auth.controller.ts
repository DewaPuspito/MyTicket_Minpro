import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { UserProfile, UserRegister } from "../models/interface";

export class AuthController {
  private authService = new AuthService();

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const data: UserRegister = req.body;
      const result = await this.authService.register(data);
  
      res.status(201).json({
        message: "Registration successful",
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        message: "Registration failed",
        error: (error as Error).message,
      });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
        const { email, password } = req.body;
    
        const result = await this.authService.login(email, password);

        res.status(200).json({
            message: 'Login successful',
            data: result
        })

    } catch (error) {
        res.status(401).json({
            message: 'Unauthorized : Login failed, check your password',
            error: error
        })
    }
  }

  public async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email, newPassword } = req.body;
      
      if (!email || !newPassword) {
        res.status(400).json({
          message: 'Email and new password are required'
        });
      }

      const result = await this.authService.resetPassword(email, newPassword);
      res.status(200).json(result);
    } catch (error: any) {
      console.error("Reset password controller error:", error);
      res.status(400).json({
        message: 'Reset password failed',
        error: error.message
      });
    }
}
}