-- AlterTable
ALTER TABLE "gas_station_setvariables" ADD COLUMN     "gas_station_invoice_comb_daily" DOUBLE PRECISION,
ADD COLUMN     "gas_station_invoice_prod_daily" DOUBLE PRECISION,
ALTER COLUMN "verification_hour_marginGC" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_DIESEL_GROUP" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_GASOLINA_PODIUM" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_GASOLINA_PREMIUM" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_DIESEL_GROUP_S500" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_ETANOL_COMUM" SET DEFAULT '2023-01-01T00:00:00Z';

-- AlterTable
ALTER TABLE "region_setvariables" ALTER COLUMN "verification_hour_marginGC" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_DIESEL_GROUP" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_GASOLINA_PODIUM" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_GASOLINA_PREMIUM" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_DIESEL_GROUP_S500" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_ETANOL_COMUM" SET DEFAULT '2023-01-01T00:00:00Z';
