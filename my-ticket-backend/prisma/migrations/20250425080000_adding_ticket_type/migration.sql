/*
  Warnings:

  - You are about to drop the column `price` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `seats_booked` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `total_price` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `qty` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticket_type` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_price` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "price",
DROP COLUMN "seats_booked",
ADD COLUMN     "qty" INTEGER NOT NULL,
ADD COLUMN     "ticket_type" TEXT NOT NULL,
ADD COLUMN     "total_price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "quantity",
DROP COLUMN "total_price";
