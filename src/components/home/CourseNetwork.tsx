'use client'

import React from 'react'
import { Database, Server, Globe, Cpu, Cloud } from 'lucide-react'

export function CourseNetwork() {
  return (
    <section className="relative h-[800px] flex items-start justify-center overflow-hidden bg-slate-50 border-y border-slate-100 pt-32">

        {/* Background Decorative Grid */}
        <div className="absolute inset-0 z-0 opacity-[0.03]"
           style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '30px 30px' }}
        />

        <div className="relative z-10 text-center max-w-2xl px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                The Ecosystem
            </h2>
            <p className="text-slate-500 text-lg">
                Full layout mastery. From database schemas to responsive client-side hydration.
            </p>
        </div>

        {/* Network Nodes Visualization - Pushed down to avoid overlap */}
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] z-0 pointer-events-none md:scale-100 scale-50">

             {/* Central Hub */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white border border-slate-200 shadow-xl flex flex-col items-center justify-center z-20 rounded-full">
                 <Server className="w-8 h-8 text-slate-800 mb-2" />
                 <span className="text-xs font-bold text-slate-500 uppercase">Server</span>
             </div>

             {/* Orbiting Satellite 1 (Database) */}
             <div className="absolute top-10 left-20 w-32 h-24 bg-white border border-slate-200 shadow-lg flex flex-col items-center justify-center animate-float-slow z-10 rounded-2xl">
                 <Database className="w-6 h-6 text-blue-500 mb-2" />
                 <span className="text-xs font-bold text-slate-400">Postgres</span>
             </div>

             {/* Orbiting Satellite 2 (Frontend) */}
             <div className="absolute bottom-10 right-20 w-32 h-24 bg-white border border-slate-200 shadow-lg flex flex-col items-center justify-center animate-float-slow delay-700 z-10 rounded-2xl">
                 <Globe className="w-6 h-6 text-purple-500 mb-2" />
                 <span className="text-xs font-bold text-slate-400">Client</span>
             </div>

              {/* Orbiting Satellite 3 (API) */}
             <div className="absolute top-0 right-32 w-28 h-20 bg-white border border-slate-200 shadow-lg flex flex-col items-center justify-center animate-float-slow delay-1000 z-10 rounded-2xl">
                 <Cloud className="w-6 h-6 text-emerald-500 mb-2" />
                 <span className="text-xs font-bold text-slate-400">API</span>
             </div>

             {/* Orbiting Satellite 4 (Logic) */}
             <div className="absolute bottom-0 left-32 w-28 h-20 bg-white border border-slate-200 shadow-lg flex flex-col items-center justify-center animate-float-slow delay-500 z-10 rounded-2xl">
                 <Cpu className="w-6 h-6 text-pink-500 mb-2" />
                 <span className="text-xs font-bold text-slate-400">Logic</span>
             </div>

             {/* Connector Lines */}
             <svg className="absolute inset-0 w-full h-full -z-10 text-slate-200">
                 <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                 <line x1="50%" y1="50%" x2="80%" y2="80%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                 <line x1="50%" y1="50%" x2="70%" y2="10%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                 <line x1="50%" y1="50%" x2="30%" y2="90%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
             </svg>

        </div>
    </section>
  )
}
