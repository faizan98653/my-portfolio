import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cpu, Calendar, Users, Zap, Award } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

// Icon mapping dictionary
const iconMap = {
  Cpu: Cpu,
  Calendar: Calendar,
  Users: Users,
  Zap: Zap,
  ShieldAlert: Award,
};

const WhyChooseMe = () => {
  const { whyChooseMe } = portfolioData;
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(pointer: coarse)").matches;
    setIsMobile(mobile);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  // 3D Tilt mouse handlers (disable on mobile)
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
    // Max 15deg tilt & 4px lift
    card.style.transform = `perspective(1000px) rotateX(${dy * -15}deg) rotateY(${dx * 15}deg) translateY(-4px)`;
    card.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.4)";
  };

  const handleMouseLeave = (e) => {
    if (isMobile) return;
    const card = e.currentTarget;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    card.style.boxShadow = "none";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: {
      y: prefersReducedMotion ? 0 : 35,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : (isMobile ? 0.4 : 0.6),
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="why-me" className="relative py-24 px-6 z-10 border-t border-white/5 bg-dark-950/40">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-16 parallax-element">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: isMobile ? 0.4 : 0.5 }}
            className="font-display text-3xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Why <span className="text-brand-cyan text-glow-cyan">Choose Me</span>
          </motion.h2>
          <div className="h-1 w-12 bg-gradient-to-r from-brand-cyan to-brand-blue mx-auto mt-4 rounded-full" />
        </div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center"
        >
          {whyChooseMe.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || Zap;
            const isLastOdd = idx === 4;

            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                className={`animated-border-card cursor-pointer ${
                  isLastOdd ? "md:col-span-2 lg:col-span-1 md:max-w-md md:mx-auto lg:max-w-none lg:mx-0" : ""
                }`}
                style={{ 
                  perspective: 1000
                }}
              >
                {/* Inner Content Card with 3D Tilt */}
                <div 
                  className="animated-border-card-inner p-8 flex flex-col h-full w-full"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    transformStyle: "preserve-3d",
                    transition: "transform 0.25s ease-out, box-shadow 0.25s ease"
                  }}
                >
                  {/* Card Icon with entry rotation */}
                  <motion.div 
                    initial={{ rotate: prefersReducedMotion ? 0 : -90 }}
                    whileInView={{ rotate: prefersReducedMotion ? 0 : 360 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: prefersReducedMotion ? 0 : (isMobile ? 0.4 : 1.2), 
                      ease: "easeOut", 
                      delay: prefersReducedMotion ? 0 : 0.15 
                    }}
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shrink-0"
                  >
                    <IconComponent className="w-6 h-6 text-brand-cyan" />
                  </motion.div>

                  {/* Card Info */}
                  <h3 className="font-display text-xl font-bold text-white mb-3 tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
      </div>
    </section>
  );
};

export default WhyChooseMe;
