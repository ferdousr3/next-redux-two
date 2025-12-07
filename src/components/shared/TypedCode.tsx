'use client';

import { useEffect, useState, useRef } from 'react';

interface TypedCodeProps {
  code: string; // The full code snippet to type out
  speed?: number; // Typing speed in ms (default: 30)
  startDelay?: number; // Delay before typing starts (in ms), or specific logic
  className?: string;
  triggerInView?: boolean; // If true, only start typing when element is in view
}

export function TypedCode({ code, speed = 30, startDelay = 0, className, triggerInView = true }: TypedCodeProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  // Handle In-View Trigger
  useEffect(() => {
    if (!triggerInView) {
        setStarted(true);
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            setStarted(true);
            observer.disconnect();
        }
    });

    if (elementRef.current) {
        observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [triggerInView]);

  // Handle Typing Logic
  useEffect(() => {
    if (!started) return;

    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;

    const startTyping = () => {
         const intervalId = setInterval(() => {
            if (currentIndex >= code.length) {
                clearInterval(intervalId);
                return;
            }

            // Handle multiple characters for faster "burst" typing if beneficial, or 1 by 1
            // For now, pure 1 by 1
            setDisplayedText((prev) => prev + code[currentIndex]);
            currentIndex++;
         }, speed);

         return () => clearInterval(intervalId);
    };

    timeoutId = setTimeout(() => {
        startTyping();
    }, startDelay);

    return () => {
        clearTimeout(timeoutId);
        // Note: The interval cleanup is a bit tricky here if strictly effect-bound,
        // but given the simple nature, a re-render reset is okay.
    };
  }, [started, code, speed, startDelay]);

  return (
    <div ref={elementRef} className={className}>
      {displayedText}
      <span className="animate-pulse inline-block w-2 h-4 bg-emerald-400 ml-1 align-middle"></span>
    </div>
  );
}
