import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

const Projects = () => {
  const { projects } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="projects" className="relative py-24 px-6 z-10 border-t border-white/5">
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
            My  <span className="text-brand-blue text-glow">Projects</span>
          </motion.h2>
          <div className="h-1 w-12 bg-gradient-to-r from-brand-blue to-brand-cyan mx-auto mt-4 rounded-full" />
        </div>

        {/* Projects Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <motion.a
              key={project.id}
              id={`project-${project.id}`}
              href={project.projectLink}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="glass-panel rounded-2xl overflow-hidden flex flex-col group border border-white/5 hover:border-brand-blue/30 hover:shadow-[0_0_40px_rgba(0,240,255,0.15)] transition-all duration-300 cursor-pointer"
            >
              {/* Project Image Container */}
              <div className="relative aspect-[16/9] overflow-hidden bg-dark-900">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dark Overlay on Hover */}
                <div className="absolute inset-0 bg-dark-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                  <div className="w-12 h-12 rounded-full bg-brand-blue/20 border border-brand-blue/40 flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                    <ExternalLink className="w-5 h-5 text-brand-blue" />
                  </div>
                </div>
              </div>

              {/* Card Details Content */}
              <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                <div>
                  <h3 className="font-display text-xl font-bold text-white mb-2 tracking-wide group-hover:text-brand-blue transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Tech stack badges (wrapping row) */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className="px-2.5 py-1 text-xs font-medium rounded-md bg-[rgba(0,212,255,0.08)] border border-[rgba(0,212,255,0.3)] text-brand-cyan hover:border-[rgba(0,212,255,1.0)] transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Click reinforcement label */}
                <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-brand-blue opacity-80 group-hover:opacity-100 transition-opacity mt-auto">
                  <span>VIEW PROJECT</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

      </div>
    </section >
  );
};

export default Projects;
