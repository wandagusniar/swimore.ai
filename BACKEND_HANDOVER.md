# Swimore.ai — Frontend-to-Backend Handover Note

This document maps everything the frontend (`frontend/`) expects from the Go backend (`backend/`): SPA routing, proxy configuration, auth/role contracts, already-wired API services, and the new endpoints required to make the Partner (`/partner/*`) and Admin (`/admin/*`) consoles fully dynamic.

---

## 1. Running & Serving the Frontend

### Development Proxy (`frontend/vite.config.ts`)
- **Frontend dev server**: `http://localhost:3000` (`npm run dev`)
- **Frontend preview server**: `http://localhost:4173` (`npm run preview`)
- **Backend target**: `http://localhost:8080`
- Vite automatically proxies `/api/*` and `/v1/*` to `http://localhost:8080`.
- Note: `/health` is called directly by `gateway-service.ts` — either add `/health` to the Vite proxy or expose it under `/api/v1/health`.

### Production SPA Fallback
The frontend uses `createBrowserRouter` (HTML5 History API). When serving `frontend/dist` from Go/Gin or Nginx:
1. Match `/api/*`, `/v1/*`, and `/health` to Go handlers first.
2. Serve static assets from `frontend/dist/assets/*` and `frontend/dist/favicon.svg`.
3. **Fallback all other `GET` routes to `frontend/dist/index.html`** so deep links like `/admin/routing` or `/partner/earnings` do not 404 at the HTTP layer.

---

## 2. Complete Frontend Route Map (`frontend/src/routes/router.tsx`)

### Public Routes (No Auth Required)
| Path | Component | Description |
|---|---|---|
| `/` | `HomePage` | Landing page, live mesh telemetry diagram, featured models, pricing preview |
| `/models` | `ModelsCatalog` | Searchable/filterable model directory + health status |
| `/models/:id` | `ModelDetails` | 4-section model spec, route comparison, latency/uptime, code snippets |
| `/pricing` | `PricingMatrix` | Free vs Swimore Plus / VIP plans + Midtrans QRIS / SeaBank checkout modal |
| `/docs` & `/docs/:slug*` | `DocumentationView` | Interactive API docs with icon rail, quickstart steps, and language tabs |
| `/login` | `LoginPage` | Split-panel login (Google/Discord OAuth buttons + email/password + demo role picker) |
| `/signup` | `SignupPage` | Account creation page (Google/Discord + name/email/password) |
| `*` | `NotFoundPage` | Custom 404 page |

### User Routes (Wrapped in `<RequireAuth>`)
Unauthenticated users are redirected to `/login?next=<encoded_path>`.

| Path | Component | Description |
|---|---|---|
| `/chat` | `ChatWorkspace` | Multi-model chat workspace, routing trace badges, Free vs Upgraded history policy |
| `/marketplace` | `PartnerMarketplace` | Browse/compare community & partner compute nodes, register partner node |
| `/dashboard/keys` | `ApiKeysDashboard` | API key CRUD, `/health` ping test, token/request telemetry, incident reporter |

### Partner Console Routes (Wrapped in `<RequireRole role="partner">`)
Requires `user.isPartner === true`. Uses `PartnerLayout` (`SWIMORE AI PARTNER SPACE` sidebar).

| Path | Component | Backend Needs |
|---|---|---|
| `/partner` | `PartnerOverview` | Node status, SCU contribution summary, 24h earnings, active channels |
| `/partner/channels` | `PartnerChannels` | Upstream provider channels CRUD, connection test, health status |
| `/partner/models` | `PartnerModels` | Models exposed by this partner, custom input/output pricing per 1M tokens |
| `/partner/bundles` | `PartnerBundles` | Partner-packaged model bundles & subscription tiers |
| `/partner/quota` | `PartnerQuota` | SCU quota contribution, committed reqs/min, availability factor |
| `/partner/analytics` | `PartnerAnalytics` | Latency P50/P95, token volume, error rates per model/channel |
| `/partner/customers` | `PartnerCustomers` | Subscribed users, per-customer request/token usage & rate limits |
| `/partner/earnings` | `PartnerEarnings` | Gross sales, 11% platform fee split, net IDR payout ledger, SeaBank settlement |
| `/partner/settings` | `PartnerSettings` | Partner handle, SeaBank account number, webhook notifications, key rotation |

### Admin Console Routes (Wrapped in `<RequireRole role="admin">`)
Requires `user.isAdmin === true`. Uses `AdminLayout` (`SWIMORE CONTROL CENTER` sidebar).

| Path | Component | Backend Needs |
|---|---|---|
| `/admin` | `AdminOverview` | Global mesh health, active endpoints, total SCU, routing mode, incident feed |
| `/admin/users` | `AdminUsers` | User list, plan tier overrides (`Free`, `Swimore Plus`, `VIP`, `VIP+`), suspend/ban |
| `/admin/partners` | `AdminPartners` | Approve/reject `PENDING_REVIEW` partner registrations, audit node SLA |
| `/admin/providers` | `AdminProviders` | First-party upstream providers (Anthropic, OpenAI, DeepSeek, etc.) & master keys |
| `/admin/models` | `AdminModelRegistry` | Global model catalog CRUD, tier badges, base pricing, status (`Ready`/`Degraded`/`Down`) |
| `/admin/routing` | `AdminRouting` | Failover rules, Path A/B/C weights, latency threshold circuit breakers |
| `/admin/pools` | `AdminPools` | Daily quota pool limits (`basic`, `pro`, `max`) and 00:00 WIB reset cron |
| `/admin/bundles` | `AdminBundles` | Official platform bundles & promotional tiers |
| `/admin/analytics` | `AdminAnalytics` | Platform-wide token throughput, revenue, cache hit rates |
| `/admin/logs` | `AdminLogs` | Zero-plaintext routing & audit logs (request ID, path, latency, status code) |
| `/admin/security` | `AdminSecurity` | Rate-limit rules, IP blocks, API key revocation, anomaly alerts |
| `/admin/settings` | `AdminSettings` | Global platform fee %, incident webhook channels (Discord/Telegram/n8n), maintenance mode |

---

## 3. Auth, Session & Role Contract

### Frontend State (`frontend/src/store/session-store.ts`)
The frontend starts **logged out** (`user: null, token: null, isAuthenticated: false`).

```ts
export type PlanTier = 'Free' | 'Swimore Plus' | 'VIP' | 'VIP+'

export interface UserProfile {
  id: string
  name: string
  email: string
  plan: PlanTier
  isPartner: boolean
  isAdmin?: boolean
  avatarUrl?: string
}
```

### What Backend Must Change for Auth
1. **Include `is_admin` in `/api/v1/auth/login` and `/api/v1/auth/me` responses**:
   ```json
   {
     "token": "<jwt>",
     "user": {
       "id": "usr_882910",
       "name": "Alex Doe",
       "email": "alex@swimore.ai",
       "plan": "Swimore Plus",
       "is_partner": false,
       "is_admin": false
     }
   }
   ```
   *(Note: Backend currently returns `"Swimmer Plus"` in one controller — normalize to `"Swimore Plus"` to match the frontend `PlanTier` union).*
2. **Enforce Role Claims in Middleware (`backend/middleware/authorization.go`)**:
   - Set `c.Set("user_role", ...)` inside `AuthMiddleware()` from the JWT claim so `AdminOnly()` actually blocks non-admin tokens, and add a `PartnerOnly()` middleware for `/api/v1/partner/*` write routes.
3. **Wire LoginPage & SignupPage to Live Auth**:
   - Currently `LoginPage.tsx` and `SignupPage.tsx` use a cosmetic role picker (`user` / `partner` / `admin`) for frontend previewing (`// ponytail: mock login`).
   - Once real DB auth is ready, replace `signIn(role)` in `LoginPage.tsx` with `await loginWithBackend(email, password)` from `useSessionStore`, and add `POST /api/v1/auth/signup` + OAuth redirect handlers (`/api/v1/auth/oauth/google`, `/api/v1/auth/oauth/discord`).

---

## 4. Already-Wired Frontend Services (`frontend/src/services/`)

All service calls go through `apiClient` (`src/services/api-client.ts`), which automatically attaches `Authorization: Bearer <token>` from `useSessionStore` and falls back gracefully to local mock state if the backend is offline.

| Service File | Method & Endpoint | Request Payload | Expected Response Shape |
|---|---|---|---|
| `auth-service.ts` | `POST /api/v1/auth/login` | `{ email, password }` | `{ token: string, user: { id, name, email, plan, is_partner, is_admin? } }` |
| `auth-service.ts` | `GET /api/v1/auth/me` | — | `{ id, name, email, plan, is_partner, is_admin? }` |
| `auth-service.ts` | `GET /api/v1/user/quotas` | — | `{ plan, pools: { basic: {used, limit}, pro: {used, limit}, max: {used, limit} }, resets_at }` |
| `chat-service.ts` | `POST /v1/chat/completions` | `{ model, messages: [{role, content}], stream: true }` | OpenAI SSE stream (`data: {"choices":[{"delta":{"content":"..."}}]}` + `data: [DONE]`) |
| `model-service.ts` | `GET /v1/models` | — | `{ object: "list", data: BackendModelCard[] }` |
| `model-service.ts` | `GET /v1/models/:id` | — *(Note: frontend normalizes `claude-3-5` → `claude-3.5`, etc.)* | `BackendModelCard` |
| `usage-service.ts` | `GET /api/v1/user/keys` | — | `{ keys: [{ id, name, key_prefix, created_at, last_used?, secret_key? }] }` |
| `usage-service.ts` | `POST /api/v1/user/keys` | `{ name: string }` | `{ id, name, key_prefix, created_at, secret_key }` |
| `partner-service.ts` | `GET /api/v1/partner/endpoints` | — | `{ endpoints: [{ handle, model, type: 'TYPE_A'\|'TYPE_B'\|'TYPE_C', status, latency_ms, uptime, scu_allocated }] }` |
| `partner-service.ts` | `POST /api/v1/partner/register` | `{ handle, model, endpoint_type, input_price_1m, output_price_1m, seabank_account }` | `{ message, handle, model, status, seabank_account, tax_platform_fee, created_at }` |
| `partner-service.ts` | `POST /api/v1/partner/heartbeat` | `{}` | `{ status: string, timestamp: number }` |
| `billing-service.ts` | `POST /api/v1/billing/webhook` | `{ order_id, gross_amount, payment_type, transaction_status, signature_key? }` | `{ order_id, status, payment_type, gross_amount_idr, platform_fee, platform_fee_idr, net_amount_idr, split_action, plan_entitlement }` |
| `gateway-service.ts` | `GET /health` | — | `200 OK` |
| `gateway-service.ts` | `POST /api/v1/incidents/report` | `{ model, partner_handle?, issue_type, description?, source? }` | `{ incident_id, model, partner_handle, status, dispatched_channels, failover_action, timestamp }` |
| `gateway-service.ts` | `GET /api/v1/admin/overview` | — | `{ system, active_endpoints, total_scu, routing_mode, log_policy, incident_channels }` |

---

## 5. Chat Privacy & Storage Architecture

The frontend enforces two distinct chat storage modes in `ChatWorkspace.tsx` and `storage-service.ts`:

1. **Free Tier (`user.plan === 'Free'`)**:
   - **Temporary Chat Only**: Sidebar chat history is locked/disabled with an upgrade prompt.
   - Backend must **not** persist chat threads for `Free` users.
2. **Upgraded Tiers (`Swimore Plus`, `VIP`, `VIP+`)**:
   - **Opt-in Saved Chats**: Users can toggle Private Mode vs Saved History.
   - **Private / Ephemeral Mode (`storage-service.ts`)**: Uses browser IndexedDB (`swimore_ephemeral_v1`) encrypted with an in-memory Web Crypto AES-GCM 256-bit key, 24-hour TTL, automatic 00:00 WIB purge sweep, and a Zero-Log Scrub killswitch. Zero plaintext is sent to the server for storage.
   - **Server-Side History (To Be Built)**: When Private Mode is OFF on an upgraded plan, the backend should expose `GET /api/v1/user/chats`, `POST /api/v1/user/chats`, and `DELETE /api/v1/user/chats/:id` along with per-message routing metadata (`path`, `model`, `latency_ms`).

---

## 6. Checklist of Missing Backend Endpoints to Implement Next

### Priority 1 — Core User & Auth
- [ ] `POST /api/v1/auth/signup` — create account, return JWT + `UserProfile`
- [ ] `DELETE /api/v1/user/keys/:id` — revoke an API key (`ApiKeysDashboard`)
- [ ] `GET /api/v1/user/usage` — per-key and daily token/request telemetry (`ApiKeysDashboard`)
- [ ] `GET / POST / DELETE /api/v1/user/chats` — opt-in saved threads for upgraded plans (`ChatWorkspace`)

### Priority 2 — Partner Console (`/api/v1/partner/*`)
- [ ] `GET / POST / PATCH / DELETE /api/v1/partner/channels` — manage upstream provider URLs & encrypted credentials (`PartnerChannels`)
- [ ] `POST /api/v1/partner/channels/:id/test` — live upstream ping/completion probe (`PartnerChannels`)
- [ ] `GET / PUT /api/v1/partner/models` — toggle exposed models & set per-1M pricing (`PartnerModels`)
- [ ] `GET / POST / PATCH /api/v1/partner/bundles` — partner compute bundles (`PartnerBundles`)
- [ ] `GET / PUT /api/v1/partner/quota` — SCU allocation & availability commitments (`PartnerQuota`)
- [ ] `GET /api/v1/partner/analytics` — time-series latency, requests, and error breakdown (`PartnerAnalytics`)
- [ ] `GET /api/v1/partner/customers` — active subscribers & usage per customer (`PartnerCustomers`)
- [ ] `GET /api/v1/partner/earnings` & `POST /api/v1/partner/payouts` — IDR ledger, 11% platform fee breakdown, SeaBank payout trigger (`PartnerEarnings`)
- [ ] `GET / PATCH /api/v1/partner/settings` — partner profile, SeaBank account, webhook URL (`PartnerSettings`)

### Priority 3 — Admin Console (`/api/v1/admin/*`)
- [ ] `GET / PATCH /api/v1/admin/users` — list users, change plan tier, suspend (`AdminUsers`)
- [ ] `GET / PATCH /api/v1/admin/partners` — approve/reject/suspend partner nodes (`AdminPartners`)
- [ ] `GET / POST / PATCH /api/v1/admin/providers` — manage core upstream providers (`AdminProviders`)
- [ ] `POST / PATCH / DELETE /api/v1/admin/models` — mutate global model catalog (`AdminModelRegistry`)
- [ ] `GET / PUT /api/v1/admin/routing` — configure Path A/B/C weights & failover rules (`AdminRouting`)
- [ ] `GET / PUT /api/v1/admin/pools` — configure Basic/Pro/Max pool caps (`AdminPools`)
- [ ] `GET / POST / PATCH /api/v1/admin/bundles` — manage platform bundles (`AdminBundles`)
- [ ] `GET /api/v1/admin/analytics` — global throughput & revenue metrics (`AdminAnalytics`)
- [ ] `GET /api/v1/admin/logs` — zero-plaintext request trace & audit log stream (`AdminLogs`)
- [ ] `GET / PUT /api/v1/admin/security` — rate limits, IP blocks, key revocations (`AdminSecurity`)
- [ ] `GET / PUT /api/v1/admin/settings` — global fee %, alert channels, maintenance switches (`AdminSettings`)
