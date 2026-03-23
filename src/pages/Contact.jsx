import React, { useEffect, useMemo, useState } from "react";
import { FaEnvelope, FaGithub, FaLinkedin, FaCode, FaTerminal, FaDatabase } from "react-icons/fa";

const FORMSPREE_ENDPOINT =
  import.meta.env.VITE_FORMSPREE_ENDPOINT || "https://formspree.io/f/mlgpqrpb";
const SESSION_LIMIT_KEY = "contactSubmissionCount";
const SESSION_LAST_SUBMIT_AT_KEY = "contactLastSubmitAt";
const SESSION_SUBMISSION_LIMIT = 3;
const BASE_COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submitStatus, setSubmitStatus] = useState({ type: "", text: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nowMs, setNowMs] = useState(Date.now());
  const [submissionCount, setSubmissionCount] = useState(() => {
    const storedCount = sessionStorage.getItem(SESSION_LIMIT_KEY);
    return storedCount ? Number(storedCount) : 0;
  });
  const [lastSubmitAt, setLastSubmitAt] = useState(() => {
    const storedTs = sessionStorage.getItem(SESSION_LAST_SUBMIT_AT_KEY);
    return storedTs ? Number(storedTs) : 0;
  });

  const cooldownMs = useMemo(() => {
    // 1st send -> wait 5m for 2nd, 2nd send -> wait 10m for 3rd.
    if (submissionCount === 1) return BASE_COOLDOWN_MS;
    if (submissionCount === 2) return BASE_COOLDOWN_MS * 2;
    return 0;
  }, [submissionCount]);

  const cooldownRemainingMs = Math.max(
    0,
    lastSubmitAt && cooldownMs ? lastSubmitAt + cooldownMs - nowMs : 0
  );
  const isCoolingDown = cooldownRemainingMs > 0;
  const cooldownRemainingLabel = `${Math.floor(cooldownRemainingMs / 60000)}m ${Math.ceil(
    (cooldownRemainingMs % 60000) / 1000
  )}s`;

  useEffect(() => {
    if (!isCoolingDown) return undefined;
    const timer = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [isCoolingDown]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submissionCount >= SESSION_SUBMISSION_LIMIT) {
      setSubmitStatus({
        type: "error",
        text: "You reached the 3 message limit for this session. Please try again later.",
      });
      return;
    }
    if (isCoolingDown) {
      setSubmitStatus({
        type: "error",
        text: `Please wait ${cooldownRemainingLabel} before sending another message.`,
      });
      return;
    }

    if (!FORMSPREE_ENDPOINT) {
      setSubmitStatus({
        type: "error",
        text: "Contact form is not configured yet. Please try the email link above.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: "", text: "" });

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio contact from ${formData.name}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setSubmitStatus({
        type: "success",
        text: "Message sent successfully. I will get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
      const nextCount = submissionCount + 1;
      const submittedAt = Date.now();
      setSubmissionCount(nextCount);
      setLastSubmitAt(submittedAt);
      setNowMs(submittedAt);
      sessionStorage.setItem(SESSION_LIMIT_KEY, String(nextCount));
      sessionStorage.setItem(SESSION_LAST_SUBMIT_AT_KEY, String(submittedAt));
    } catch {
      setSubmitStatus({
        type: "error",
        text: "Could not send your message right now. Please use the email link above.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-black text-white pt-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-500/10 to-purple-500/10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-15 bg-[url('/assets/grid.svg')] bg-cover pointer-events-none animate-pulse" />

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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 z-10">
        {/* Page title */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-3 sm:mb-4 drop-shadow-lg">
            Get in <span className="text-cyan-400">Touch</span>
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full mb-3 sm:mb-4"></div>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-4">
            Feel free to reach out for collaborations, inquiries, or just to say hello!
          </p>
        </div>

        {/* Contact Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Contact Information - Left Column */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            <div className="bg-gradient-to-br from-neutral-900/50 to-neutral-800/30 rounded-2xl p-4 sm:p-6 border border-cyan-500/20">
              <h3 className="text-lg sm:text-xl font-bold text-cyan-400 mb-3 sm:mb-4">Get in Touch</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-3 group">
                  <div className="p-2 bg-cyan-500/20 rounded-lg group-hover:bg-cyan-500/30 transition-colors">
                    <FaEnvelope className="text-cyan-400 text-lg" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Email</p>
                    <a href="mailto:jmsfbusiness@gmail.com" className="text-white font-semibold hover:text-cyan-400 transition-colors text-sm">jmsfbusiness@gmail.com</a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 group">
                  <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                    <FaGithub className="text-blue-400 text-lg" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">GitHub</p>
                    <a href="https://github.com/x1nnas" target="_blank" rel="noreferrer" className="text-white font-semibold hover:text-blue-400 transition-colors text-sm">github.com/x1nnas</a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 group">
                  <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                    <FaLinkedin className="text-purple-400 text-lg" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">LinkedIn</p>
                    <a href="https://www.linkedin.com/in/jose-msferreira/" target="_blank" rel="noreferrer" className="text-white font-semibold hover:text-purple-400 transition-colors text-sm">linkedin.com/in/jose-msferreira</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-neutral-900/50 to-neutral-800/30 rounded-2xl p-6 border border-blue-500/20">
              <h4 className="text-lg font-bold text-blue-400 mb-4">Response Time</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">&lt; 24h</div>
                  <div className="text-xs text-gray-400">Response</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">100%</div>
                  <div className="text-xs text-gray-400">Available</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form - Right Column */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-neutral-900/50 to-neutral-800/30 border border-cyan-500/20 rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-4 sm:mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <input
                  type="text"
                  name="_gotcha"
                  className="hidden"
                  tabIndex="-1"
                  autoComplete="off"
                />
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-cyan-300 text-sm font-medium mb-2" htmlFor="name">
                      Name
                    </label>
                    <input
                      className="w-full bg-neutral-800 text-white border border-cyan-500/30 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-cyan-300 text-sm font-medium mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="w-full bg-neutral-800 text-white border border-cyan-500/30 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-cyan-300 text-sm font-medium mb-2" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    className="w-full bg-neutral-800 text-white border border-cyan-500/30 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none"
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or just say hello!"
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  disabled={isSubmitting || submissionCount >= SESSION_SUBMISSION_LIMIT || isCoolingDown}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-cyan-700/70 disabled:to-blue-700/70 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
                {submissionCount > 0 && (
                  <p className="text-xs text-gray-400 text-center">
                    Limit: {submissionCount}/{SESSION_SUBMISSION_LIMIT} messages sent.
                  </p>
                )}
                {isCoolingDown && (
                  <p className="text-xs text-amber-300 text-center">
                    Cooldown active: wait {cooldownRemainingLabel} before next message.
                  </p>
                )}
                {submitStatus.text && (
                  <p
                    className={`text-sm text-center ${
                      submitStatus.type === "success" ? "text-cyan-300" : "text-red-300"
                    }`}
                  >
                    {submitStatus.text}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;