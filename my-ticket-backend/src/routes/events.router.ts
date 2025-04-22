import { Router } from 'express';
import { EventController } from '../controllers/events.controller';
import { AuthenticationMiddleware } from '../middlewares/authentication.middleware';
import { AuthorizationMiddleware } from '../middlewares/authorization.middleware';
import { ValidationMiddleware } from '../middlewares/validation.middlewares';
import { eventSchema } from '../lib/validation/validation.schema';
export class EventRouter {
  public router: Router;
  private eventController: EventController;

  constructor() {
    this.router = Router();
    this.eventController = new EventController();
    this.routes();
  }

  private routes(): void {
    this.router.get('/event', AuthenticationMiddleware.verifyToken, AuthorizationMiddleware.allowRoles(['CUSTOMER', 'EVENT_ORGANIZER']), this.eventController.findAll.bind(this.eventController))
    this.router.post('/event', AuthenticationMiddleware.verifyToken, AuthorizationMiddleware.allowRoles('EVENT_ORGANIZER'), ValidationMiddleware.validate({body: eventSchema.body}), this.eventController.create.bind(this.eventController))
    this.router.put('/event/:id', AuthenticationMiddleware.verifyToken, AuthorizationMiddleware.allowRoles('EVENT_ORGANIZER'), ValidationMiddleware.validate({body: eventSchema.body, params: eventSchema.params, partial: true}), this.eventController.update.bind(this.eventController))
    this.router.delete('/event/:id', AuthenticationMiddleware.verifyToken, AuthorizationMiddleware.allowRoles('EVENT_ORGANIZER'), this.eventController.delete.bind(this.eventController))
  }
}