'use client'

import React, { useRef, useState, useCallback, useEffect } from 'react'
import { Code, Database, Server, Globe, Cloudy, Briefcase, CheckCircle2 } from 'lucide-react'

const steps = [
    {
        id: "01",
        title: "Foundation",
        subtitle: "C# & .NET Basics",
        desc: "Master C# syntax, type system, and object-oriented principles. Build a strong base for scalable applications.",
        icon: Code,
        color: "bg-blue-600",
        shadow: "#1e3a8a", // blue-900
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
        shadow: "#581c87", // purple-900
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
        shadow: "#064e3b", // emerald-900
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
        shadow: "#7c2d12", // orange-900
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
        shadow: "#164e63", // cyan-900
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
        shadow: "#881337", // rose-900
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
      // Progress 0 to 1
      const progress = Math.max(0, Math.min(1, scrollTop / scrollableHeight))

      // Calculate active step
      // We want Step 0 to be active initially.
      // As we scroll 0-20%, Step 0 peels off, Step 1 becomes active.

      const rawIndex = Math.floor(progress * (steps.length))
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

            {/* RIGHT COLUMN: TRUE ISOMETRIC STACK */}
            <div
                ref={containerRef}
                onScroll={handleScroll}
                className="relative h-full overflow-y-auto w-full custom-scrollbar flex items-center justify-center bg-[#fafafa] rounded-3xl"
            >
                {/* Scroll Spacer */}
                <div className="h-[2000px] w-full pointer-events-none absolute top-0" />

                {/* THE STACK CONTAINER */}
                <div className="sticky top-[150px] w-[300px] h-[300px] flex items-center justify-center perspective-none">

                     {/* Isometric Plane Wrapper */}
                     <div
                        className="relative w-full h-full"
                        style={{
                            transform: 'rotateX(60deg) rotateZ(-45deg)',
                            transformStyle: 'preserve-3d'
                        }}
                     >
                        {steps.map((step, idx) => {
                            const isPast = idx < activeStep;
                            const isActive = idx === activeStep;
                            const isFuture = idx > activeStep;

                            // Stack Offset (Z-index in iso plane = TranslateZ)
                            // But in simple CSS without preserve-3d on everything, use TranslateX/Y to simulate Z
                            // To stack "UP" in isometric:
                            // Move -X and -Y equal amounts (Diagonal Up-Left in 2D, Up in 3D)
                            // OR use translateZ if preserving 3d.

                            // Let's use translateZ for the stack height
                            const stackHeight = (steps.length - idx) * 30; // 30px per item

                            return (
                                <div
                                    key={idx}
                                    className={`absolute inset-0 rounded-3xl transition-all duration-700 ease-out flex items-center justify-center
                                        ${isPast ? 'opacity-0' : 'opacity-100'}
                                    `}
                                    style={{
                                        // Z-Index: Top items have higher index
                                        zIndex: 100 - idx,

                                        // 3D Transform Logic
                                        // Stacking: Each item is simply 'lower' (translateZ negative? or just defined by order?)
                                        // Let's stack them physically using translateZ
                                        transform: isPast
                                           ? `translateZ(${stackHeight + 400}px) translate(-200px, -200px)` // Fly UP and Away
                                           : `translateZ(${isActive ? stackHeight + 20 : stackHeight}px)`, // Active pops up a bit

                                        transformStyle: 'preserve-3d'
                                    }}
                                >
                                    {/* Card Face (Top) */}
                                    <div className={`w-full h-full rounded-3xl bg-gradient-to-br ${step.gradient} flex items-center justify-center relative overflow-hidden border-2 border-white/20`}
                                         style={{ backfaceVisibility: 'hidden' }}
                                    >
                                        {/* Gloss */}
                                        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent" />

                                        {/* No Text Here Anymore */}
                                    </div>

                                    {/* Visual Right Side (Bottom Edge) - NOW EMPTY (Shadow Only) */}
                                    <div
                                        className="absolute bottom-0 left-0 w-full h-[30px] origin-bottom shadow-inner"
                                        style={{
                                            transform: 'rotateX(90deg)',
                                            backgroundColor: step.shadow,
                                            filter: 'brightness(0.75)', // Swapped shadow to this side
                                            borderBottomLeftRadius: '24px',
                                            borderBottomRightRadius: '24px'
                                        }}
                                    />

                                    {/* Visual Left Side (Left Edge) - NOW HAS TEXT */}
                                     <div
                                        className="absolute top-0 left-0 h-full w-[30px] origin-left flex flex-col items-center justify-between py-4 text-white overflow-hidden shadow-inner"
                                        style={{
                                            transform: 'rotateY(-90deg)',
                                            backgroundColor: step.shadow,
                                            // No brightness filter (Brighter Face)
                                            borderTopLeftRadius: '24px',
                                            borderBottomLeftRadius: '24px'
                                        }}
                                    >
                                         {/* Text needs -90deg rotation to read correctly on this vertical strip?
                                             Actually, if it's the left face, text usually runs ALONG it.
                                             Let's deduce orientation from "more close text opsot".
                                             Since the strip is vertical (h-full w-30px), we can write text vertically
                                             OR rotate it -90 to run along the length if we stack divs.
                                             Let's make it run Bottom-to-Top or Top-to-Bottom.
                                             The user image had text reading Left-to-Right on a horizontal-ish face.
                                             But this is a vertical face in DOM (h-full).
                                             Let's rotate text -90deg so it reads "Up" the spine, or 90deg "Down".
                                             Typical spine is Bottom-to-Top.
                                         */}
                                         <div className="rotate-[-90deg] whitespace-nowrap font-bold uppercase tracking-widest text-[10px] opacity-90 origin-center translate-y-8">
                                            {step.title}
                                         </div>
                                         <div className="rotate-[-90deg] font-black text-xl origin-center -translate-y-4">
                                            0{idx + 1}
                                         </div>
                                    </div>


                                </div>
                            )
                        })}
                     </div>

                </div>

            </div>

        </div>
        <style jsx global>{`
           .perspective-none {
             perspective: 2000px;
           }
           .custom-scrollbar::-webkit-scrollbar {
             width: 0px;
           }
        `}</style>
    </section>
  )
}
