/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Job` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Job_title_company_key";

-- AlterTable
ALTER TABLE "public"."Job" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Job_url_key" ON "public"."Job"("url");
