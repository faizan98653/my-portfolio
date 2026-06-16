import React from "react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import BackgroundEffect from "./components/BackgroundEffect";
import CustomEffects from "./components/CustomEffects";
import Hero from "./components/Hero";
import About from "./components/About";
import WhyChooseMe from "./components/WhyChooseMe";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
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
        {/* 1. Hero / Introduction */}
        <Hero />

        {/* 2. About Me Biography & Skills */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <About />
        </motion.div>

        {/* 3. Why Choose Me benefits */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <WhyChooseMe />
        </motion.div>

        {/* 4. Projects portfolio grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Projects />
        </motion.div>

        {/* 5. Work Timeline Experience */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Experience />
        </motion.div>

        {/* 6. Resume PDF Download */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Resume />
        </motion.div>

        {/* 7. Contact Info Listings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Contact />
        </motion.div>
      </main>

      {/* Footer metadata block & live PKT clock */}
      <Footer />
    </div>
  );
}

export default App;
