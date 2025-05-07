import { Router } from 'express';
import { TransactionController } from '../controllers/transaction.controller';
import { AuthenticationMiddleware } from '../middlewares/authentication.middleware';
import { AuthorizationMiddleware } from '../middlewares/authorization.middleware';
import { TransactionMiddleware } from '../middlewares/transaction.middleware';
export class TransactionRouter {
  public router: Router;
  private transactionController: TransactionController;

  constructor() {
    this.router = Router();
    this.transactionController = new TransactionController();
    this.routes();
  }

  private routes(): void {
    this.router.post('/ticket/:ticketId/create-transaction',AuthenticationMiddleware.verifyToken, AuthorizationMiddleware.allowRoles('CUSTOMER'), TransactionMiddleware.findTicketForTransaction, this.transactionController.createTransaction.bind(this.transactionController));
    this.router.get('/get-transactions', AuthenticationMiddleware.verifyToken, AuthorizationMiddleware.allowRoles('CUSTOMER'), this.transactionController.getUserTransactions.bind(this.transactionController));
    this.router.patch('/transaction/:id/status', AuthenticationMiddleware.verifyToken, AuthorizationMiddleware.allowRoles('EVENT_ORGANIZER'), this.transactionController.updateTransactionStatus.bind(this.transactionController)
    );
  }
}