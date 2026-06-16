import React, { useEffect, useRef, useState } from "react";

const BackgroundEffect = () => {
  const canvasRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(pointer: coarse)").matches;
    setIsMobile(mobile);
    if (mobile) return;

    let animationFrameId;
    let resizeCanvas;

    const init = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");

      // Set dimensions
      resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      // Matrix characters Central hex and symbols
      const matrixChars = "0101011100110110ABCDEF0123456789<>/{}[]+=*%-";
      const alphabet = matrixChars.split("");
      const fontSize = 14;
      const columns = Math.floor(canvas.width / fontSize) + 1;

      // Initialize matrix drops
      const rainDrops = Array.from({ length: columns }, () =>
        Math.floor((Math.random() * -canvas.height) / fontSize)
      );

      // Initialize rising particles
      const particleCount = 45;
      const particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: canvas.height + Math.random() * 200,
          size: Math.random() * 1.8 + 0.6,
          speedY: Math.random() * 0.6 + 0.2,
          speedX: Math.random() * 0.4 - 0.2,
          opacity: Math.random() * 0.4 + 0.1,
          maxOpacity: Math.random() * 0.5 + 0.2,
          fadeSpeed: Math.random() * 0.005 + 0.002,
        });
      }

      const draw = () => {
        // Create trailing fading canvas background
        ctx.fillStyle = "rgba(3, 7, 18, 0.08)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // --- 1. Draw falling Matrix code rain ---
        ctx.font = `${fontSize}px monospace`;
        for (let i = 0; i < rainDrops.length; i++) {
          const text = alphabet[Math.floor(Math.random() * alphabet.length)];
          const randomVal = Math.random();

          if (randomVal > 0.985) {
            ctx.fillStyle = "#ffffff"; // Rare white head
          } else if (randomVal > 0.65) {
            ctx.fillStyle = "#00f0ff"; // Brand Blue
          } else {
            ctx.fillStyle = "rgba(8, 253, 217, 0.25)"; // Translucent Neon Cyan
          }

          const x = i * fontSize;
          const y = rainDrops[i] * fontSize;

          ctx.fillText(text, x, y);

          if (y > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
          }
          rainDrops[i]++;
        }

        // --- 2. Draw rising blue particles ---
        particles.forEach((p) => {
          ctx.shadowBlur = 8;
          ctx.shadowColor = "#00f0ff";
          ctx.fillStyle = `rgba(0, 240, 255, ${p.opacity})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          p.y -= p.speedY;
          p.x += p.speedX;

          if (p.opacity < p.maxOpacity) {
            p.opacity += p.fadeSpeed;
          }

          if (p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
            p.y = canvas.height + Math.random() * 100;
            p.x = Math.random() * canvas.width;
            p.opacity = 0.05;
          }
        });

        ctx.shadowBlur = 0;

        animationFrameId = requestAnimationFrame(draw);
      };

      draw();
    };

    const initTimer = setTimeout(init, 0);

    return () => {
      clearTimeout(initTimer);
      if (resizeCanvas) {
        window.removeEventListener("resize", resizeCanvas);
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-25"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default BackgroundEffect;
