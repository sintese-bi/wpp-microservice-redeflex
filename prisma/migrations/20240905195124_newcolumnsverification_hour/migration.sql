/*
  Warnings:

  - You are about to drop the column `verification_hour` on the `gas_station_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `verification_hour` on the `region_setvariables` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "gas_station_setvariables" DROP COLUMN "verification_hour",
ADD COLUMN     "verification_hour_marginAL" TIMESTAMP(3),
ADD COLUMN     "verification_hour_marginGC" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "region_setvariables" DROP COLUMN "verification_hour",
ADD COLUMN     "verification_hour_marginAL" TIMESTAMP(3),
ADD COLUMN     "verification_hour_marginGC" TIMESTAMP(3);
