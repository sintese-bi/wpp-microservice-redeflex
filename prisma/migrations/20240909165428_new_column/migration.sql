/*
  Warnings:

  - You are about to drop the column `ibm_magin_ETANOL_HIDRATADO_COMBUSTIVEL` on the `ibm_info` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "gas_station_setvariables" ALTER COLUMN "verification_hour_marginAL" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_marginGC" SET DEFAULT '2023-01-01T00:00:00Z';

-- AlterTable
ALTER TABLE "ibm_info" DROP COLUMN "ibm_magin_ETANOL_HIDRATADO_COMBUSTIVEL",
ADD COLUMN     "ibm_margin_ETANOL_HIDRATADO_COMBUSTIVEL" DOUBLE PRECISION[];

-- AlterTable
ALTER TABLE "region_setvariables" ALTER COLUMN "verification_hour_marginAL" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_marginGC" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_ETANOL_HIDRATADO_COMBUSTIVEL" SET DEFAULT '2023-01-01T00:00:00Z';
