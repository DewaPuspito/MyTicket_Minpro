import { prisma } from "../prisma/client";
import { Response, NextFunction } from "express";
import { RequestCollection } from "../types/express";

export class TransactionMiddleware {
    static async findTicketForTransaction(req: RequestCollection, res: Response, next: NextFunction) {
      try {
        const ticketId = Number(req.params.ticketId);
        
        if (isNaN(ticketId)) {
          res.status(400).json({ message: 'Invalid ticket ID' });
        }
  
        const ticket = await prisma.ticket.findUnique({
          where: { id: ticketId },
          include: { event: true }
        });
  
        if (!ticket) {
          res.status(404).json({ message: 'Ticket not found' });
        }
  
        req.ticket = ticket;
        next();
      } catch (error) {
        res.status(500).json({ message: 'Failed to find ticket' });
      }
    }
  }