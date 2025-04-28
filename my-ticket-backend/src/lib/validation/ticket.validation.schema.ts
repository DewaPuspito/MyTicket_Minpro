import { z as zod } from 'zod';

export const ticketSchema = ({
body : zod.object ({
  eventId: zod.number().int().positive(),
  qty: zod.number().int().positive()
})
});