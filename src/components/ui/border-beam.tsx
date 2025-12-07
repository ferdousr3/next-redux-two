'use client'

import React from 'react'

interface BorderBeamProps {
  duration?: number
  borderWidth?: number
  colorFrom?: string
  colorTo?: string
  delay?: number
  className?: string
}

export function BorderBeam({
  duration = 15,
  borderWidth = 1.5,
  colorFrom = '#3b82f6', // blue-500
  colorTo = '#a855f7',   // purple-500
  delay = 0,
  className = '',
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          '--duration': `${duration}s`,
          '--border-width': `${borderWidth}px`,
          '--color-from': colorFrom,
          '--color-to': colorTo,
          '--delay': `-${delay}s`,
        } as React.CSSProperties
      }
      className={`absolute inset-0 rounded-[inherit] pointer-events-none z-10 overflow-hidden ${className}`}
    >
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
            border: 'var(--border-width) solid transparent',
            mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
        }}
      >
         <div className="absolute top-0 left-0 w-full aspect-square bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent opacity-0 animate-border-beam [animation-delay:var(--delay)]"
              style={{ padding: 'var(--border-width)' }}
         />
      </div>

      <style jsx>{`
        @keyframes border-beam {
          0% {
            offset-distance: 0%;
            opacity: 0;
          }
           20% {
             opacity: 1;
           }
           80% {
             opacity: 1;
           }
          100% {
            offset-distance: 100%;
            opacity: 0;
          }
        }
        .animate-border-beam {
          animation: border-beam var(--duration) linear infinite;
          offset-path: rect(0 auto auto 0 round calc(1.5rem - var(--border-width))); /* Adjust rounding based on parent */
        }
      `}</style>
    </div>
  )
}
