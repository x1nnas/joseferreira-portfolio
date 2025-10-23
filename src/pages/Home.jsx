import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaTerminal, FaDatabase, FaReact, FaNodeJs, FaUser, FaArrowRight, FaChevronDown, FaRobot, FaComments } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  const [currentTech, setCurrentTech] = useState(0);
  
  const technologies = [
    "React Developer",
    "Node.js Engineer", 
    "Full-Stack Developer",
    "JavaScript Expert",
    "Database Architect"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTech((prev) => (prev + 1) % technologies.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [technologies.length]);

  return (
    <section className="relative h-screen flex items-center justify-center bg-black text-white overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/20 to-purple-500/20 pointer-events-none"></div>
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-15 bg-[url('/assets/grid.svg')] bg-cover pointer-events-none animate-pulse"></div>
      
      {/* Glow effects */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute top-40 right-32 w-24 h-24 bg-blue-500/25 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-40 left-32 w-28 h-28 bg-purple-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 right-20 w-20 h-20 bg-cyan-500/30 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-1/2 left-16 w-36 h-36 bg-yellow-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/3 right-16 w-32 h-32 bg-green-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2.5s' }}></div>
      <div className="absolute bottom-1/3 left-24 w-24 h-24 bg-pink-500/25 rounded-full blur-xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      <div className="absolute top-2/3 right-24 w-28 h-28 bg-orange-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.3s' }}></div>
      <div className="absolute top-1/4 left-1/2 w-40 h-40 bg-red-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.8s' }}></div>
      <div className="absolute bottom-1/4 right-1/2 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2.2s' }}></div>
      <div className="absolute top-3/4 left-1/2 w-36 h-36 bg-teal-500/18 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.8s' }}></div>
      
      {/* Floating icons */}
      <div className="absolute top-32 left-16 text-cyan-400/60 animate-bounce group cursor-pointer">
        <a 
          href="https://www.reddit.com/r/ProgrammerHumor/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
        >
          <div className="bg-cyan-500/20 rounded-full p-3 group-hover:bg-cyan-500/30 transition-colors duration-300">
            <FaCode className="text-2xl group-hover:scale-110 transition-transform duration-300" />
          </div>
        </a>
      </div>
      <div className="absolute top-52 right-24 text-blue-400/60 animate-bounce group cursor-pointer" style={{ animationDelay: '1s' }}>
        <a 
          href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
        >
          <div className="bg-blue-500/20 rounded-full p-3 group-hover:bg-blue-500/30 transition-colors duration-300">
            <FaTerminal className="text-2xl group-hover:scale-110 transition-transform duration-300" />
          </div>
        </a>
      </div>
      <div className="absolute bottom-48 left-24 text-purple-400/60 animate-bounce group cursor-pointer" style={{ animationDelay: '2s' }}>
        <a 
          href="https://www.reddit.com/r/ProgrammerHumor/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
        >
          <div className="bg-purple-500/20 rounded-full p-3 group-hover:bg-purple-500/30 transition-colors duration-300">
            <FaDatabase className="text-2xl group-hover:scale-110 transition-transform duration-300" />
          </div>
        </a>
      </div>
      <div className="absolute bottom-32 right-10 text-cyan-400/60 animate-bounce group cursor-pointer" style={{ animationDelay: '0.5s' }}>
        <a 
          href="https://react.dev" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
        >
          <div className="bg-cyan-500/20 rounded-full p-3 group-hover:bg-cyan-500/30 transition-colors duration-300">
            <FaReact className="text-2xl group-hover:scale-110 transition-transform duration-300" />
          </div>
        </a>
      </div>


      {/* Animated code lines */}
      <div className="absolute top-1/4 left-1/4 text-cyan-400/30 text-xs font-mono animate-pulse">
        <div className="opacity-60">const developer = {`{`}</div>
        <div className="ml-4 opacity-40">name: "Jose",</div>
        <div className="ml-4 opacity-40">skills: ["React", "Node.js"]</div>
        <div className="opacity-60">{`}`}</div>
      </div>

      {/* Animated binary code */}
      <div className="absolute bottom-1/4 right-1/4 text-purple-400/30 text-xs font-mono animate-pulse">
        <div className="opacity-60">01001000 01100101 01101100 01101100 01101111</div>
        <div className="opacity-40">01110111 01101111 01110010 01101100 01100100</div>
      </div>

      {/* Additional subtle code lines - Top right */}
      <div className="absolute top-1/3 right-1/4 text-blue-400/25 text-xs font-mono animate-pulse" style={{ animationDelay: '1s' }}>
        <div className="opacity-50">function buildApp() {`{`}</div>
        <div className="ml-4 opacity-30">return "cool stuff";</div>
        <div className="opacity-50">{`}`}</div>
      </div>

      {/* Additional subtle code lines - Bottom left */}
      <div className="absolute bottom-1/3 left-1/6 text-purple-400/25 text-xs font-mono animate-pulse" style={{ animationDelay: '2s' }}>
        <div className="opacity-50">if (passion === true) {`{`}</div>
        <div className="ml-4 opacity-30">createMagic();</div>
        <div className="opacity-50">{`}`}</div>
      </div>

      {/* Additional subtle code lines - Center right */}
      <div className="absolute top-1/2 right-1/6 text-cyan-400/20 text-xs font-mono animate-pulse" style={{ animationDelay: '0.5s' }}>
        <div className="opacity-40">// Always learning</div>
        <div className="opacity-30">// Always coding</div>
      </div>

      {/* More code lines for dark blue area - Top center */}
      <div className="absolute top-1/5 left-1/2 transform -translate-x-1/2 text-blue-400/25 text-xs font-mono animate-pulse" style={{ animationDelay: '1.5s' }}>
        <div className="opacity-50">const portfolio = {`{`}</div>
        <div className="ml-4 opacity-30">projects: "cool",</div>
        <div className="ml-4 opacity-30">passion: "high"</div>
        <div className="opacity-50">{`}`}</div>
      </div>

      {/* More code lines for dark blue area - Bottom center */}
      <div className="absolute bottom-1/5 left-1/2 transform -translate-x-1/2 text-purple-400/25 text-xs font-mono animate-pulse" style={{ animationDelay: '2.5s' }}>
        <div className="opacity-50">async function innovate() {`{`}</div>
        <div className="ml-4 opacity-30">await buildFuture();</div>
        <div className="opacity-50">{`}`}</div>
      </div>

      {/* More code lines for dark blue area - Left center */}
      <div className="absolute top-1/2 left-1/8 text-cyan-400/20 text-xs font-mono animate-pulse" style={{ animationDelay: '3s' }}>
        <div className="opacity-40">// Building the future</div>
        <div className="opacity-30">// One line at a time</div>
      </div>


      <div className="text-center w-full max-w-6xl mx-auto px-4 sm:px-8 z-10">
        {/* Developer avatar with glow effect */}
        <div className="relative mb-6 sm:mb-8">
          <div className="absolute inset-0 bg-cyan-500/30 rounded-full blur-2xl scale-125 animate-pulse"></div>
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl scale-115 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute inset-0 bg-purple-500/15 rounded-full blur-lg scale-110 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <img
            src="/assets/avatar.png"
            alt="Jose Ferreira - Developer"
            className="relative w-48 h-42 sm:w-64 sm:h-56 mx-auto rounded-full border-4 border-cyan-500 shadow-2xl hover:scale-105 transition-transform duration-300"
          />
          {/* Floating tech icons around avatar */}
          <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-gradient-to-br from-cyan-500 to-cyan-600 text-black p-2 sm:p-3 rounded-full animate-bounce shadow-lg group cursor-pointer">
            <FaReact className="text-lg sm:text-xl group-hover:rotate-180 transition-transform duration-500" />
          </div>
          <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white p-2 sm:p-3 rounded-full animate-bounce shadow-lg group cursor-pointer" style={{ animationDelay: '1s' }}>
            <FaNodeJs className="text-lg sm:text-xl group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="absolute -top-1 -left-4 sm:-top-2 sm:-left-8 bg-gradient-to-br from-purple-500 to-purple-600 text-white p-1.5 sm:p-2 rounded-full animate-pulse group cursor-pointer" style={{ animationDelay: '2s' }}>
            <FaCode className="text-sm sm:text-lg group-hover:rotate-90 transition-transform duration-300" />
          </div>
          <div className="absolute -bottom-1 -right-4 sm:-bottom-2 sm:-right-8 bg-gradient-to-br from-cyan-500 to-cyan-600 text-black p-1.5 sm:p-2 rounded-full animate-pulse group cursor-pointer" style={{ animationDelay: '0.5s' }}>
            <FaDatabase className="text-sm sm:text-lg group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>

        {/* Dynamic developer introduction */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-3 sm:mb-4 drop-shadow-lg">
            I'm <span className="text-cyan-400">Jose</span>
          </h1>
          <div className="text-lg sm:text-2xl md:text-3xl font-bold text-cyan-400 mb-3 sm:mb-4 h-8 sm:h-12 flex items-center justify-center">
            <span className="animate-fadeIn">
              {technologies[currentTech]}
            </span>
          </div>
          <div className="flex justify-center items-center space-x-4 mb-6">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 opacity-90 drop-shadow-md max-w-2xl mx-auto px-4">
          I craft <span className="text-cyan-400 font-semibold">scalable web applications</span> and 
          <span className="text-blue-400 font-semibold"> modern user experiences</span> using modern technologies.
        </p>

        {/* Tech stack showcase */}
        <div className="flex justify-center items-center space-x-8 mb-6">
          <div className="group relative">
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-full p-4 group-hover:from-blue-500/30 group-hover:to-blue-600/30 transition-all duration-300">
              <FaReact className="text-3xl text-blue-400 group-hover:text-blue-300 group-hover:rotate-180 transition-all duration-500" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
          </div>
          <div className="group relative">
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-full p-4 group-hover:from-green-500/30 group-hover:to-green-600/30 transition-all duration-300">
              <FaNodeJs className="text-3xl text-green-400 group-hover:text-green-300 group-hover:scale-110 transition-all duration-300" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          </div>
          <div className="group relative">
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-full p-4 group-hover:from-purple-500/30 group-hover:to-purple-600/30 transition-all duration-300">
              <FaDatabase className="text-3xl text-purple-400 group-hover:text-purple-300 group-hover:scale-110 transition-all duration-300" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          </div>
          <div className="group relative">
            <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-full p-4 group-hover:from-yellow-500/30 group-hover:to-yellow-600/30 transition-all duration-300">
              <FaCode className="text-3xl text-yellow-400 group-hover:text-yellow-300 group-hover:rotate-90 transition-all duration-300" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
          </div>
        </div>

        {/* Call-to-action buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-4 sm:mb-6 px-4">
          <Link
            to="/projects"
            className="group bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold shadow-lg hover:from-cyan-500 hover:to-blue-500 hover:scale-105 transition-all duration-300 flex items-center justify-center text-sm sm:text-base touch-manipulation"
          >
            <FaCode className="mr-2 group-hover:animate-spin" />
            View My Work
          </Link>
          <Link
            to="/contact"
            className="group border-2 border-cyan-500 px-6 sm:px-8 py-3 rounded-lg font-semibold text-cyan-400 hover:bg-cyan-500 hover:text-black hover:scale-105 transition-all duration-300 flex items-center justify-center text-sm sm:text-base touch-manipulation"
          >
            <FaEnvelope className="mr-2 group-hover:animate-bounce" />
            Let's Connect
          </Link>
        </div>

        {/* Social media links */}
        <div className="flex justify-center space-x-6 sm:space-x-8 text-2xl sm:text-3xl text-cyan-500/80 mb-4 sm:mb-6">
          <a
            href="https://github.com/x1nnas"
            target="_blank"
            rel="noreferrer"
            className="group hover:text-cyan-400 transition-all duration-300 hover:scale-110"
            title="GitHub Profile"
          >
            <FaGithub className="group-hover:animate-bounce" />
          </a>
          <a
            href="https://www.linkedin.com/in/jose-msferreira/"
            target="_blank"
            rel="noreferrer"
            className="group hover:text-blue-400 transition-all duration-300 hover:scale-110"
            title="LinkedIn Profile"
          >
            <FaLinkedin className="group-hover:animate-bounce" />
          </a>
          <a
            href="mailto:jmsfbusiness@gmail.com"
            target="_blank"
            rel="noreferrer"
            className="group hover:text-purple-400 transition-all duration-300 hover:scale-110"
            title="Email Me"
          >
            <FaEnvelope className="group-hover:animate-bounce" />
          </a>
        </div>

        {/* Developer stats */}
        <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto px-4">
          <div className="group text-center p-6 bg-gradient-to-br from-neutral-900/50 to-neutral-800/50 rounded-lg border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">3+</div>
            <div className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300">Years Experience</div>
            <div className="w-full bg-cyan-400/20 rounded-full h-1 mt-2 group-hover:bg-cyan-400/40 transition-colors duration-300"></div>
          </div>
          <div className="group text-center p-6 bg-gradient-to-br from-neutral-900/50 to-neutral-800/50 rounded-lg border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors duration-300">10+</div>
            <div className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300">Projects Built</div>
            <div className="w-full bg-blue-400/20 rounded-full h-1 mt-2 group-hover:bg-blue-400/40 transition-colors duration-300"></div>
          </div>
          <div className="group text-center p-6 bg-gradient-to-br from-neutral-900/50 to-neutral-800/50 rounded-lg border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold text-purple-400 group-hover:text-purple-300 transition-colors duration-300">5+</div>
            <div className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300">Technologies</div>
            <div className="w-full bg-purple-400/20 rounded-full h-1 mt-2 group-hover:bg-purple-400/40 transition-colors duration-300"></div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default Home;