import { Request, Response, NextFunction } from "express";
import { ZodError, AnyZodObject } from "zod";

interface Validation {
    body?: AnyZodObject,
    params?: AnyZodObject,
    partial?: boolean
}

export class ValidationMiddleware {
    static validate(schema: Validation) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                if (schema.body) {
                    let bodySchema
                    if (schema.partial) {
                        bodySchema = schema.body.partial()
                    } else {
                        bodySchema = schema.body
                    }
                    if ((req as any).user) {
                        req.body.userId = (req as any).user.userId;
                    }
                    req.body = bodySchema.parse(req.body);
                }
                if (schema.params) {
                    req.params = schema.params.parse(req.params);
                }
                next();
            } catch (error) {
                if (error instanceof ZodError) {
                    res.status(400).json({ 
                    status: res.statusCode,    
                    errors: error.errors 
                });
                }
            }
        };
    }
}