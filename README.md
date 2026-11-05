# RetailFlow — AI-powered FMCG ordering

Starter repository for the 7-day FMCG distributor assignment.

## Included
- `backend/`: Express + TypeScript API starter, Prisma schema, seed script and health endpoint.
- `frontend/`: Vite + React + TypeScript starter.
- `.env.example`: environment variable names only.

## Prerequisites
- Node.js 22 LTS or newer
- npm
- PostgreSQL 15+ (local installation or Docker)

## 1. Configure PostgreSQL
Create a database named `retailflow`, then copy `backend/.env.example` to `backend/.env` and set `DATABASE_URL` and `JWT_SECRET`.

Example Docker database (optional):
```bash
docker run --name retailflow-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=retailflow -p 5432:5432 -d postgres:16
```
For that example, use:
`DATABASE_URL="postgresql://postgres:postgres@localhost:5432/retailflow?schema=public"`

## 2. Start the backend
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```
Health check: http://localhost:4000/api/health

## 3. Start the frontend
In a second terminal:
```bash
cd frontend
npm install
npm run dev
```
Open the URL printed by Vite (usually http://localhost:5173).

## Notes
- This is a starter scaffold, not the finished assignment.
- AI order interpretation, authentication flows, catalogue, cart, order creation, role permissions and dashboards are planned next.
- Never commit `.env`, API keys, real personal data or production credentials.
- AI output must remain a draft. The backend must validate products, prices, stock and quantities, and a human must confirm before an order is created.
