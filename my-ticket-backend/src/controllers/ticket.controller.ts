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
            const { qty } = req.body;
            const eventId = req.params.eventId;
            const user = req.user;
    
            if (!eventId || !qty) {
                res.status(400).json({
                    success: false,
                    message: "Bad Request"
                });
            }

            const quantity = Number(qty);
            const eventIdNum = Number(eventId);

            if (isNaN(quantity) || isNaN(eventIdNum)) {
                res.status(400).json({
                    success: false,
                    message: "Invalid input format"
                });
            }
    
            if (quantity <= 0) {
                res.status(400).json({
                    success: false,
                    message: "Quantity must be greater than 0"
                });
            }
    
            const data: GenerateTicket = {
                eventId: Number(eventId),
                qty: Number(qty),
                userId: user.id
            };
    
            const result = await this.ticketService.generateTicket(data);
            
            res.status(201).json({
                success: true,
                data: result,
                message: "Ticket generated successfully"
            });
    
        } catch (error) {
            const message = (error instanceof Error && error.message) ? error.message : '';
            const statusCode = message.includes("Not enough tickets") || 
                               message.includes("Quantity must be greater") ? 400 : 500;
            res.status(statusCode).json({
                success: false,
                message: message
            });
        }
    }
}