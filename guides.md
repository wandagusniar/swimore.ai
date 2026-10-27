# Swimore.ai — Frontend Guide

How to build the Swimore.ai frontend. The product's shape comes from the design/flow assets at the repo root; the React app in `frontend/` is the current implementation.

## Sources of truth

| File | What it defines |
|---|---|
| `ui-ux/SWIMORE AI - Public Home & Routing Gateway (Refined Ocean).png` | Visual spec for the public home page (prompt card, live routing diagram, navbar) |
| `docs/swimoreai_role_flows_overview 1.png` | Three role journeys on one shared login: User, Partner, Admin |
| `docs/swimoreai_user_flow_redesigned 1.png` | User flow: Free = temporary chat, no history storage; Upgraded = opt-in saved chats; usage/billing metadata always recorded, raw prompts never |
| `docs/swimoreai_partner_flow_redesigned 1.png` | Partner flow: add provider channel → test → create listing → review/approval → live → monitor/track/billing |
| `docs/swimoreai_admin_flow_redesigned 1.png` | Admin flow: admin console → users/partners/listings/billing/notifications → verify & audit → notify → platform health |
| `scratch/swimoreai_system_architecture 1.png` | 5-layer logical architecture (Experience, Identity, Services, External providers, Data records) |
| `scratch/new-api-repository-architecture 1.png` | Backend is New-API-based (Go + Gin); the frontend calls it via OpenAI-compatible endpoints |

Privacy is a product feature, not an afterthought: no conversation content on the server by default; free chats are client-side ephemeral only; usage metadata (user/channel/model/tokens/timestamp) is always recorded for billing.

## Stack & commands (`frontend/`)

- React 18 + TypeScript + Vite 6 + Tailwind 3 + Zustand 5 + react-router 6 + lucide-react.
- `npm run dev` → **http://localhost:3000** (set in `vite.config.ts`; README's :5173 is stale). `npm run preview` → :4173.
- `npm run build` = `tsc --noEmit && vite build` — type errors fail the build. No `lint`/`test` script (`eslint.config.js` exists but is not wired into scripts; no test framework).
- Vite proxies `/api` and `/v1` → `http://localhost:8080` (Go backend). Always call relative `/v1/...` paths; the backend must be running for chat streaming.
- Crypto sanity check: `node test_layer2.mjs` (AES-GCM-256 roundtrip used by `storage-service`).

## Current implementation state

- Built: `HomePage` (full landing page per the Refined Ocean mockup: hero prompt card, live routing diagram with telemetry footer, stats band, join cards, featured row, 6 feature cards, FAQ accordion, CTA panel, footer), `ChatWorkspace` (SSE streaming), `ModelsCatalog`/`ModelDetails`, `PartnerMarketplace`, `PricingMatrix`, `ApiKeysDashboard`, `Navbar`.
- Feature data is **static/inline** in components (e.g. `const models = [...]` in `ModelsCatalog`). Most `services/*.ts` are empty stubs — only `api-client.ts`, `chat-service.ts`, `storage-service.ts` have logic.
- Stubs waiting to be built per the `docs/` role flows: `layouts/` (Public/User/Partner/Admin/Auth — all empty), `app/providers/*`, `app/config/app-config.ts`, `routes/{user,partner,admin,public}-routes.tsx` (all empty). `router.tsx` is a flat public-only router — the role-based journeys are NOT implemented yet.
- `/docs` route: `router.tsx` imports `@/features/docs/DocumentationView` — currently a minimal placeholder page (created to unblock the build); full docs page still to be designed. Build verified passing (`tsc --noEmit && vite build`).
- Auth is mocked: `session-store` boots signed-in as "Alex Doe" (Swimore Plus, `isAuthenticated: true`) with quota pools (basic/pro/max); `api-client` and `chat-service` attach `Authorization: Bearer <token>` (or `'anon'`).

## Design system ("Refined Ocean", dark only)

- Tokens in `tailwind.config.js`: bg `#060808`, surface `#0A0C0E`, card `#121619`, border `#22272B`; brand teal `#00E599` (primary accent), cyan `#38BDF8`, amber `#E5A93C`, red `#EF4444`, muted text `#98A0A8`, text `#F5F5F2`.
- Fonts: Inter (UI), Instrument Serif italic (display headlines), JetBrains Mono (uppercase `tracking-widest` labels/tags).
- Existing components use raw arbitrary values (`bg-[#060808]`) instead of theme tokens — match that style; don't introduce a class abstraction layer.
- Recurring patterns: rounded-2xl cards with 1px `#22272B` borders, small mono uppercase section tags with a teal dot, white pill primary CTAs, `#0A0C0E` floating navbar with backdrop blur.
- `index.css` (imported in `main.tsx`) sets dark color-scheme + scrollbars; `styles/globals.css` is an unused duplicate — don't import it.
- Design exports for exact-match work: `frontend/public/designs/*.svg` + `designs/png/` (one export per screen), and `components/layout/ExactDesignViewer.tsx` renders an SVG 1:1. Recreate screens in markup, not by embedding the images.

## Flows to preserve

- Chat: `chat-service.streamChatCompletion` POSTs `/v1/chat/completions` with `stream: true`, parses SSE `data:` lines + `data: [DONE]`, ignores keep-alives, reports trace `{path, model, latency}` on done.
- Private chats: "Save chat history" toggle → `privateMode`; `storage-service` = IndexedDB, AES-GCM-256, 24h TTL, midnight (00:00 WIB) purge — zero plaintext to server. Free users get no history (per the docs flow).
- New screens: build per the matching `public/designs/*.svg` + the role flow in `docs/`; keep data plumbing in the service layer (`services/*`) so stubs can be swapped for backend calls without touching components.
