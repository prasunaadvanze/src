# Customer Quote (Next.js 15) — Developer Guide

This document explains the code **step-by-step** so you can confidently present and elaborate the project.

## What this project is

A **schema-driven customer quote frontend** built with:

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **PWA** basics (manifest + service worker)

The UI is **not a Blazor copy**. We used the legacy Blazor project only to extract **API flows, models, and behavior**, then rebuilt the frontend cleanly.

## Quick start (frontend only)

1. Go to:
   - `src/customer-nextjs/`
2. Set API base URL:
   - Copy `.env.example` → `.env.local`
   - Ensure `NEXT_PUBLIC_API_BASE_URL` points to the hosted API
3. Run:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

---

## Folder map (what lives where)

```
src/customer-nextjs/
├── app/                    # Next.js App Router entrypoints
│   ├── layout.tsx          # Navbar/Footer, fonts, SW registration
│   ├── page.tsx            # Renders the quote experience
│   └── globals.css         # Tailwind + global styles
├── components/
│   ├── layout/             # Navbar + Footer
│   ├── quote/              # Quote flow composition + sections
│   ├── form/               # Schema-driven form system
│   ├── ui/                 # Shared UI primitives (Card, Button, etc.)
│   └── pwa/                # SW registration component
├── hooks/                  # Stateful client logic (API-driven flow)
├── services/               # API client + endpoint wrappers
├── types/                  # TypeScript interfaces (API contracts)
├── utils/                  # Validation + answer serialization + flow helpers
└── public/                 # PWA assets: manifest, sw.js, icons, images
```

---

## API endpoints used (customer quote journey)

These are the only endpoints required for the customer quote experience:

- **Start quote**
  - `POST /api/quote/start`
  - Returns a `QuoteStepResponse` containing the initial schema (typically `risk-triage`)
- **Submit step**
  - `POST /api/quote/next`
  - Returns either:
    - a **new schema** (continue questions), or
    - a **final quote** (summary screen)
- **Fetch schema (optional)**
  - `GET /api/schema/{stepId}`
  - Used mainly for caching/offline and if you ever want to prefetch

Implementation mapping:

- `services/quoteApi.ts` contains `startQuote()` and `submitStep()`
- `services/apiClient.ts` is the reusable fetch client (timeout/retry/errors)

---

## Data contracts (TypeScript types)

All key models are defined in:

- `types/quote.ts`

Important interfaces:

- `FormSchema`: `{ stepId, title, fields }`
- `FormField`: `{ type, name, label, options?, required? }`
- `QuoteStepResponse`: `{ quoteId, workflowName, journey, schema, quote, progress }`
- `StartQuoteRequest`, `SubmitStepRequest`

### Supported schema field types

The dynamic renderer supports:

- `text`
- `number`
- `dropdown`
- `radio`
- `checkbox`
- `date`

If the backend adds a new field type, the frontend will currently render it as `text` (safe fallback) unless we extend `FieldRenderer`.

---

## Quote journey (step-by-step) — how the code runs

### Step 0: Page loads (Next.js entry)

- `app/page.tsx` renders:
  - `components/quote/QuoteExperience.tsx`

### Step 1: Start Quote (API-driven)

Where it happens:

- `components/quote/QuoteExperience.tsx`
  - calls `useQuoteFlow(true)` which **auto-starts** on load

Core logic:

- `hooks/useQuoteFlow.ts`
  - `useEffect()` calls `startQuote()` if `autoStart` is true
  - `startQuote()` calls `quoteApi.startQuote({})`

API call:

- `services/quoteApi.ts`
  - `startQuote()` → `POST /api/quote/start`

Result:

- State receives a `QuoteStepResponse`
  - If `response.schema` exists → UI goes to **questions**
  - If `response.quote` exists → UI goes to **summary**

### Step 2: Render dynamic questions (schema-driven)

Where the schema is rendered:

- `components/form/DynamicFormRenderer.tsx`
  - Receives `schema: FormSchema`
  - Builds initial answer state with:
    - `utils/answers.ts` → `createInitialAnswers(schema)`

How each field is rendered:

- `components/form/FieldRenderer.tsx`
  - Switches on `field.type` and returns the correct input component
  - For options-based fields, uses `field.options`

Validation:

- `utils/validation.ts` → `validateSchema(schema, values)`
  - Checks `required` fields (basic validation)

### Step 3: Submit answers (continue workflow)

When user clicks **Continue**:

- `DynamicFormRenderer` calls `onSubmit(values)`
- `QuoteExperience` passes `onSubmit` as:
  - `submitAnswers(schema, values)`

Submit logic:

- `hooks/useQuoteFlow.ts`
  - Converts UI values → API payload:
    - `utils/answers.ts` → `serializeAnswers(schema, values)`
  - Calls `quoteApi.submitStep({ quoteId, stepId, answers })`

API call:

- `services/quoteApi.ts`
  - `submitStep()` → `POST /api/quote/next`

Result:

- If backend returns `schema` → another question step is shown
- If backend returns `quote` → UI transitions to **Quote Summary**

### Step 4: Quote Summary

Rendered by:

- `components/quote/QuoteSummary.tsx`
  - Displays premium + message (+ mock checks if present)

---

## Progress indicator (presentation-friendly)

Shown near the top of the quote section:

- `components/ui/StepProgress.tsx`

Inputs come from:

- `response.progress` (0–100, from backend)
- derived “visual step index” (start/questions/summary):
  - `utils/flow.ts` → `getVisualStepIndex(phase)`

This creates a smooth “multi-step” feel without hardcoding routes.

---

## Error handling + retry (what happens on failures)

Centralized in:

- `services/apiClient.ts`

Behavior:

- Adds a timeout (AbortController)
- Retries on retryable conditions (timeouts, 429, 5xx, etc.)
- Throws `ApiClientError` with `{ status, retryable }`

Displayed in UI:

- `components/quote/QuoteExperience.tsx`
  - Shows error card with **Retry** when `retryable` is true

---

## Branding/UI layout (Navbar + hero + footer)

Main layout:

- `app/layout.tsx`
  - Renders:
    - `Navbar`
    - page content
    - `Footer`
    - service worker registration

Branding assets:

- Logo: `public/images/gainsco-logo.png`
- Hero illustration: `public/images/hero-automotive.svg`

---

## PWA support (installable + offline schema caching)

PWA files:

- `public/manifest.json` (install metadata)
- `public/sw.js` (service worker)
- `public/offline.html` (offline fallback)

Registration:

- `components/pwa/ServiceWorkerRegistration.tsx`
  - calls `pwa/registerServiceWorker.ts`

Offline behavior:

- App shell cached (basic)
- `GET /api/schema/*` cached for offline access (best-effort)

---

## What’s working vs pending (for presentation)

### Working

- Next.js customer quote UI runs independently
- End-to-end quote flow works against hosted API
- Schema-driven question rendering (no hardcoded fields)
- Basic validation, loading states, progress UI
- PWA basics + offline schema caching
- GAINSCO branding (navbar/logo/hero/footer)

### Pending / not completed

- Advanced validations (min/max, regex, cross-field rules, conditional logic)
- True offline submissions (queue POST requests & resume)
- Accessibility polish pass (full keyboard/ARIA audit)
- Analytics/telemetry, production monitoring hooks
- Replace placeholder/generated icons with real branded icons (if required)

---

## “How to explain it” (simple script)

1. **This is a Next.js customer quote app** that connects to an API.
2. The API returns a **schema** describing what questions to ask.
3. The UI renders the schema dynamically and submits answers.
4. The backend routes FAST/SLOW and eventually returns the final quote.
5. The frontend is reusable because new questions/journeys can be added by changing backend schema/rules, not rewriting screens.

