import { z as zod } from 'zod';

export const voucherSchema = ({
  body: zod.object({
    title: zod.string().min(3),
    code: zod.string().min(3),
    discount: zod.number().int().min(0),
    expiry_date: zod.coerce.date()
  }),
});
