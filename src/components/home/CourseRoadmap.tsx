'use client'

import React, { useRef, useState, useCallback } from 'react'
import { Code, Database, Server, Globe, Cloudy, Briefcase, CheckCircle2 } from 'lucide-react'

const steps = [
    {
        id: "01",
        title: "Foundation",
        subtitle: "C# & .NET Basics",
        desc: "Master C# syntax, type system, and object-oriented principles. Build a strong base for scalable applications.",
        icon: Code,
        color: "bg-blue-600",
        // No more isometric shadows needed, using flat/modern shadows
        gradient: "from-blue-600 to-cyan-500",
        lightColor: "bg-blue-50",
        topics: ["C# 12 Features", "LINQ", "Async Programming", "Memory Management"]
    },
    {
        id: "02",
        title: "Data Mastery",
        subtitle: "SQL & EF Core",
        desc: "Design complex schemas with SQL Server. Master Entity Framework Core for high-performance data access.",
        icon: Database,
        color: "bg-purple-600",
        gradient: "from-purple-600 to-pink-500",
        lightColor: "bg-purple-50",
        topics: ["SQL Normalization", "EF Core 8", "Migrations", "Query Optimization"]

    },
    {
        id: "03",
        title: "API Backend",
        subtitle: "ASP.NET Core",
        desc: "Build robust REST APIs with ASP.NET Core. Implement enterprise security protocols and dependency injection.",
        icon: Server,
        color: "bg-emerald-600",
        gradient: "from-emerald-600 to-teal-500",
        lightColor: "bg-emerald-50",
        topics: ["Clean Architecture", "JWT Auth", "Redis Caching", "Rate Limiting"]
    },
    {
        id: "04",
        title: "Modern Frontend",
        subtitle: "Next.js & React",
        desc: "Create dynamic user experiences with React and Next.js. State management, routing, and component design.",
        icon: Globe,
        color: "bg-orange-600",
        gradient: "from-orange-600 to-yellow-500",
        lightColor: "bg-orange-50",
        topics: ["Next.js 14", "Redux Toolkit", "Tailwind CSS", "Hooks Patterns"]
    },
    {
        id: "05",
        title: "DevOps",
        subtitle: "Docker & Cloud",
        desc: "Deploy to production with confidence. Master Docker containerization and Azure cloud infrastructure.",
        icon: Cloudy,
        color: "bg-cyan-600",
        gradient: "from-cyan-600 to-blue-500",
        lightColor: "bg-cyan-50",
        topics: ["Docker & Compose", "CI/CD Pipelines", "Azure App Service", "Monitoring"]
    },
    {
        id: "06",
        title: "Career",
        subtitle: "Placement Info",
        desc: "Translate your skills into a high-paying offer. Mock interviews, resume reviews, and salary negotiation.",
        icon: Briefcase,
        color: "bg-rose-600",
        gradient: "from-rose-600 to-red-500",
        lightColor: "bg-rose-50",
        topics: ["System Design", "Behavioral Interview", "Resume Polish", "Job Strategy"]
    },
]

export function CourseRoadmap() {
  const [activeStep, setActiveStep] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Safe Scroll Handler
  const handleScroll = useCallback(() => {
      if (!containerRef.current) return

      const { scrollTop, scrollHeight, clientHeight } = containerRef.current
      if (clientHeight === 0) return

      const scrollableHeight = scrollHeight - clientHeight
      const progress = Math.max(0, Math.min(1, scrollTop / scrollableHeight))

      const rawIndex = Math.floor(progress * (steps.length + 0.5))
      const safeIndex = Math.max(0, Math.min(rawIndex, steps.length - 1))

      setActiveStep(safeIndex)
  }, [])

  const ActiveIcon = steps[activeStep].icon

  return (
    <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 h-[600px]">

             {/* LEFT COLUMN: DETAILS */}
             <div className="flex flex-col justify-center h-full">
                 <div key={activeStep} className="animate-in fade-in slide-in-from-left-4 duration-500">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${steps[activeStep].lightColor} text-sm font-bold tracking-wide uppercase mb-6 w-fit`}>
                        <ActiveIcon className={`w-4 h-4`} />
                        <span>Phase {steps[activeStep].id}</span>
                    </div>

                    <h2 className={`text-5xl font-black mb-4 tracking-tight bg-gradient-to-r ${steps[activeStep].gradient} bg-clip-text text-transparent`}>
                        {steps[activeStep].title}
                    </h2>
                    <h3 className="text-2xl font-medium text-slate-400 mb-6">
                        {steps[activeStep].subtitle}
                    </h3>

                    <p className="text-lg text-slate-600 leading-relaxed mb-8">
                        {steps[activeStep].desc}
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                        {steps[activeStep].topics.map((topic, i) => (
                            <div key={i} className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-100 rounded-lg">
                                <CheckCircle2 className={`w-4 h-4 ${steps[activeStep].color.replace('bg-', 'text-')}`} />
                                <span className="font-semibold text-slate-700 text-sm">{topic}</span>
                            </div>
                        ))}
                    </div>
                 </div>
            </div>

            {/* RIGHT COLUMN: STRAIGHT VERTICAL STACK */}
            <div
                ref={containerRef}
                onScroll={handleScroll}
                className="relative h-full overflow-y-auto w-full custom-scrollbar flex items-center justify-center bg-slate-50 rounded-3xl"
            >
                {/* Scroll Spacer */}
                <div className="h-[2000px] w-full pointer-events-none absolute top-0" />

                {/* THE STACK CONTAINER */}
                <div className="sticky top-[50px] w-[320px] lg:w-[380px] h-[500px] flex flex-col items-center">

                        {steps.map((step, idx) => {
                            const relativeIndex = idx - activeStep
                            const isActive = idx === activeStep
                            const isPast = idx < activeStep

                            // Stack Logic: Straight Vertical
                            return (
                                <div
                                    key={idx}
                                    className={`absolute left-0 right-0 h-[100px] rounded-2xl transition-all duration-500 ease-out border border-white/20
                                        ${isPast ? 'opacity-0 -translate-y-[200px] scale-90' : 'opacity-100'}
                                    `}
                                    style={{
                                        zIndex: 10 + (steps.length - idx), // 0 on top
                                        // Vertical Offset: Multiplier * Height
                                        // If Active: 0px.
                                        // Next 1: 100px.
                                        // Next 2: 200px.
                                        transform: isPast
                                            ? `translateY(-200px) scale(0.9)`
                                            : `translateY(${relativeIndex * 85}px) scale(${1 - (relativeIndex * 0.05)})`, // Stack Effect
                                        top: 0
                                    }}
                                >
                                    {/* The Card Content */}
                                    <div className={`w-full h-full rounded-2xl bg-gradient-to-r ${step.gradient} flex items-center justify-between px-8 text-white shadow-xl hover:brightness-110 transition-all`}>
                                        <div className="flex items-center gap-4">
                                            <span className="text-4xl font-black opacity-40">0{idx + 1}</span>
                                            <div>
                                                <h3 className="font-bold text-lg leading-tight">{step.title}</h3>
                                                <p className="text-xs opacity-70 font-medium uppercase tracking-wider">{step.subtitle}</p>
                                            </div>
                                        </div>
                                        {isActive ? (
                                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                                 <step.icon className="w-4 h-4 text-white" />
                                            </div>
                                        ) : (
                                            <div className="w-2 h-2 rounded-full bg-white/40" />
                                        )}
                                    </div>

                                </div>
                            )
                        })}

                </div>

            </div>

        </div>
        <style jsx global>{`
           .custom-scrollbar::-webkit-scrollbar {
             width: 0px;
           }
        `}</style>
    </section>
  )
}
