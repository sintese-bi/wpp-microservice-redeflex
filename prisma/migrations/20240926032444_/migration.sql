/*
  Warnings:

  - You are about to drop the column `gas_station_sanado_hour_ETANOL_HIDRATADO_COMBUSTIVEL` on the `region_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `gas_station_sanado_hour_marginAL` on the `region_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `gas_station_sanado_hour_marginGC` on the `region_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `gas_station_sanado_marginAL` on the `region_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `gas_station_sanado_marginGC` on the `region_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `gas_station_sanado_margin_ETANOL_HIDRATADO_COMBUSTIVEL` on the `region_setvariables` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "gas_station_setvariables" ALTER COLUMN "verification_hour_marginAL" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_marginGC" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_ETANOL_HIDRATADO_COMBUSTIVEL" SET DEFAULT '2023-01-01T00:00:00Z';

-- AlterTable
ALTER TABLE "region_setvariables" DROP COLUMN "gas_station_sanado_hour_ETANOL_HIDRATADO_COMBUSTIVEL",
DROP COLUMN "gas_station_sanado_hour_marginAL",
DROP COLUMN "gas_station_sanado_hour_marginGC",
DROP COLUMN "gas_station_sanado_marginAL",
DROP COLUMN "gas_station_sanado_marginGC",
DROP COLUMN "gas_station_sanado_margin_ETANOL_HIDRATADO_COMBUSTIVEL",
ADD COLUMN     "region_sanado_hour_ETANOL_HIDRATADO_COMBUSTIVEL" TIMESTAMP(3),
ADD COLUMN     "region_sanado_hour_marginAL" TIMESTAMP(3),
ADD COLUMN     "region_sanado_hour_marginGC" TIMESTAMP(3),
ADD COLUMN     "region_sanado_marginAL" BOOLEAN,
ADD COLUMN     "region_sanado_marginGC" BOOLEAN,
ADD COLUMN     "region_sanado_margin_ETANOL_HIDRATADO_COMBUSTIVEL" BOOLEAN,
ALTER COLUMN "verification_hour_marginAL" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_marginGC" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_ETANOL_HIDRATADO_COMBUSTIVEL" SET DEFAULT '2023-01-01T00:00:00Z';
