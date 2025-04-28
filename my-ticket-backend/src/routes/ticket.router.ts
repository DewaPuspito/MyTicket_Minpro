import { Router } from 'express';
import { TicketController } from '../controllers/ticket.controller';
import { AuthenticationMiddleware } from '../middlewares/authentication.middleware';
import { AuthorizationMiddleware } from '../middlewares/authorization.middleware';
import { EventMiddleware } from '../middlewares/event.middleware';

export class TicketRouter {
  public router: Router;
  private ticketController: TicketController;

  constructor() {
    this.router = Router();
    this.ticketController = new TicketController();
    this.routes();
  }

  private routes(): void {
    this.router.post('/generate-ticket', AuthenticationMiddleware.verifyToken, AuthorizationMiddleware.allowRoles('CUSTOMER'), EventMiddleware.findEvent, this.ticketController.generateTicket.bind(this.ticketController));
  }
}