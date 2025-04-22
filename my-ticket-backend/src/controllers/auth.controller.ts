import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { UserRegister } from "../models/interface";

export class AuthController {
  private service = new AuthService();

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const data: UserRegister = req.body;
      const result = await this.service.register(data);
  
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
    
        const result = await this.service.login(email, password);

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
      const result = await this.service.resetPassword(email, newPassword);

      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({
        message: 'Reset password failed',
        error: error
      });
    }
  }
}