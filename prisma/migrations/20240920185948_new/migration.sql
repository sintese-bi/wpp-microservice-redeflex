/*
  Warnings:

  - You are about to drop the column `gas_station_marginTotal` on the `gas_station_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `gas_station_type_marginTotal` on the `gas_station_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `gas_station_type_volumeAL` on the `gas_station_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `gas_station_type_volumeGC` on the `gas_station_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `gas_station_type_volumeTotal` on the `gas_station_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `gas_station_volumeAL` on the `gas_station_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `gas_station_volumeGC` on the `gas_station_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `gas_station_volumeTotal` on the `gas_station_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `region_marginTotal` on the `region_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `region_type_marginTotal` on the `region_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `region_type_volumeAL` on the `region_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `region_type_volumeGC` on the `region_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `region_type_volumeTotal` on the `region_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `region_volumeAL` on the `region_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `region_volumeGC` on the `region_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `region_volumeTotal` on the `region_setvariables` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "gas_station_setvariables" DROP COLUMN "gas_station_marginTotal",
DROP COLUMN "gas_station_type_marginTotal",
DROP COLUMN "gas_station_type_volumeAL",
DROP COLUMN "gas_station_type_volumeGC",
DROP COLUMN "gas_station_type_volumeTotal",
DROP COLUMN "gas_station_volumeAL",
DROP COLUMN "gas_station_volumeGC",
DROP COLUMN "gas_station_volumeTotal",
ADD COLUMN     "gas_station_sanado_hour_ETANOL_HIDRATADO_COMBUSTIVEL" TIMESTAMP(3),
ADD COLUMN     "gas_station_sanado_hour_marginAL" TIMESTAMP(3),
ADD COLUMN     "gas_station_sanado_hour_marginGC" TIMESTAMP(3),
ADD COLUMN     "gas_station_sanado_marginAL" BOOLEAN,
ADD COLUMN     "gas_station_sanado_marginGC" BOOLEAN,
ADD COLUMN     "gas_station_sanado_margin_ETANOL_HIDRATADO_COMBUSTIVEL" BOOLEAN,
ALTER COLUMN "verification_hour_marginAL" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_marginGC" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_ETANOL_HIDRATADO_COMBUSTIVEL" SET DEFAULT '2023-01-01T00:00:00Z';

-- AlterTable
ALTER TABLE "region_setvariables" DROP COLUMN "region_marginTotal",
DROP COLUMN "region_type_marginTotal",
DROP COLUMN "region_type_volumeAL",
DROP COLUMN "region_type_volumeGC",
DROP COLUMN "region_type_volumeTotal",
DROP COLUMN "region_volumeAL",
DROP COLUMN "region_volumeGC",
DROP COLUMN "region_volumeTotal",
ADD COLUMN     "gas_station_sanado_hour_ETANOL_HIDRATADO_COMBUSTIVEL" TIMESTAMP(3),
ADD COLUMN     "gas_station_sanado_hour_marginAL" TIMESTAMP(3),
ADD COLUMN     "gas_station_sanado_hour_marginGC" TIMESTAMP(3),
ADD COLUMN     "gas_station_sanado_marginAL" BOOLEAN,
ADD COLUMN     "gas_station_sanado_marginGC" BOOLEAN,
ADD COLUMN     "gas_station_sanado_margin_ETANOL_HIDRATADO_COMBUSTIVEL" BOOLEAN,
ALTER COLUMN "verification_hour_marginAL" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_marginGC" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_ETANOL_HIDRATADO_COMBUSTIVEL" SET DEFAULT '2023-01-01T00:00:00Z';
