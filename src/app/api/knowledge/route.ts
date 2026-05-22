import { NextResponse } from "next/server";
import { Category } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const items = await prisma.knowledgeItem.findMany({
    where: { published: true },
    orderBy: [{ category: "asc" }, { title: "asc" }]
  });

  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    title?: string;
    category?: Category;
    content?: string;
    source?: string;
    tags?: string[];
  } | null;

  if (!body?.title || !body.category || !body.content || !body.source) {
    return NextResponse.json(
      { error: "Title, category, content, and source are required." },
      { status: 400 }
    );
  }

  if (!Object.values(Category).includes(body.category)) {
    return NextResponse.json({ error: "Invalid category." }, { status: 400 });
  }

  const item = await prisma.knowledgeItem.create({
    data: {
      title: body.title.trim(),
      category: body.category,
      content: body.content.trim(),
      source: body.source.trim(),
      tags: body.tags?.map((tag) => tag.trim()).filter(Boolean) ?? []
    }
  });

  return NextResponse.json({ item }, { status: 201 });
}
