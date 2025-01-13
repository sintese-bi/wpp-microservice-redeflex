/*
  Warnings:

  - You are about to drop the column `use_lucro_bruto_operacional` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "gas_station_setvariables" ALTER COLUMN "verification_hour_marginAL" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_marginGC" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_ETANOL_HIDRATADO_COMBUSTIVEL" SET DEFAULT '2023-01-01T00:00:00Z';

-- AlterTable
ALTER TABLE "region_setvariables" ALTER COLUMN "verification_hour_marginAL" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_marginGC" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_ETANOL_HIDRATADO_COMBUSTIVEL" SET DEFAULT '2023-01-01T00:00:00Z';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "use_lucro_bruto_operacional",
ADD COLUMN     "use_lucro_bruto_operacional_galonagem" DOUBLE PRECISION,
ADD COLUMN     "use_lucro_bruto_operacional_produto" DOUBLE PRECISION;
