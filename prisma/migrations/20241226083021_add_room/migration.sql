/*
  Warnings:

  - You are about to drop the column `rooms` on the `Listings` table. All the data in the column will be lost.
  - Added the required column `bedrooms` to the `Listings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Listings" DROP COLUMN "rooms",
ADD COLUMN     "bedrooms" INTEGER NOT NULL;
