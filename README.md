# 🚀 MERN Boilerplate (with Vite Frontend)

simple MERN boilerplate — jumpstart any MERN CRUD project! 🎉

---

## 📦 Features

* **Backend**: Express.js + Mongoose for MongoDB
* **Frontend**: React.js with Vite and Axios
* **CRUD**: Generic routes, controllers, and components
* **Proxy**: Dev server proxy to connect frontend ↔️ backend
* **Error Handling**: Simple centralized error middleware

---

## 🛠️ Prerequisites

* Node.js (v14+)
* npm or yarn
* MongoDB (local or Atlas)

---

## ⚡ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/sasmithaK/mern-crud-boilerplate.git
cd mern-crud-boilerplate
```

### 2. Setup the Backend

```bash
cd backend
npm install         # Install backend dependencies
Copy-Item .env.example .env  # Create env file
# Edit .env and set MONGODB_URI and PORT
npm run dev         # Start Express server (with nodemon)
```

> 🌐 Server runs on `http://localhost:PORT`

### 3. Setup the Frontend

```bash
cd ../frontend
npm install         # Install frontend dependencies
# (Vite template already initialized)
npm run dev         # Start Vite dev server
```

> 🚀 Frontend runs on `http://localhost:3000`

---

## 🔧 Usage

1. **Create**: Fill out the form and click **Create**
2. **Read**: View items in the list
3. **Update**: Click **Edit**, update fields, and submit
4. **Delete**: Click **Delete** to remove an item

Customize the `Item` model to your domain: rename schema, controllers, and components.

---

## 📂 Folder Structure

```
mern-boilerplate/
├── backend/         # Express API
│   ├── config/      # DB connection
│   ├── controllers/ # CRUD logic
│   ├── models/      # Mongoose schemas
│   ├── routes/      # API routes
│   ├── middleware/  # Error handling
│   └── server.js    # Entry point
└── frontend/        # Vite + React app
    ├── src/
    │   ├── api/     # Axios wrappers
    │   ├── components/ # React UI
    │   ├── App.jsx  # Main app
    │   └── main.jsx # Entry point
    └── vite.config.js # Vite config
```

---

## 🤝 Contributing

Feel free to open issues, submit PRs, or ⭐ the repo if you find it helpful!

---
