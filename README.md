# 🚀 Coding Room — Real-Time Collaborative Code Editor

<div align="center">

![Coding Room Logo](Client/public/logo.png)

### Real-time, conflict-free collaborative code editing in the browser.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-black?logo=express&logoColor=white)](https://expressjs.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.8.x-010101?logo=socket.io&logoColor=white)](https://socket.io/)
[![Yjs](https://img.shields.io/badge/Yjs-CRDT_Sync-orange)](https://yjs.dev/)

</div>

---

## 🌟 Overview

**Coding Room** is a modern full-stack collaborative code editing platform that empowers developers to write, inspect, and pair-program simultaneously in real time.

Built on top of **Yjs CRDTs (Conflict-free Replicated Data Types)**, every keystroke is synchronized seamlessly across all connected peers with zero merge conflicts and instant updates.

---

## ✨ Key Features

- ⚡ **Conflict-Free Real-Time Collaboration**: Multi-user simultaneous editing powered by **Yjs** & **y-monaco**.
- 👥 **Live Presence & Awareness**: Real-time tracking of connected peers, user avatars, and online status.
- 📱 **Adaptive & Mobile-Responsive**: Desktop sidebar layout with touch-friendly slide-over drawer for mobile devices.
- 🔗 **Instant Room Sharing**: Share rooms easily using the native **Web Share API** or one-click clipboard copy.
- 🎨 **Obsidian Dark Aesthetic**: Modern cyberpunk theme with glassmorphic cards and cyber-amber accents.
- 🩺 **Liveness Monitoring**: Built-in health check endpoint (`/health`) for uptime probes.

---

## 🏗️ Architecture

```text
[ Browser Client A ] <==== WebSocket ====> [ Express + YSocketIO Server ] <==== WebSocket ====> [ Browser Client B ]
   (React 19 + Monaco)                           (Node.js + Socket.IO)                            (React 19 + Monaco)
           |                                                |                                                |
        [ Yjs ] ---------------------------- State Sync (CRDT) ------------------------------------------ [ Yjs ]
```

---

## 📁 Repository Structure

```text
coding-room/
├── Client/                  # Frontend SPA (React 19 + Vite + Tailwind v4 + Monaco)
│   ├── public/              # Static assets & brand logo
│   ├── src/                 # React source code (App.jsx, styles)
│   ├── index.html           # HTML shell
│   ├── vite.config.js       # Vite build & module aliases
│   ├── package.json         # Client dependencies
│   └── README.md            # Client-specific documentation
│
├── Server/                  # Backend service (Node.js + Express 5 + Socket.io + YSocketIO)
│   ├── public/              # Built frontend SPA assets (served automatically)
│   ├── server.js            # Express server & WebSocket handler
│   ├── package.json         # Server dependencies
│   └── README.md            # Server-specific documentation
│
├── .gitignore               # Root git ignore rules
└── README.md                # Root project documentation
```

---

## 🚀 Quick Start (Local Development)

### 1. Clone the Repository

```bash
git clone https://github.com/SufyanAli-7/Coding-Room.git
cd coding-room
```

### 2. Start Backend Server

In a new terminal:

```bash
cd Server
npm install
npm run dev
```

*Server starts on `http://localhost:3000` (WebSocket & Health endpoint).*

### 3. Start Frontend Client

In a second terminal:

```bash
cd Client
npm install
npm run dev
```

*Frontend dev server starts on `http://localhost:5173`.*

---

## 📦 Production Deployment (Render)

Because real-time collaboration relies on persistent WebSocket connections, **Render.com** (Free Web Service) is recommended:

### Deploy Full-Stack on Render

Since the client production build is already placed inside `Server/public/`, you can deploy the complete app as a single service on Render:

1. Create a new **Web Service** on [Render.com](https://render.com/).
2. Select your `Coding-Room` repository.
3. Configure the service:
   - **Root Directory:** `Server`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Click **Create Web Service**.

Render will serve both your frontend UI and the real-time WebSocket connection under one URL!

---

## 📄 License

This project is open source and licensed under the **ISC License**.
