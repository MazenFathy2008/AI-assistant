export default function Homepage() {
  return (
    <>
      <header className="w-full bg-[#FAFAFA] text-[#242424] shadow-[0_4px_10px_rgba(0,0,0,0.08)]">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Chat <span className="text-[#3c9e76]">Egy</span>
          </h1>
        </div>
      </header>
      <main className="min-h-[calc(100vh-64px)] w-full bg-[#FAFAFA] text-[#242424]">
        {/* Chat Area */}
        <div className="mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-5xl flex-col px-3 sm:px-5 md:px-8">
          {/* Empty State */}
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-2xl px-2 text-center">
              <h2 className="text-2xl font-semibold sm:text-3xl md:text-4xl">
                How can I help you today?
              </h2>

              <p className="mt-3 text-sm text-[#242424]/60 sm:text-base">
                Ask me anything about your Egyptian curriculum.
              </p>
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
                  type="text"
                  placeholder="Type your question..."
                  className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#242424] outline-none placeholder:text-[#242424]/45 sm:text-base"
                />
              </div>

              {/* Send Button */}
              <button
                type="button"
                className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl bg-[#3c9e76] text-white shadow-sm transition hover:bg-[#328764] active:scale-95 sm:h-[58px] sm:w-[58px]"
              >
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
              </button>
            </div>

            {/* Small Disclaimer */}
            <p className="mt-3 px-4 text-center text-[10px] text-[#242424]/45 sm:text-xs">
              Chat Egy can make mistakes. Check important information.
            </p>
          </div>
        </div>
      </main>{" "}
    </>
  );
}
