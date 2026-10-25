# Swimore.ai Integration Note — Backend & Frontend Data Layer Map

**Purpose**: Document dynamic data existence for user/admin/partner roles and identify stubbed vs real data for integration planning. No code changes made.

---

## 1. Backend Structure

| File/Dir | Description |
|---|---|
| `backend/cmd/` | Not present; entry via `main.go` |
| `backend/config/` | No config directory found |
| `backend/controller/` | HTTP handlers: `auth_controller.go`, `chat_controller.go`, `model_controller.go`, `admin_controller.go`, `partner_controller.go`, `api_key_controller.go`, `channel_controller.go`, `payment_webhook_controller.go` |
| `backend/middleware/` | Gin middlewares: `authentication.go`, `authorization.go`, `cors.go`, `logging.go`, `quota.go`, `rate_limit.go`, `recovery.go`, `request_id.go`, `request_size.go` |
| `backend/model/swimore/` | Go structs: `ChatMessage`, `ChatCompletionRequest`, `ChatCompletionResponse`, `ChatChoice`, `UsageStats`, `RoutingTrace`, `StreamDelta`, `StreamChoice`, `ChatCompletionStreamCard`, `ModelCard`, `ModelListResponse`, `PlusBenefit`, `PlanComparison`, `UserEntitlement`, `SCUCapacityMetrics` |
| `backend/router/` | Route registration: `public.go`, `user.go`, `admin.go`, `partner.go`, `router.go` |
| `backend/main.go` | App entry: loads `.env`, starts Gin gateway on port 8080, registers all route groups |
| `backend/go.mod` | Dependencies: Gin, UUID, Sonic JSON, goccy-go-json, MongoDB driver (indirect), no direct DB driver |

---

## 2. All HTTP Endpoints

### Public (no auth)
| Method | Path | Handler | Purpose | Role |
|---|---|---|---|---|
| GET | `/health` | — | Health probe | public |
| GET | `/v1/models` | `ModelController.ListModels` | List available models | public |
| GET | `/v1/models/:id` | `ModelController.GetModel` | Get single model spec | public |
| POST | `/api/v1/auth/login` | `AuthController.Login` | Authenticate user, return mock JWT | public |
| POST | `/api/v1/billing/webhook` | `PaymentWebhookController.HandleMidtransWebhook` | Process QRIS / SeaBank payment | public |

### User (authenticated via AuthMiddleware, API key or session JWT)
| Method | Path | Handler | Purpose | Role |
|---|---|---|---|---|
| POST | `/v1/chat/completions` | `ChatController.HandleChatCompletions` | OpenAI-compatible chat completions | user |
| GET | `/api/v1/auth/me` | `AuthController.GetCurrentUser` | Get authenticated user context | user |
| GET | `/api/v1/user/quotas` | `AuthController.GetUserQuotas` | Get pool capacities and reset countdown | user |
| GET | `/api/v1/user/keys` | `ApiKeyController.ListKeys` | List API keys for authenticated user | user |
| POST | `/api/v1/user/keys` | `ApiKeyController.CreateKey` | Generate new API key | user |
| POST | `/api/v1/incidents/report` | `ChannelController.ReportIncident` | Report incident (Discord, Telegram, n8n) | user |

### Partner (no explicit middleware, but partner-facing endpoints)
| Method | Path | Handler | Purpose | Role |
|---|---|---|---|---|
| POST | `/api/v1/partner/register` | `PartnerController.RegisterPartner` | Register new partner with SeaBank account | partner |
| GET | `/api/v1/partner/endpoints` | `PartnerController.ListEndpoints` | List registered partner endpoints | partner |
| POST | `/api/v1/partner/heartbeat` | `PartnerController.Heartbeat` | Synthetic heartbeat probe | partner |

### Admin (auth + AdminOnly middleware)
| Method | Path | Handler | Purpose | Role |
|---|---|---|---|---|
| GET | `/api/v1/admin/overview` | `AdminController.GetSystemOverview` | System telemetry and routing states | admin |

**Auth details**: `AuthMiddleware()` validates Bearer JWT or `sk-sw-*` API key. Session JWT maps to `usr_alex_doe`; API key maps to `usr_prod_backend`. `AdminOnly()` checks `c.GetString("user_role")` — currently role is not set by middleware, so admin endpoints may be accessible without proper role verification (role field is absent from claims).

---

## 3. Auth & Roles

- **Auth scheme**: Bearer JWT or API key (`sk-sw-*`) via `Authorization` header
- **Role concept**: `user`, `admin`, `partner` — `AdminOnly` middleware exists but **does not actually check a role claim**. The `user_role` string returned by middleware is empty by default. Login response includes `is_partner: false` field but no `role` claim.
- **Claims/fields from Login**:
  - `id`: user ID string
  - `name`: full name
  - `email`: email address
  - `plan`: plan tier (`Swimmer Plus`, `Free`, etc.)
  - `is_partner`: boolean
- **Seed user**: Login returns hardcoded mock: `{"id": "usr_882910", "name": "Alex Doe", "email": "alex.doe@example.com", "plan": "Swimmer Plus", "is_partner": false}`. API key auth sets `user_id: "usr_prod_backend"`, `plan_tier: "Swimmer Plus"`.
- **No database**: No direct DB connection in `go.mod` beyond indirect `go.mongodb.org/mongo-driver` dependency. All data is in-memory/hardcoded.

---

## 4. Data Models (Go structs in `backend/model/swimore/`)

| Struct | Key Fields |
|---|---|
| `ModelCard` | `ID`, `Name`, `Provider`, `TierBadge`, `PartnerBadge`, `PriceInput`, `PriceOutput`, `LatencyMs`, `ThroughputTPS`, `UptimePercent`, `ContextWindow`, `Status` |
| `ChatMessage` | `Role`, `Content` |
| `ChatCompletionRequest` | `Model`, `Messages[]`, `Stream`, `Temperature`, `MaxTokens` |
| `ChatCompletionResponse` | `ID`, `Object`, `Created`, `Model`, `Choices[]`, `Usage`, `Trace`, `RoutingTrace` |
| `UsageStats` | `PromptTokens`, `CompletionTokens`, `TotalTokens` |
| `RoutingTrace` | `Path`, `Model`, `Provider`, `LatencyMs`, `SCUConsumed` |
| `UserEntitlement` | `PlanName`, `BasicPoolCap`, `ProPoolCap`, `MaxPoolCap`, `TotalDailyCap`, `ResetsAt` |
| `SCUCapacityMetrics` | `SCUUnitValue`, `PartnerCommittedReqs`, `AvailabilityFactor`, `EffectiveCapacityReqs`, `SCUContribution` |

**DTOs in controllers** (request/response shapes, not Go structs):
- `ApiKeyItem`: `ID`, `Name`, `KeyPrefix`, `CreatedAt`, `LastUsed`
- `CreateApiKeyRequest`: `Name`
- `PartnerRegistrationRequest`: `Handle`, `Model`, `EndpointType`, `InputPrice1M`, `OutputPrice1M`, `SeaBankAccount`
- `IncidentReportRequest`: `Model`, `PartnerHandle`, `IssueType`, `Description`, `Source`

**Database**: None. All data is hardcoded in struct literals (e.g., `ModelController` catalog of 7 models, `ApiKeyController` returns 2 hardcoded keys, `AuthController` returns mock JWT). No Postgres, SQLite, or other persistent store is configured.

---

## 5. Real vs Hardcoded/Static Responses

| Handler | Data Type |
|---|---|
| `ModelController.ListModels` / `GetModel` | **Hardcoded** — 7 model cards embedded in struct literal; no DB query |
| `AuthController.Login` | **Hardcoded** — mock JWT `"swimore-session-jwt-alex-doe"` with fixed user |
| `AuthController.GetCurrentUser` / `GetUserQuotas` | **Hardcoded** — fixed quotas (32/50 basic, 0/0 pro, 14/50 max) |
| `ApiKeyController.ListKeys` / `CreateKey` | **Hardcoded** — 2 static keys; CreateKey generates random `sk-sw-*` but stores only in-memory |
| `PaymentWebhookController.HandleMidtransWebhook` | **Real logic** — computes 1.1% fee from gross amount, returns processed response |
| `ChannelController.ReportIncident` | **Real logic** — formats incident, dispatches to Discord/Telegram/n8n (mock) |
| `PartnerController.RegisterPartner` | **Hardcoded** — returns `PENDING_REVIEW` status, no persistence |
| `PartnerController.ListEndpoints` | **Hardcoded** — 3 static partner entries |
| `PartnerController.Heartbeat` | **Hardcoded** — returns `"HEALTHY"` status |
| `ModelController.GetModel` | **Hardcoded** — catalog lookup from embedded structs |

**Summary**: ~90% of handlers return hardcoded/static responses. Only `PaymentWebhookController` and `ChannelController` have real logic (fee calculation, incident formatting). No handler queries a database.

---

## 6. Frontend Services

| Service | Stub/Implemented | Endpoints Called | Data Shape Expected |
|---|---|---|---|
| `api-client.ts` | **Utility** (not a service per se) | Any fetch endpoint | `RequestInit` + token from `session-store`; returns `Promise<T>` |
| `auth-service.ts` | **N/A** (0 lines) | — | — |
| `billing-service.ts` | **Stub** (0 lines) | `POST /api/v1/billing/webhook` | `{order_id, gross_amount, payment_type, transaction_status}` |
| `chat-service.ts` | **Implemented** | `POST /v1/chat/completions` (streaming) | `{model, messages, stream: true}`; expects SSE streaming response with `{choices[0].delta.content}` chunks; trace shape: `{path, model, latency}` |
| `gateway-service.ts` | **Stub** (0 lines) | — | — |
| `marketplace-service.ts` | **Stub** (0 lines) | — | — |
| `model-service.ts` | **Stub** (0 lines) | — | — |
| `partner-service.ts` | **Stub** (0 lines) | — | — |
| `skills-service.ts` | **Stub** (0 lines) | — | — |
| `storage-service.ts` | **Implemented** | IndexedDB local (no server calls) | `EphemeralSession`, `EncryptedMessagePayload`, `DecryptedMessage`; client-side AES-GCM encryption, 24h TTL, midnight purge |
| `usage-service.ts` | **Stub** (0 lines) | — | — |

**Key**: `chat-service.ts` is the only implemented service — it calls the OpenAI-compatible `/v1/chat/completions` endpoint with Bearer token from session store and handles SSE streaming. All other `.ts` service files are empty stubs (0 lines).

---

## 7. Frontend Stores

| Store | Content | Mocked? |
|---|---|---|
| `chat-store` (zustand) | `activeSessionId: 'session_curl_demo'`, `isPrivateMode: false`, `activeModel: 'Claude 3.5 Sonnet'`, `savedThreads: [3 demo threads]` with hardcoded messages, `currentMessages: [init user+assistant messages]` with hardcoded trace data, `isStreaming: false` | **Yes** — all data is local state + ephemeral storage; no backend sync except `selectSession` which reads from IndexedDB |
| `session-store` (zustand) | `token: 'mock-session-jwt-alex-doe'`, `user: {id: 'usr_882910', name: 'Alex Doe', email: 'alex.doe@example.com', plan: 'Swimmer Plus', isPartner: false}`, `quota: {basicUsed: 32/50, proUsed: 0/0, maxUsed: 14/50, resetsAt: '00:00 WIB'}`, `isAuthenticated: true` | **Yes** — hardcoded mock user/token/quotas |
| `telemetry-store` (zustand) | `modelsHealth: {claude-3.5-sonnet: {latency: 410ms, status: 'Ready', successRate: 98.4%, ...}, deepseek-r1: ..., llama-3.3-70b: ..., gpt-4o: {status: 'Degraded', ...}, mistral-8x7b: {status: 'Down', ...} }`, `isProbing: false`, `lastProbeTime: Date.now()` | **Yes** — hardcoded model health metrics |

**Pages depending on stores**:
- `Chat` page → `chat-store` (recent chats, messages, session select)
- `Keys Dashboard` → `session-store` (user profile, quota), `telemetry-store` indirectly via metric cards
- `Models` page → `telemetry-store` (model health table)
- `Dashboard` → `session-store` + `telemetry-store` (metric cards)
- `Marketplace` → no store dependency (all data hardcoded in component)

---

## 8. Frontend Pages — Mock/Data Blocks Needing Backend

| Page | Mock/Static Data Blocks | Backend Data Needed |
|---|---|---|
| **Home** | Stats band: `12ms avg latency`, `99.99% uptime`, `250+ connected models` (ILLUSTRATIVE markers) | Model catalog (real list), usage stats, latency metrics |
| **Chat** | `currentMessages` in chat-store: init user+assistant messages with hardcoded `routingTrace.path: 'Path A'`, `routingTrace.model: 'Claude 3.5 Sonnet'`, `routingTrace.latency: '410 ms'`; saved threads with hardcoded model IDs; `modelsList` dropdown hardcoded 5 models; incident report hardcodes `@novacompute`; `sendMessage` simulates assistant response locally (`I routed your request to ${activeModel}`) | Real chat completions response (model routing, trace data), user quotas, API key management |
| **Models (Catalog)** | Model cards hardcoded with prices/latency/tier from local `models` array; leaderboard rows hardcoded; connection issues radar hardcoded; `filteredModels` derived from local array; count shows "64 models" but only 7 in local data | Real model directory from `/v1/models` endpoint (currently returns hardcoded 7, but API shape matches) |
| **Model Details** | Pricing structure hardcoded rows (`$0.05`, `$0.09`, `$0.10`, `$0.35`); perf routes hardcoded (`Swimore Route`, `Partner: Nova Compute`); rate limits hardcoded; code snippets hardcoded; trace routing simulator sample data; P50/P95 performance tables hardcoded; availability SVG hardcoded; code examples hardcoded | Model spec from `/v1/models/:id`, real-time telemetry, usage-based pricing |
| **Marketplace** | Partners array hardcoded with 7 entries (names, prices, latency, uptime, usersBought — all illustrative); `SHOWING 6 OF 18 PARTNER LISTINGS · SAMPLE DATA - NAMES AND PRICES ILLUSTRATIVE` footer note; compare samples hardcoded; comparison bars use fixed sample data (`compareSamples` record) | Partner registration endpoints, partner endpoint list, partner model pricing from backend |
| **Pricing** | Tier cards: Free ($0/mo), Swimmer Plus + Partner ($9/mo) — hardcoded; volume slider illustrative; QRIS modal simulate payment to `/api/v1/billing/webhook`; gross sales formula `Math.round(tokenVolumeM * 4.24)` (illustrative) | Plan entitlements, quota boundaries, payment processing |
| **Docs** | Code examples hardcoded (cURL, Python, TypeScript, Rust); terminal output sample `✓ 200 OK · Routed to Llama-3.3-70b`; benchmark chips hardcoded (region, active route, policy, est. cost); status bar `Gateway Services Operational`; version `2.4.0-edge` | API reference docs (static, no live data needed) |
| **ApiKeysDashboard** | `keysList: [2 hardcoded keys]` with maskedraw keys, tokens (`1.28M`, `412K`), latency hardcoded (214ms, 188ms); metric telemetry cards hardcoded values (1.78M tokens, 2,846 requests, 37 failed, 18/50 free quota, 1,240 TPM, 11.9 RPM); stacked chart data hardcoded; notifications feed hardcoded (SWIMORE, ANTHROPIC, @novacompute, SWIMORE); keys table columns sourced from hardcoded `keysList`; ping test calls `/health` | Real API key management, per-key usage metrics, latency monitoring |
| **ChatWorkspace** | Recent/saved threads hardcoded (3 demo threads with 2h/1d/2d timestamps); `modelsList` dropdown hardcoded 5+ models; profile shows `Alex Doe` + `SWIMORE PLUS+` hardcoded; `sendMessage` simulates assistant response locally; incident report hardcodes `@novacompute` and `modeldown`; privacy toggle local state only | Real chat completions, user profile from auth, quota from `/api/v1/user/quotas`, key list from `/api/v1/user/keys` |

**Cross-cutting**: All pages use `Navbar` which reads `useSessionStore()` — shows "Alex Doe" + SWIMORE PLUS+ or "Sign In" depending on mock auth state. No page currently fetches live data from backend; everything is bootstrapped from hardcoded state.

---

## 9. Per-Role Dynamic Data Needs (from docs/ role-flow diagrams + backend map)

> Pages already function as static/mockups today — every page renders and its interactions work against hardcoded state. This section lists what each role needs from the backend to go dynamic.

### User (shared login → chat/gateway → marketplace → usage/quota/history)
| Need | Source today | Backend today | Backend missing |
|---|---|---|---|
| Auth session (login, me) | `session-store` hardcoded Alex Doe | `POST /api/v1/auth/login`, `GET /api/v1/auth/me` (hardcoded) | Real user store, role claim |
| Chat completions + routing trace | `chat-store` simulated locally | `POST /v1/chat/completions` (real SSE path, hardcoded responses) | Real upstream routing + trace (path/model/latency/cost) |
| Model catalog (dropdown, /models page) | hardcoded 5-7 models | `GET /v1/models`, `/v1/models/:id` (hardcoded 7) | DB-backed catalog, real prices/latency/uptime |
| Quotas / plan entitlement | `session-store` fixed quotas | `GET /api/v1/user/quotas` (hardcoded) | Real quota tracking + reset |
| API keys (list/create/ping) | hardcoded 2 keys | `GET/POST /api/v1/user/keys` (in-memory) | Persistent keys, per-key usage |
| Usage & billing records (tokens/cost per model) | static metric cards | none | Usage ledger, invoice/reconcile |
| Chat history (upgraded) vs ephemeral (free/private) | IndexedDB client-side | none | Server-side history for paid tier |
| Notifications / incidents | hardcoded feed | `POST /api/v1/incidents/report` (mock dispatch) | Notification feed, incident status |

### Partner (shared login + partner role → channel → test → listing → monitor/billing)
| Need | Source today | Backend today | Backend missing |
|---|---|---|---|
| Partner auth (`is_partner`, role) | hardcoded `isPartner: false` | login returns `is_partner` but no role claim | Real role claim, partner profile |
| Provider channel (add provider/endpoint/credential/models) | none (UI only in marketplace) | `GET /api/v1/partner/endpoints` (3 hardcoded), `POST /api/v1/partner/register` (PENDING_REVIEW) | Channel CRUD + credential storage (never expose secrets), health/test endpoint |
| Connection test (credentials/endpoint/response) | none | none | Test endpoint (sync call to upstream) |
| Marketplace listing (name/models/price/limits/terms) | hardcoded 7 partner cards | none | Listing CRUD + submit-for-review state machine |
| Listing review/approval status | `PENDING_REVIEW` hardcoded | none | Approval workflow + status |
| Usage per user (model/request/time/cost) | static compare data | none | Per-user usage ledger scoped to partner |
| Billing & reconciliation (11% platform fee) | static | `POST /api/v1/billing/webhook` (real fee calc) | Partner payout/billing summary |
| Channel health monitor (latency/errors/availability) | static health cards | `POST /api/v1/partner/heartbeat` (hardcoded HEALTHY) | Heartbeat persistence + health dashboard |
| Maintain listing (update/pause/rotate key) | none | none | Listing update/pause, key rotation |

### Admin (admin role → console → users/partners/listings/billing → audit/notify)
| Need | Source today | Backend today | Backend missing |
|---|---|---|---|
| Admin auth + role check | none (no admin UI) | `AdminOnly` middleware exists but role claim is never set — effectively bypassable | Real role claim + enforced `AdminOnly` |
| System overview | none | `GET /api/v1/admin/overview` (hardcoded) | Live telemetry aggregation |
| User support (accounts, access, direct-billing requests) | none | none | User management endpoints |
| Partner operations (status, billing visibility, payment reminders) | none | none | Partner management endpoints |
| Marketplace governance (review listings, handle reports, suspend) | none | none | Listing review/approve/suspend endpoints |
| Notifications to affected party | none | none | Notification/email dispatch |
| Audit log (who did what, no secrets) | none | none | Audit trail store |
| Platform health (usage, failures, billing status, unresolved issues) | static footer "All systems operational" | `/health` | Health/incident aggregation |

### Cross-cutting backend gaps to make any of this real
1. **Database** — none configured; all data in-memory (go.mod only has indirect mongo driver).
2. **Role claims** — JWT/API-key auth works but `user_role` is never set; `AdminOnly` is a no-op.
3. **Usage ledger** — no per-user/per-model token+cost records exist anywhere.
4. **Persistent keys/channels/listings/history** — all created data is lost on restart.
5. **Frontend services** — 8 of 11 service files are 0-line stubs; stores are hardcoded.

**Suggested mock-first order (no backend changes):** keep pages as-is (they are already functional static/mockups); wire the lowest-risk live endpoints first — `/v1/models` (Models/ModelDetails), `/api/v1/user/keys` (Keys dashboard), `/api/v1/user/quotas` (Pricing/Home/Chat), `/v1/chat/completions` (Chat) — each behind a service call with the current mock as fallback. Partner/admin flows need new endpoints + DB before they can go dynamic.

## Summary & Gaps

- **Backend**: All endpoints are functional but 90%+ return hardcoded/mock data. No persistent database. Auth is middleware-based with JWT/API key support but role check is broken (`AdminOnly` doesn't verify a real role claim).
- **Frontend**: Services are mostly stubs (0 lines). Only `chat-service.ts` and `storage-service.ts` are implemented. All stores contain hardcoded mock data. Every page renders static/illustrative data blocks marked with `ILLUSTRATIVE`, `SAMPLE DATA`, or `SAMPLE` notes.
- **Integration gaps**: 
  - Backend model catalog → frontend Models page
  - Backend auth → frontend auth state and Navbar
  - Backend quotas → frontend quota displays (Home, Pricing, ChatWorkspace)
  - Backend chat completions → frontend ChatWorkspace real routing
  - Partner endpoints → frontend Marketplace partner listings
  - Per-key usage → frontend ApiKeysDashboard metric cards

**Ponytail**: This map identifies many YAGNI gaps — the system is designed as a reference prototype with stubbed data. Real backend integration would require: (1) adding a database (Postgres recommended given `go.mod` already has mongo driver but it's indirect), (2) populating model catalog from DB, (3) implementing real auth claims with role, (4) wiring frontend services to actual endpoints. Minimal viable integration: replace hardcoded model list with `/v1/models` call, replace chat sim with real `/v1/chat/completions` call, replace key store data with `/api/v1/user/keys` call.