/*
  Warnings:

  - You are about to drop the column `verification_hour` on the `ibm_info` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "gas_station_setvariables" ADD COLUMN     "verification_hour" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ibm_info" DROP COLUMN "verification_hour";

-- AlterTable
ALTER TABLE "region_setvariables" ADD COLUMN     "verification_hour" TIMESTAMP(3);
