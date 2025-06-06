# SOURCE_FILES_NEEDED.md  
_Comprehensive reference checklist for finishing the **BlueAssets** backend_

> Use this document as the single-source “to-do” list.  
> Every path below is **relative to the project root** `blue-assets-backend/`.

---

## 1 · Top-level files (configuration & docs)

| File | Purpose / Required contents |
|------|-----------------------------|
| **package.json** | Dependency list, npm scripts (`dev`, `build`, `seed`, `prisma:*`, etc.). |
| **tsconfig.json** | Compiler options & path aliases (`@controllers/*`, `@services/*`, …). |
| **.env.example** | All environment variables (DB, JWT, email, Redis, etc.). |
| **README.md** | Project overview, quick-start, scripts, API summary. |
| **SETUP.md** | Step-by-step local setup & deployment guide. |
| **.gitignore** | Ignore `node_modules`, `dist/`, `.env`, uploads, etc. |
| **LICENSE** | MIT (or chosen license). |

---

## 2 · Database layer (`prisma/`)

| File | What to include |
|------|-----------------|
| **schema.prisma** | • Datasource (`sqlite` dev, `postgresql` prod)  <br>• Enums (`UserRole`, `AssetStatus`, …)  <br>• 7 core models: `User`, `Organization`, `Asset`, `AssetRequest`, `MaintenanceSchedule`, `AuditLog`, `SystemSetting`, `Notification`  <br>• Relations, indexes, defaults. |
| **seed.ts** | Script that: 1) creates one org, 2) seeds SuperAdmin/Admin/Employee, 3) inserts sample assets, maintenance, settings. |

---

## 3 · Application entry (`src/index.ts`)

- Express app bootstrapping (helmet, cors, compression, rate-limit).
- Route mounting (`/auth`, `/admin`, `/superadmin`, `/employee`).
- WebSocket (`socket.io`) server & Redis adapter.
- Queue initialization (Bull) & job processors.
- Graceful shutdown (SIGINT/SIGTERM, Prisma & Redis disconnect, queue close).

---

## 4 · Routes layer (`src/routes/`)

| Route file | Endpoint groups to export |
|------------|---------------------------|
| **auth.routes.ts** | `/auth/login`, `/logout`, `/refresh`, `/me`, `/reset-password`, `/change-password` |
| **admin.routes.ts** | `/admin/dashboard-stats`, CRUD `/assets`, CRUD `/users`, GET/PUT `/asset-requests`, CRUD `/maintenance-schedules`, `/reports/generate`, `/analytics` |
| **superadmin.routes.ts** | CRUD `/organizations`, `/system-stats`, `/audit-logs`, GET/PUT `/system-settings`, `/users` (create admin), `/security-events`, `/license-usage` |
| **employee.routes.ts** | `/employee/my-assets`, CRUD `/asset-requests`, `/asset-history`, `/issues`, `/activity`, `/return-requests` |

_All route files import validation schemas and wrap controller handlers with middleware._

---

## 5 · Controllers layer (`src/controllers/`)

| Controller | Core methods to implement |
|------------|---------------------------|
| **auth.controller.ts** | `login`, `logout`, `refreshToken`, `getCurrentUser`, `requestPasswordReset`, `changePassword` |
| **admin.controller.ts** | Asset CRUD, User CRUD, Dashboard stats, Request approval, Maintenance CRUD, Report generation, Analytics |
| **superadmin.controller.ts** | Organization CRUD, System stats, Audit logs, Settings CRUD, Create admin user, Security events, License usage |
| **employee.controller.ts** | `getMyAssets`, Request CRUD, `getAssetHistory`, `reportIssue`, `getActivity`, `createReturnRequest` |

Each controller uses Prisma & services, returns JSON (`success`, `data`).

---

## 6 · Middleware layer (`src/middleware/`)

| File | Responsibilities |
|------|------------------|
| **auth.middleware.ts** | Verify JWT, attach `req.user`, RBAC helpers (`superadminOnly`, `adminOrHigher`, etc.). |
| **validation.middleware.ts** | Joi schema validation (`validateRequest`, `validateMultiple`). |
| **error.middleware.ts** | Centralized error handler → `ApiError` mapping, logging. |
| **notFound.middleware.ts** | 404 handler for unknown routes. |

---

## 7 · Services layer (`src/services/`)

| Service file | Key functions |
|--------------|---------------|
| **audit.service.ts** | `createAuditLog`, `queryAuditLogs`, helpers for CRUD/sec events. |
| **notification.service.ts** | In-app/WebSocket/email notify, helper enums, Redis pub/sub. |
| **report.service.ts** | Generate PDF/CSV/Excel/JSON reports (`asset-inventory`, `utilization`, ...). |

---

## 8 · Jobs layer (`src/jobs/`)

| File | Purpose |
|------|---------|
| **queue.ts** | Bull queue definitions, event handlers, `initializeJobProcessors`, `scheduleJob`, `scheduleRecurringJob`. |
| **scheduler.ts** | Convenience wrappers (`scheduleMaintenance`, `scheduleNotification`, `scheduleReportGeneration`). |

---

## 9 · Socket layer (`src/socket/index.ts`)

- Socket.io auth middleware (JWT).
- Room conventions: `user:{id}`, `org:{id}`, `asset:{id}`, `admins`, `superadmins`.
- Broadcast helpers (`broadcastAssetUpdate`, `notifyRequestStatusUpdate`, etc.).
- Redis adapter for clustering.

---

## 10 · Utility layer (`src/utils/`)

| File | Contents |
|------|----------|
| **apiError.ts** | `ApiError` class with static helpers (`badRequest`, `unauthorized`, ...). |
| **logger.ts** | Winston logger with daily-rotate and requestId support. |

---

## 11 · Type definitions (optional but recommended)

- Place shared interfaces/enums in `src/types/` (e.g., `index.d.ts` for request extensions).

---

## 12 · Testing (optional tier-1 deliverable)

| Path | Content |
|------|---------|
| **tests/\*** | Jest & Supertest suites for auth flow, asset CRUD, etc. |
| **jest.config.ts** | Jest configuration. |

---

## 13 · Assets & uploads

- `uploads/` directory (ignored by git) for file attachments (asset images, docs).
- Multer configuration (in middleware or separate helper).

---

## 14 · Background job schedule (suggested cron)

| Job | Default timing |
|-----|----------------|
| Asset depreciation calc | `0 1 * * *` (daily 1 AM) |
| License expiry check | `0 2 * * *` |
| Warranty expiry check | `0 3 * * *` |
| System backup | `0 0 * * 0` (weekly) |
| Audit log cleanup | `0 4 1 * *` (monthly) |

---

## Scope Summary

| Layer | Approx. LOC* | Files |
|-------|--------------|-------|
| Configuration & docs |  ~500 | 7 |
| Prisma schema & seed |  ~400 | 2 |
| Controllers | ~1 200 | 4 |
| Routes |   ~350 | 4 |
| Middleware |  ~400 | 4 |
| Services |  ~600 | 3 |
| Jobs & Socket |  ~600 | 3 |
| Utils |  ~250 | 2 |
| **Total** | **≈3 – 3.5 K LOC** | **29+ files** |

\*Estimated for initial implementation.

---

### ✅ Deliverable checklist

- [ ] **All configuration files** committed  
- [ ] **Database schema & migrations** run (`prisma generate`, `db push`)  
- [ ] **Controllers** return consistent JSON (`{ success, data, pagination? }`)  
- [ ] **Routes** validated with Joi & secured with RBAC  
- [ ] **Global error handler** returns structured errors  
- [ ] **WebSocket & Bull queues** initialised in `src/index.ts`  
- [ ] **Audit & notification services** wired into controllers  
- [ ] **Seed script** creates demo org/users/assets  

Complete these items → BlueAssets backend is production-ready.  
