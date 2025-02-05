-- AlterTable
ALTER TABLE "gas_station_setvariables" ADD COLUMN     "gas_station_ETANOL_COMUM_comb" DOUBLE PRECISION,
ADD COLUMN     "gas_station_GASOLINA_COMUM_comb" DOUBLE PRECISION,
ADD COLUMN     "gas_station_OLEO_DIESEL_B_S10_COMUM_comb" DOUBLE PRECISION,
ADD COLUMN     "gas_station_OLEO_DIESEL_B_S500_COMUM_comb" DOUBLE PRECISION,
ALTER COLUMN "verification_hour_marginAL" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_marginGC" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_ETANOL_HIDRATADO_COMBUSTIVEL" SET DEFAULT '2023-01-01T00:00:00Z';

-- AlterTable
ALTER TABLE "region_setvariables" ALTER COLUMN "verification_hour_marginAL" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_marginGC" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_ETANOL_HIDRATADO_COMBUSTIVEL" SET DEFAULT '2023-01-01T00:00:00Z';
