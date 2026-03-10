# 🚀 Professional MERN Pro Boilerplate

A production-ready, industry-standard MERN (MongoDB, Express, React, Node.js) boilerplate featuring TypeScript, JWT Authentication, and Tailwind CSS.

---

## ✨ Features

- **Backend**:
  - **TypeScript**: Full type safety across the entire API.
  - **Authentication**: JWT-based auth with secure password hashing (Bcrypt).
  - **Security**: Helmet, Rate Limiter, and sanitized CORS.
  - **Logging**: Structured logging with Morgan and Winston.
  - **Validation**: Strict request validation using Zod.
  - **Error Handling**: Centralized global error middleware.

- **Frontend**:
  - **Modern UI**: Tailwind CSS for high-performance, responsive styling.
  - **State Management**: TanStack Query (React Query) for robust server state & caching.
  - **Routing**: React Router with Protected Routes.
  - **Forms**: React Hook Form integrated with Zod validation.
  - **Icons**: Lucide React.
  - **Notifications**: React Hot Toast.

- **Developer Experience**:
  - **Documentation**: Interactive API docs with Swagger UI.
  - **Testing**: Backend unit testing with Vitest.
  - **Type Safety**: End-to-end TypeScript integration.

---

## 🛠️ Prerequisites

- Node.js (v18+)
- MongoDB
- Docker (optional)

---

## ⚡ Quick Start

### 1. Setup Environment
Copy `.env.example` to `.env` in the `backend` folder and set your variables:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-pro
JWT_SECRET=your_secret_key
JWT_EXPIRE=30d
NODE_ENV=development
```

### 2. Install & Run (Local)
```bash
# Install root (if using workspaces) or individual folders
cd backend && npm install
cd ../frontend && npm install

# Run Backend
cd backend && npm run dev

# Run Frontend
cd frontend && npm run dev
```

### 3. Run with Docker
```bash
docker-compose up --build
```

### 4. API Documentation
Once the backend is running, access the interactive Swagger documentation at:
`http://localhost:5000/api-docs`

### 5. Running Tests
```bash
cd backend
npm test
```

---

## 📂 Folder Structure

```
mern-pro/
├── backend/
│   ├── src/
│   │   ├── config/      # Database connection
│   │   ├── controllers/ # Auth & Resource logic
│   │   ├── middleware/  # Auth, Error, Security
│   │   ├── models/      # Mongoose Schemas (TS)
│   │   ├── routes/      # Express API routes
│   │   ├── utils/       # Helpers (ApiError, etc)
│   │   └── server.ts    # Entry point
│   └── tsconfig.json    # TypeScript config
└── frontend/
    ├── src/
    │   ├── api/         # Axios client
    │   ├── components/  # Shared components
    │   ├── context/     # Auth Context
    │   ├── pages/       # Dashboard, Login, Register
    │   └── main.tsx     # App entry
    ├── tailwind.config.js
    └── vite.config.ts
```
