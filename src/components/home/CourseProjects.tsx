'use client'

import React, { useRef, useLayoutEffect } from 'react'
import { ShoppingCart, LayoutDashboard, MessageSquare, Code2 } from 'lucide-react'
import gsap from 'gsap'

const projects = [
    {
        id: 1,
        title: "E-Commerce",
        desc: "Stripe payments. Postgres.",
        tech: ["Next.js", "Stripe"],
        icon: ShoppingCart,
        colors: ['#3b82f6', '#60a5fa']
    },
    {
        id: 2,
        title: "Dashboard",
        desc: "D3.js Visualization.",
        tech: ["Angular", "D3.js"],
        icon: LayoutDashboard,
        colors: ['#a855f7', '#d8b4fe']
    },
    {
        id: 3,
        title: "Chat App",
        desc: "Real-time SignalR.",
        tech: ["React", "Redis"],
        icon: MessageSquare,
        colors: ['#10b981', '#34d399']
    }
]

export function CourseProjects() {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
      const ctx = gsap.context(() => {
          // Animate the rotation of the gradient backgrounds
          gsap.to('.animated-border-bg', {
              rotation: 360,
              duration: 4,
              repeat: -1,
              ease: 'none'
          })
      }, containerRef)
      return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                <div className="max-w-xl">
                    <h2 className="text-4xl font-bold text-slate-900 mb-6">
                        Production Apps
                    </h2>
                    <p className="text-slate-600 text-lg">
                        Build 3 major capstones.
                    </p>
                </div>
                <button className="hidden md:flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-all rounded-full">
                    <Code2 className="w-4 h-4" /> View Source
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {projects.map((project, idx) => (
                    <div key={project.id} className="group relative bg-transparent h-full flex flex-col rounded-3xl isolate">

                        {/* 1. Animated Gradient Border (Behind) */}
                        <div className="absolute -inset-[2px] rounded-3xl overflow-hidden z-0">
                            {/* The rotating gradient layer */}
                            <div
                                className="animated-border-bg absolute top-[-50%] left-[-50%] w-[200%] h-[200%] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    background: `conic-gradient(transparent, transparent, transparent, ${project.colors[0]})`
                                }}
                            />
                        </div>

                        {/* 2. Main Card Content (Foreground) */}
                        <div className="relative z-10 bg-white h-full p-8 rounded-3xl border border-slate-200 group-hover:border-transparent transition-colors flex flex-col">
                            <div className={`w-12 h-12 bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 rounded-2xl`}>
                                <project.icon className={`w-6 h-6 text-slate-900 transition-colors`} />
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
                            <p className="text-slate-500 text-sm mb-8 flex-1">
                                {project.desc}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.tech.map(t => (
                                    <span key={t} className="px-3 py-1 bg-slate-50 border border-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-lg">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}
