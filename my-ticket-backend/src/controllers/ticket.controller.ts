import { Response } from 'express';
import { TicketService } from '../services/ticket.service';
import { GenerateTicket } from '../models/interface';
import { RequestCollection } from '../types/express';

export class TicketController {
    private ticketService: TicketService;

    constructor() { 
        this.ticketService = new TicketService();
    }

    public async generateTicket(req: RequestCollection, res: Response): Promise<void> {
        try {
            const user = req.user;
            const event = req.event

            const data: GenerateTicket = {
                ...req.body,
                userId: user.id,
                eventId: event.title
            }

            if (event || !data.qty) {
                res.status(400).json({
                    success: false,
                    message: "You need to select event and seats"
                });
            }

            if (data.qty <= 0) {
                res.status(400).json({
                    success: false,
                    message: "Quantity must be greater than 0"
                });
            }

            const result = await this.ticketService.generateTicket(data);

            res.status(201).json({
                success: true,
                data: result,
                message: "Ticket generated successfully"
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to generate ticket"
            });
        }
    }
}