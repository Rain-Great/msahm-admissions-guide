import type { KnowledgeItem } from "@prisma/client";

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "can",
  "do",
  "for",
  "from",
  "how",
  "i",
  "in",
  "is",
  "it",
  "me",
  "of",
  "on",
  "or",
  "our",
  "the",
  "to",
  "what",
  "when",
  "where",
  "will",
  "with",
  "you",
  "your"
]);

export type AnswerResult = {
  answer: string;
  confidenceScore: number;
  matchedItem: KnowledgeItem | null;
  sources: Array<Pick<KnowledgeItem, "id" | "title" | "category" | "source">>;
};

function tokenize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token));
}

function scoreItem(questionTokens: string[], item: KnowledgeItem) {
  const haystack = `${item.title} ${item.category} ${item.tags.join(" ")} ${item.content}`.toLowerCase();
  const matches = questionTokens.filter((token) => haystack.includes(token));
  const uniqueMatches = new Set(matches);
  return uniqueMatches.size / Math.max(questionTokens.length, 1);
}

export function answerFromKnowledge(question: string, items: KnowledgeItem[]): AnswerResult {
  const tokens = tokenize(question);

  if (tokens.length === 0) {
    return {
      answer: "Please ask a specific question about the MSAHM Program.",
      confidenceScore: 0,
      matchedItem: null,
      sources: []
    };
  }

  const ranked = items
    .map((item) => ({ item, score: scoreItem(tokens, item) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  const best = ranked[0];

  if (!best || best.score < 0.2) {
    return {
      answer:
        "I do not have enough information in the provided MSAHM materials to answer that. Please contact admissions or add the relevant official material to this app.",
      confidenceScore: best?.score ?? 0,
      matchedItem: null,
      sources: []
    };
  }

  const sources = ranked.slice(0, 3).map(({ item }) => ({
    id: item.id,
    title: item.title,
    category: item.category,
    source: item.source
  }));

  return {
    answer: best.item.content,
    confidenceScore: Number(best.score.toFixed(2)),
    matchedItem: best.item,
    sources
  };
}
