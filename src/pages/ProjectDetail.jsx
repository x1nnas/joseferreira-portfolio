import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaArrowLeft,
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
  const [showScreenshots, setShowScreenshots] = useState(false);
  const [currentShot, setCurrentShot] = useState(0);

  useEffect(() => {
    setCurrentShot(0);
    setShowScreenshots(false);
  }, [slug]);

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
  const screenshots = project.screenshots || [];
  const isFlowProject = project.slug === "flow-pomodoro";

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
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          <div className="bg-gradient-to-br from-neutral-900/70 to-neutral-800/40 rounded-2xl p-6 border border-neutral-700/60">
            <h2 className="text-xl font-semibold mb-3">Overview</h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {project.longDescription}
            </p>

            <div className="mt-6 rounded-2xl border border-neutral-700/70 bg-gradient-to-br from-neutral-900/80 to-neutral-800/50 p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3 mb-4">
                <h3 className="text-sm font-semibold text-gray-200">
                  App Screenshots
                </h3>
                <button
                  type="button"
                  onClick={() => setShowScreenshots((prev) => !prev)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-gray-200 transition-colors"
                >
                  {showScreenshots
                    ? "Hide App Screenshots"
                    : "Show App Screenshots"}
                </button>
              </div>

              {showScreenshots ? (
                !isFlowProject && screenshots.length > 2 ? (
                  <div className="space-y-4">
                    <div className="relative overflow-hidden rounded-xl border border-neutral-700/70 bg-neutral-900 mx-auto w-full max-w-[280px] sm:max-w-[320px]">
                      <img
                        src={screenshots[currentShot]}
                        alt={`${project.title} screenshot ${currentShot + 1}`}
                        className="w-full aspect-[9/18] object-cover"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setCurrentShot((prev) =>
                            prev === 0 ? screenshots.length - 1 : prev - 1
                          )
                        }
                        className="absolute top-1/2 left-2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white text-lg transition-colors"
                        aria-label="Previous screenshot"
                      >
                        {"<"}
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setCurrentShot((prev) =>
                            prev === screenshots.length - 1 ? 0 : prev + 1
                          )
                        }
                        className="absolute top-1/2 right-2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white text-lg transition-colors"
                        aria-label="Next screenshot"
                      >
                        {">"}
                      </button>

                      <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/70 text-xs text-gray-200">
                        {currentShot + 1} / {screenshots.length}
                      </div>
                    </div>

                    <div className="overflow-x-auto pb-1">
                      <div className="flex gap-3 min-w-max">
                        {screenshots.map((src, index) => (
                          <button
                            key={src + index}
                            type="button"
                            onClick={() => setCurrentShot(index)}
                            className={`shrink-0 overflow-hidden rounded-lg border transition-colors ${
                              index === currentShot
                                ? "border-cyan-400"
                                : "border-neutral-700/70 hover:border-neutral-500"
                            }`}
                            aria-label={`View screenshot ${index + 1}`}
                          >
                            <img
                              src={src}
                              alt={`${project.title} thumbnail ${index + 1}`}
                              className="w-16 h-28 object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : screenshots.length > 0 ? (
                  isFlowProject ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {screenshots.map((src, index) => (
                        <div
                          key={src + index}
                          className="rounded-xl border border-neutral-700/70 p-3 flex items-center justify-center bg-neutral-900/40"
                        >
                          <img
                            src={src}
                            alt={`${project.title} screenshot ${index + 1}`}
                            className="w-auto h-auto max-h-[34rem] max-w-full object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {screenshots.map((src, index) => (
                        <div
                          key={src + index}
                          className="overflow-hidden rounded-xl border border-neutral-700/70 bg-neutral-900 mx-auto w-full max-w-[240px] sm:max-w-[260px]"
                        >
                          <img
                            src={src}
                            alt={`${project.title} screenshot ${index + 1}`}
                            className="w-full aspect-[9/18] object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )
                ) : (
                  <div className="rounded-xl border border-neutral-700/70 bg-neutral-900/60 p-5">
                    <p className="text-sm sm:text-base text-gray-300 font-medium mb-2">
                      Visual walkthrough coming soon.
                    </p>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      In the meantime, you can review the implementation details
                      and architecture in the repository.
                    </p>
                    {project.githubUrl && (
                      <div className="mt-4">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center px-3 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-sm font-semibold transition-colors"
                        >
                          Open Code Repository
                        </a>
                      </div>
                    )}
                  </div>
                )
              ) : (
                <p className="text-sm text-gray-500">
                  Screenshots are hidden. Click "Show App Screenshots" to view
                  the gallery.
                </p>
              )}
            </div>
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

