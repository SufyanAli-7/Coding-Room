import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import { YSocketIO } from "y-socket.io/dist/server"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()

// Serve static frontend build from public/
app.use(express.static(path.join(__dirname, "public")))

const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})

const ySocketIO = new YSocketIO(io)
ySocketIO.initialize()

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    message: "ok",
    success: true,
  })
})

// Catch-all middleware to serve SPA frontend index.html for all non-API routes
app.use((req, res, next) => {
  if (req.path.startsWith("/socket.io") || req.path === "/health") {
    return next()
  }
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

const PORT = process.env.PORT || 3000

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})