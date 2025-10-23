import React from "react";
import { FaCode, FaTerminal, FaDatabase, FaReact, FaNodeJs, FaGithub, FaLinkedin, FaProjectDiagram, FaArrowRight, FaChevronDown, FaPlane, FaGlobe, FaGamepad, FaRocket, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="relative min-h-screen pt-16 flex items-center justify-center bg-black overflow-hidden">
      {/* Dynamic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/30 to-cyan-900/20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10"></div>
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-20 bg-[url('/assets/grid.svg')] bg-cover animate-pulse"></div>
      

      {/* Floating tech elements */}
      <div className="absolute top-20 left-10 text-cyan-400/40 animate-bounce">
        <FaCode className="text-2xl" />
      </div>
      <div className="absolute top-40 right-20 text-blue-400/40 animate-bounce" style={{ animationDelay: '1s' }}>
        <FaTerminal className="text-2xl" />
      </div>
      <div className="absolute bottom-40 left-20 text-purple-400/40 animate-bounce" style={{ animationDelay: '2s' }}>
        <FaDatabase className="text-2xl" />
      </div>
      <div className="absolute bottom-20 right-10 text-cyan-400/40 animate-bounce" style={{ animationDelay: '0.5s' }}>
        <FaReact className="text-2xl" />
      </div>

      {/* Content container - wider layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8 text-white">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-3 sm:mb-4 drop-shadow-lg">
            About <span className="text-cyan-400">Me</span>
        </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        {/* Journey Timeline - Optimized for horizontal space */}
        <div className="space-y-4">
              {/* Introduction */}
              <div className="text-center mb-4 px-4">
                <p className="text-lg sm:text-2xl text-gray-300 mb-3">
                  From <span className="text-cyan-400 font-bold">35+ countries</span> to <span className="text-blue-400 font-bold">full-stack development</span>
                </p>
                <p className="text-base sm:text-lg text-gray-400 mb-2">
                  A unique journey from cabin crew to code
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  Born in 2000 • Global Experience • Tech Passion • Future-Focused
                </p>
              </div>

              {/* Career transition - Static centered with path */}
              <div className="flex justify-center items-center mb-4 sm:mb-6 mt-4 sm:mt-6 px-4">
                <div className="relative flex items-center">
                  {/* Starting plane position */}
                  <div className="text-blue-400 text-2xl sm:text-4xl z-10">
                    <FaPlane className="opacity-80" />
                  </div>
                  
                  {/* Transition path with fixed arrow */}
                  <div className="relative mx-4 sm:mx-8">
                    <div className="w-16 sm:w-32 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-cyan-400 opacity-60"></div>
                    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1 text-cyan-400 text-xl sm:text-3xl">
                      <FaArrowRight className="drop-shadow-sm" />
                    </div>
                  </div>
                  
                  {/* Code icon - destination */}
                  <div className="text-cyan-400 text-2xl sm:text-4xl z-10">
                    <FaCode className="opacity-80" />
                  </div>
                </div>
              </div>

          {/* Timeline - 3 column layout for better horizontal usage */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Journey Timeline - Horizontal Layout */}
            <div className="lg:col-span-2">
              <h3 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-4 sm:mb-6 flex items-center">
                <FaGlobe className="mr-2 sm:mr-3" />
                My Journey
              </h3>
              
              {/* Journey timeline - better grid layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {/* 2018 - Italy */}
                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-3 sm:p-4 rounded-lg border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300">
                  <div className="flex items-center mb-2">
                    <FaCalendarAlt className="text-cyan-400 mr-2 text-sm" />
                    <span className="text-cyan-400 font-semibold text-sm sm:text-base">2018</span>
                    <span className="text-gray-400 text-xs ml-2">Age 18</span>
                  </div>
                  <h4 className="text-white font-semibold mb-2 text-sm sm:text-base">Italy Cabin Crew ✈️</h4>
                  <p className="text-gray-300 text-xs sm:text-sm mb-2">Moved to Italy at 18 to work as cabin crew</p>
                  <p className="text-gray-400 text-xs">• Developed customer service skills</p>
                  <p className="text-gray-400 text-xs">• Learned to work under pressure</p>
                  <p className="text-gray-400 text-xs">• Gained international experience</p>
                </div>

                {/* 2020 - Customer Support */}
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-3 sm:p-4 rounded-lg border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
                  <div className="flex items-center mb-2">
                    <FaCalendarAlt className="text-blue-400 mr-2 text-sm" />
                    <span className="text-blue-400 font-semibold text-sm sm:text-base">2020</span>
                    <span className="text-gray-400 text-xs ml-2">Age 20</span>
                  </div>
                  <h4 className="text-white font-semibold mb-2 text-sm sm:text-base">Customer Support Agent 💬</h4>
                  <p className="text-gray-300 text-xs sm:text-sm mb-2">Customer support agent - honing communication skills</p>
                  <p className="text-gray-400 text-xs">• Problem-solving under pressure</p>
                  <p className="text-gray-400 text-xs">• Multi-language communication</p>
                  <p className="text-gray-400 text-xs">• Technical troubleshooting</p>
                </div>

                {/* 2021 - Dubai */}
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-3 sm:p-4 rounded-lg border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
                  <div className="flex items-center mb-2">
                    <FaMapMarkerAlt className="text-purple-400 mr-2 text-sm" />
                    <span className="text-purple-400 font-semibold text-sm sm:text-base">2021</span>
                    <span className="text-gray-400 text-xs ml-2">Age 21</span>
                  </div>
                  <h4 className="text-white font-semibold mb-2 text-sm sm:text-base">Dubai Flight Attendant 🌍</h4>
                  <p className="text-gray-300 text-xs sm:text-sm mb-2">Dubai flight attendant - visited 35+ countries</p>
                  <p className="text-gray-400 text-xs">• Asia became my favorite continent!</p>
                  <p className="text-gray-400 text-xs">• Cultural adaptability</p>
                  <p className="text-gray-400 text-xs">• Developed interest in technologies and gaming</p>
                </div>

                {/* 2023 - Programming */}
                <div className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 p-3 sm:p-4 rounded-lg border border-green-500/20 hover:border-green-400/40 transition-all duration-300">
                  <div className="flex items-center mb-2">
                    <FaCode className="text-green-400 mr-2 text-sm" />
                    <span className="text-green-400 font-semibold text-sm sm:text-base">2023</span>
                    <span className="text-gray-400 text-xs ml-2">Age 23</span>
                  </div>
                  <h4 className="text-white font-semibold mb-2 text-sm sm:text-base">Active Programming Learning 🚀</h4>
                  <p className="text-gray-300 text-xs sm:text-sm mb-2">Started actively learning programming</p>
                  <p className="text-gray-400 text-xs">• From gaming & tech interest to full-stack development</p>
                  <p className="text-gray-400 text-xs">• Self-taught developer journey</p>
                  <p className="text-gray-400 text-xs">• Building real projects</p>
                </div>
              </div>
            </div>

            {/* Right Column - Compact Skills & Goals */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center">
                <FaRocket className="mr-2" />
                Current Focus
              </h3>

              {/* Tech Stack - Compact */}
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-3 rounded-lg border border-cyan-500/20">
                <h4 className="text-sm font-semibold text-cyan-400 mb-2">Tech Stack</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center">
                    <FaReact className="text-cyan-400 mr-1 text-sm" />
                    <span className="text-xs">React</span>
                  </div>
                  <div className="flex items-center">
                    <FaNodeJs className="text-green-400 mr-1 text-sm" />
                    <span className="text-xs">Node.js</span>
                  </div>
                  <div className="flex items-center">
                    <FaDatabase className="text-purple-400 mr-1 text-sm" />
                    <span className="text-xs">Databases</span>
                  </div>
                  <div className="flex items-center">
                    <FaCode className="text-blue-400 mr-1 text-sm" />
                    <span className="text-xs">JavaScript</span>
                  </div>
                </div>
              </div>

              {/* Future Goals - Compact */}
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-3 rounded-lg border border-purple-500/20">
                <h4 className="text-sm font-semibold text-purple-400 mb-2">Future Goals</h4>
                <p className="text-white text-xs mb-1">🎯 Full-stack developer</p>
                <p className="text-white text-xs">🚀 Solidity & blockchain</p>
              </div>

              {/* Work Ethic & Dedication */}
              <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 p-3 rounded-lg border border-yellow-500/20">
                <h4 className="text-sm font-semibold text-yellow-400 mb-2">Work Ethic & Dedication</h4>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1 text-xs">💪</span>
                    <p className="text-white text-xs">Hard-working and dedicated</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1 text-xs">🌍</span>
                    <p className="text-white text-xs">35+ countries - adaptable</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1 text-xs">🎯</span>
                    <p className="text-white text-xs">Goal-oriented and focused</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1 text-xs">📚</span>
                    <p className="text-white text-xs">Self-taught and always learning</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        </div>

    </section>
  );
};

export default About;
