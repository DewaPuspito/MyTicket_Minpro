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
            const { eventId, qty } = req.body;
            const user = req.user;
    
            if (!eventId || !qty) {
                res.status(400).json({
                    success: false,
                    message: "eventId and qty are required in request body"
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
            console.error("Error:", error);
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Failed to generate ticket"
            });
        }
    }
}