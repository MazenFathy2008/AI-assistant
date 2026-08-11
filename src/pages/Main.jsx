import { useState, useRef, useEffect } from "react";

const WEBHOOK_URL =
  "https://hook.us2.make.com/qibsyu9l74u2lv4kh77ks9cof5z99mqu";

export default function Homepage() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [displayedAnswer, setDisplayedAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasAnswer, setHasAnswer] = useState(false);
  const inputRef = useRef(null);

  // Typing animation effect
  useEffect(() => {
    if (!answer) {
      setDisplayedAnswer("");
      return;
    }
    setDisplayedAnswer("");
    let index = 0;
    const interval = setInterval(() => {
      if (index < answer.length) {
        setDisplayedAnswer(answer.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 18);
    return () => clearInterval(interval);
  }, [answer]);

  async function handleSend() {
    const text = query.trim();
    if (!text || isLoading) return;

    setIsLoading(true);
    setAnswer("");
    setHasAnswer(false);

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const contentType = res.headers.get("content-type") || "";
      let data;

      if (contentType.includes("application/json")) {
        data = await res.json();
        // Try to extract the answer from common response shapes
        setAnswer(
          typeof data === "string"
            ? data
            : data.answer || data.response || data.message || data.text || data.result || JSON.stringify(data)
        );
      } else {
        // Plain text response
        data = await res.text();
        setAnswer(data);
      }

      setHasAnswer(true);
    } catch (err) {
      console.error("Webhook error:", err);
      setAnswer("⚠️ Something went wrong. Please try again.");
      setHasAnswer(true);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <>
      {/* Inline styles for animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(60, 158, 118, 0.15), 0 8px 32px rgba(60, 158, 118, 0.08); }
          50% { box-shadow: 0 0 30px rgba(60, 158, 118, 0.25), 0 8px 40px rgba(60, 158, 118, 0.15); }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
        }
        @keyframes blinkCaret {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .answer-card {
          animation: fadeInUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .answer-card:hover {
          animation: pulseGlow 2s ease-in-out infinite;
        }
        .loading-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #3c9e76;
          margin: 0 3px;
          animation: dotBounce 1.2s ease-in-out infinite;
        }
        .loading-dot:nth-child(2) { animation-delay: 0.15s; }
        .loading-dot:nth-child(3) { animation-delay: 0.3s; }
        .typing-caret {
          display: inline-block;
          width: 2px;
          height: 1.1em;
          background: #3c9e76;
          margin-left: 2px;
          vertical-align: text-bottom;
          animation: blinkCaret 0.8s step-end infinite;
        }
      `}</style>

      <header className="w-full bg-[#FAFAFA] text-[#242424] shadow-[0_4px_10px_rgba(0,0,0,0.08)]">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Chat <span className="text-[#3c9e76]">Egy</span>
          </h1>
        </div>
      </header>

      <main className="min-h-[calc(100vh-64px)] w-full bg-[#FAFAFA] text-[#242424]">
        <div className="mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-5xl flex-col px-3 sm:px-5 md:px-8">
          {/* Center Content Area */}
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-2xl px-2 text-center">
              {/* Loading State */}
              {isLoading && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "16px",
                    animation: "fadeInUp 0.3s ease forwards",
                  }}
                >
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #3c9e76 0%, #2dd4a8 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 20px rgba(60, 158, 118, 0.3)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span className="loading-dot"></span>
                      <span className="loading-dot"></span>
                      <span className="loading-dot"></span>
                    </div>
                  </div>
                  <p
                    style={{
                      fontSize: "15px",
                      color: "rgba(36, 36, 36, 0.5)",
                      fontWeight: 500,
                    }}
                  >
                    Thinking...
                  </p>
                </div>
              )}

              {/* Answer Display */}
              {hasAnswer && !isLoading && (
                <div
                  className="answer-card"
                  style={{
                    position: "relative",
                    background: "rgba(255, 255, 255, 0.75)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    borderRadius: "20px",
                    border: "1px solid rgba(60, 158, 118, 0.2)",
                    padding: "32px 28px",
                    boxShadow:
                      "0 8px 32px rgba(60, 158, 118, 0.08), 0 2px 8px rgba(0,0,0,0.04)",
                    textAlign: "left",
                    overflow: "hidden",
                  }}
                >
                  {/* Top accent bar */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "3px",
                      background:
                        "linear-gradient(90deg, #3c9e76, #2dd4a8, #3c9e76)",
                      backgroundSize: "200% 100%",
                      animation: "shimmer 3s linear infinite",
                    }}
                  />

                  {/* Icon + Label */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "16px",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "10px",
                        background:
                          "linear-gradient(135deg, #3c9e76 0%, #2dd4a8 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                        boxShadow: "0 2px 8px rgba(60, 158, 118, 0.25)",
                      }}
                    >
                      ✨
                    </div>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#3c9e76",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      Chat Egy
                    </span>
                  </div>

                  {/* Answer Text */}
                  <p
                    style={{
                      fontSize: "16px",
                      lineHeight: 1.75,
                      color: "#242424",
                      margin: 0,
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                  >
                    {displayedAnswer}
                    {displayedAnswer.length < answer.length && (
                      <span className="typing-caret" />
                    )}
                  </p>
                </div>
              )}

              {/* Empty State */}
              {!hasAnswer && !isLoading && (
                <>
                  <h2 className="text-2xl font-semibold sm:text-3xl md:text-4xl">
                    How can I help you today?
                  </h2>
                  <p className="mt-3 text-sm text-[#242424]/60 sm:text-base">
                    Ask me anything about your Egyptian curriculum.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Input Area */}
          <div className="w-full pb-4 sm:pb-6 md:pb-8">
            <div className="mx-auto flex w-full max-w-3xl items-end gap-2">
              {/* Input Box */}
              <div className="flex min-h-[52px] flex-1 items-center rounded-2xl border border-[#242424]/15 bg-white px-3 shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition focus-within:border-[#3c9e76] focus-within:shadow-[0_2px_12px_rgba(60,158,118,0.12)] sm:min-h-[58px] sm:px-4">
                {/* Plus Button */}
                <button
                  type="button"
                  className="mr-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#3c9e76] text-xl font-medium text-white transition hover:bg-[#328764] active:scale-95 sm:h-10 sm:w-10"
                >
                  +
                </button>

                {/* Text Input */}
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your question..."
                  disabled={isLoading}
                  className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#242424] outline-none placeholder:text-[#242424]/45 sm:text-base disabled:opacity-50"
                />
              </div>

              {/* Send Button */}
              <button
                type="button"
                onClick={handleSend}
                disabled={isLoading || !query.trim()}
                className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl bg-[#3c9e76] text-white shadow-sm transition hover:bg-[#328764] active:scale-95 sm:h-[58px] sm:w-[58px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M22 2L11 13"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M22 2L15 22L11 13L2 9L22 2Z"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Small Disclaimer */}
            <p className="mt-3 px-4 text-center text-[10px] text-[#242424]/45 sm:text-xs">
              Chat Egy can make mistakes. Check important information.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
