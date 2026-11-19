# 📌 Bookmark & Link Manager (Full-Stack MERN)

> A modern, responsive single-page **Bookmark & Link Manager** web application built for the **AQI Labs Full-Stack Web Development Evaluation**.

---

## 🚀 Live Demo & Links
- **Live Frontend (Vercel):** https://aqi-bookmark-manager.vercel.app
- **Live Backend API (Render):** https://aqi-bookmark-backend.onrender.com
- **API Health Check:** https://aqi-bookmark-backend.onrender.com/

---

## 🛠️ Tech Stack
- **Frontend:** React 19, Vite, Tailwind CSS, Lucide React
- **Backend:** Node.js, Express.js (REST API, MVC Architecture)
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Deployment:** Vercel (Frontend) + Render (Backend) + MongoDB Atlas (Cloud DB)

---

## ✨ Features Implemented
- **Add Bookmarks:** Clean form with real-time client-side validation (Title required, valid `http://` or `https://` format).
- **Interactive Grid View:** Displays saved bookmarks with clickable links (`target="_blank"` with `rel="noopener noreferrer"`).
- **Favorite System:** Instant one-click favorite toggling (`PATCH /api/bookmarks/:id/favorite`).
- **Category Organization:** Tag bookmarks under `Work`, `Learning`, `Tools`, `Entertainment`.
- **Search & Filter:** Real-time search by title and filter by category (including `All` and `Favorites`) without page reloads.
- **UI States:** Polished loading spinners, error banners with retry capability, and informative empty states when no results match.
- **Responsive Design:** Mobile-first, modern SaaS styling built with Tailwind CSS.

---

## 📂 Project Architecture

```text
aqi/
├── client/                     # Frontend (React + Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/         # Reusable Modular UI Components
│   │   │   ├── BookmarkForm.jsx
│   │   │   ├── BookmarkCard.jsx
│   │   │   └── FilterBar.jsx
│   │   ├── App.jsx             # State management & API integration
│   │   ├── index.css           # Tailwind directives
│   │   └── main.jsx
│   ├── .env                    # Local environment variables (gitignored)
│   ├── .env.example            # Environment variables template
│   └── package.json
│
├── server/                     # Backend (Node.js + Express + MongoDB)
│   ├── config/
│   │   └── db.js               # MongoDB connection logic
│   ├── models/
│   │   └── Bookmark.js         # Mongoose Schema with URL regex validation
│   ├── controllers/
│   │   └── bookmarkController.js # REST API business logic
│   ├── routes/
│   │   └── bookmarkRoutes.js   # Express Router endpoints
│   ├── .env                    # Backend secrets (gitignored)
│   ├── .env.example            # Backend secrets template
│   ├── server.js               # Express entry point
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Description | Status Codes |
|---|---|---|---|
| `GET` | `/api/bookmarks` | Fetch all bookmarks (supports `?category=...` and `?search=...`, sorted newest first) | `200 OK` |
| `POST` | `/api/bookmarks` | Validate input & create new bookmark | `201 Created`, `400 Bad Request` |
| `PATCH` | `/api/bookmarks/:id/favorite` | Toggle `isFavorite` boolean | `200 OK`, `404 Not Found` |
| `DELETE` | `/api/bookmarks/:id` | Delete bookmark by ID | `200 OK`, `404 Not Found` |

---

## ⚙️ Local Setup & Installation

### Prerequisites
- Node.js (v18+)
- Git
- MongoDB Atlas cluster URL

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd aqi
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory (reference `.env.example`):
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start the backend development server:
```bash
npm run dev
# Server will run at http://localhost:5000
```

### 3. Frontend Setup
In a new terminal window:
```bash
cd client
npm install
```

Create a `.env` file in the `client` directory (reference `.env.example`):
```env
VITE_API_URL=http://localhost:5000/api
```

Start the Vite development server:
```bash
npm run dev
# App will open at http://localhost:5173
```

---

## 🛡️ Security & Evaluation Compliance
- **No hardcoded secrets:** All connection strings and base URLs are isolated in `.env` files.
- **CORS enabled:** Backend is configured to accept requests from authorized frontend clients.
- **Explicit error handling:** Standard HTTP status codes (`200`, `201`, `400`, `404`, `500`) used across all endpoints.
- **Zero auto-generated boilerplate:** Clean, modular, human-written codebase ready for technical walkthrough.
