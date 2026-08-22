# Wicks

One landing page per approved Wick day. Home (`/`) lists what has shipped; each day lives on its own route.

| Day | Route | What it is |
| --- | --- | --- |
| Casilla | [`/casilla`](./app/casilla) | Before Modelo 303, flag invoices that should not be 21% Spanish domestic VAT |

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Waitlist (`POST /api/waitlist`)

Body: `{ "email": "you@example.com" }`.

Emails are appended as JSON Lines:

- **Local:** `data/waitlist.jsonl`
- **Vercel:** `/tmp/casilla-waitlist.jsonl` (writable in serverless, but **ephemeral** — gone when the instance recycles)

Override the path with `WAITLIST_PATH`. The API only returns success after a real disk write; it does not pretend to store emails.

## Stack

Next.js App Router, TypeScript, Tailwind CSS. Deploy on Vercel as a standard Next.js app.
