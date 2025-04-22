import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/express";

export class AuthorizationMiddleware {
    static allowRoles(allowedRole: string | string[]) {
        return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {

            const user = (req as any).user
            const roles = Array.isArray(allowedRole) ? allowedRole : [allowedRole]

           if (!user || !roles.includes(user.role)) {
                res.status(403).json({
                    message: 'Forbidden: You do not have permission to access this resource',
                });
            }
            next()
        };
    }
}