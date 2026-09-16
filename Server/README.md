# 🚀 Coding Room — Server (Backend)

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
- 📡 **WebSocket Room Communication**: Built on `socket.io` with configurable CORS support for local development and remote deployments.
- 👥 **Awareness Protocol**: Synchronizes peer presence, usernames, and active states in real time.
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
├── public/              # Static public assets (optional)
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

- **Port**: Default is `3000` (defined in `server.js`).
- **CORS**: Currently configured with open wildcard (`*`) origin for convenient development. Update `origin` in `server.js` before deploying to a production domain:
  ```javascript
  const io = new Server(httpServer, {
    cors: {
      origin: ["https://your-production-domain.com"],
      methods: ["GET", "POST"]
    }
  })
  ```

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
