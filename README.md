# BlueAssets Backend

Enterprise-grade **Asset Management API** powering the BlueAssets platform.  
Built with **Node.js · Express · TypeScript · Prisma · Socket.io · Bull/Redis** for real-time, multi-tenant asset-lifecycle management.

---

## Table of Contents
1. Project Overview  
2. Feature Highlights  
3. Tech Stack  
4. Architecture Overview  
5. Quick Start  
6. Environment Variables  
7. Database & Migrations  
8. Available npm Scripts  
9. API Reference  
10. Development Workflow  
11. Testing  
12. Deployment  
13. Contributing  
14. License  

---

## 1  Project Overview
BlueAssets Backend exposes REST & WebSocket endpoints enabling organisations to track, audit and optimise physical and digital assets through their entire lifecycle—purchase → assignment → maintenance → retirement—all while enforcing strict role-based access control.

## 2  Feature Highlights
| Domain | Key Capabilities |
| ------ | ---------------- |
| **Authentication & Security** | JWT (access/refresh) • Bcrypt hashing • RBAC (SuperAdmin / Admin / Employee) • Helmet • Rate limiting • Audit logging |
| **Asset Management** | CRUD, categorisation, assignment, location tracking, depreciation & warranty monitoring |
| **Request Workflow** | Employee self-service requests, priority levels, admin approval & fulfilment |
| **Maintenance Scheduling** | Preventive / corrective plans, technician assignment, cost & status tracking |
| **Notifications** | In-app, WebSocket & email channels, high/medium/low/urgent priorities |
| **Reporting & Analytics** | Inventory, utilisation, lifecycle, depreciation, cost analysis (PDF/CSV/Excel/JSON) |
| **Background Jobs** | Bull queues for reminders, licence & warranty alerts, backups, report generation |
| **Multi-Tenancy** | Logical segregation via `organization_id`; SuperAdmin oversees all tenants |
| **Observability** | Winston daily-rotate logs, request tracing, centralised error handler |

## 3  Tech Stack
| Layer | Choice |
| ----- | ------ |
| Runtime | Node 18+ |
| Framework | Express.js + TypeScript |
| ORM | Prisma (Client v5) – SQLite (dev) / PostgreSQL (prod) |
| Real-time | Socket.io |
| Queues / Cron | Bull + Redis |
| Auth & Validation | JSON Web Tokens • Joi |
| Logging | Winston + daily-rotate-file |
| Tests | Jest · Supertest |

## 4  Architecture Overview
```
┌──────────────┐  HTTP / WS  ┌────────────────┐
│  React Front │────────────►│  Express API   │
└──────────────┘             │ Routes + Ctrl  │
            ▲▲               └───────┬────────┘
  WebSocket ││                         │ Prisma
            ││                         ▼
            │└─ Real-time     ┌────────────────┐
            │                 │  PostgreSQL    │
            │                 └────────────────┘
            │  Bull queues            ▲
            ▼                         │
     ┌───────────────┐   Redis PubSub │
     │  Job Workers  │◄───────────────┘
     └───────────────┘
```

---

## 5  Quick Start

### 5.1 Clone & Install
```bash
git clone https://github.com/Pesabank/blue-assets-backend.git
cd blue-assets-backend
npm install
```

### 5.2 Configure Environment
```bash
cp .env.example .env
# edit .env → DATABASE_URL, JWT_SECRET, etc.
```

### 5.3 Database (SQLite default)
```bash
npx prisma generate
npx prisma db push        # create tables
npm run seed              # optional demo data
```

### 5.4 Run Dev Server
```bash
npm run dev               # http://localhost:3000/api/v1/health
```

---

## 6  Environment Variables (`.env`)
| Key | Description | Example |
| --- | ----------- | ------- |
| `NODE_ENV` | `development` / `production` | development |
| `PORT` | API port | 3000 |
| `DATABASE_URL` | DB connection string | `postgresql://user:pw@host:5432/blueassets` |
| `JWT_SECRET` | 32-char secret | `a1b2...` |
| `REDIS_HOST` / `PORT` | Redis for queues | localhost / 6379 |
| `CORS_ORIGIN` | Front-end origin | http://localhost:5173 |
| _See `.env.example` for full list._ |

---

## 7  Database & Migrations
* Prisma schema lives in `prisma/schema.prisma`.  
* Development uses SQLite (`file:./dev.db`).  
* Switch to Postgres by editing `provider` & `DATABASE_URL`.  

```bash
# After changing schema
npx prisma migrate dev --name <migration>
```

---

## 8  Available npm Scripts
| Script | Purpose |
| ------ | ------- |
| `dev` | ts-node-dev hot-reload server |
| `build` / `start` | Compile to `dist/` & run |
| `lint` / `format` | ESLint & Prettier |
| `test` / `test:watch` / `test:coverage` | Jest test suites |
| `prisma:*` | Prisma client, migrate, studio |
| `seed` | Populate DB with demo org/users/assets |

---

## 9  API Reference (v1)

### 9.1 Authentication (`/auth`)
| Method | Path | Body | Description |
| ------ | ---- | ---- | ----------- |
| `POST` | `/login` | `{ email,password }` | Obtain tokens |
| `POST` | `/logout` | – | Invalidate refresh token |
| `GET` | `/me` | ‑ | Current user profile |
| `POST` | `/refresh` | `{ refreshToken }` | New access token |
| `POST` | `/reset-password` | `{ email }` | Send reset link |

### 9.2 Admin (`/admin`)
* `GET /dashboard-stats` – KPI metrics  
* `GET/POST/PUT/DELETE /assets` – Asset CRUD  
* `GET/POST/PUT/DELETE /users` – User management  
* `GET/PUT /asset-requests` – Approve / reject  
* `GET/POST/PUT /maintenance-schedules` – Maintenance  
* `POST /reports/generate` – PDF/CSV/Excel/JSON  
* `GET /analytics` – Utilisation, costs, etc.

### 9.3 SuperAdmin (`/superadmin`)
* Organization CRUD  
* System stats, audit logs, settings  
* Create admin users, security events, licence usage

### 9.4 Employee (`/employee`)
* `GET /my-assets` – Assigned assets  
* Asset request CRUD  
* Asset history, issues, return requests

All responses share the shape:
```json
{
  "success": true,
  "data": { ... },
  "pagination": { ... }   // when applicable
}
```

Full OpenAPI/Swagger spec will be added in a future update.

---

## 10  Development Workflow
1. **Branch** from `main`: `feat/<ticket>`  
2. **Code & Test** – respect ESLint/Prettier; update Jest tests  
3. **Commit** using Conventional Commits (`feat:`, `fix:`, `docs:` …)  
4. **PR** – CI runs lint + tests  
5. **Review & Merge** – squash commits, auto-deploy (optional)

---

## 11  Testing
```bash
npm run test          # unit & integration
npm run test:watch
npm run test:coverage # HTML coverage report
```
*Supertest* covers REST; Socket.io tests use `socket.io-client`.

---

## 12  Deployment

| Step | Command |
| ---- | ------- |
| Build | `npm run build` |
| Start | `npm start` (PM2 / Docker) |
| Env | Point `DATABASE_URL` to Postgres, `REDIS_*` to prod instance |

**Docker Compose** sample (Postgres + Redis + API) is planned.

---

## 13  Contributing
1. Fork repo & create feature branch  
2. Commit with clear message  
3. Open PR, describe behaviour & testing  
4. Resolve review comments, squash & merge  

---

## 14  License
Released under the **MIT License** – see `LICENSE` for details.

---

### Default Demo Users (after `npm run seed`)
| Role | Email | Password |
| ---- | ----- | -------- |
| SuperAdmin | `superadmin@blueassets.com` | `superadmin123` |
| Admin | `admin@acme.com` | `admin123` |
| Employee | `employee@acme.com` | `employee123` |

Happy hacking! 🎉
