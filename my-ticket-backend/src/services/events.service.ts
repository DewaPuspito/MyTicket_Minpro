import { prisma } from "../prisma/client";
import { EventInput, EventQuery } from "../models/interface";

export class EventService {
  async create(data: EventInput) {
  return await prisma.event.create({ data });
}


  async findAll(query: EventQuery) {
    const {search, location, category, page = 1, limit = 10} = query

    const where : any = {}

    if (search) {
        where.title = { contains: search, mode: 'insensitive' };
    }

    if (location) {
        where.location = location;
    }

    if (category) {
        where.category = category
    }

    return prisma.event.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit
    }) 
  }

  async update(id: number, data: Partial<EventInput>) {
    return prisma.event.update({ where: { id }, data: {...data, updatedAt: new Date()} })
  }

  async delete(id: number) {
    return prisma.event.delete({ where: { id } })
  }
}