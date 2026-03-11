import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaExternalLinkAlt,
  FaGithub,
  FaCode,
  FaReact,
  FaDatabase,
} from "react-icons/fa";
import { projects } from "../data/projects";

const iconMap = {
  react: FaReact,
  code: FaCode,
  database: FaDatabase,
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <section className="relative min-h-screen py-24 bg-black text-white px-6">
        <div className="relative max-w-3xl mx-auto z-10">
          <div className="bg-gradient-to-br from-neutral-900/70 to-neutral-800/40 rounded-2xl p-8 border border-red-500/20">
            <h2 className="text-2xl font-bold text-red-400 mb-4">
              Project Not Found
            </h2>
            <p className="text-gray-300 mb-6">
              The project you are looking for does not exist or has been
              removed.
            </p>
            <Link
              to="/projects"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg transition-colors"
            >
              <FaArrowLeft />
              <span>Back to Projects</span>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const IconComponent = iconMap[project.icon] || FaCode;

  return (
    <section className="relative min-h-screen py-24 bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-500/10 to-purple-500/10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 z-10">
        <div className="mb-6">
          <Link
            to="/projects"
            className="inline-flex items-center text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Projects
          </Link>
        </div>

        <div className="flex items-start justify-between mb-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/40">
              <IconComponent className="text-3xl text-cyan-400" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">
                {project.title}
              </h1>
              <p className="text-gray-300 text-sm sm:text-base">
                {project.shortDescription}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-sm hover:bg-neutral-800 transition-colors"
              >
                <FaGithub className="mr-2" />
                Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center px-3 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-sm font-semibold transition-colors"
              >
                <FaExternalLinkAlt className="mr-2" />
                Live Demo
              </a>
            )}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          <div className="bg-gradient-to-br from-neutral-900/70 to-neutral-800/40 rounded-2xl p-6 border border-neutral-700/60">
            <h2 className="text-xl font-semibold mb-3">Overview</h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {project.longDescription}
            </p>

            {project.screenshots && project.screenshots.length > 0 && (
              <div className="mt-6 space-y-4">
                <h3 className="text-sm font-semibold text-gray-400">
                  Screenshots
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.screenshots.map((src, index) => (
                    <div
                      key={index}
                      className="overflow-hidden rounded-xl border border-neutral-700/70 bg-neutral-900"
                    >
                      <img
                        src={src}
                        alt={`${project.title} screenshot ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="bg-neutral-900/70 rounded-2xl p-5 border border-neutral-700/60">
              <h3 className="text-sm font-semibold text-gray-200 mb-3">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-neutral-800 text-xs font-medium text-gray-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;

