import { Request, Response } from 'express';
import { RequestCollection } from '../types/express';
import { TransactionService } from '../services/transaction.service';

export class TransactionController {
  private transactionService = new TransactionService();

  async createTransaction(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.transactionService.createTransaction(req.body);
      res.status(201).json({
        success: true,
        message: "Transaction created successfully",
        data: result
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async getUserTransactions(req: RequestCollection, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;

      const transactions = await this.transactionService.getUserTransactions(userId);
      res.json({
        success: true,
        data: transactions
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async updateTransactionStatus(req: RequestCollection, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { status, paymentProof } = req.body;

      if (!status) {
        res.status(400).json({
            success: false,
            message: "Status is required"
        });
        return;
      }

      // Validasi status yang diperbolehkan
      const allowedStatuses = ['PAID', 'REJECTED'];
      if (!allowedStatuses.includes(status)) {
          res.status(400).json({
              success: false,
              message: "Invalid status. Status must be either PAID or REJECTED"
          });
          return;
      }
      
      // Validasi role
      if (req.user?.role !== 'EVENT_ORGANIZER') {
        res.status(403).json({
          success: false,
          message: "Only event organizers can approve/reject transactions"
        });
        return;
      }

      const result = await this.transactionService.updateTransactionStatus(
        parseInt(id),
        status
      );

      res.json({
        success: true,
        message: `Transaction ${status.toLowerCase()} successfully`,
        data: result
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}