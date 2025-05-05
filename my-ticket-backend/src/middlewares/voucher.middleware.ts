import { prisma } from "../prisma/client";
import { Response, NextFunction } from "express";
import { RequestCollection } from "../types/express";

export class VoucherMiddleware {
  static async findEventForVoucher(req: RequestCollection, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      const eventId = Number(req.params.eventId);
      
      if (isNaN(eventId)) {
        res.status(400).json({ message: 'Invalid event ID' });
        return;
      }

      if (isNaN(userId)) {
        res.status(400).json({ message: 'Invalid user ID' });
        return;
      }

      const event = await prisma.event.findUnique({
        where: { id: eventId },
        include: { user: true }
      });

      if (!event) {
        res.status(404).json({ message: 'Event not found' });
        return;
      }

      if (event.userId !== userId) {
        res.status(403).json({ message: 'Unauthorized: Only event owner can manage vouchers' });
        return;
      }

      req.event = event;
      next();
    } catch (error) {
        res.status(500).json({ message: 'Failed to find event' });
    }
  }
}