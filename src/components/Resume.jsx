import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

const Resume = () => {
  const { resumePath } = portfolioData.personalInfo;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  return (
    <section id="resume" className="relative py-24 px-6 z-10 border-t border-white/5 bg-dark-950/20">
      <div className="max-w-4xl mx-auto text-center">

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: isMobile ? 0.4 : 0.6 }}
          className="glass-panel p-10 md:p-16 rounded-3xl relative overflow-hidden flex flex-col items-center border border-white/5 hover:border-brand-blue/25 transition-all duration-500"
        >
          {/* Decorative glowing backdrops */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 left-10 w-24 h-24 bg-brand-purple/10 rounded-full blur-2xl pointer-events-none" />

          {/* Document icon with glow */}
          <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 border border-brand-blue/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,240,255,0.1)]">
            <FileText className="w-8 h-8 text-brand-blue" />
          </div>

          {/* Section Info */}
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
            My <span className="text-brand-blue text-glow">Resume</span>
          </h2>
          <p className="text-gray-400 max-w-lg mb-10 leading-relaxed text-sm md:text-base">
            Interested in collaborating or hiring me? Download my complete resume PDF to review my detailed skill proficiencies, technical accomplishments and academic background.
          </p>

          {/* Download Button */}
          {/* Faizan can simply drop his resume PDF into the 'public' folder named 'resume.pdf' to link it */}
          <motion.a
            href={resumePath}
            download="Faizan_Resume.pdf"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-brand-blue to-brand-cyan text-white font-medium rounded-full shadow-[0_0_25px_rgba(0,240,255,0.25)] hover:shadow-[0_0_35px_rgba(0,240,255,0.45)] hover:-translate-y-0.5 transition-all duration-300 group"
          >
            <Download className="w-5 h-5 group-hover:animate-bounce" />
            <span>Download My Resume</span>
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
};

export default Resume;
