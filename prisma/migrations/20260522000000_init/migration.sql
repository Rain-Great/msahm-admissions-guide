CREATE TYPE "Category" AS ENUM (
  'PROGRAM_OVERVIEW',
  'COURSES',
  'TEACHING_FORMAT',
  'TUITION',
  'SCHEDULE',
  'ADMISSIONS',
  'ENROLLMENT'
);

CREATE TABLE "KnowledgeItem" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "category" "Category" NOT NULL,
  "content" TEXT NOT NULL,
  "source" TEXT NOT NULL,
  "tags" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "published" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "KnowledgeItem_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Question" (
  "id" TEXT NOT NULL,
  "text" TEXT NOT NULL,
  "answer" TEXT NOT NULL,
  "matchedItemId" TEXT,
  "confidenceScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "KnowledgeItem_category_idx" ON "KnowledgeItem"("category");
CREATE INDEX "KnowledgeItem_published_idx" ON "KnowledgeItem"("published");
CREATE UNIQUE INDEX "KnowledgeItem_title_key" ON "KnowledgeItem"("title");

ALTER TABLE "Question"
  ADD CONSTRAINT "Question_matchedItemId_fkey"
  FOREIGN KEY ("matchedItemId")
  REFERENCES "KnowledgeItem"("id")
  ON DELETE SET NULL
  ON UPDATE CASCADE;
