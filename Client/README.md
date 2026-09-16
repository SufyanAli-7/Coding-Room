# 💻 Coding Room — Client

<div align="center">

![Coding Room Logo](/public/logo.png)

### Real-Time Collaborative Code Editor

A lightning-fast, modern collaborative code editor built with **React 19**, **Vite**, **Monaco Editor**, **Yjs (CRDT)**, and **Tailwind CSS v4**. Code together with peers simultaneously in real-time with zero conflicts.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Monaco Editor](https://img.shields.io/badge/Monaco_Editor-VS_Code_Core-007ACC?logo=visual-studio-code&logoColor=white)](https://microsoft.github.io/monaco-editor/)
[![Yjs](https://img.shields.io/badge/Yjs-CRDT_Sync-orange)](https://yjs.dev/)
[![Socket.IO](https://img.shields.io/badge/Socket.io-Client-010101?logo=socket.io&logoColor=white)](https://socket.io/)

</div>

---

## ✨ Features

- ⚡ **Conflict-Free Real-Time Collaboration**: Powered by **Yjs** CRDT (Conflict-free Replicated Data Types) and `y-monaco` binding for smooth multi-user typing without text overwrites.
- 👥 **Live Presence & Peer Awareness**: Real-time tracking of online users with distinct avatars and active status badges.
- 📱 **Fully Mobile-Responsive**:
  - Adaptive layout with desktop sidebar and mobile off-canvas drawer.
  - Monaco editor with auto-layout and word wrapping optimized for tablets and mobile devices.
- 🔗 **Smart "Share with Friend"**:
  - Native **Web Share API** integration on mobile devices (WhatsApp, Telegram, SMS, etc.).
  - Automatic clipboard copy with instant feedback on desktop browsers.
  - Automatically sends a clean room invitation URL.
- 🎨 **Modern Cyberpunk / Obsidian Dark Theme**: Glassmorphism surfaces, amber gold neon accents, and smooth micro-interactions.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Modern UI framework with reactive state management |
| **Vite 8** | Next-generation build tool with instant Hot Module Replacement (HMR) |
| **Tailwind CSS v4** | CSS-first styling framework with modern theme engine |
| **Monaco Editor** | The industry-standard code editor engine powering VS Code |
| **Yjs & y-monaco** | High-performance shared data types and editor bindings |
| **y-socket.io** | WebSocket synchronization client for Yjs documents |

---

## 📁 Project Structure

```text
Client/
├── public/
│   ├── favicon.svg          # Default SVG icon
│   └── logo.png             # Application brand logo
├── src/
│   ├── assets/              # Static assets
│   ├── App.jsx              # Main workspace (Editor, User List, Sharing, Yjs sync)
│   ├── index.css            # Tailwind CSS imports & global styles
│   └── main.jsx             # React DOM entry point
├── index.html               # HTML5 shell & favicon configuration
├── package.json             # Dependencies and scripts
└── vite.config.js           # Vite configuration & Monaco module aliases
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18+ recommended) and **npm** installed on your system.

### 1. Installation

Navigate to the `Client` directory and install dependencies:

```bash
npm install
```

### 2. Start Development Server

Run Vite development server with Hot Module Replacement:

```bash
npm run dev
```

The application will be accessible at:  
👉 **`http://localhost:5173`**

### 3. Build for Production

To create an optimized production build:

```bash
npm run build
```

The compiled output will be generated in the `dist/` directory.

### 4. Preview Production Build

```bash
npm run preview
```

---

## ⚙️ Configuration Notes

### Monaco Editor Module Resolution (`vite.config.js`)
`y-monaco` internally imports `monaco-editor/esm/vs/editor/editor.api.js`. An explicit alias is configured in [vite.config.js](vite.config.js) to resolve this path smoothly in modern Vite & Rolldown environments.

---

## 📜 Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts local dev server at `http://localhost:5173` |
| `npm run build` | Bundles and minifies for production in `dist/` |
| `npm run preview` | Locally serves the production build |
| `npm run lint` | Runs fast code analysis via Oxlint |

---

## 📄 License

This project is licensed under the **ISC License**.
