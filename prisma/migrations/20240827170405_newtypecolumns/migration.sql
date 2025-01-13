/*
  Warnings:

  - The `ibm_margin_AL` column on the `ibm_info` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ibm_margin_GC` column on the `ibm_info` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ibm_margin_Total` column on the `ibm_info` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ibm_volume_AL` column on the `ibm_info` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ibm_volume_GC` column on the `ibm_info` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ibm_volume_Total` column on the `ibm_info` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `regions_margin_AL` column on the `regions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `regions_margin_GC` column on the `regions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `regions_margin_Total` column on the `regions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `regions_volume_AL` column on the `regions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `regions_volume_GC` column on the `regions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `regions_volume_Total` column on the `regions` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ibm_info" DROP COLUMN "ibm_margin_AL",
ADD COLUMN     "ibm_margin_AL" DOUBLE PRECISION[],
DROP COLUMN "ibm_margin_GC",
ADD COLUMN     "ibm_margin_GC" DOUBLE PRECISION[],
DROP COLUMN "ibm_margin_Total",
ADD COLUMN     "ibm_margin_Total" DOUBLE PRECISION[],
DROP COLUMN "ibm_volume_AL",
ADD COLUMN     "ibm_volume_AL" DOUBLE PRECISION[],
DROP COLUMN "ibm_volume_GC",
ADD COLUMN     "ibm_volume_GC" DOUBLE PRECISION[],
DROP COLUMN "ibm_volume_Total",
ADD COLUMN     "ibm_volume_Total" DOUBLE PRECISION[];

-- AlterTable
ALTER TABLE "regions" DROP COLUMN "regions_margin_AL",
ADD COLUMN     "regions_margin_AL" DOUBLE PRECISION[],
DROP COLUMN "regions_margin_GC",
ADD COLUMN     "regions_margin_GC" DOUBLE PRECISION[],
DROP COLUMN "regions_margin_Total",
ADD COLUMN     "regions_margin_Total" DOUBLE PRECISION[],
DROP COLUMN "regions_volume_AL",
ADD COLUMN     "regions_volume_AL" DOUBLE PRECISION[],
DROP COLUMN "regions_volume_GC",
ADD COLUMN     "regions_volume_GC" DOUBLE PRECISION[],
DROP COLUMN "regions_volume_Total",
ADD COLUMN     "regions_volume_Total" DOUBLE PRECISION[];
