import { z as zod } from 'zod';

export const eventSchema = ({
  body: zod.object({
    title: zod.string().min(3),
    description: zod.string().min(3),
    price: zod.string().transform((val) => parseInt(val)),
    start_date: zod.coerce.date(),
    end_date: zod.coerce.date(),
    available_seats: zod.string().transform((val) => parseInt(val)),
    location: zod.string().min(3),
    category: zod.string().min(3),
  }),
  params: zod.object({
    id: zod.string().nonempty(),
  }),
});
