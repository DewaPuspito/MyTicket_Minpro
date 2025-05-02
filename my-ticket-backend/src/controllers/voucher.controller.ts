import { Request, Response } from 'express';
import { RequestCollection } from '../types/express';
import { VoucherService } from '../services/voucher.service';
import { VoucherInput, VoucherQuery } from '../models/interface';

export class VoucherController {

    private voucherService = new VoucherService();

  constructor() {
    this.voucherService = new VoucherService();
  }

  public async create(req: RequestCollection, res: Response): Promise<void> {
    try {
      const user = req.user;
      const event = req.event;
      const data: VoucherInput = {
        ...req.body,
        userId: user.id,
        eventId: event.id
      };
      
      const result = await this.voucherService.createVoucher(data);
      res.status(201).json({
        message: "Voucher created successfully",
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        message: "Voucher not created",
        detail: error,
      });
    }
  }

  public async findAll(req: Request, res: Response): Promise<void> {
    try {
      const query: VoucherQuery = {
        search: req.query.search as string,
        title: req.query.title as string,
        code: req.query.code as string,
        discount: req.query.discount ? Number(req.query.discount) : undefined,
        expiry_date: req.query.expiry_date ? new Date(req.query.expiry_date as string) : undefined,
        page: req.query.page ? parseInt(req.query.page as string) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
      };
      const result = await this.voucherService.getAllVouchers(query);
      res.status(200).json({
        message: "Events displayed successfully",
        data: result,
      });
    } catch (error) {
      res.status(404).json({
        message: "Failed to display events",
        detail: error,
      });
    }
  }

  public async findById (req: Request, res: Response): Promise<void>  {
    try {
      const { id } = req.params;
      const event = await this.voucherService.findById(parseInt(id));
  
      if (!event) {
        res.status(404).json({
          message: 'Voucher not found'
        });
      }
  
      res.status(200).json({
        message: 'Get voucher success',
        data: event
      });
    } catch (error) {
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  };

  public async update(req: RequestCollection, res: Response) {
    try {
      const { id } = req.params;
      const data: Partial<VoucherInput> = req.body;
      const result = await this.voucherService.update(Number(id), data);
      res.status(200).json({
        message: "Voucher updated successfully",
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        message: "Failed to update voucher",
        detail: error,
      });
    }
  }

  public async delete(req: RequestCollection, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.voucherService.delete(Number(id));
      res.status(200).json({
        message: "Voucher deleted successfully",
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        message: "Failed to delete voucher",
        detail: error,
      });
    }
  }
}