# ✨ Moralverse - Magical SaaS Admin & Story Platform

**Moralverse** is a premium, full-stack web application designed for storytelling with a high-end "Dark Glassmorphism" aesthetic. It features a powerful administrative command center to manage characters, stories, and users, combined with a magical reading experience for users.

---

## 🌟 Key Features

### 🎨 Premium UI/UX
- **Dark Glassmorphism:** Modern, sleek interface with frosted glass effects.
- **Magical Particles:** Dynamic, floating anime-inspired particles across all pages.
- **Responsive Design:** Fully optimized for different screen sizes.

### 📊 Admin Command Center (The Dashboard)
- **Real-time Analytics:** Visual tracking of total users, stories, and active characters.
- **Character Hub:** Create and manage magical narrators with live previews.
- **Story Archive:** Full CRUD operations for moral stories assigned to specific characters.
- **User Base Management:** Administrative control to promote users to Admin or suspend/delete accounts.

### 📖 User Experience
- **Story Reader:** A polished interface for users to browse and read magical tales.
- **Smart Redirection:** Automatic role-based login (Admin goes to `/admin`, User goes to `/user`).
- **Professional Auth:** High-end landing page style Login and Signup screens.

---

## 🛠️ Tech Stack

**Frontend:**
- **React.js:** Component-based architecture.
- **Vanilla CSS:** Custom design system (Glassmorphism + Particles).
- **React Router:** Advanced role-based routing.

**Backend:**
- **Flask (Python):** Robust REST API.
- **SQLite:** Lightweight, reliable file-based database.
- **SQLAlchemy/Raw SQL:** Optimized database queries.

---

## 🚀 Getting Started

### 1. Backend Setup
```bash
cd backend
# Install dependencies
pip install flask flask-cors sqlite3
# Start the server
python app.py
```

### 2. Frontend Setup
```bash
cd frontend
# Install dependencies
npm install
# Start the React app
npm start
```

### 🔑 Default Admin Credentials
For testing purposes, a master admin account is pre-configured:
- **Username:** `admin`
- **Password:** `admin123`

---

## 📁 Project Structure
```text
moralverse/
├── backend/                # Flask API & SQLite DB
│   ├── controllers/        # Business logic
│   ├── models/             # Database schemas
│   ├── routes/             # API Endpoints
│   └── database/           # DB Connection
├── frontend/               # React Application
│   ├── src/
│   │   ├── components/     # Reusable UI elements
│   │   ├── pages/          # Full page views
│   │   └── services/       # API Integration (Axios)
└── README.md
```

---

## 🎭 Credits & Inspiration
Designed with ❤️ for the **Moralverse Community**. The design language is inspired by high-end anime aesthetics and modern SaaS dashboards.

---
© 2026 Moralverse Project. All Rights Reserved.
