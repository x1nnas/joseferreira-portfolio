import React from "react";
import { FaCode, FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs, FaDatabase, FaTerminal } from "react-icons/fa";

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.",
      tech: ["React", "Node.js", "PostgreSQL"],
      icon: FaReact,
      color: "cyan"
    },
    {
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      tech: ["React", "Socket.io", "MongoDB"],
      icon: FaCode,
      color: "blue"
    },
    {
      title: "Data Analytics Dashboard",
      description: "Interactive dashboard for data visualization with real-time charts, filtering capabilities, and export functionality.",
      tech: ["React", "D3.js", "Python"],
      icon: FaDatabase,
      color: "purple"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      cyan: "border-cyan-500/30 hover:border-cyan-400/50 text-cyan-400 bg-cyan-500/10",
      blue: "border-blue-500/30 hover:border-blue-400/50 text-blue-400 bg-blue-500/10",
      purple: "border-purple-500/30 hover:border-purple-400/50 text-purple-400 bg-purple-500/10"
    };
    return colorMap[color] || colorMap.cyan;
  };

  return (
    <section className="relative h-screen flex flex-col justify-center pt-16 bg-black text-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-500/10 to-purple-500/10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-cyan-500/5 pointer-events-none"></div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-15 bg-[url('/assets/grid.svg')] bg-cover pointer-events-none animate-pulse"></div>

      {/* Floating tech elements */}
      <div className="absolute top-20 left-10 text-cyan-400/30 animate-bounce">
        <FaCode className="text-2xl" />
      </div>
      <div className="absolute top-40 right-20 text-blue-400/30 animate-bounce" style={{ animationDelay: '1s' }}>
        <FaTerminal className="text-2xl" />
      </div>
      <div className="absolute bottom-40 left-20 text-purple-400/30 animate-bounce" style={{ animationDelay: '2s' }}>
        <FaDatabase className="text-2xl" />
      </div>
      <div className="absolute bottom-20 right-10 text-cyan-400/30 animate-bounce" style={{ animationDelay: '0.5s' }}>
        <FaNodeJs className="text-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-4 z-10">
        {/* Page title */}
        <div className="text-center mb-8">
          <h2 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
            My <span className="text-cyan-400">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
          <p className="text-lg text-gray-300 mt-4 max-w-2xl mx-auto">
            Showcasing my latest work and innovative solutions
          </p>
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => {
            const IconComponent = project.icon;
            const colorClasses = getColorClasses(project.color);
            
            return (
              <div
                key={i}
                className={`group bg-gradient-to-br from-neutral-900/50 to-neutral-800/30 border rounded-2xl shadow-2xl p-6 min-h-[400px] hover:scale-105 transition-all duration-300 ${colorClasses.split(' ')[0]} ${colorClasses.split(' ')[1]}`}
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {/* Project icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${colorClasses.split(' ')[2]} ${colorClasses.split(' ')[3]}`}>
                    <IconComponent className="text-2xl group-hover:rotate-180 transition-transform duration-500" />
                  </div>
                  <div className="flex space-x-2">
                    <a href="#" className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors">
                      <FaGithub className="text-lg" />
                    </a>
                    <a href="#" className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors">
                      <FaExternalLinkAlt className="text-lg" />
                    </a>
                  </div>
                </div>

                {/* Project title */}
                <h3 className="text-2xl font-bold mb-3 group-hover:text-white transition-colors">
                  {project.title}
                </h3>

                {/* Project description */}
                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-neutral-800 rounded-full text-xs font-medium text-gray-300 hover:bg-neutral-700 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* View details link */}
                <a
                  href="#"
                  className={`inline-flex items-center text-sm font-semibold hover:underline transition-colors ${colorClasses.split(' ')[4]}`}
                >
                  View Details
                  <FaExternalLinkAlt className="ml-2 text-xs" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;