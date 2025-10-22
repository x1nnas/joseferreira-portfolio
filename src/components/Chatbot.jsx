import React, { useState } from "react";
import { FaRobot, FaComments, FaTimes, FaCode, FaTerminal, FaDatabase } from "react-icons/fa";

const Chatbot = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <div className="group cursor-pointer" onClick={handleClick}>
          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-full p-4 shadow-xl hover:shadow-cyan-400/20 transition-all duration-300 hover:scale-110">
            <FaRobot className="text-cyan-400 text-2xl group-hover:text-cyan-300 transition-colors duration-300" />
          </div>
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
        </div>
      </div>

      {/* Warning Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-cyan-400/30 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-bounceIn">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-full p-3">
                  <FaRobot className="text-cyan-400 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">AI Assistant</h3>
                  <p className="text-cyan-400 text-sm">Under Development</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <FaCode className="text-cyan-400" />
                  <span className="text-cyan-400 font-semibold">Status: In Development</span>
                </div>
                <p className="text-gray-300 text-sm">
                  The AI assistant is still being developed. 
                  It will help with coding questions once it's ready!
                </p>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <FaTerminal className="text-green-400" />
                  <span>Code Analysis</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaDatabase className="text-blue-400" />
                  <span>Database Queries</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-400/20 rounded-lg p-3">
                <p className="text-yellow-400 text-sm font-semibold">
                  💡 Feel free to explore the rest of the site!
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
