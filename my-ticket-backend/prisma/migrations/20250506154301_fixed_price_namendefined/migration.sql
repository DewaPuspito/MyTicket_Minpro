/*
  Warnings:

  - You are about to drop the column `fixed_price` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `fixedPrice` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "fixed_price",
ADD COLUMN     "fixedPrice" INTEGER NOT NULL;
