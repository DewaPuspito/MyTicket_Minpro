import { Response, NextFunction } from "express";
import { RequestCollection } from "../types/express";
import { JwtUtils } from "../lib/token.config";

export class AuthenticationMiddleware {
  static verifyToken(req: RequestCollection, res: Response, next: NextFunction): void {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader?.startsWith('Bearer')) {
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

  static checkUserOwnership(req: RequestCollection, res: Response, next: NextFunction): void {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Unauthorized: User not authenticated' });
        return;
      }

      const userIdFromToken = req.user.id;
      const userIdFromParams = parseInt(req.params.id);

      if (isNaN(userIdFromParams)) {
        res.status(400).json({ message: 'Bad Request: Invalid user ID' });
        return;
      }

      if (userIdFromToken !== userIdFromParams) {
        res.status(403).json({ 
          message: 'Forbidden: You can only update your own data' 
        });
        return;
      }

      next();
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static checkEventOwnership(req: RequestCollection, res: Response, next: NextFunction): void {
    try {
      if (!req.user || !req.event) {
        res.status(401).json({ message: 'Unauthorized' });
      }

      if (req.user.id !== req.event.userId) {
        res.status(403).json({ 
          message: 'Forbidden: You are not the owner of this data',
        });
      }

      next();
    } catch (error) {
      res.status(500).json({ 
        message: 'Internal server error',
        error: error
      });
    }
  }
}