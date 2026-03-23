export const projects = [
  {
    slug: "mindease",
    title: "MindEase 🌿",
    shortDescription:
      "A full-stack emotional wellness PWA for mood tracking, private journaling, and supportive AI conversations.",
    longDescription:
      "MindEase is a Progressive Web App designed to help users reflect and manage their emotional well-being. Users can track daily moods, write private journal entries, and interact with Serenity, an AI-powered chatbot that offers supportive conversations. Built with React, TypeScript, Node.js, and MongoDB, it includes secure JWT authentication, multilingual support (EN/PT-PT), and a calm responsive interface optimized for both mobile and desktop. As a PWA, it is installable and supports offline usage for a smooth app-like experience.",
    tech: [
      "React",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "JWT",
      "PWA",
      "i18n (EN/PT-PT)",
    ],
    icon: "react",
    color: "cyan",
    githubUrl: "https://github.com/x1nnas/mindease",
    screenshots: [
      "/assets/projects/mindease/homepage.jpg",
      "/assets/projects/mindease/aichatbot.jpg",
      "/assets/projects/mindease/moodtracker.jpg",
      "/assets/projects/mindease/registerform.png",
      "/assets/projects/mindease/journalentry.jpg",
    ],
  },
  {
    slug: "noisewindow",
    title: "NoiseWindow 🔕",
    shortDescription:
      "A real-time availability PWA for shared spaces, built to reduce interruptions and improve communication.",
    longDescription:
      "NoiseWindow is a Progressive Web App that helps people in shared living environments communicate their availability without interruptions. It shows real-time status states such as working, sleeping, and unavailable using animated visual indicators so others can quickly understand when to keep noise levels low. Built with Next.js, TypeScript, and Tailwind CSS, the app includes automatic schedule detection, offline support, and a PIN-protected admin panel to manage availability. It supports both English and Portuguese (PT-PT) and delivers a smooth installable experience across mobile and desktop.",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "PWA",
      "Offline Support",
      "PIN-Protected Admin",
      "i18n (EN/PT-PT)",
    ],
    icon: "code",
    color: "blue",
    githubUrl: "https://github.com/x1nnas/noisewindow",
    screenshots: [
      "/assets/projects/noisewindow/homepage.jpg",
      "/assets/projects/noisewindow/adminpanel.jpg",
    ],
  },
  {
    slug: "flow-pomodoro",
    title: "Flow ⏳",
    shortDescription:
      "A keyboard-first Pomodoro Chrome extension focused on deep work and low-friction session control.",
    longDescription:
      "Flow is a polished Pomodoro timer built as a Chrome extension, designed to minimize friction and help users stay consistent with deep work sessions. It emphasizes speed and simplicity, allowing users to start a session instantly via keyboard shortcuts while keeping the interface clean and distraction-free. Built with React, TypeScript, and Tailwind CSS, Flow uses a background-driven timer powered by Chrome Extension APIs to remain reliable even when the popup is closed. It includes persistent session tracking, daily stats, streaks, and a 7-day activity view, all stored locally with no backend required.",
    tech: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Chrome Extension (MV3)",
      "chrome.storage.local",
      "chrome.alarms",
      "Local-First Persistence",
    ],
    icon: "database",
    color: "purple",
    githubUrl: "https://github.com/x1nnas/pomodoro-timer",
    screenshots: [
      "/assets/projects/flow/mainpage.png",
      "/assets/projects/flow/settingspanel.png",
    ],
  },
];

