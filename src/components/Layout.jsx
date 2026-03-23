import { useEffect, useState } from "react";
import Header from "./Header";
import Chatbot from "./Chatbot";

// Layout component to wrap the application content
const Layout = ({ children }) => {
  const [showTinyScreenNotice, setShowTinyScreenNotice] = useState(false);

  useEffect(() => {
    const isDismissed =
      localStorage.getItem("tinyScreenNoticeDismissed") === "true";
    const isTinyScreen = window.matchMedia("(max-width: 360px)").matches;
    setShowTinyScreenNotice(!isDismissed && isTinyScreen);
  }, []);

  const dismissTinyScreenNotice = () => {
    localStorage.setItem("tinyScreenNoticeDismissed", "true");
    setShowTinyScreenNotice(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header /> {/* Render the Header component */}
      <main className="flex-1">
        {showTinyScreenNotice && (
          <div className="fixed bottom-3 left-3 right-3 z-40 max-w-sm mx-auto rounded-xl border border-cyan-400/30 bg-black/85 backdrop-blur px-4 py-3 text-cyan-100">
            <div className="flex items-start justify-between gap-3">
              <p className="text-xs leading-relaxed">
                Optimized for larger displays. On very small screens, rotating
                your device can improve readability.
              </p>
              <button
                type="button"
                onClick={dismissTinyScreenNotice}
                className="shrink-0 rounded-md bg-cyan-500/20 px-2 py-1 text-[11px] font-semibold hover:bg-cyan-500/30"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
        {children}
      </main>
      <div className="fixed bottom-0 inset-x-0 z-20 pointer-events-none pb-1">
        <p className="text-center text-[10px] sm:text-[11px] tracking-[0.08em] uppercase text-cyan-200/30">
          Jose Ferreira @ 2026
        </p>
      </div>
      <Chatbot /> {/* Global chatbot component */}
    </div>
  );
};

export default Layout;
