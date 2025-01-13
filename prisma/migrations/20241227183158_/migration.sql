-- AlterTable
ALTER TABLE "gas_station_setvariables" ALTER COLUMN "verification_hour_marginGC" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_DIESEL_GROUP" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_GASOLINA_PODIUM" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_GASOLINA_PREMIUM" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_DIESEL_GROUP_S500" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_ETANOL_COMUM" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_TOTAL_PRODUCT" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_ADITIVOS_AUTOMOVEIS_PRODUCT" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_FILTROS_AR_PRODUCT" SET DEFAULT '2023-01-01T00:00:00Z';

-- AlterTable
ALTER TABLE "region_setvariables" ALTER COLUMN "verification_hour_marginGC" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_DIESEL_GROUP" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_GASOLINA_PODIUM" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_GASOLINA_PREMIUM" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_DIESEL_GROUP_S500" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_ETANOL_COMUM" SET DEFAULT '2023-01-01T00:00:00Z';

-- CreateTable
CREATE TABLE "mlt_history" (
    "mlt_history_uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "use_uuid" UUID,
    "mlt_history_value" DOUBLE PRECISION,
    "mlt_history_date" TIMESTAMP(3),
    "mlt_history_created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mlt_history_updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mlt_history_pkey" PRIMARY KEY ("mlt_history_uuid")
);

-- AddForeignKey
ALTER TABLE "mlt_history" ADD CONSTRAINT "mlt_history_use_uuid_fkey" FOREIGN KEY ("use_uuid") REFERENCES "users"("use_uuid") ON DELETE SET NULL ON UPDATE CASCADE;
