# Gainsco Customer Quote — Next.js 15

Production-oriented Next.js frontend for the Quote-to-Bind customer journey. Logic is extracted from the Blazor `QuoteToBind.Client` and `QuoteToBind.Api` projects; UI is rebuilt with App Router, TypeScript, and Tailwind CSS.

## Architecture

```
src/customer-nextjs/
├── app/                 # Next.js 15 App Router
├── components/
│   ├── form/            # Schema-driven dynamic forms
│   ├── ui/              # Buttons, cards, progress, skeletons
│   ├── quote/           # Quote flow shell
│   └── pwa/             # Service worker registration
├── services/            # API client + quote endpoints
├── hooks/               # useQuoteFlow (API-driven state machine)
├── types/               # TypeScript contracts (mirrors API)
├── utils/               # Validation, answers, flow helpers
└── pwa/                 # SW registration helper
```

## Quote flow (API-driven)

| Phase | Trigger | API |
|-------|---------|-----|
| Start | `POST /api/quote/start` | Creates quote, returns `risk-triage` schema |
| Questions | `POST /api/quote/next` | Submits answers; server routes FAST/SLOW or binds |
| Summary | Response includes `quote` | Premium + mock checks |

Routing rules (server): age > 25 and accidents == 0 → **FAST**, else **SLOW**.

## Environment

Copy `.env.example` to `.env.local`:

```bash
NEXT_PUBLIC_API_BASE_URL=https://adquotetobindapi-dacqekc4e8fchac3.centralindia-01.azurewebsites.net
```

For local API development:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:5273
```

## Run

```bash
cd src/customer-nextjs
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## PWA

- `public/manifest.json` — installable app metadata
- `public/sw.js` — caches app shell and **schema** GET responses (`/api/schema/*`) for offline use
- Register icons under `public/icons/` (`icon-192.png`, `icon-512.png`) for full install support

Generate placeholder icons:

```bash
node scripts/generate-icons.mjs
```

## Demo paths

- **Fast journey:** Driver Age = 30, Accident History = 0
- **Slow journey:** Driver Age = 22, Accident History = 1

## Field types (schema renderer)

`text`, `number`, `dropdown`, `radio`, `checkbox`, `date` — all rendered from `FormSchema.fields` with no hardcoded question UI.
