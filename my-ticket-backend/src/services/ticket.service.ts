import { prisma } from "../prisma/client";
import { GenerateTicket } from "../models/interface";

export class TicketService {
    async generateTicket(data: GenerateTicket) {
        const event = await prisma.event.findUnique({
            where: {
                id: data.eventId
            }
        });
        
        if (!event) {
            throw new Error(`Event with ID "${data.eventId}" not found`);
        }

        return this.createTicket(event, data);
    }

    private async createTicket(
        event: { id: number; price: number }, 
        data: GenerateTicket
    ) {
        const total_price = data.qty * event.price;
    
        const ticket = await prisma.ticket.create({
            data: {
                qty: data.qty,
                total_price: total_price,
                eventId: event.id,
                userId: data.userId
            }
        });
    
        return {
            id: ticket.id,
            qty: ticket.qty,
            total_price: ticket.total_price,
            event: {
                id: data.eventId
            }
        };
    }
}