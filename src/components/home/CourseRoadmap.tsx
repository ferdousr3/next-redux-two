'use client'

import React, { useRef, useState } from 'react'
import { Sparkles, Code, Database, Server, Globe, Cloudy, Briefcase, CheckCircle2 } from 'lucide-react'

const steps = [
    {
        id: "01",
        title: "Foundation",
        subtitle: "The Language of Enterprise",
        desc: "Master C# syntax, type system, and object-oriented principles. Build a strong base for scalable applications.",
        icon: Code,
        color: "bg-blue-600",
        gradient: "from-blue-600 to-cyan-500",
        lightColor: "bg-blue-50",
        topics: ["C# 12 Features", "LINQ", "Async Programming", "Memory Management"]
    },
    {
        id: "02",
        title: "Data Mastery",
        subtitle: "Architecting Persistence",
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
        subtitle: "Scalable Services",
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
        subtitle: "Interactive UIs",
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
        subtitle: "Cloud Native",
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
        subtitle: "Get Hired",
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
  const rightColRef = useRef<HTMLDivElement>(null)

  // Handle Internal Scroll to update Active Step
  const handleScroll = () => {
      if (!rightColRef.current) return

      const { scrollTop, clientHeight } = rightColRef.current
      const itemHeight = 400 // Approximate height of each item box
      const centerOffset = clientHeight / 3

      const index = Math.floor((scrollTop + centerOffset) / itemHeight)
      const safeIndex = Math.max(0, Math.min(index, steps.length - 1))

      if (safeIndex !== activeStep) {
          setActiveStep(safeIndex)
      }
  }

  const ActiveIcon = steps[activeStep].icon

  return (
    <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6">
             {/* FIXED HEIGHT CONTAINER - REMOVED SHADOW/BORDER */}
             <div className="rounded-3xl bg-[#fafafa] overflow-hidden h-[800px] flex flex-col lg:flex-row">

                {/* LEFT COLUMN: FIXED DETAILS */}
                <div className="w-full lg:w-1/2 p-12 xl:p-20 flex flex-col justify-center bg-white border-b lg:border-b-0 lg:border-r border-slate-50 relative h-[400px] lg:h-auto">

                     <div key={activeStep} className="animate-in fade-in slide-in-from-left-4 duration-500">
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${steps[activeStep].lightColor} text-sm font-bold tracking-wide uppercase mb-6 w-fit`}>
                            <ActiveIcon className={`w-4 h-4`} />
                            <span>Phase {steps[activeStep].id}</span>
                        </div>

                        <h2 className={`text-4xl lg:text-5xl font-black mb-4 tracking-tight bg-gradient-to-r ${steps[activeStep].gradient} bg-clip-text text-transparent`}>
                            {steps[activeStep].title}
                        </h2>
                        <h3 className="text-xl lg:text-2xl font-medium text-slate-400 mb-6">
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

                {/* RIGHT COLUMN: INTERNALLY SCROLLABLE LIST - REMOVED BORDERS */}
                <div
                    ref={rightColRef}
                    onScroll={handleScroll}
                    className="w-full lg:w-1/2 h-full overflow-y-auto scroll-smooth custom-scrollbar relative px-8 lg:px-16"
                    style={{ scrollBehavior: 'smooth' }}
                >
                     <div className="py-20 space-y-20">
                        {steps.map((step, idx) => (
                            <div key={idx} className="h-[400px] flex items-center justify-center transition-all duration-500">
                                <div
                                    className={`w-full p-8 transition-all duration-500 cursor-pointer
                                    ${activeStep === idx
                                        ? 'opacity-100 scale-110'
                                        : 'opacity-20 scale-90 grayscale blur-sm'
                                    }`}
                                    onClick={() => {
                                        const el = rightColRef.current?.children[0].children[idx] as HTMLElement
                                        el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                                    }}
                                >
                                    <span className={`text-6xl font-black mb-2 block bg-gradient-to-b ${activeStep === idx ? step.gradient : 'from-slate-200 to-slate-200'} bg-clip-text text-transparent`}>
                                        0{idx + 1}
                                    </span>
                                    <h2 className={`text-3xl font-bold ${activeStep === idx ? 'text-slate-900' : 'text-slate-300'}`}>
                                        {step.title}
                                    </h2>
                                    <p className={`${activeStep === idx ? 'text-slate-500' : 'text-slate-200'} mt-2`}>
                                        {step.subtitle}
                                    </p>
                                </div>
                            </div>
                        ))}
                        <div className="h-[200px]" />
                     </div>
                </div>

             </div>
        </div>
        <style jsx global>{`
           .custom-scrollbar::-webkit-scrollbar {
             width: 0px; /* Hidden Scrollbar as requested for cleaner look */
           }
        `}</style>
    </section>
  )
}
