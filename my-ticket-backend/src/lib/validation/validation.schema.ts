import { z as zod } from 'zod';

export const eventSchema = ({
  body: zod.object({
    title: zod.string().min(3),
    price: zod.number().int().positive(),
    start_date: zod.coerce.date(),
    end_date: zod.coerce.date(),
    available_seats: zod.number().int().positive(),
    location: zod.string().min(3),
    category: zod.string().min(3),
  }),
  params: zod.object({
    id: zod.string().nonempty(),
  }),
});
