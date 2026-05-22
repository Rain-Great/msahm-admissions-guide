"use client";

import { useState } from "react";

type Source = {
  id: string;
  title: string;
  category: string;
  source: string;
};

type AnswerPayload = {
  answer: string;
  confidenceScore: number;
  sources: Source[];
};

const sampleQuestions = [
  "What courses are offered in the MSAHM Program?",
  "How are courses taught?",
  "What are the admission requirements?",
  "What is the current semester schedule?"
];

export function QuestionForm() {
  const [question, setQuestion] = useState(sampleQuestions[0]);
  const [answer, setAnswer] = useState<AnswerPayload | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function askQuestion() {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question })
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to answer this question.");
      }

      setAnswer(payload);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to answer this question.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="qa-panel" aria-labelledby="question-heading">
      <h3 id="question-heading">Ask About MSAHM</h3>
      <div className="question-box">
        <textarea
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Ask a question about courses, tuition, schedule, admissions, or enrollment."
        />
        <div className="actions">
          <button className="primary-button" onClick={askQuestion} disabled={isLoading}>
            {isLoading ? "Checking Materials" : "Ask Question"}
          </button>
          <button
            className="secondary-button"
            onClick={() =>
              setQuestion(sampleQuestions[(sampleQuestions.indexOf(question) + 1) % sampleQuestions.length])
            }
            type="button"
          >
            Try Sample
          </button>
        </div>
      </div>

      {error ? <p className="error">{error}</p> : null}

      {answer ? (
        <div className="answer">
          <p>{answer.answer}</p>
          {answer.sources.length > 0 ? (
            <div className="source-list" aria-label="Sources">
              {answer.sources.map((source) => (
                <div className="source" key={source.id}>
                  <strong>{source.title}</strong>
                  <br />
                  {source.category.replaceAll("_", " ")} · {source.source}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
