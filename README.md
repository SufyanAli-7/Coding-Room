# 🚀 Coding Room — Real-Time Collaborative Code Editor

<div align=center>

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

**Coding Room** is a full-stack collaborative platform that allows multiple developers to write, edit, and review code together simultaneously in real time.

Built on **Yjs CRDTs (Conflict-free Replicated Data Types)**, every keystroke is synchronized seamlessly across connected peers without merge conflicts or text overwrites.

---

## ✨ Key Highlights

- ⚡ **Conflict-Free Real-Time Collaboration**: Multi-user simultaneous editing powered by **Yjs** & **y-monaco**.
- 👥 **Live Presence & Awareness**: Real-time tracking of connected peers, user avatars, and online status.
- 📱 **Adaptive & Mobile-Responsive**: Beautiful desktop layout with sidebar and touch-optimized slide-over drawer for mobile devices.
- 🔗 **Instant Room Sharing**: Share rooms easily using the native **Web Share API** or one-click clipboard copy.
- 🎨 **Obsidian Dark Aesthetic**: Modern cyberpunk dark mode with glassmorphic cards and glowing cyber-amber highlights.
- 🩺 **Liveness Monitoring**: Built-in health check endpoint (/health) for uptime probes.

---

## 🏗️ Architecture

`	ext
[ Browser Client A ] <==== WebSocket ====> [ Express + YSocketIO Server ] <==== WebSocket ====> [ Browser Client B ]
   (React 19 + Monaco)                           (Node.js + Socket.IO)                            (React 19 + Monaco)
           |                                                |                                                |
        [ Yjs ] ---------------------------- State Sync (CRDT) ------------------------------------------ [ Yjs ]
`

---

## 📁 Repository Structure

`	ext
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
│   ├── public/              # Production frontend bundle
│   ├── server.js            # Express server & WebSocket handler
│   ├── vercel.json          # Vercel configuration
│   ├── package.json         # Server dependencies
│   └── README.md            # Server-specific documentation
│
├── .gitignore               # Root git ignore rules
└── README.md                # Root project documentation
`

---

## 🚀 Quick Start (Local Development)

### 1. Clone & Navigate

`ash
git clone <your-repository-url>
cd coding-room
`

### 2. Start Backend Server

In a new terminal:

`ash
cd Server
npm install
npm run dev
`

*Server starts on http://localhost:3000 (WebSocket endpoint).*

### 3. Start Frontend Client

In a second terminal:

`ash
cd Client
npm install
npm run dev
`

*Frontend dev server starts on http://localhost:5173.*

---

## 📦 Production Deployment

### 1. Build Client

`ash
cd Client
npm run build
`

Copy the generated Client/dist/ contents into Server/public/.

### 2. Deploy Server (Recommended: Render / Railway)

Because real-time collaboration relies on persistent WebSocket connections:
- **Render.com** (Free Web Service) or **Railway.app** are strongly recommended.
- Run command: 
pm start
- Port: Uses process.env.PORT automatically.

---

## 📄 License

This project is open source and licensed under the **ISC License**.
