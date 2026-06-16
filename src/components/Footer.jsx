import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";
import { portfolioData } from "../data/portfolioData";

const Footer = () => {
  const { contactInfo, socialLinks } = portfolioData;
  const [lahoreTime, setLahoreTime] = useState("");

  // Update live Lahore clock
  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: contactInfo.timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      try {
        const formatter = new Intl.DateTimeFormat("en-US", options);
        setLahoreTime(formatter.format(new Date()));
      } catch (e) {
        // Fallback to local time if timezone query fails
        setLahoreTime(new Date().toLocaleTimeString());
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [contactInfo.timezone]);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="relative bg-dark-950 border-t border-white/5 pt-16 pb-8 px-6 z-10">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Footer Top Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 items-start">
          {/* Column 1 — Brand (left-aligned on desktop, centered on mobile) */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
            <h3 className="font-display text-xl font-bold tracking-wider text-white">
              FAIZAN<span className="text-brand-cyan">.DEV</span>
            </h3>
            <p className="text-xs md:text-sm text-gray-400 max-w-sm leading-relaxed">
              Design-driven full stack development.
              <br className="hidden md:block" />
              Building premium, high-performance web applications.
            </p>

            {/* Social Icons row at the bottom of Column 1 */}
            <div className="flex items-center gap-4 mt-2">
              {[
                {
                  icon: FaGithub,
                  url: socialLinks.github,
                  color: "hover:text-white hover:border-white/40",
                },
                {
                  icon: FaLinkedin,
                  url: socialLinks.linkedin,
                  color: "hover:text-brand-cyan hover:border-brand-cyan/40",
                },
                {
                  icon: SiUpwork,
                  url: socialLinks.upwork,
                  color: "hover:text-green-400 hover:border-green-400/40",
                },
                {
                  icon: FaEnvelope,
                  url: socialLinks.email,
                  color: "hover:text-brand-cyan hover:border-brand-cyan/40",
                },
                {
                  icon: FaPhone,
                  url: socialLinks.phone,
                  color: "hover:text-brand-purple hover:border-brand-purple/40",
                },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 bg-white/5 transition-colors duration-300 ${item.color}`}
                >
                  <item.icon className="w-4.5 h-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Quick Links (center-aligned) */}
          <div className="flex flex-col items-center text-center gap-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2.5 items-center text-xs md:text-sm font-medium">
              {[
                { label: "Home", id: "home" },
                { label: "About", id: "about" },
                { label: "Why Me", id: "why-me" },
                { label: "Projects", id: "projects" },
                { label: "Experience", id: "experience" },
                { label: "Resume", id: "resume" },
                { label: "Contact", id: "contact" },
              ].map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className="text-gray-400 hover:text-brand-cyan transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3 — Info (right-aligned on desktop, centered on mobile) */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right gap-3 text-xs md:text-sm text-gray-400 font-medium">
            <div>{contactInfo.location}</div>
            <div>
              Local Time:{" "}
              <span className="text-brand-cyan font-bold">{lahoreTime}</span>
            </div>
            <div>Available Hours: {contactInfo.availableHours}</div>
            <div>Response Time: {contactInfo.responseTime}</div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <div className="text-center md:text-left">
            © 2026 Faizan. All rights reserved.
          </div>
          <div className="text-center md:text-right">
            <button
              onClick={handleScrollToTop}
              className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-brand-cyan hover:text-white transition-colors duration-300 cursor-pointer"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
