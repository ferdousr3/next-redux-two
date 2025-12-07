'use client'

import React, { useRef, useLayoutEffect } from 'react'
import { CheckCircle2, Star, Trophy, Target, Sparkles, BookOpen, Layers, Terminal, Cloud, Briefcase } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
    {
        title: "Foundations",
        desc: "Master the Core",
        icon: BookOpen,
        color: "bg-blue-500",
        topics: ["C# Syntax & Types", "OOP Principles", "Memory Management", "Async/Await"]
    },
    {
        title: "Data Mastery",
        desc: "Design & Query",
        icon: Layers,
        color: "bg-purple-500",
        topics: ["SQL Server", "EF Core 8", "LINQ Fundamentals", "Database Design"]
    },
    {
        title: "API Backend",
        desc: "Build Robust Services",
        icon: Terminal,
        color: "bg-indigo-500",
        topics: ["ASP.NET Core", "RESTful Architecture", "JWT Auth", "Dependency Injection"]
    },
    {
        title: "Modern Frontend",
        desc: "Interactive UI",
        icon: Star,
        color: "bg-pink-500",
        topics: ["React / Angular", "Tailwind CSS", "State Management", "Component Patterns"]
    },
    {
        title: "DevOps",
        desc: "Deploy & Scale",
        icon: Cloud,
        color: "bg-amber-500",
        topics: ["Docker Containers", "Azure Clouds", "CI/CD Pipelines", "Monitoring"]
    },
    {
        title: "Career",
        desc: "Get Hired",
        icon: Briefcase,
        color: "bg-emerald-500",
        topics: ["Resume Building", "Mock Interviews", "Salary Negotiation", "LinkedIn Growth"]
    },
]

export function CourseRoadmap() {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

        // Staggered Entrance for Cards
        gsap.from('.roadmap-card-reveal', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.roadmap-grid',
                start: 'top 80%',
            }
        })

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="bg-slate-50 py-24 border-t border-slate-100 mb-32">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                 <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
                    The Roadmap
                 </h2>
                 <p className="text-slate-500 text-lg">
                    A comprehensive journey from Hello World to Hired.
                 </p>
            </div>

            {/* Zig-Zag / Grid Layout */}
            <div className="relative">
                {/* Connector Line (Desktop) */}
                <div className="hidden md:block absolute top-[28px] left-[8%] right-[8%] h-1 bg-slate-200 -z-10 rounded-full" />

                <div className="roadmap-grid grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {steps.map((step, idx) => (
                        <div key={idx} className="roadmap-card-reveal relative group">
                            {/* Step Indicator */}
                            <div className="flex flex-col items-center h-full">
                                <div className={`w-14 h-14 rounded-2xl ${step.color} shadow-lg shadow-slate-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                                    <step.icon className="w-6 h-6 text-white" />
                                </div>

                                {/* Rich Card Body */}
                                <div className="bg-white border border-slate-200 hover:border-slate-300 p-6 rounded-3xl w-full hover:shadow-xl transition-all h-full flex flex-col relative overflow-hidden group-hover:-translate-y-1">
                                    <div className={`absolute top-0 left-0 w-full h-1 ${step.color} opacity-0 group-hover:opacity-100 transition-opacity`} />

                                    <h3 className="font-bold text-slate-900 text-lg mb-1">{step.title}</h3>
                                    <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-4">{step.desc}</p>

                                    <ul className="space-y-2 mt-auto text-left">
                                        {step.topics.map((topic, i) => (
                                            <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                                                <div className={`w-1 h-1 rounded-full ${step.color} mt-1.5 shrink-0`} />
                                                {topic}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Decorative Bottom Tag */}
                <div className="flex justify-center mt-16 roadmap-card-reveal">
                     <div className="inline-flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-full text-sm font-bold shadow-lg cursor-pointer hover:scale-105 transition-transform">
                         <Sparkles className="w-4 h-4 text-amber-400" />
                         <span>Outcome: Full Stack Architect</span>
                     </div>
                </div>

            </div>
        </div>
    </section>
  )
}
