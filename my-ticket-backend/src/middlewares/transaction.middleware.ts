import { prisma } from "../prisma/client";
import { Response, NextFunction } from "express";
import { RequestCollection } from "../types/express";

export class TransactionMiddleware {
    static async findTicketForTransaction(req: RequestCollection, res: Response, next: NextFunction) {
      try {
        const ticketId = Number(req.params.ticketId);
        
        if (isNaN(ticketId)) {
          res.status(400).json({ message: 'Invalid ticket ID' });
          return
        }
  
        const ticket = await prisma.ticket.findUnique({
          where: { id: ticketId },
          include: { event: true }
        });
  
        if (!ticket) {
          res.status(404).json({ message: 'Ticket not found' });
          return
        }

        // Pastikan event ada sebelum mengakses propertinya
        if (!ticket.event) {
          res.status(404).json({ message: 'Event not found for this ticket' });
          return
        }

        req.body = {
          ...req.body,
          ticketId: ticket.id,
          eventId: ticket.event.id,
          userId: req.user?.id
        };
  
        req.ticket = ticket;
        next();
      } catch (error) {
        res.status(500).json({ message: 'Failed to find ticket' });
        return
      }
    }
}