'use client'

import { useState, useRef, useEffect } from 'react'
import { Code2, Database, Layout, Layers, Server, Terminal, Github, PenTool, Globe, Zap, Lock } from 'lucide-react'

// Slab configuration
const SLAB_WIDTH = 260
const SLAB_DEPTH = 260
const SLAB_HEIGHT = 50 // Thickness

const curriculumData = [
  {
    id: 1,
    title: 'C# Programming',
    description: 'Master the fundamentals of C# and .NET. Learn about data types, OOP principles, LINQ, and asynchronous programming in the Microsoft ecosystem.',
    icon: Terminal,
    color: 'from-blue-600 to-cyan-600',
    tech: [
       { name: 'C# 12', icon: Code2 },
       { name: '.NET 8', icon: Layers },
       { name: 'VS 2022', icon: Terminal },
       { name: 'Nuget', icon: Github }
    ]
  },
  {
    id: 2,
    title: 'Frontend Foundation',
    description: 'Build modern user interfaces with semantic HTML5, CSS3, and JavaScript (ES6+). Learn responsive design with Tailwind CSS.',
    icon: Layout,
    color: 'from-cyan-500 to-teal-500',
    tech: [
      { name: 'HTML5', icon: Code2 },
      { name: 'CSS3', icon: Layout },
      { name: 'JS (ES6+)', icon: Zap }
    ]
  },
  {
    id: 3,
    title: 'SQL Server Database',
    description: 'Design robust relational databases. Master T-SQL, Stored Procedures, Indexing, and Performance Tuning with SQL Server.',
    icon: Database,
    color: 'from-teal-500 to-emerald-500',
    tech: [
        { name: 'SQL Server', icon: Database },
        { name: 'T-SQL', icon: Terminal },
        { name: 'SSMS', icon: Server }
    ]
  },
  {
    id: 4,
    title: 'ASP.NET Core Backend',
    description: 'Build high-performance REST APIs with ASP.NET Core Web API. Implement Entity Framework Core for ORM, Dependency Injection, and JWT Auth.',
    icon: Server,
    color: 'from-emerald-500 to-green-500',
    tech: [
        { name: 'Web API', icon: Globe },
        { name: 'EF Core', icon: Database },
        { name: 'Identity', icon: Lock }
    ]
  },
  {
    id: 5,
    title: 'Angular Framework',
    description: 'Build enterprise-grade SPAs with Angular. Master TypeScript, Dependency Injection, RxJS, and Signals.',
    icon: Layers,
    color: 'from-red-600 to-orange-600',
    tech: [
        { name: 'Angular 17', icon: Layers },
        { name: 'RxJS', icon: Zap },
        { name: 'TypeScript', icon: Code2 }
    ]
  },
  {
    id: 6,
    title: 'React Library',
    description: 'Master the most popular frontend library. Hooks, Functional Components, Redux Toolkit, and Next.js integration.',
    icon: Code2,
    color: 'from-blue-500 to-indigo-500',
    tech: [
        { name: 'React', icon: Code2 },
        { name: 'Redux', icon: Database },
        { name: 'Next.js', icon: Globe }
    ]
  }
]

export function CourseCurriculum() {
  const [activeId, setActiveId] = useState(1)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const observerRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute('data-id'))
            setActiveId(id)
          }
        })
      },
      {
        root: scrollContainerRef.current,
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0
      }
    )

    observerRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-slate-50 relative py-24 text-slate-900">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                   Codian Roadmap
                </h2>
                <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                    A complete 1-year journey: From C# Fundamentals to Full-Stack .NET, Angular, and React mastery.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-start h-[600px]">

                {/* Left: Scrollable Content List (Hidden Scrollbar) */}
                <div
                    ref={scrollContainerRef}
                    className="w-full lg:w-1/2 h-full overflow-y-auto pr-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                >
                    <div className="flex flex-col gap-12 pb-[50vh]">
                        {curriculumData.map((module, index) => (
                            <div
                                key={module.id}
                                ref={(el) => { observerRefs.current[index] = el }}
                                data-id={module.id}
                                className={`transition-all duration-500 p-8 rounded-2xl border border-transparent ${activeId === module.id ? 'bg-white shadow-xl shadow-slate-200/50 border-slate-100 opacity-100' : 'opacity-40 hover:opacity-60'}`}
                            >
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 font-mono flex items-center gap-3">
                                    <span className={`flex items-center justify-center w-8 h-8 rounded bg-gradient-to-br ${module.color} text-xs text-white`}>
                                        0{module.id}
                                    </span>
                                    {module.title}
                                </h3>

                                <p className="text-slate-600 text-base leading-relaxed mb-6">
                                    {module.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {module.tech.map((t, i) => (
                                        <div key={i} className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-full text-xs text-slate-300">
                                            <t.icon className="w-3.5 h-3.5" />
                                            <span>{t.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: The True 3D Stack */}
                <div className="hidden lg:flex w-full lg:w-1/2 justify-center items-center h-full">
                    {/* Isometric Scene Container */}
                    <div
                        className="relative perspective-[2000px]"
                        style={{ width: SLAB_WIDTH, height: SLAB_DEPTH }}
                    >
                        {/* Global Rotation: Isometric View (RotateX 60, RotateZ 45) */}
                        <div className="relative w-full h-full preserve-3d rotate-x-[55deg] rotate-z-[45deg]">

                            {curriculumData.map((module) => {
                                const isActive = module.id === activeId
                                const isPast = module.id < activeId

                                // Variables for visuals
                                let topColor = ''
                                let sideColor1 = '' // Front/Left (Title Face)
                                let sideColor2 = '' // Front/Right (Thickness Face)
                                let transform = ''
                                let opacity = 1

                                const offset = activeId - module.id

                                if (isActive) {
                                    // ACTIVE: Vivid Purple
                                    topColor = `bg-gradient-to-br ${module.color}`
                                    sideColor1 = 'bg-[#4a044e]' // Dark Purple (Slate-950ish mixed with purple)
                                    sideColor2 = 'bg-[#2e0233]' // Even darker side
                                    transform = `translateZ(0px)`
                                } else if (isPast) {
                                    // PAST: White/Gray
                                    topColor = 'bg-slate-200'
                                    sideColor1 = 'bg-slate-400'
                                    sideColor2 = 'bg-slate-300'
                                    // Stack them beneath.
                                    // In this coordinate system, negative Z is DOWN.
                                    transform = `translateZ(-${offset * (SLAB_HEIGHT + 10)}px)`
                                } else {
                                    // FUTURE: Invisible / Drop in
                                    opacity = 0
                                    transform = `translateZ(${Math.abs(offset) * 300}px)`
                                }

                                const zIndex = activeId === module.id ? 50 : (40 - Math.abs(offset))

                                return (
                                    <div
                                        key={module.id}
                                        className="absolute inset-0 preserve-3d transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                                        style={{
                                            transform,
                                            opacity,
                                            zIndex
                                        }}
                                    >
                                        {/* TOP FACE */}
                                        <div className={`absolute inset-0 rounded-3xl border-4 border-white/5 flex items-center justify-center ${topColor} shadow-inner`}>
                                            {/* Icons Grid (Counter-rotated for readability) */}
                                            <div className="grid grid-cols-2 gap-3 -rotate-45">
                                                 {module.tech.slice(0,4).map((t, i) => (
                                                     <div key={i} className={`flex items-center justify-center w-14 h-14 rounded-xl ${isActive ? 'bg-white/20 text-white' : 'bg-black/10 text-slate-500'}`}>
                                                         <t.icon className="w-8 h-8" />
                                                     </div>
                                                 ))}
                                            </div>

                                            {/* Shine/Gloss */}
                                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
                                        </div>

                                        {/* SIDE FACE 1 (Left / Front - Contains Title) */}
                                        {/*
                                            Geometry: Attached to the "Bottom" edge (visual left in isometric).
                                            Origin: Bottom.
                                            RotateX: -90deg.
                                        */}
                                        <div
                                            className={`absolute bottom-0 left-0 w-full flex items-center px-6 origin-bottom -rotate-x-90 rounded-b-xl ${sideColor1}`}
                                            style={{ height: SLAB_HEIGHT }}
                                        >
                                            <span className={`text-sm font-bold tracking-widest uppercase truncate ${isActive ? 'text-white' : 'text-slate-800'}`}>
                                                {module.title}
                                            </span>
                                        </div>

                                        {/* SIDE FACE 2 (Right / Thickness) */}
                                        {/*
                                            Geometry: Attached to the "Right" edge.
                                            Origin: Right.
                                            RotateY: -90deg (actually 90deg works if origin right).
                                        */}
                                        <div
                                            className={`absolute top-0 right-0 h-full origin-right rotate-y-90 rounded-r-xl ${sideColor2}`}
                                            style={{ width: SLAB_HEIGHT }}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
  )
}
