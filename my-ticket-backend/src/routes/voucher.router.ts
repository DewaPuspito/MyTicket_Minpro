import { Router } from 'express';
import { VoucherController } from '../controllers/voucher.controller';
import { AuthenticationMiddleware } from '../middlewares/authentication.middleware';
import { AuthorizationMiddleware } from '../middlewares/authorization.middleware';
import { VoucherMiddleware } from '../middlewares/voucher.middleware';
import { ValidationMiddleware } from '../middlewares/validation.middlewares';
import { voucherSchema } from '../lib/validation/voucher.validation.schema';

export class VoucherRouter {
  public router: Router;
  private voucherController: VoucherController;

  constructor() {
    this.router = Router();
    this.voucherController = new VoucherController();
    this.routes();
  }

  private routes(): void {
    this.router.get('/voucher', this.voucherController.findAll.bind(this.voucherController))
    this.router.get('/event/:eventId/voucher', this.voucherController.findByEventId.bind(this.voucherController))
    this.router.post('/event/:eventId/voucher', AuthenticationMiddleware.verifyToken, AuthorizationMiddleware.allowRoles(['EVENT_ORGANIZER']), ValidationMiddleware.validate(voucherSchema), VoucherMiddleware.findEventForVoucher, this.voucherController.create.bind(this.voucherController))
    this.router.put('/event/:eventId/voucher/:id', AuthenticationMiddleware.verifyToken, AuthorizationMiddleware.allowRoles(['EVENT_ORGANIZER']), ValidationMiddleware.validate(voucherSchema), this.voucherController.update.bind(this.voucherController))
    this.router.delete('/voucher/:id', AuthenticationMiddleware.verifyToken, AuthorizationMiddleware.allowRoles(['EVENT_ORGANIZER']), this.voucherController.delete.bind(this.voucherController))
  }
}