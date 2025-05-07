/*
  Warnings:

  - You are about to drop the column `couponId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `voucherId` on the `Transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_couponId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_voucherId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "couponId",
DROP COLUMN "voucherId";
