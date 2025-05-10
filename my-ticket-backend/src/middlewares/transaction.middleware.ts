import { prisma } from "../prisma/client";
import { Response, NextFunction } from "express";
import { RequestCollection } from "../types/express";

export class TransactionMiddleware {
    static async verifyTransactionOwnership(req: RequestCollection, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      
      const ticketId = Number(req.params.ticketId);

      console.log(ticketId);

      if (!userId) {
        res.status(401).json({ 
          message: 'Unauthorized: User tidak terautentikasi' 
        });
        return;
      }

      if (!req.params.ticketId || isNaN(ticketId)) {
        res.status(400).json({ 
          message: 'Bad Request: Ticket ID tidak valid' 
        });
        return;
      }

      // Ubah query untuk mencari tiket dengan userId
      const ticket = await prisma.ticket.findFirst({
        where: { 
          id: ticketId,
          userId: userId  // Tambahkan filter berdasarkan userId
        },
        include: {
          event: true
        }
      });

      console.log(ticket);

      if (!ticket) {
        res.status(404).json({ 
          message: 'Tiket tidak ditemukan atau Anda tidak memiliki akses ke tiket ini' 
        });
        return;
      }

      // Simpan data tiket ke request untuk digunakan di controller
      req.ticket = ticket;
      next();
    } catch (error) {
      console.error('Error in verifyTransactionOwnership:', error);
      res.status(500).json({ 
        message: 'Internal server error',
        error: error
      });
    }
  }
}