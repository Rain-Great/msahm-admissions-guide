const { PrismaClient, Category } = require("@prisma/client");

const prisma = new PrismaClient();

const items = [
  {
    title: "MSAHM Program Purpose",
    category: Category.PROGRAM_OVERVIEW,
    source: "Starter program profile",
    tags: ["program", "msahm", "overview", "prospective students"],
    content:
      "The MSAHM Program information in this app is intended for prospective students. Replace this starter record with the official program overview, degree description, and institutional language before publishing broadly."
  },
  {
    title: "Courses Offered",
    category: Category.COURSES,
    source: "Starter course catalog placeholder",
    tags: ["courses", "curriculum", "classes", "units"],
    content:
      "Course records should list the specific MSAHM courses offered, including official course titles, descriptions, credit or unit values, prerequisites, and whether each course is required or elective. This starter app is ready for those official course details."
  },
  {
    title: "Teaching Methodology and Formats",
    category: Category.TEACHING_FORMAT,
    source: "Starter instruction format placeholder",
    tags: ["teaching", "format", "online", "hybrid", "in person", "methodology"],
    content:
      "Teaching methodology and format materials should explain how MSAHM courses are delivered, including lecture, discussion, clinical or practical learning, online, hybrid, or in-person expectations, attendance expectations, and student support resources."
  },
  {
    title: "Tuition and Fees",
    category: Category.TUITION,
    source: "Starter tuition placeholder",
    tags: ["tuition", "fees", "cost", "payment"],
    content:
      "Tuition and fee materials should include the official current tuition rate, required fees, payment deadlines, refund policy references, and any program-specific cost notes. Do not rely on this placeholder for actual tuition amounts."
  },
  {
    title: "Current Semester Schedule",
    category: Category.SCHEDULE,
    source: "Starter schedule placeholder",
    tags: ["schedule", "semester", "calendar", "dates"],
    content:
      "Current semester schedule materials should include the semester name, course meeting days and times, start and end dates, holidays, add/drop deadlines, and any required orientation or advising dates."
  },
  {
    title: "Admission Requirements",
    category: Category.ADMISSIONS,
    source: "Starter admissions placeholder",
    tags: ["admission", "requirements", "application", "eligibility"],
    content:
      "Admission requirement materials should include official eligibility criteria, required academic records, language proficiency requirements if applicable, application documents, deadlines, and how applications are reviewed."
  },
  {
    title: "Enrollment Procedure",
    category: Category.ENROLLMENT,
    source: "Starter enrollment placeholder",
    tags: ["enrollment", "procedure", "apply", "steps", "registration"],
    content:
      "Enrollment procedure materials should explain the steps after admission, including accepting admission, submitting forms, paying deposits or tuition, registering for courses, attending orientation, and contacting admissions staff."
  }
];

async function main() {
  for (const item of items) {
    await prisma.knowledgeItem.upsert({
      where: { title: item.title },
      update: item,
      create: item
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
