import { UserPayload, EventPayload, TicketPayload } from "../models/interface";
import { Request } from "express";

export interface RequestCollection extends Request {
  user?: UserPayload;
  event?: EventPayload;
  ticket?: TicketPayload;
}