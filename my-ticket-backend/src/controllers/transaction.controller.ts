import { Request, Response } from 'express';
import { RequestCollection } from '../types/express';
import { TransactionService } from '../services/transaction.service';
import { CloudinaryService } from '../lib/cloudinary.config';

export class TransactionController {
  private transactionService = new TransactionService();

  async createTransaction(req: RequestCollection, res: Response): Promise<void> {
    try {
      const file = req.file;
  
      let paymentProofUrl = '';
      if (file) {
        const cloudinaryService = new CloudinaryService();
        paymentProofUrl = await cloudinaryService.uploadFileForTransaction(file);
      }
  
      const result = await this.transactionService.createTransaction({
        ...req.body,
        coupons: req.body.coupons ? JSON.parse(req.body.coupons) : [],
        vouchers: req.body.vouchers ? JSON.parse(req.body.vouchers) : [],
        paymentProof: paymentProofUrl,
      });
  
      res.status(201).json({
        success: true,
        message: "Transaction created successfully",
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ... existing code ...
  async getUserTransactions(req: RequestCollection, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const userRole = req.user?.role;

      let transactions;
      if (userRole === 'EVENT_ORGANIZER') {
        // Ambil transaksi berdasarkan event yang dimiliki organizer
        transactions = await this.transactionService.getOrganizerTransactions(userId);
      } else {
        // Ambil transaksi customer
        transactions = await this.transactionService.getUserTransactions(userId);
      }

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
// ... existing code ...

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