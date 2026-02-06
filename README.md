# Task 4

## Tech Stack

### Frontend

- **Framework:** React (Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Library:** Intent UI (based on React Aria Components)
- **State Management:** TanStack Query v5 (React Query)
- **Routing:** TanStack Router
- **HTTP Client:** Ky (with global error handling hooks)
- **Icons:** Lucide React
- **Date Formatting:** date-fns

### Backend

- **Runtime:** Node.js (TypeScript)
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT + Bcrypt

### Prerequisites

- **Node.js** (v18 or higher)
- **Docker & Docker Compose** (for the database)

---

## Frontend setup

```bash
cd frontend
npm install
npm run dev
```

---

## Backend setup

### Installation

Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
```

Run docker compose command to create a postgres instance

```bash
docker compose up -d
```

Initialize the database schema

```bash
npx prisma migrate dev --name init
```

Run the Server

```bash
npm run dev
```

### Endpoints

Method Endpoint Description

```
POST  /auth/login Login and receive a JWT token.
POST  /auth/register Register a new user.
```

Method Endpoint Description

```
GET /users  Get a list of all users.
PUT,/users/block  Block selected users.
PUP /users/unblock  Unblock selected users.
DELETE  /users/delete Delete selected users.
DELETE  /users/delete-unverified Delete users who have never logged in.
```
