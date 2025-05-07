-- CreateTable
CREATE TABLE "TransactionVoucher" (
    "transactionId" INTEGER NOT NULL,
    "voucherId" INTEGER NOT NULL,

    CONSTRAINT "TransactionVoucher_pkey" PRIMARY KEY ("transactionId","voucherId")
);

-- CreateTable
CREATE TABLE "TransactionCoupon" (
    "transactionId" INTEGER NOT NULL,
    "couponId" INTEGER NOT NULL,
    "pointsUsed" INTEGER NOT NULL,

    CONSTRAINT "TransactionCoupon_pkey" PRIMARY KEY ("transactionId","couponId")
);

-- AddForeignKey
ALTER TABLE "TransactionVoucher" ADD CONSTRAINT "TransactionVoucher_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionVoucher" ADD CONSTRAINT "TransactionVoucher_voucherId_fkey" FOREIGN KEY ("voucherId") REFERENCES "Voucher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionCoupon" ADD CONSTRAINT "TransactionCoupon_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionCoupon" ADD CONSTRAINT "TransactionCoupon_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
