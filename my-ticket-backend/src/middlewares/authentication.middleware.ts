import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/express";
import { JwtUtils } from "../lib/token.config";

export class AuthenticationMiddleware {
  static verifyToken(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader?.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Unauthorized' });
        return
      }

      const token = authHeader.split(' ')[1];
      const decoded = JwtUtils.verifyToken(token);
      
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  }
}