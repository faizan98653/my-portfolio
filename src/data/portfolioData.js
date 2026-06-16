// Portfolio Configuration Data for Faizan
// All data is central here. Easily customizable.

export const portfolioData = {
  personalInfo: {
    name: "Faizan",
    title: "Full Stack Web Developer",
    subTitle: "Building Scalable, Premium & High-Performance Web Applications",
    bio: "I am a passionate Full Stack Developer dedicated to crafting immersive, responsive, and functionally robust digital experiences. By bridging the gap between elegant frontend interfaces and optimized backend systems, I build websites that don't just work, but captivate. My focus is on clean architecture, modern tech stacks, and creating measurable value for businesses.",
    profileImage: "/profile.jpeg", // TODO: Replace with live profile photo in /public/profile.jpg
    resumePath: "/resume.pdf", // TODO: Replace with actual resume PDF in /public/resume.pdf
  },

  socialLinks: {
    github: "https://github.com/faizan98653",
    linkedin: "https://linkedin.com/in/faizan-zubair-3793b925a",
    upwork: "https://www.upwork.com/freelancers/~011901f90405c8a5bf",
    email: "mailto:faixzan59@gmail.com",
    phone: "tel:+923044428773",
    rawEmail: "faixzan59@gmail.com",
    rawPhone: "+92 3044428773",
  },

  stats: [
    { label: "Projects Completed", value: "3+" },
    { label: "Technologies Mastered", value: "5+" },
    { label: "Years Experience", value: "1+" },
    { label: "Client Satisfaction", value: "99%" },
  ],

  // Grouped skills for the About section tech stack visual
  skills: [
    {
      category: "Frontend",
      items: ["React.js", "Next.js", "CSS", "JavaScript (ES6+)", "HTML5 / CSS3"],
    },
    {
      category: "Backend & Database",
      items: ["Node.js", "Express.js", "MySQL"],
    },
    {
      category: "Tools & DevOps",
      items: ["Git / GitHub"],
    },
  ],

  whyChooseMe: [
    {
      id: "tech-expertise",
      title: "Technical Expertise",
      description: "Proficient across the full stack with hands-on experience in modern frameworks, tools, and scalable architecture.",
      icon: "Cpu",
    },
    {
      id: "timely-delivery",
      title: "Timely Delivery",
      description: "Deadlines are commitments, not suggestions. I deliver quality work on schedule, every time.",
      icon: "Calendar",
    },
    {
      id: "collaborative",
      title: "Collaborative",
      description: "I work closely with teams and clients, keeping communication clear and the process transparent.",
      icon: "Users",
    },
    {
      id: "problem-solving",
      title: "Problem Solving",
      description: "I break down complex challenges into elegant, efficient solutions with a clean code mindset.",
      icon: "Zap",
    },
    {
      id: "hard-working",
      title: "Hard Working",
      description: "I go the extra mile, whether it's debugging at midnight or learning a new tool to get the job done right.",
      icon: "ShieldAlert",
    },
  ],

  projects: [
    {
      id: 1,
      title: "REACT ChatBot UI",
      description: "Built an interactive chatbot application with dynamic message flow, reusable components, and efficient state management. Utilized React Hooks and conditional rendering to deliver a responsive user experience.",
      techStack: ["React.js", "HTML", " CSS", "JAVASCRIPT", "Git/Github"],
      // TODO: replace with live project URL
      projectLink: "https://github.com/faizan98653",
      image: "chatbot.PNG",
    },
    {
      id: 2,
      title: "VR Glove",
      description: "Developed a VR glove system using ESP32, potentiometers and SteamVR to provide real time finger tracking and haptic feedback for immersive virtual reality interactions.",
      techStack: ["ESP32", "Arduino C/C++", "Unity", "SteamVR", "OpenVR", "Potentiometers", "Servo Motors", "3D Printing"],
      // TODO: replace with live project URL
      projectLink: "https://github.com/faizan98653",
      image: "vr_glove.PNG",
    },
    {
      id: 3,
      title: "1024 Console Based Game",
      description: "Developed a console-based 1024 puzzle game in C++, implementing game mechanics, tile merging, and score tracking. Created an interactive user experience through keyboard controls while demonstrating proficiency in code structure, algorithms, and problem solving.",
      techStack: ["C++"],
      // TODO: replace with live project URL
      projectLink: "https://github.com/faizan98653",
      image: "1024.PNG",
    },
  ],

  experience: [
    // TODO: Copy and paste new experience objects here as needed to add to timeline
    {
      id: 1,
      company: "Senarios",
      designation: "Software Engineering Intern",
      duration: "June 2024 - August 2024",
      achievements: [
        "Developed a fully responsive clone website using HTML, CSS, and JavaScript.",
        "Integrated advanced frontend features for a seamless and interactive user experience.",
        "Demonstrated expertise in responsive design for optimal performance across devices.",
      ],
    },
    {
      id: 2,
      company: "Software House",
      designation: "Associate Web Developer",
      duration: "upcoming",
      achievements: [
        "Designed and implemented high-performance web forms, state management routers, and custom hooks.",
        "Integrated dynamic payment gateways and third-party SaaS services including Stripe and SendGrid.",
        "Maintained cross-browser compatibility and optimized assets, resulting in a 1.5s reduction in initial page load time.",
      ],
    },
    {
      id: 3,
      company: "Freelance Client Engagements",
      designation: "Freelance Full Stack Developer",
      duration: "upcoming",
      achievements: [
        "Developed and delivered over 15 responsive web platforms for local and international startups using Node, React, and MongoDB.",
        "Collaborated closely with stakeholders to capture business logic and deploy web applications onto Vercel and AWS.",
        "Constructed automated backup scripts and migration pipelines for client databases.",
      ],
    },
  ],

  contactInfo: {
    location: "Lahore, Pakistan 📍",
    availableHours: "9:00 AM – 11:00 PM PKT",
    responseTime: "~1 Hour",
    timezone: "Asia/Karachi", // For the live local clock
  },
};
