/*
  Warnings:

  - You are about to drop the `colorObject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "colorObject" DROP CONSTRAINT "colorObject_colorColorName_fkey";

-- DropIndex
DROP INDEX "color_colorName_key";

-- AlterTable
ALTER TABLE "color" ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "normalImages" TEXT[],
ADD COLUMN     "smallImages" TEXT[],
ADD CONSTRAINT "color_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "colorObject";
