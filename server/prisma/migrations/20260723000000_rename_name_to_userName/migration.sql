-- Rename the legacy name column to userName so the current Prisma schema matches the database.
ALTER TABLE "User" RENAME COLUMN "name" TO "userName";
