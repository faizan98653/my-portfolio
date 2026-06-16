import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";
import { ArrowDown } from "lucide-react";
import { portfolioData } from "../data/portfolioData";
const Hero = () => {
  const { personalInfo, socialLinks } = portfolioData;
  const { name, title, subTitle, profileImage } = personalInfo;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  // 3D Tilt mouse handlers
  const handleMouseMove = (e) => {
    if (isMobile) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = (x - xc) / xc;
    const dy = (y - yc) / yc;
    card.style.transform = `perspective(1000px) rotateX(${dy * -12}deg) rotateY(${dx * 12}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e) => {
    if (isMobile) return;
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  // Typewriter effect strings
  const words = [title, "Creative Problem Solver", "Clean Code Enthusiast"];
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer;
    const activeWord = words[currentWordIdx];

    const handleType = () => {
      if (!isDeleting) {
        // Typing
        setCurrentText(activeWord.substring(0, currentText.length + 1));
        setTypingSpeed(isMobile ? 50 : 75);

        if (currentText === activeWord) {
          // Pause before deleting
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        // Deleting
        setCurrentText(activeWord.substring(0, currentText.length - 1));
        setTypingSpeed(isMobile ? 25 : 40);

        if (currentText === "") {
          setIsDeleting(false);
          setCurrentWordIdx((prev) => (prev + 1) % words.length);
        }
      }

      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIdx, typingSpeed, isMobile]);

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = contactSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Profile image hover ring variants
  const ringVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 12,
        ease: "linear",
        repeat: Infinity,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden z-10"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* 3D Tilting HUD Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.4 : 0.8, ease: "easeOut" }}
          className="hud-card-wrapper w-64 h-80 md:w-72 md:h-[360px] mb-8 cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.05)] transition-all duration-200 relative"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ transition: "transform 0.1s ease-out" }}
        >
          {/* Spinning Gradient Glow Ring */}
          <div className="hud-spinning-ring" />
          
          {/* Inner Content Card */}
          <div className="relative w-full h-full bg-dark-950/95 rounded-[19px] p-5 flex flex-col items-center justify-between z-10 overflow-hidden">
            {/* Scan Sweep overlay */}
            <div className="hud-scan-sweep" />
            
            {/* Corner Brackets */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-brand-cyan" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-brand-cyan" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-brand-cyan" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-brand-cyan" />
            
            {/* Profile Photo Area */}
            <div className="w-full aspect-[1/1] rounded-xl overflow-hidden border border-white/5 relative bg-dark-900 flex items-center justify-center">
              <img
                src={profileImage}
                alt={name}
                loading="eager"
                decoding="async"
                width={288}
                height={288}
                onError={(e) => {
                  e.target.style.display = "none";
                  document.getElementById("fallback-avatar").style.display = "flex";
                }}
                className="w-full h-full object-cover"
              />
              <div
                id="fallback-avatar"
                className="hidden w-full h-full bg-gradient-to-br from-dark-900 via-dark-800 to-brand-blue/20 items-center justify-center text-white"
              >
                <span className="font-display text-5xl font-extrabold text-glow text-brand-blue">
                  {name.substring(0, 1)}
                </span>
              </div>
            </div>
            
            {/* Name & Role with Neon Glow effect */}
            <div className="w-full text-center pb-2">
              <h3 className="font-display text-xl font-bold tracking-wider text-white neon-glow-text">
                {name.toUpperCase()}
              </h3>
              <p className="font-display text-[10px] text-brand-cyan uppercase tracking-wider mt-1.5 font-medium">
                {title}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Introduction */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4"
        >
          Hi, I am <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple text-glow">{name}</span>
        </motion.h1>

        {/* Animated Typewriter Subheading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="h-8 md:h-10 mb-6"
        >
          <span className="text-xl md:text-2xl font-body font-medium text-gray-300">
            {currentText}
            <span className="text-brand-blue animate-pulse font-bold">|</span>
          </span>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-lg text-gray-400 max-w-2xl mb-8 leading-relaxed"
        >
          {subTitle}
        </motion.p>

        {/* Social Icons Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex items-center gap-6 mb-10"
        >
          {[
            { icon: FaGithub, url: socialLinks.github, color: "hover:text-white hover:border-white/40" },
            { icon: FaLinkedin, url: socialLinks.linkedin, color: "hover:text-brand-blue hover:border-brand-blue/40" },
            { icon: SiUpwork, url: socialLinks.upwork, color: "hover:text-green-400 hover:border-green-400/40" },
            { icon: FaEnvelope, url: socialLinks.email, color: "hover:text-brand-cyan hover:border-brand-cyan/40" },
            { icon: FaPhone, url: socialLinks.phone, color: "hover:text-brand-purple hover:border-brand-purple/40" },
          ].map((item, idx) => (
            <motion.a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className={`w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 bg-white/5 backdrop-blur-sm transition-colors duration-300 ${item.color}`}
            >
              <item.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>

        {/* Get in Touch CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-col items-center gap-16"
        >
          <a
            href="#contact"
            onClick={handleScrollToContact}
            className="relative px-8 py-4 rounded-full font-medium text-white bg-gradient-to-r from-brand-blue to-brand-cyan hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all duration-300 group overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get in Touch
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-brand-purple to-brand-pink opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
