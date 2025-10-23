import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../api/blogs";
import { FaCode, FaTerminal, FaDatabase, FaReact, FaCalendarAlt, FaArrowRight, FaBlog, FaGamepad, FaTrophy, FaPlay, FaPause } from "react-icons/fa";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Game state
  const [gameActive, setGameActive] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [gameTime, setGameTime] = useState(30);
  const [currentWord, setCurrentWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [gameWords] = useState([
    "React", "JavaScript", "Node.js", "Database", "API", "Frontend", "Backend", 
    "Component", "State", "Props", "Hook", "Router", "Express", "MongoDB", 
    "PostgreSQL", "Authentication", "Authorization", "Middleware", "CORS"
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllBlogs();
        setBlogs(data);
      } catch (error) {
        // Error fetching blogs
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Game functions
  const startGame = () => {
    setGameActive(true);
    setGameScore(0);
    setGameTime(30);
    setUserInput("");
    generateNewWord();
  };

  const generateNewWord = () => {
    const randomWord = gameWords[Math.floor(Math.random() * gameWords.length)];
    setCurrentWord(randomWord);
    setUserInput("");
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
    
    if (value.toLowerCase() === currentWord.toLowerCase()) {
      setGameScore(prev => prev + 1);
      generateNewWord();
    }
  };

  const stopGame = () => {
    setGameActive(false);
    setCurrentWord("");
    setUserInput("");
  };

  // Game timer
  useEffect(() => {
    let timer;
    if (gameActive && gameTime > 0) {
      timer = setTimeout(() => setGameTime(prev => prev - 1), 1000);
    } else if (gameTime === 0) {
      setGameActive(false);
    }
    return () => clearTimeout(timer);
  }, [gameActive, gameTime]);

  return (
    <section className="relative min-h-screen py-16 sm:py-24 bg-black text-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-500/10 to-purple-500/10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-cyan-500/5 pointer-events-none"></div>
      
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-15 bg-[url('/assets/grid.svg')] bg-cover pointer-events-none animate-pulse"></div>

      {/* Floating tech elements */}
      <div className="absolute top-20 left-4 sm:left-10 text-cyan-400/30 animate-bounce">
        <FaCode className="text-xl sm:text-2xl" />
      </div>
      <div className="absolute top-40 right-10 sm:right-20 text-blue-400/30 animate-bounce" style={{ animationDelay: '1s' }}>
        <FaTerminal className="text-xl sm:text-2xl" />
      </div>
      <div className="absolute bottom-40 left-10 sm:left-20 text-purple-400/30 animate-bounce" style={{ animationDelay: '2s' }}>
        <FaDatabase className="text-xl sm:text-2xl" />
      </div>
      <div className="absolute bottom-20 right-4 sm:right-10 text-cyan-400/30 animate-bounce" style={{ animationDelay: '0.5s' }}>
        <FaReact className="text-xl sm:text-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 z-10">
        {/* Page title */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-3 sm:mb-4 drop-shadow-lg">
            My <span className="text-cyan-400">Blogs</span>
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full mb-3 sm:mb-4"></div>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-4">
            Thoughts, tutorials, and insights from my development journey
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center space-x-2 text-cyan-400">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-400"></div>
              <span>Loading blogs...</span>
            </div>
          </div>
        )}

        {/* Interactive Game Section */}
        <div className="mb-8 sm:mb-12">
          <div className="bg-gradient-to-br from-neutral-900/50 to-neutral-800/30 rounded-2xl p-4 sm:p-6 border border-cyan-500/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
              <h3 className="text-lg sm:text-xl font-bold text-cyan-400 flex items-center">
                <FaGamepad className="mr-2" />
                Developer Typing Challenge
              </h3>
              {!gameActive && (
                <button
                  onClick={startGame}
                  className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg transition-colors touch-manipulation"
                >
                  <FaPlay className="text-sm" />
                  <span>Start Game</span>
                </button>
              )}
            </div>
            
            {gameActive ? (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <div className="flex justify-center sm:justify-start space-x-6">
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-bold text-cyan-400">{gameScore}</div>
                      <div className="text-xs text-gray-400">Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-bold text-blue-400">{gameTime}</div>
                      <div className="text-xs text-gray-400">Time</div>
                    </div>
                  </div>
                  <button
                    onClick={stopGame}
                    className="flex items-center justify-center space-x-2 px-3 py-1 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold rounded transition-colors touch-manipulation"
                  >
                    <FaPause className="text-xs" />
                    <span>Stop</span>
                  </button>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-2">{currentWord}</div>
                  <input
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    className="w-full max-w-md px-4 py-2 bg-neutral-800 border border-cyan-500/30 rounded-lg text-white text-center text-base sm:text-lg focus:outline-none focus:border-cyan-400 touch-manipulation"
                    placeholder="Type the word above..."
                    autoFocus
                  />
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-gray-300 mb-4">
                  Type as many developer terms as you can in 30 seconds!
                </div>
                {gameScore > 0 && (
                  <div className="flex items-center justify-center space-x-2 text-cyan-400">
                    <FaTrophy />
                    <span>Final Score: {gameScore}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Blog grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {blogs.length === 0 ? (
              <div className="col-span-full text-center py-8 sm:py-12">
                <div className="bg-gradient-to-br from-neutral-900/50 to-neutral-800/30 rounded-2xl p-6 sm:p-8 border border-cyan-500/20">
                  <FaBlog className="text-3xl sm:text-4xl text-cyan-400 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold text-cyan-400 mb-2">No Blogs Yet</h3>
                  <p className="text-gray-300 text-sm sm:text-base">Check back soon for new content!</p>
                </div>
              </div>
            ) : (
              blogs.map((blog, index) => (
                <div
                  key={blog.id}
                  className="group bg-gradient-to-br from-neutral-900/50 to-neutral-800/30 border border-cyan-500/20 rounded-2xl shadow-2xl p-4 sm:p-6 hover:border-cyan-400/40 transition-all duration-300 hover:scale-105 flex flex-col"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Blog header */}
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex-1">
                      {/* Blog title */}
                      <h3 className="text-lg sm:text-xl font-bold text-cyan-400 mb-2 group-hover:text-cyan-300 transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      
                      {/* Blog publication date */}
                      <div className="flex items-center space-x-2 text-xs text-gray-400 mb-2 sm:mb-3">
                        <FaCalendarAlt className="text-cyan-400" />
                        <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    {/* Blog icon */}
                    <div className="p-1.5 sm:p-2 bg-cyan-500/20 rounded-lg group-hover:bg-cyan-500/30 transition-colors">
                      <FaBlog className="text-cyan-400 text-base sm:text-lg group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                  </div>
                  
                  {/* Blog content preview */}
                  <div className="flex-1">
                    <p className="text-gray-300 mb-4 leading-relaxed text-sm line-clamp-4">
                      {blog.content.length > 150 
                        ? `${blog.content.substring(0, 150)}...` 
                        : blog.content
                      }
                    </p>
                  </div>
                  
                  {/* Read more link */}
                  <div className="mt-auto">
                    <a
                      href={`/blogs/${blog.id}`}
                      className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors group text-sm"
                    >
                      <span>Read More</span>
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;