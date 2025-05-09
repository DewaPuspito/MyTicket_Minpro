import express, { Application } from 'express';
import cors from 'cors';
import { AuthRouter } from './routes/auth.router';
import { EventRouter } from './routes/events.router';
import { ProfileRouter } from './routes/profile.router';
import { EmailRouter } from './routes/email.router';
import { TicketRouter } from './routes/ticket.router';
import { VoucherRouter } from './routes/voucher.router';
import { TransactionRouter } from './routes/transaction.router';

class Server {
  private app: Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = 8000;
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(cors({
      origin: 'http://localhost:3000',
      credentials: true
  }));
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use('/api', new AuthRouter().router);
    this.app.use('/api', new EventRouter().router);
    this.app.use('/api', new ProfileRouter().router);
    this.app.use('/api', new EmailRouter().router);
    this.app.use('/api', new TicketRouter().router);
    this.app.use('/api', new VoucherRouter().router);
    this.app.use('/api', new TransactionRouter().router);
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

const server = new Server();
server.start();