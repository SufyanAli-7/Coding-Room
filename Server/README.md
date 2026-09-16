# 🚀 Coding Room — Server (Backend & Full-Stack Host)

<div align="center">

### Real-Time Synchronization & WebSocket Server

The backend service for **Coding Room**, powering real-time multi-user document synchronization, peer awareness (presence & usernames), and WebSocket messaging using **Node.js**, **Express 5**, **Socket.io**, and **y-socket.io**.

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-black?logo=express&logoColor=white)](https://expressjs.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.8.x-010101?logo=socket.io&logoColor=white)](https://socket.io/)
[![Y-Socket.IO](https://img.shields.io/badge/Y--Socket.IO-1.1.x-blue)](https://github.com/MaxNoord/y-socket.io)
[![ESM](https://img.shields.io/badge/Module-ESM-yellow)](https://nodejs.org/api/esm.html)

</div>

---

## ✨ Features

- 🔄 **Real-Time CRDT Synchronization**: Integrates `y-socket.io` server-side handler for flawless document persistence and conflict-free collaboration across all connected clients.
- 📡 **WebSocket Room Communication**: Built on `socket.io` with configurable CORS support for both same-origin and cross-origin deployments.
- 👥 **Awareness Protocol**: Synchronizes peer presence, usernames, and active states in real time.
- 🌐 **Full-Stack SPA Serving**: Automatically serves the compiled frontend bundle from `public/` and handles SPA client-side routing.
- 🩺 **Health Check API**: Lightweight REST endpoint (`/health`) for uptime tracking and cloud deployment liveness probes.
- ⚡ **Auto-Reloading Development**: Configured with `nodemon` for instant hot-reload upon file changes.

---

## 🛠️ Tech Stack

| Technology | Role |
| :--- | :--- |
| **Node.js** | JavaScript runtime environment (ES Modules) |
| **Express 5.x** | Fast, minimalist HTTP web framework |
| **Socket.IO 4.x** | Bidirectional low-latency event-driven communication |
| **y-socket.io** | Yjs WebSocket server provider for shared data sync |
| **Nodemon** | Automated development server restart utility |

---

## 📁 Project Structure

```text
Server/
├── server.js            # Main application entry (HTTP, Socket.io, YSocketIO)
├── package.json         # Project dependencies, scripts & ESM configuration
├── public/              # Production client bundle (index.html, assets, logo)
└── README.md            # Documentation and setup instructions
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18.0.0 or higher
- **npm** v9.0.0 or higher

### 1. Installation

Navigate to the `Server` directory and install all required dependencies:

```bash
npm install
```

### 2. Run in Development Mode

Starts the server with `nodemon` watching for file changes:

```bash
npm run dev
```

Output:
```text
[nodemon] starting `node server.js`
Server is running on port 3000
```

### 3. Run in Production Mode

Starts the server directly with Node:

```bash
npm start
```

---

## ☁️ Deployment on Render (Recommended)

Render is strongly recommended because it supports persistent WebSocket connections and long-running Node processes:

1. Sign in to **[Render.com](https://render.com/)**.
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository (`Coding-Room`).
4. Configure the service:
   - **Name:** `coding-room` (or your preferred name)
   - **Root Directory:** `Server`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free`
5. Click **Create Web Service**.

> **Note:** Because the production client bundle is already included inside `Server/public/`, Render will serve **both** the frontend application and the WebSocket server from a single domain.

---

## 🌐 API & Socket Reference

### REST Endpoints

#### `GET /health`
Verifies server health and operational status.

- **Response:** `200 OK`
```json
{
  "message": "ok",
  "success": true
}
```

### WebSocket / Socket.IO Events

| Namespace / Room | Description |
| :--- | :--- |
| `/` | Default Socket.io connection namespace |
| `monaco` | Document room name utilized by Yjs Monaco binding |
| `awareness` | User presence state broadcasts (username, active status) |

---

## ⚙️ Configuration

- **Port**: Default is `3000` (defined in `server.js`), or dynamically provided via `process.env.PORT`.
- **CORS**: Configured with wildcard (`*`) origin by default to accommodate both same-origin and cross-domain clients.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs server with nodemon auto-restart on changes |
| `npm start` | Starts server in production mode |
| `npm test` | Placeholder for automated test suites |

---

## 📄 License

This project is licensed under the **ISC License**.
