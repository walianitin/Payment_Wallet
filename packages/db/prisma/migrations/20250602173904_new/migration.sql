/*
  Warnings:

  - The values [Failed] on the enum `OnRampStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `starttime` on the `OnRampTransaction` table. All the data in the column will be lost.
  - Added the required column `startTime` to the `OnRampTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OnRampStatus_new" AS ENUM ('Success', 'Failure', 'Processing');
ALTER TABLE "OnRampTransaction" ALTER COLUMN "status" TYPE "OnRampStatus_new" USING ("status"::text::"OnRampStatus_new");
ALTER TYPE "OnRampStatus" RENAME TO "OnRampStatus_old";
ALTER TYPE "OnRampStatus_new" RENAME TO "OnRampStatus";
DROP TYPE "OnRampStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "OnRampTransaction" DROP COLUMN "starttime",
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;
