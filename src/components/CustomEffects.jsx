import React, { useEffect, useRef, useState } from "react";

const CustomEffects = () => {
  const [isDesktop] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches && !("ontouchstart" in window)
  );
  const [isMobile] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches
  );
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Start off-screen so cursor never flashes at (0,0) before first mousemove
  const mouse      = useRef({ x: -100, y: -100 });
  const cursorDot  = useRef({ x: -100, y: -100 });
  const cursorRing = useRef({ x: -100, y: -100 });
  const bgCoords   = useRef({ x: -100, y: -100 });

  // DOM refs
  const dotRef      = useRef(null);
  const ringRef     = useRef(null);
  const bgRef       = useRef(null);
  const progressRef = useRef(null);
  const canvasRef   = useRef(null);

  // Particle pool for trail
  const trail = useRef([]);
  const maxTrailParticles = 12;

  useEffect(() => {
    if (!isDesktop) {
      // Ensure native cursor is fully restored
      document.body.style.cursor = "auto";
    }


    let rAFId;
    let rAFScrollId;
    let scrollTimeout;
    let resizeListener;
    let scrollListener;
    let mouseMoveListener, mouseDownListener, mouseUpListener, mouseOverListener;

    const init = () => {
      // ── Scroll progress bar & optional parallax ───────────────────────
      const handleScroll = () => {
        if (rAFScrollId) return;

        rAFScrollId = requestAnimationFrame(() => {
          rAFScrollId = null;

          const scrollTop    = window.pageYOffset || document.documentElement.scrollTop;
          const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

          if (progressRef.current) {
            progressRef.current.style.width = `${scrollPercent}%`;
          }

          // Disable parallax scroll effects on mobile
          if (!mobile) {
            const parallaxElements = document.querySelectorAll(".parallax-element");
            const vh = window.innerHeight;
            parallaxElements.forEach((el) => {
              const rect         = el.getBoundingClientRect();
              const centerOffset = (vh / 2) - (rect.top + rect.height / 2);
              el.style.transform = `translateY(${centerOffset * 0.15}px)`;
            });
          }
        });

        // Disable scroll snapping on mobile
        if (!mobile) {
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            const sections  = document.querySelectorAll("section");
            const threshold = 80;
            for (let section of sections) {
              const rect = section.getBoundingClientRect();
              if (Math.abs(rect.top) > 5 && Math.abs(rect.top) < threshold) {
                window.scrollTo({ top: window.pageYOffset + rect.top, behavior: "smooth" });
                break;
              }
            }
          }, 150);
        }
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      scrollListener = handleScroll;
      handleScroll(); // run once immediately

      // ── Desktop only features: Cursor, Custom Trail, and Follow Gradient ──
      if (isPointerFine) {
        const handleMouseMove = (e) => {
          mouse.current.x = e.clientX;
          mouse.current.y = e.clientY;
        };

        const handleMouseDown = () => setIsClicked(true);
        const handleMouseUp   = () => setIsClicked(false);

        const handleMouseOver = (e) => {
          const target = e.target;
          if (!target) return;
          const clickable = target.closest(
            "a, button, [role='button'], input, select, textarea, .cursor-pointer, .hud-card-wrapper"
          );
          setIsHovered(!!clickable);
        };

        document.addEventListener("mousemove",  handleMouseMove, { passive: true });
        document.addEventListener("mousedown",  handleMouseDown, { passive: true });
        document.addEventListener("mouseup",    handleMouseUp,   { passive: true });
        document.addEventListener("mouseover",  handleMouseOver, { passive: true });

        mouseMoveListener = handleMouseMove;
        mouseDownListener = handleMouseDown;
        mouseUpListener   = handleMouseUp;
        mouseOverListener = handleMouseOver;

        let lastTime = 0;
        const animate = (time) => {
          cursorRing.current.x = mouse.current.x;
          cursorRing.current.y = mouse.current.y;
          cursorDot.current.x  = mouse.current.x;
          cursorDot.current.y  = mouse.current.y;

          bgCoords.current.x += (mouse.current.x - bgCoords.current.x) * 0.05;
          bgCoords.current.y += (mouse.current.y - bgCoords.current.y) * 0.05;

          if (dotRef.current) {
            dotRef.current.style.transform =
              `translate3d(${cursorDot.current.x}px, ${cursorDot.current.y}px, 0) translate(-50%, -50%)`;
          }
          if (ringRef.current) {
            ringRef.current.style.transform =
              `translate3d(${cursorRing.current.x}px, ${cursorRing.current.y}px, 0) translate(-50%, -50%)`;
          }

          if (bgRef.current) {
            bgRef.current.style.background = `radial-gradient(600px at ${bgCoords.current.x}px ${bgCoords.current.y}px, rgba(0, 212, 255, 0.05) 0%, rgba(139, 92, 246, 0.02) 50%, transparent 100%)`;
          }

          if (time - lastTime > 60) {
            if (trail.current.length < maxTrailParticles) {
              trail.current.push({ x: mouse.current.x, y: mouse.current.y, size: 4, alpha: 0.8 });
            } else {
              const oldest = trail.current.find(p => p.alpha <= 0) || trail.current[0];
              oldest.x     = mouse.current.x;
              oldest.y     = mouse.current.y;
              oldest.alpha = 0.8;
              oldest.size  = 4;
            }
            lastTime = time;
          }

          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            trail.current.forEach((p) => {
              if (p.alpha > 0) {
                ctx.fillStyle = `rgba(0, 212, 255, ${p.alpha})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                p.alpha -= 0.03;
                p.size   = Math.max(0, p.size - 0.08);
              }
            });
          }

          rAFId = requestAnimationFrame(animate);
        };

        rAFId = requestAnimationFrame(animate);

        const handleResize = () => {
          const canvas = canvasRef.current;
          if (canvas) {
            canvas.width  = window.innerWidth;
            canvas.height = window.innerHeight;
          }
        };
        handleResize();
        window.addEventListener("resize", handleResize, { passive: true });
        resizeListener = handleResize;
      }
    };

    const initTimer = setTimeout(init, 0);

    return () => {
      clearTimeout(initTimer);
      if (mouseMoveListener) document.removeEventListener("mousemove", mouseMoveListener);
      if (mouseDownListener) document.removeEventListener("mousedown", mouseDownListener);
      if (mouseUpListener)   document.removeEventListener("mouseup",   mouseUpListener);
      if (mouseOverListener) document.removeEventListener("mouseover", mouseOverListener);
      if (scrollListener)    window.removeEventListener("scroll",      scrollListener);
      if (resizeListener)    window.removeEventListener("resize",      resizeListener);
      
      if (rAFId) cancelAnimationFrame(rAFId);
      if (rAFScrollId) cancelAnimationFrame(rAFScrollId);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // On mobile pointer devices, only render the progress bar
  if (!isDesktop) {
    return (
      <div
        ref={progressRef}
        className="fixed top-0 left-0 h-[3px] bg-brand-blue z-[9999] pointer-events-none transition-all duration-100 ease-out"
        style={{ width: "0%" }}
      />
    );
  }

  return (
    <>
      {/* 3px Scroll Depth Progress Bar */}
      <div
        ref={progressRef}
        className="fixed top-0 left-0 h-[3px] bg-brand-blue z-[9999] pointer-events-none transition-all duration-100 ease-out"
        style={{ width: "0%" }}
      />

      {/* Large radial gradient following cursor — background layer */}
      <div
        ref={bgRef}
        className="fixed inset-0 pointer-events-none z-0"
      />

      {/* Canvas layer for glow trail — id matches CSS safety net */}
      <canvas
        id="cursor-trail"
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998]"
      />

      {/* Dual Ring Custom Cursor Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9999]">
        {/* Outer Ring — id matches CSS safety net */}
        <div
          id="cursor-ring"
          ref={ringRef}
          className={`absolute rounded-full border border-brand-blue/80 pointer-events-none transition-[width,height,background-color] duration-200 ease-out ${
            isHovered
              ? "w-[52px] h-[52px] bg-brand-blue/8"
              : isClicked
                ? "w-[20px] h-[20px] bg-transparent"
                : "w-[32px] h-[32px] bg-transparent"
          }`}
          style={{
            willChange: "transform",
            transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)"
          }}
        />

        {/* Inner Dot — id matches CSS safety net */}
        <div
          id="cursor-dot"
          ref={dotRef}
          className={`absolute rounded-full bg-brand-blue pointer-events-none transition-all duration-200 ease-out ${
            isHovered
              ? "w-0 h-0 opacity-0"
              : isClicked
                ? "w-[4px] h-[4px]"
                : "w-[8px] h-[8px]"
          }`}
          style={{
            willChange: "transform",
            transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)"
          }}
        />
      </div>
    </>
  );
};

export default CustomEffects;
