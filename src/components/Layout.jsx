import { useEffect, useState } from "react";
import Header from "./Header";
import Chatbot from "./Chatbot";

// Layout component to wrap the application content
const Layout = ({ children }) => {
  const [showMobileNotice, setShowMobileNotice] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem("mobileNoticeDismissed") === "true";
    if (!isDismissed) {
      setShowMobileNotice(true);
    }
  }, []);

  const dismissMobileNotice = () => {
    localStorage.setItem("mobileNoticeDismissed", "true");
    setShowMobileNotice(false);
  };

  return (
    <>
      <Header /> {/* Render the Header component */}
      <main>
        {showMobileNotice && (
          <div className="sm:hidden mx-4 mt-20 mb-2 rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 text-cyan-100">
            <div className="flex items-start justify-between gap-3">
              <p className="text-xs leading-relaxed">
                For the best viewing experience, rotate your phone or use a
                larger screen.
              </p>
              <button
                type="button"
                onClick={dismissMobileNotice}
                className="shrink-0 rounded-md bg-cyan-500/20 px-2 py-1 text-[11px] font-semibold hover:bg-cyan-500/30"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
        {children}
      </main>
      {/* Render the main content passed as children */}
      <Chatbot /> {/* Global chatbot component */}
    </>
  );
};

export default Layout;
