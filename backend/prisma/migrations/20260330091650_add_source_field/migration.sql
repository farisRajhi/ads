-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VisitorLocation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ip" TEXT NOT NULL,
    "country" TEXT,
    "city" TEXT,
    "region" TEXT,
    "latitude" REAL,
    "longitude" REAL,
    "visitedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userAgent" TEXT,
    "page" TEXT,
    "source" TEXT NOT NULL DEFAULT 'ip'
);
INSERT INTO "new_VisitorLocation" ("city", "country", "id", "ip", "latitude", "longitude", "page", "region", "userAgent", "visitedAt") SELECT "city", "country", "id", "ip", "latitude", "longitude", "page", "region", "userAgent", "visitedAt" FROM "VisitorLocation";
DROP TABLE "VisitorLocation";
ALTER TABLE "new_VisitorLocation" RENAME TO "VisitorLocation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
