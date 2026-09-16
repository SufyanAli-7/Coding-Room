import { Editor } from "@monaco-editor/react"
import { MonacoBinding } from "y-monaco"
import { useRef, useMemo, useState, useEffect } from "react"
import * as Y from "yjs"
import { SocketIOProvider } from "y-socket.io"

function App() {
  const editorRef = useRef(null)
  const [username, setUsername] = useState(() => {
    return new URLSearchParams(window.location.search).get("username") || ""
  })
  const [users, setUsers] = useState([])
  const [isUsersOpen, setIsUsersOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const ydoc = useMemo(() => new Y.Doc(), [])
  const yText = useMemo(() => ydoc.getText("monaco"), [ydoc])

  const handleMount = (editor) => {
    editorRef.current = editor

    new MonacoBinding(
      yText,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
    )
  }

  const handleJoin = (e) => {
    e.preventDefault()
    const name = e.target.username.value.trim()
    if (!name) return
    setUsername(name)
    window.history.pushState({}, "", "?username=" + encodeURIComponent(name))
  }

  const handleShare = async () => {
    const shareUrl = window.location.origin + window.location.pathname
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Coding Room",
          text: `Join ${username} in Coding Room to code together in real-time!`,
          url: shareUrl,
        })
        return
      } catch (err) {
        if (err.name === "AbortError") return
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch (e) {
      console.error("Failed to copy link:", e)
    }
  }

  useEffect(() => {
    if (username) {
      const provider = new SocketIOProvider("/", "monaco", ydoc, {
        autoConnect: true,
      })

      provider.awareness.setLocalStateField("user", { username })

      const updateUsers = () => {
        const states = Array.from(provider.awareness.getStates().values())
        setUsers(states.filter(state => state.user && state.user.username).map(state => state.user))
      }

      updateUsers()
      provider.awareness.on("change", updateUsers)

      function handleBeforeUnload() {
        provider.awareness.setLocalStateField("user", null)
      }

      window.addEventListener("beforeunload", handleBeforeUnload)

      return () => {
        provider.disconnect()
        window.removeEventListener("beforeunload", handleBeforeUnload)
      }
    }
  }, [username, ydoc])

  if (!username) {
    return (
      <main className="min-h-screen w-full bg-linear-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gray-900/90 border border-gray-800/80 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-6">
            <img
              src="/logo.png"
              alt="Coding Room Logo"
              className="h-12 w-12 rounded-xl object-contain shadow-lg shadow-amber-500/10 border border-gray-800 shrink-0"
            />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Coding Room</h1>
              <p className="text-xs sm:text-sm text-gray-400">Real-time collaborative code editor</p>
            </div>
          </div>

          <form onSubmit={handleJoin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="username" className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Display Name
              </label>
              <input
                id="username"
                type="text"
                required
                placeholder="e.g. Alex, Rahul, CodeNinja..."
                className="w-full px-4 py-3 rounded-xl bg-gray-800/90 border border-gray-700/70 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-400 transition"
                name="username"
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-linear-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-950 font-bold text-sm sm:text-base shadow-lg shadow-amber-500/20 transition-all transform active:scale-[0.99] cursor-pointer"
            >
              Join Room →
            </button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <div className="h-screen w-full bg-gray-950 flex flex-col text-gray-200 overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="h-14 sm:h-16 border-b border-gray-800 bg-gray-900/90 px-3 sm:px-6 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <img
            src="/logo.png"
            alt="Coding Room Logo"
            className="h-8 sm:h-9 w-8 sm:w-9 rounded-lg object-contain border border-gray-800 shadow-sm shrink-0"
          />
          <div>
            <h1 className="text-sm sm:text-base font-bold text-white leading-tight">Coding Room</h1>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[11px] text-gray-400">Live Collaborative</span>
            </div>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Share with friend button */}
          <button
            type="button"
            onClick={handleShare}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition shadow-sm cursor-pointer active:scale-95 ${
              copied
                ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-400"
                : "bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/40 text-amber-300 hover:text-amber-200"
            }`}
            title="Share room link with a friend"
          >
            {copied ? (
              <>
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span>Share <span className="hidden sm:inline">with friend</span></span>
              </>
            )}
          </button>

          {/* User badge */}
          <div className="hidden xs:flex items-center gap-2 bg-gray-800/80 border border-gray-700/60 rounded-lg px-2.5 py-1 text-xs text-gray-300">
            <span className="h-2 w-2 rounded-full bg-amber-400"></span>
            <span className="truncate max-w-25 sm:max-w-37.5 font-medium">{username}</span>
          </div>

          {/* Mobile Users Toggle Button */}
          <button
            type="button"
            onClick={() => setIsUsersOpen(!isUsersOpen)}
            className="md:hidden flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-750 border border-gray-700 rounded-lg text-xs font-medium text-white transition active:scale-95"
          >
            <span>👥</span>
            <span>Users</span>
            <span className="bg-amber-400/20 text-amber-300 font-semibold text-[10px] px-1.5 py-0.2 rounded-full">
              {users.length}
            </span>
          </button>
        </div>
      </header>

      {/* Main Workspace Area */}
      <div className="flex-1 flex relative overflow-hidden p-2 sm:p-4 gap-2 sm:gap-4">
        {/* Mobile Backdrop for Users Drawer */}
        {isUsersOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-xs transition-opacity"
            onClick={() => setIsUsersOpen(false)}
          />
        )}

        {/* Users Sidebar (Responsive: drawer on mobile, static sidebar on md+) */}
        <aside
          className={`
            fixed md:relative z-40 md:z-auto top-0 right-0 h-full w-72 md:w-64 lg:w-72
            bg-gray-900 border-l md:border border-gray-800 md:rounded-xl shadow-2xl md:shadow-none
            flex flex-col transition-transform duration-200 ease-in-out shrink-0
            ${isUsersOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
          `}
        >
          {/* Sidebar Header */}
          <div className="p-3.5 sm:p-4 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-white">Online Peers</h2>
              <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded-full font-medium">
                {users.length}
              </span>
            </div>
            {/* Close button on mobile */}
            <button
              type="button"
              onClick={() => setIsUsersOpen(false)}
              className="md:hidden text-gray-400 hover:text-white p-1 rounded-lg text-sm"
              aria-label="Close user list"
            >
              ✕
            </button>
          </div>

          {/* User List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
            {users.length === 0 ? (
              <p className="text-xs text-gray-500 text-center py-4">No users online</p>
            ) : (
              users.map((user, index) => {
                const isCurrent = user.username === username
                return (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-2.5 rounded-lg text-xs sm:text-sm transition ${isCurrent
                        ? "bg-amber-400/10 border border-amber-400/30 text-amber-200 font-medium"
                        : "bg-gray-800/60 hover:bg-gray-800 border border-gray-700/50 text-gray-300"
                      }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="h-7 w-7 rounded-full bg-linear-to-br from-amber-400 to-amber-600 text-gray-950 font-bold flex items-center justify-center text-xs shrink-0">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <span className="truncate">{user.username}</span>
                    </div>
                    {isCurrent && (
                      <span className="text-[10px] text-amber-400 font-medium bg-amber-400/10 px-1.5 py-0.5 rounded shrink-0">
                        You
                      </span>
                    )}
                  </div>
                )
              })
            )}
          </div>

          {/* Sidebar Footer with Share Option */}
          <div className="p-3 border-t border-gray-800 bg-gray-950/40">
            <button
              type="button"
              onClick={handleShare}
              className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer active:scale-95 ${
                copied
                  ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-400"
                  : "bg-gray-800 hover:bg-gray-750 border border-gray-700 text-amber-300 hover:text-amber-200"
              }`}
            >
              {copied ? (
                <>
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span>Invite Friends to Room</span>
                </>
              )}
            </button>
          </div>
        </aside>

        {/* Code Editor Area */}
        <section className="flex-1 h-full min-h-0 bg-neutral-900 border border-gray-800 rounded-xl overflow-hidden relative shadow-inner">
          <Editor
            height="100%"
            width="100%"
            defaultLanguage="javascript"
            defaultValue="// Collaborative coding room\nconsole.log('Hello World!');\n"
            theme="vs-dark"
            onMount={handleMount}
            options={{
              automaticLayout: true,
              wordWrap: "on",
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbersMinChars: 3,
              scrollBeyondLastLine: false,
              tabSize: 2,
              padding: { top: 12, bottom: 12 },
            }}
          />
        </section>
      </div>
    </div>
  )
}

export default App