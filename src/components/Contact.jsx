import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";
import { ArrowRight } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

const iconMap = {
  github: FaGithub,
  linkedin: FaLinkedin,
  upwork: SiUpwork,
  email: FaEnvelope,
  phone: FaPhone,
};

const contactPlatforms = [
  {
    key: "email",
    name: "Email",
    value: "faixzan59@gmail.com",
    iconColor: "text-brand-cyan",
    bgColor: "bg-brand-cyan/10",
  },
  {
    key: "phone",
    name: "Phone / WhatsApp",
    value: "+92 3044428773",
    iconColor: "text-brand-purple",
    bgColor: "bg-brand-purple/10",
  },
  {
    key: "github",
    name: "GitHub",
    value: "github.com/faizan98653",
    iconColor: "text-white",
    bgColor: "bg-white/10",
  },
  {
    key: "upwork",
    name: "Upwork",
    value: "upwork.com/freelancers/~01faizan",
    iconColor: "text-green-400",
    bgColor: "bg-green-400/10",
  },
  {
    key: "linkedin",
    name: "LinkedIn",
    value: "linkedin.com/in/faizan-zubair",
    iconColor: "text-brand-blue",
    bgColor: "bg-brand-blue/10",
  },
];

const Contact = () => {
  const { socialLinks } = portfolioData;
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
    // Cap 3D tilt at 15deg & 4px lift
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
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="contact" className="relative py-24 px-6 z-10 border-t border-white/5 bg-dark-950/30">
      {/* Decorative ambient glowing backlights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-64 h-64 bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-16 parallax-element">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Get In <span className="text-brand-cyan text-glow-cyan">Touch</span>
          </motion.h2>
          <div className="h-1 w-12 bg-gradient-to-r from-brand-cyan to-brand-blue mx-auto mt-4 rounded-full" />
        </div>

        {/* Contact Grid layout (2-columns on desktop, single on mobile) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
        >
          {contactPlatforms.map((platform, index) => {
            const IconComponent = iconMap[platform.key];
            const platformUrl = socialLinks[platform.key];
            
            // If it's the last element and odd, let it span 2 columns on desktop to balance the layout
            const isLastOdd = index === contactPlatforms.length - 1 && contactPlatforms.length % 2 !== 0;

            return (
              <motion.a
                key={platform.key}
                href={platformUrl}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                className={`animated-border-card cursor-pointer ${
                  isLastOdd ? "md:col-span-2 md:max-w-md md:mx-auto lg:max-w-none lg:mx-0 w-full" : ""
                }`}
                style={{ perspective: 1000 }}
              >
                {/* Inner Card content with 3D Tilt */}
                <div
                  className="animated-border-card-inner p-8 flex flex-col items-center text-center justify-between h-full w-full min-h-[220px] bg-white/[0.03] backdrop-blur-md"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    transformStyle: "preserve-3d",
                    transition: "transform 0.25s ease-out, box-shadow 0.25s ease"
                  }}
                >
                  <div className="flex flex-col items-center">
                    {/* Platform Icon */}
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 ${platform.bgColor}`}>
                      <IconComponent className={`w-6 h-6 ${platform.iconColor}`} />
                    </div>

                    {/* Platform name */}
                    <h3 className="font-display text-lg font-bold text-white mb-1 tracking-wide">
                      {platform.name}
                    </h3>

                    {/* Handle/value link display */}
                    <span className="text-xs text-gray-500 max-w-[200px] truncate block">
                      {platform.value}
                    </span>
                  </div>

                  {/* Connect arrow button at bottom */}
                  <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-brand-cyan group-hover:translate-x-1 transition-transform mt-5">
                    <span>CONNECT</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
        
      </div>
    </section>
  );
};

export default Contact;
