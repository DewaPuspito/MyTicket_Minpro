/*
  Warnings:

  - Added the required column `fixed_price` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "fixed_price" INTEGER NOT NULL;
