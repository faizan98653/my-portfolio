import React, { lazy, Suspense, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import BackgroundEffect from "./components/BackgroundEffect";
import CustomEffects from "./components/CustomEffects";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

// Lazy load section components below the hero
const About = lazy(() => import("./components/About"));
const WhyChooseMe = lazy(() => import("./components/WhyChooseMe"));
const Projects = lazy(() => import("./components/Projects"));
const Experience = lazy(() => import("./components/Experience"));
const Resume = lazy(() => import("./components/Resume"));
const Contact = lazy(() => import("./components/Contact"));

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  return (
    <div className="relative min-h-screen bg-dark-950 text-gray-100 overflow-x-hidden selection:bg-brand-blue/30 selection:text-white">
      {/* Dynamic Digital Rain Canvas Background */}
      <BackgroundEffect />

      {/* Global Cursor, Radial Background & Scroll Effects */}
      <CustomEffects />

      {/* Floating Ambient Glowing Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-3/4 left-1/3 w-[400px] h-[400px] bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Global Header Navigation */}
      <Navbar />

      {/* Page Content Layout */}
      <main className="relative w-full flex flex-col z-10">
        {/* 1. Hero / Introduction - Eagerly loaded */}
        <Hero />

        {/* 2. About Me Biography & Skills */}
        <Suspense fallback={<div />}>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: isMobile ? 0.4 : 0.5, ease: "easeOut" }}
          >
            <About />
          </motion.div>
        </Suspense>

        {/* 3. Why Choose Me benefits */}
        <Suspense fallback={<div />}>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: isMobile ? 0.4 : 0.5, ease: "easeOut" }}
          >
            <WhyChooseMe />
          </motion.div>
        </Suspense>

        {/* 4. Projects portfolio grid */}
        <Suspense fallback={<div />}>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: isMobile ? 0.4 : 0.5, ease: "easeOut" }}
          >
            <Projects />
          </motion.div>
        </Suspense>

        {/* 5. Work Timeline Experience */}
        <Suspense fallback={<div />}>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: isMobile ? 0.4 : 0.5, ease: "easeOut" }}
          >
            <Experience />
          </motion.div>
        </Suspense>

        {/* 6. Resume PDF Download */}
        <Suspense fallback={<div />}>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: isMobile ? 0.4 : 0.5, ease: "easeOut" }}
          >
            <Resume />
          </motion.div>
        </Suspense>

        {/* 7. Contact Info Listings */}
        <Suspense fallback={<div />}>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: isMobile ? 0.4 : 0.5, ease: "easeOut" }}
          >
            <Contact />
          </motion.div>
        </Suspense>
      </main>

      {/* Footer metadata block & live PKT clock */}
      <Footer />
    </div>
  );
}

export default App;
