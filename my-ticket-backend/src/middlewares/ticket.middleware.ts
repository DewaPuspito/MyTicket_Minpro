import { prisma } from "../prisma/client";
import { Response, NextFunction } from "express";
import { RequestCollection } from "../types/express";

export class TicketMiddleware {
  static async findEventForTicket(req: RequestCollection, res: Response, next: NextFunction) {
    try {
      const eventId = Number(req.params.eventId);
      
      if (isNaN(eventId)) {
        res.status(400).json({ message: 'Invalid event ID' });
      }

      const event = await prisma.event.findUnique({
        where: { id: eventId },
        include: { user: true }
      });

      if (!event) {
        res.status(404).json({ message: 'Event not found' });
      }

      req.event = event;
      next();
    } catch (error) {
        res.status(500).json({ message: 'Failed to find event' });
    }
  }
}