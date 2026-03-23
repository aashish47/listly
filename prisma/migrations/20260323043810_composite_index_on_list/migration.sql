-- DropIndex
DROP INDEX "List_userId_idx";

-- CreateIndex
CREATE INDEX "List_userId_title_idx" ON "List"("userId", "title");
