/*
  Warnings:

  - Added the required column `brandName` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `info` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "brandName" TEXT NOT NULL,
ADD COLUMN     "info" JSONB NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "rating" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Brand" (
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Images" (
    "id" SERIAL NOT NULL,
    "small" TEXT NOT NULL,
    "normal" TEXT NOT NULL,
    "productId" INTEGER,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rewiew" (
    "id" INTEGER NOT NULL,
    "productId" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "Brand_name_key" ON "Brand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Rewiew_id_key" ON "Rewiew"("id");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_brandName_fkey" FOREIGN KEY ("brandName") REFERENCES "Brand"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rewiew" ADD CONSTRAINT "Rewiew_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
