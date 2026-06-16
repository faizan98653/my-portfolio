import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

// TypewriterText component that triggers typing only when scrolled into view
const TypewriterText = ({ text, speed = 40, delay = 0.3, active = true }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!active) {
      setDisplayedText(text);
      return;
    }
    if (!isInView) return;

    let timer;
    const startTyping = () => {
      let idx = 0;
      const type = () => {
        setDisplayedText(text.substring(0, idx + 1));
        idx++;
        if (idx < text.length) {
          timer = setTimeout(type, speed);
        }
      };
      type();
    };

    const delayTimer = setTimeout(startTyping, delay * 1000);
    return () => {
      clearTimeout(delayTimer);
      clearTimeout(timer);
    };
  }, [isInView, text, speed, delay, active]);

  return <span ref={ref}>{displayedText}</span>;
};

const Experience = () => {
  const { experience } = portfolioData;
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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
    // Cap 3D tilt at 7deg & 6px lift
    card.style.transform = `perspective(1000px) rotateX(${dy * -7}deg) rotateY(${dx * 7}deg) translateY(-6px)`;
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

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.55,
        ease: "easeOut",
      },
    },
  };

  const itemVariantsDesktop = {
    hidden: {
      opacity: 0,
      x: prefersReducedMotion ? 0 : -35,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="experience" className="relative py-24 px-6 z-10 border-t border-white/5 bg-dark-950/40">
      <div className="max-w-5xl mx-auto">

        {/* Section Heading */}
        <div className="text-center mb-20 parallax-element">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Work <span className="text-brand-purple text-glow">Experience</span>
          </motion.h2>
          <div className="h-1 w-12 bg-gradient-to-r from-brand-purple to-brand-pink mx-auto mt-4 rounded-full" />
        </div>

        {/* ─────────────────────────────────────────────────────────
            MOBILE LAYOUT (< 768px): Simplified card stack, no timeline
            ───────────────────────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex md:hidden flex-col gap-6"
        >
          {experience.map((job) => (
            <motion.div
              key={job.id}
              variants={itemVariants}
              className="w-full"
            >
              <div className="animated-border-card">
                <div
                  className="animated-border-card-inner p-4 flex flex-col w-full"
                  style={{ minWidth: 0 }}
                >
                  {/* Date / status label — inside card, top */}
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono font-medium mb-3 select-none">
                    {job.duration}
                  </span>

                  {/* Company Name */}
                  <h3 className="font-body text-lg font-bold text-white tracking-wide leading-snug">
                    <TypewriterText text={job.company} active={!prefersReducedMotion} />
                  </h3>

                  {/* Designation badge */}
                  <span
                    className="inline-block text-xs font-semibold text-brand-blue mt-1.5 mb-4 px-2 py-0.5 rounded bg-brand-blue/5 border border-brand-blue/10"
                    style={{ whiteSpace: "normal", width: "fit-content", maxWidth: "100%" }}
                  >
                    {job.designation}
                  </span>

                  {/* Achievements */}
                  <motion.ul
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: prefersReducedMotion ? 0 : 0.1,
                          delayChildren: prefersReducedMotion ? 0 : 0.3,
                        },
                      },
                    }}
                    className="space-y-2.5"
                    style={{ minWidth: 0 }}
                  >
                    {job.achievements.map((bullet, idx) => (
                      <motion.li
                        key={idx}
                        variants={{
                          hidden: { opacity: 0, y: 5 },
                          visible: { opacity: 1, y: 0, transition: { duration: prefersReducedMotion ? 0 : 0.35 } },
                        }}
                        className="flex items-start gap-2.5 text-sm text-gray-400 leading-relaxed"
                        style={{ minWidth: 0, wordBreak: "break-word", overflowWrap: "break-word" }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-purple mt-[7px] shrink-0" />
                        <span style={{ minWidth: 0, flex: 1 }}>{bullet}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ─────────────────────────────────────────────────────────
            TABLET + DESKTOP LAYOUT (≥ 768px): Full timeline
            ───────────────────────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative hidden md:flex flex-col gap-16 border-l border-white/10 md:ml-[160px] lg:ml-[180px] pl-10 lg:pl-12"
        >
          {/* Vertical timeline line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ originY: 0 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="absolute top-0 bottom-0 left-0 w-[2px] bg-white/20 pointer-events-none"
          />

          {experience.map((job) => (
            <motion.div
              key={job.id}
              variants={itemVariantsDesktop}
              className="relative"
            >
              {/* Timeline Indicator Dot */}
              <motion.div
                initial={{ scale: prefersReducedMotion ? 1 : 0.6, opacity: 0 }}
                whileInView={{ scale: [0.6, 1.2, 1], opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute -left-[55px] lg:-left-[60px] top-1.5 w-6 h-6 rounded-full bg-dark-950 border border-white/20 flex items-center justify-center z-20"
              >
                <Briefcase className="w-3.5 h-3.5 text-gray-400" />
              </motion.div>

              {/* Time Stamp Display — left of the timeline line */}
              <div className="absolute right-[calc(100%+60px)] lg:right-[calc(100%+66px)] top-1.5 h-6 flex items-center justify-end w-[110px] lg:w-[130px] text-right text-[10px] lg:text-xs text-gray-500 uppercase tracking-widest font-mono font-medium select-none whitespace-nowrap">
                {job.duration}
              </div>

              {/* Conic rotating border wrapper */}
              <div
                className="animated-border-card cursor-pointer"
                style={{ perspective: 1000 }}
              >
                {/* Inner Card */}
                <div
                  className="animated-border-card-inner p-6 lg:p-8 flex flex-col w-full h-full"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    transformStyle: "preserve-3d",
                    transition: "transform 0.25s ease-out, box-shadow 0.25s ease",
                  }}
                >
                  {/* Company Name */}
                  <h3 className="font-body text-xl lg:text-2xl font-bold text-white tracking-wide">
                    <TypewriterText text={job.company} active={!prefersReducedMotion} />
                  </h3>

                  {/* Designation badge */}
                  <span
                    className="inline-block text-xs lg:text-sm font-semibold text-brand-blue mt-1.5 mb-4 px-2 py-0.5 rounded bg-brand-blue/5 border border-brand-blue/10"
                    style={{ whiteSpace: "normal", width: "fit-content", maxWidth: "100%" }}
                  >
                    {job.designation}
                  </span>

                  {/* Achievements List */}
                  <motion.ul
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: prefersReducedMotion ? 0 : 0.12,
                          delayChildren: prefersReducedMotion ? 0 : 0.45,
                        },
                      },
                    }}
                    className="space-y-3 relative z-20"
                  >
                    {job.achievements.map((bullet, idx) => (
                      <motion.li
                        key={idx}
                        variants={{
                          hidden: { opacity: 0, y: 5 },
                          visible: { opacity: 1, y: 0, transition: { duration: prefersReducedMotion ? 0 : 0.4 } },
                        }}
                        className="flex items-start gap-3 text-sm text-gray-400 leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-purple mt-2 shrink-0" />
                        <span>{bullet}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Experience;

