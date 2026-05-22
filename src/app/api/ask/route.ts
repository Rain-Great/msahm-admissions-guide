import { NextResponse } from "next/server";
import { answerFromKnowledge } from "@/lib/answer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { question?: string } | null;
  const question = body?.question?.trim();

  if (!question) {
    return NextResponse.json({ error: "Question is required." }, { status: 400 });
  }

  const items = await prisma.knowledgeItem.findMany({
    where: { published: true },
    orderBy: [{ category: "asc" }, { title: "asc" }]
  });

  const result = answerFromKnowledge(question, items);

  await prisma.question.create({
    data: {
      text: question,
      answer: result.answer,
      confidenceScore: result.confidenceScore,
      matchedItemId: result.matchedItem?.id
    }
  });

  return NextResponse.json({
    answer: result.answer,
    confidenceScore: result.confidenceScore,
    sources: result.sources
  });
}
