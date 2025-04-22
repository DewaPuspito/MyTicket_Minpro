import { UserPayload } from "../models/interface";
import { Request } from "express";

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserPayload;
  }
}

export interface AuthenticatedRequest extends Request {
  user?: UserPayload;
}