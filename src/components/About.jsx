import React from "react";
import { motion } from "framer-motion";
import { portfolioData } from "../data/portfolioData";
import { Award, Terminal, Shield } from "lucide-react";

// Simple mapping for skills section icons
const skillCategoryIcons = {
  "Frontend": <Terminal className="w-5 h-5 text-brand-blue" />,
  "Backend & Database": <Award className="w-5 h-5 text-brand-cyan" />,
  "Tools & DevOps": <Shield className="w-5 h-5 text-brand-purple" />,
};

const About = () => {
  const { personalInfo, stats, skills } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="about" className="relative py-24 px-6 z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-16 parallax-element">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            About <span className="text-brand-blue text-glow">Me</span>
          </motion.h2>
          <div className="h-1 w-12 bg-gradient-to-r from-brand-blue to-brand-cyan mx-auto mt-4 rounded-full" />
        </div>

        {/* Core Layout Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        >
          {/* Left Column: Bio & Stats */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <motion.div variants={itemVariants} className="glass-panel p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-brand-blue" />
              <h3 className="text-2xl font-semibold text-white mb-4">Who I Am</h3>
              <p className="text-gray-300 leading-relaxed text-base">{personalInfo.bio}</p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="glass-panel p-6 rounded-2xl text-center group hover:border-brand-blue/30 transition-all duration-300"
                >
                  <h4 className="text-3xl md:text-4xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-cyan group-hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-400 mt-2 font-medium tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Tech Stack Showcase */}
          <div className="lg:col-span-6">
            <motion.div variants={itemVariants} className="flex flex-col gap-6">
              <h3 className="text-2xl font-semibold text-white mb-2 pl-2">My Tech Stack</h3>
              
              {skills.map((skillGroup, groupIdx) => (
                <div
                  key={groupIdx}
                  className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:border-white/10 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    {skillCategoryIcons[skillGroup.category] || <Terminal className="w-5 h-5 text-brand-blue" />}
                    <h4 className="text-lg font-bold text-white tracking-wide">{skillGroup.category}</h4>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, skillIdx) => (
                      <span
                        key={skillIdx}
                        className="px-3.5 py-1.5 rounded-lg text-sm font-medium bg-white/5 border border-white/5 text-gray-300 hover:text-brand-blue hover:bg-brand-blue/10 hover:border-brand-blue/20 transition-all duration-300 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default About;
