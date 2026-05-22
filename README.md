# MSAHM Admissions Guide

A Next.js, PostgreSQL, and Prisma app for answering prospective student questions strictly from institution-provided MSAHM program materials.

## Features

- Public Q&A interface for prospective students
- Strict retrieval answer behavior: if no source material matches, the app says it does not have enough provided information
- Program material pages covering courses, teaching formats, tuition, schedule, admissions, and enrollment
- Prisma-backed knowledge base with idempotent seed data
- Dockerfile designed for Dokploy deployment

## Local Development

1. Copy `.env.example` to `.env` and set `DATABASE_URL`.
2. Install dependencies:

```bash
npm install
```

3. Prepare the database:

```bash
npx prisma migrate deploy
npx prisma db seed
```

4. Run the app:

```bash
npm run dev
```

## Deployment

The Docker entrypoint runs Prisma migrations and seed data before starting Next.js. Set `DATABASE_URL` in Dokploy to the internal PostgreSQL connection URL.
