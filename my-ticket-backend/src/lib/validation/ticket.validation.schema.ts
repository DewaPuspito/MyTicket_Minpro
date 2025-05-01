import { z as zod } from 'zod';

export const ticketSchema = ({
body : zod.object ({
  qty: zod.number().int().positive()
})
});