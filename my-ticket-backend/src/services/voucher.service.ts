import { prisma } from "../prisma/client";
import { Prisma } from "@prisma/client";
import { VoucherInput, VoucherQuery } from "../models/interface";

export class VoucherService {
    async createVoucher(data: VoucherInput) {
        return await prisma.voucher.create({ data });
    }

    async getAllVouchers(query: VoucherQuery) {
        const {search, title, code, discount, expiry_date, page = 1, limit = 10} = query

        const where : Prisma.VoucherWhereInput = {}

        if (search) {
            where.title = { contains: search, mode: 'insensitive' };
        }

        if (title) {
            where.title = title;
        }

        if (code) {
            where.code = code
        }

        if (discount) {
            where.discount = discount;
        }

        if (expiry_date) {
            where.expiry_date = expiry_date;
        }

        return prisma.voucher.findMany({
            where,
            skip: (page - 1) * limit,
            take: limit
        }) 
    }

    async findById(id: number) {
        return await prisma.voucher.findUnique({
          where: { id }
        });
      }
    
      async update(id: number, data: Partial<VoucherInput>) {
        return prisma.voucher.update({ where: { id }, data: {...data, updatedAt: new Date()} })
      }
    
      async delete(id: number) {
        return prisma.voucher.delete({ where: { id } })
      }
}