import { Router } from 'express';
import { TicketController } from '../controllers/ticket.controller';
import { AuthenticationMiddleware } from '../middlewares/authentication.middleware';
import { AuthorizationMiddleware } from '../middlewares/authorization.middleware';
import { ValidationMiddleware } from '../middlewares/validation.middlewares';
import { TicketVoucherMiddleware } from '../middlewares/ticket.voucher.middleware';
import { ticketSchema } from '../lib/validation/ticket.validation.schema';

export class TicketRouter {
  public router: Router;
  private ticketController: TicketController;

  constructor() {
    this.router = Router();
    this.ticketController = new TicketController();
    this.routes();
  }

  private routes(): void {
    this.router.post('/generate-ticket', AuthenticationMiddleware.verifyToken, AuthorizationMiddleware.allowRoles('CUSTOMER'), TicketVoucherMiddleware.findEventForTicketAndVoucher, ValidationMiddleware.validate(ticketSchema), this.ticketController.generateTicket.bind(this.ticketController));
  }
}