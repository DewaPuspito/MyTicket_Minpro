import { prisma } from "../prisma/client";
import { Prisma } from "@prisma/client";
import { EventInput, EventQuery } from "../models/interface";

type EventCategory = 'MUSIC' | 'SPORTS' | 'BUSINESS' | 'TECHNOLOGY' | 'EDUCATION';

export class EventService {
  async create(data: EventInput) {
  return await prisma.event.create({ data });
}


  async findAll(query: EventQuery) {
    const {search, description, location, category, imageURL, page = 1, limit = 10} = query

    const where : Prisma.EventWhereInput = {}

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
        where.category = {
          equals: category as EventCategory
        };
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

  async findById(id: number) {
    return await prisma.event.findUnique({
      where: { id }
    });
  }

  async update(id: number, data: Partial<EventInput>) {
    return prisma.event.update({ where: { id }, data: {...data, updatedAt: new Date()} })
  }

  async delete(id: number) {
    return prisma.event.delete({ where: { id } })
  }
}