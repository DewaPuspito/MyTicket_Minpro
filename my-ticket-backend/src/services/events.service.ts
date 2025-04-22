import { prisma } from "../prisma/client";
import { EventInput, EventQuery } from "../models/interface";

export class EventService {
  async create(data: EventInput) {
  return await prisma.event.create({ data });
}


  async findAll(query: EventQuery) {
    const {search, description, location, category, imageURL, page = 1, limit = 10} = query

    const where : any = {}

    if (search) {
        where.title = { contains: search, mode: 'insensitive' };
    }

    if (description) {
      where.description = description
    }

    if (location) {
        where.location = location;
    }

    if (category) {
        where.category = category
    }

    if (imageURL) {
      where.imageURL = imageURL
    }

    return prisma.event.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit
    }) 
  }

  async verifyEventOwnership(id: number, userId: number): Promise<boolean> {
    const event = await prisma.event.findUnique({
        where: { id },
        select: { userId: true }
    });
    
    return event?.userId === userId;
}

  async update(id: number, userId: number, data: Partial<EventInput>) {
    const isOwner = await this.verifyEventOwnership(id, userId);
        if (!isOwner) {
            throw new Error("You are not authorized to update this event");
        }
    return prisma.event.update({ where: { id }, data: {...data, updatedAt: new Date()} })
  }

  async delete(id: number, userId: number) {

    await this.verifyEventOwnership(id, userId)

    return prisma.event.delete({ where: { id } })
  }
}