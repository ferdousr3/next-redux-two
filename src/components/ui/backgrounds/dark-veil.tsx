'use client'

import React from 'react'

export function DarkVeil() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden bg-slate-950">
        {/* Grain Texture */}
        <div className="absolute inset-0 opacity-[0.15]"
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />

        {/* Glows */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />

        {/* Vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-slate-950/80" />
    </div>
  )
}
