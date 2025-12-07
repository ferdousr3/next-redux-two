'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ScrollPipeline() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const path = pathRef.current;
    const glow = glowRef.current;

    if (!svg || !path || !glow) return;

    // Initial setup
    const updatePath = () => {
        // Calculate a dynamic path that weaves down the screen
        // In a real app, this would need to measure section heights to weave "around" content
        // For now, we'll draw a sine wave down the center-ish
        const width = window.innerWidth;
        const height = document.body.scrollHeight;

        let d = `M${width / 2},0 `;
        const steps = 20;
        const stepY = height / steps;

        for (let i = 1; i <= steps; i++) {
            const y = i * stepY;
            const x = (width / 2) + Math.sin(i * 0.5) * (width * 0.3); // Weave
            d += `S${x},${y - stepY / 2} ${x},${y} `;
        }

        path.setAttribute('d', d);
        glow.setAttribute('d', d);

        // Set dash array for drawing effect
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
        glow.style.strokeDasharray = `${length}`;
        glow.style.strokeDashoffset = `${length}`;

        return length;
    };

    let length = updatePath();

    // Animate on scroll
    const ctx = gsap.context(() => {
      gsap.to([path, glow], {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        }
      });

      // Pulse animation for the glowing pipe
      gsap.to(glow, {
          strokeWidth: 15,
          opacity: 0.6,
          duration: 1.5,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut"
      });
    });

    // Handle resize
    const handleResize = () => {
        length = updatePath();
        ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
        ctx.revert();
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden h-full w-full">
      <svg
        ref={svgRef}
        className="w-full h-full absolute top-0 left-0"
        style={{ height: '100vh' }} // SVG window is fixed viewport, path calculations map to doc height logic
        preserveAspectRatio="none"
      >
        {/* Glow Layer */}
        <path
          ref={glowRef}
          fill="none"
          stroke="#10b981" // Emerald-500
          strokeWidth="10"
          strokeLinecap="round"
          className="blur-md opacity-40 transition-all"
        />
        {/* Solid Core Layer */}
        <path
          ref={pathRef}
          fill="none"
          stroke="#059669" // Emerald-600
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
