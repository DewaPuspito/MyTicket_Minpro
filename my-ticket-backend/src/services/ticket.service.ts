import { prisma } from "../prisma/client";
import { GenerateTicket } from "../models/interface";

export class TicketService {
    async generateTicket(data: GenerateTicket) {

        return await prisma.$transaction(async (prisma) => {
            const event = await prisma.event.findUnique({
                where: { id: data.eventId },
                select: {
                    id: true,
                    title: true,
                    price: true,
                    available_seats: true
                }
            });
            
            if (!event) {
                throw new Error(`Event with ID "${data.eventId}" not found`);
            }

            if (event.available_seats <= 0) {
                throw new Error('Quantity must be greater than 0');
            }
    

            if (event.available_seats < data.qty) {
                throw new Error(`Not enough tickets available. Only ${event.available_seats} left`);
            }

            const ticket = await prisma.ticket.create({
                data: {
                    qty: data.qty,
                    total_price: data.qty * event.price,
                    eventId: event.id,
                    userId: data.userId
                },
                include: {
                    event: {
                        select: {
                            title: true
                        }
                    }
                }
            });

            return {
                id: ticket.id,
                qty: ticket.qty,
                total_price: ticket.total_price,
                event: {
                    name: ticket.event.title
                }
            };
        });
    }
}