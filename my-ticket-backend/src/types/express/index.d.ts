import { UserPayload } from "../models/interface";
import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user?: UserPayload;
}