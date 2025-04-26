import { Router } from 'express';
import { TicketController } from '../controllers/ticket.controller';
import { AuthenticationMiddleware } from '../middlewares/authentication.middleware';
import { AuthorizationMiddleware } from '../middlewares/authorization.middleware';

export class TicketRouter {
  public router: Router;
  private ticketController: TicketController;

  constructor() {
    this.router = Router();
    this.ticketController = new TicketController();
    this.routes();
  }

  private routes(): void {
    this.router.post('/generate-ticket', AuthenticationMiddleware.verifyToken, AuthenticationMiddleware.checkOwnership, AuthorizationMiddleware.allowRoles('CUSTOMER'), this.ticketController.generateTicket.bind(this.ticketController));
  }
}