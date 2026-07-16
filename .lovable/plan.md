
## Goal

Expose this app as an OAuth-protected MCP server so ChatGPT, Claude, Cursor, etc. can connect as a signed-in Seraphyn Care user and call tools that read/write that user's data.

## Prerequisites to enable

The site currently has no backend or user accounts. OAuth-protected MCP requires all of:

1. **Lovable Cloud** — provisions the database, auth server, and edge function runtime.
2. **Email + Google sign-in** — so end users have accounts to authorize MCP clients as.
3. **`/login` + `/signup` pages** — with a `next` param that returns users to the consent URL after auth (required so "Add to ChatGPT / Claude" completes).
4. **OAuth 2.1 authorization server** — activated via `supabase--configure_oauth_server` (enables dynamic client registration).
5. **`/.lovable/oauth/consent` route** — approve/deny screen using `supabase.auth.oauth`.

## Tools the MCP server will expose

Chosen to match this site's actual funnel (assessment + book + strategy call). All are per-user and enforce RLS as the signed-in user.

| Tool | Purpose |
| --- | --- |
| `submit_assessment` | Save a Staffing Stability Assessment result (org name, role, scores, financial impact) for the signed-in user. |
| `list_my_assessments` | Return the signed-in user's saved assessments. |
| `get_assessment` | Fetch one assessment by id (RLS-scoped to owner). |
| `submit_lead` | Record a lead-capture entry (book page / consulting inquiry) tied to the signed-in user. |
| `get_book_info` | Return static info about *The Million Dollar Nurse* (title, author, chapters, buy link) — read-only. |
| `get_booking_link` | Return the Calendly strategy-call URL. |

## Database (public schema, with GRANTs + RLS)

- `assessments` — `id, user_id, org_name, role, retention_rate, turnover_rate, vacancy_rate, overtime_pct, stability_score, risk_level, financial_impact_cents, payload jsonb, created_at`
- `leads` — `id, user_id, source, name, email, org_name, role, bed_count, message, created_at`

Each table: `GRANT` to `authenticated` + `service_role`, RLS enabled, policies scoping every op to `auth.uid() = user_id`.

## MCP files

- `src/lib/mcp/index.ts` — `defineMcp` with `auth.oauth.issuer({ issuer: https://<ref>.supabase.co/auth/v1, acceptedAudiences: "authenticated" })` (issuer built from `VITE_SUPABASE_PROJECT_ID`).
- `src/lib/mcp/tools/submit-assessment.ts`, `list-my-assessments.ts`, `get-assessment.ts`, `submit-lead.ts`, `get-book-info.ts`, `get-booking-link.ts`.
- `vite.config.ts` — add `mcpPlugin()` from `@lovable.dev/mcp-js/stacks/supabase/vite`.
- Plugin emits `supabase/functions/mcp/index.ts` at build time.

## App routes to add

- `/login`, `/signup` — email/password + Google, both honor `?next=` for password sign-in, `emailRedirectTo`, and Google `redirect_uri`.
- `/.lovable/oauth/consent` (file: `src/pages/OAuthConsent.tsx`) — reads `authorization_id`, calls `supabase.auth.oauth.getAuthorizationDetails / approveAuthorization / denyAuthorization`, redirects back to the returned `redirect_url`. Styled to match the Seraphyn Care design system.

## Steps

1. Enable Lovable Cloud.
2. Run migration (tables + GRANTs + RLS).
3. Enable Google auth provider (email/password is on by default).
4. Add `/login`, `/signup`, `/.lovable/oauth/consent` routes.
5. Install `@lovable.dev/mcp-js` + `zod`, add `mcpPlugin()` to `vite.config.ts`.
6. Write `defineMcp` + 6 tool files.
7. Call `supabase--configure_oauth_server` to activate OAuth 2.1 + DCR.
8. Extract MCP manifest, deploy the `mcp` edge function.
9. Confirm published-URL endpoint `https://<ref>.supabase.co/functions/v1/mcp` is reachable and reports the tools.

## What the user does after this ships

In the More → Agent integrations panel (or by pasting the MCP URL into ChatGPT/Claude): click Add, sign in with their Seraphyn Care account, approve the consent screen, and the tools become callable.

## Confirm before I start

- OK to add full email + Google auth to this currently-anonymous marketing site? (Required for OAuth-gated MCP.)
- OK with the six tools above, or do you want a different tool set?
