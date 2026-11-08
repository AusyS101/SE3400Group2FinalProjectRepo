# SE3400 Group 2 Final Project Prototype

A prototype for our automated workout routine web app. Work in progress.

**Live Site:** https://se-3400-group2-final-project-repo.vercel.app/

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS; Neon Postgres when connected.

**CONTRIBUTORS:** Anthony Rubio Vasquez, Austin Sundloff, Drew Larson.

## Run locally

Install Node.js 22+, then run:

```sh
npm install
npm run dev
```

Open http://localhost:3000. No database setup is needed; data saves locally to `.data/console.json`.

## Connect a database later

Create a Neon Postgres database and copy its pooled connection string. Add it to `.env.local` in the project root:

```dotenv
DATABASE_URL=your-neon-pooled-connection-string
```

Restart the app. Database tables initialize automatically; existing local data does not transfer.

For hosting, set `DATABASE_URL` in the host's environment settings and redeploy. Never commit `.env.local` or database credentials.
