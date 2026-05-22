import { prisma } from "@/lib/prisma";
import { QuestionForm } from "@/components/QuestionForm";

export const dynamic = "force-dynamic";

function formatCategory(category: string) {
  return category
    .toLowerCase()
    .split("_")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function Home() {
  const materials = await prisma.knowledgeItem.findMany({
    where: { published: true },
    orderBy: [{ category: "asc" }, { title: "asc" }]
  });

  return (
    <div className="shell">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <div className="mark">M</div>
            <div>
              <h1>MSAHM Admissions Guide</h1>
              <p>Prospective student information assistant</p>
            </div>
          </div>
          <div className="status-pill">Answers only from provided materials</div>
        </div>
      </header>

      <main className="main">
        <section className="intro" aria-labelledby="intro-heading">
          <h2 id="intro-heading">Clear answers for future MSAHM students.</h2>
          <p>
            This app helps prospective students find program details about courses, teaching formats,
            tuition, current schedules, admissions requirements, and enrollment steps. Each response is
            grounded in the program materials stored in the database.
          </p>

          <div className="quick-grid" aria-label="Covered topics">
            <div className="quick-card">
              <strong>Program Details</strong>
              <span>Courses, curriculum structure, and academic expectations.</span>
            </div>
            <div className="quick-card">
              <strong>Admissions</strong>
              <span>Requirements, application documents, and enrollment steps.</span>
            </div>
            <div className="quick-card">
              <strong>Student Costs</strong>
              <span>Tuition and fee records once official amounts are provided.</span>
            </div>
            <div className="quick-card">
              <strong>Current Schedule</strong>
              <span>Semester dates, meeting times, and calendar details.</span>
            </div>
          </div>
        </section>

        <QuestionForm />

        <section className="materials" aria-labelledby="materials-heading">
          <h3 id="materials-heading">Provided Material Library</h3>
          <div className="material-grid">
            {materials.map((item) => (
              <article className="material" key={item.id}>
                <span className="badge">{formatCategory(item.category)}</span>
                <h4>{item.title}</h4>
                <p>{item.content}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
