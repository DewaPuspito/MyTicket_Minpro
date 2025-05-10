import { prisma } from '../prisma/client';
import { TransactionInput } from '../models/interface';
import { Status } from '@prisma/client';

export class TransactionService {
  public async createTransaction(data: TransactionInput) {
    try {
      const transaction = await prisma.$transaction(async (tx) => {
        // Cek tiket
        const ticket = await tx.ticket.findUnique({
          where: { id: data.ticketId },
          include: { event: true }
        });

        // Validasi tiket
        if (!ticket) throw new Error("Ticket not found");
        if (ticket.qty <= 0) throw new Error("Ticket sold out");
        if (ticket.eventId !== data.eventId) throw new Error("Ticket is not valid for this event");
        // Hitung harga final
        let finalPrice = ticket.total_price; // Menggunakan harga dari tiket

        // Proses multiple coupons
        if (data.coupons && data.coupons.length > 0) {
          for (const couponData of data.coupons) {
            const coupon = await tx.coupon.findUnique({
              where: { id: couponData.id }
            });
        
            if (!coupon || coupon.userId !== data.userId) {
              throw new Error(`Coupon ${couponData.id} not found or not valid for this user`);
            }
            finalPrice -= coupon.points;

            // Update poin di coupon
            await tx.coupon.update({
              where: { id: coupon.id },
              data: { points: 0 }
            });
          }
        }

        // Proses multiple vouchers
        if (data.vouchers && data.vouchers.length > 0) {
          for (const voucherData of data.vouchers) {
            const voucher = await tx.voucher.findUnique({
              where: { 
                id: voucherData.id,
                expiry_date: { gt: new Date() }
              }
            });

            if (!voucher) {
              throw new Error(`Voucher ${voucherData.id} not valid or expired`);
            }

            const discount = (finalPrice * voucher.discount) / 100;
            finalPrice -= discount;
          }
        }


        // Buat transaksi
        const newTransaction = await tx.transaction.create({
          data: {
            userId: data.userId,
            eventId: data.eventId,
            ticketId: data.ticketId,
            status: 'PENDING' as Status,
            paymentProof: data.paymentProof,
            fixedPrice: finalPrice,
            TransactionVoucher: {
              create: data.vouchers.map(v => ({
                voucher: {
                  connect: { id: v.id }
                }
              }))
            },
            TransactionCoupon: {
              create: data.coupons.map(c => ({
                coupon: {
                  connect: { id: c.id }
                }
              }))
            }
          }, include: {
            TransactionVoucher: {  
              include: {
                voucher: true
              }
            },
            TransactionCoupon: { 
              include: {
                coupon: true
              }
            }
          }
        });
        

        // Update stok tiket
        await tx.ticket.update({
          where: { id: data.ticketId },
          data: { qty: ticket.qty }
        });

        return newTransaction;
      });

      return transaction;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Mendapatkan semua transaksi user
  public async getUserTransactions(userId: number) {
    try {
      const transactions = await prisma.transaction.findMany({
        where: { userId },
        include: {
          event: {
            select: {
              title: true,
              start_date: true,
              location: true
            }
          },
          ticket: {
            select: {
              qty: true,
              total_price: true
            }
          },
          TransactionVoucher: {
            include: {
              voucher: true
            }
          },
          TransactionCoupon: {
            include: {
              coupon: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
  
      return transactions;
    } catch (error) {
      throw new Error("Failed to fetch transactions");
    }
  }
  

  public async getOrganizerTransactions(organizerId: number) {
    const transactions = await prisma.transaction.findMany({
      where: {
        event: {
          userId: organizerId
        }
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        },
        event: {
          select: {
            title: true,
            start_date: true
          }
        },
        ticket: {
          select: {
            qty: true,
            total_price: true
          }
        },
        TransactionVoucher: {
          include: {
            voucher: true
          }
        },
        TransactionCoupon: {
          include: {
            coupon: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  
    return transactions;
  }
  
  public async cancelTransaction(transactionId: number) {
    try {
      return await prisma.$transaction(async (tx) => {
        const transaction = await tx.transaction.findUnique({
          where: { id: transactionId },
          include: { ticket: true }
        });

        if (!transaction) {
          throw new Error("Transaction not found");
        }

        if (transaction.status !== 'PENDING') {
          throw new Error("Only pending transactions can be cancelled");
        }

        // Restore ticket quantity
        await tx.ticket.update({
          where: { id: transaction.ticketId },
          data: { qty: { increment: 1 } }
        });

        // Update transaction status
        return await tx.transaction.update({
          where: { id: transactionId },
          data: { status: 'CANCELLED' as Status }
        });
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async updateTransactionStatus(transactionId: number, status: Status, paymentProof?: string) {
    try {
      const transaction = await prisma.transaction.findUnique({
        where: { id: transactionId },
        include: { ticket: true }
      });

      if (!transaction) {
        throw new Error("Transaction not found");
      }

      // Tambahkan pengurangan available seats saat status PAID
      if (status === 'PAID') {
        await prisma.event.update({
          where: { id: transaction.eventId },
          data: { available_seats: { decrement: transaction.ticket.qty } }
        });
      }

      return await prisma.transaction.update({
        where: { id: transactionId },
        data: { 
          status,
          ...(paymentProof && { paymentProof })
        }
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Fungsi untuk mengecek dan memperbarui transaksi yang expired
  public async checkExpiredTransactions() {
    try {
      const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
      
      await prisma.transaction.updateMany({
        where: {
          status: 'PENDING' as Status,
          createdAt: {
            lt: twoHoursAgo
          },
          paymentProof: ''
        },
        data: {
          status: 'EXPIRED' as Status
        }
      });
    } catch (error) {
      throw new Error("Failed to update expired transactions");
    }
  }
}