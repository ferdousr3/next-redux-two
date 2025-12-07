'use client'

import React, { useState } from 'react'
import { Plus, Minus, CheckCircle2, Lock } from 'lucide-react'

const curriculum = [
    {
        id: 1,
        title: "Introduction to C# & Programming Core",
        duration: "4 Weeks",
        topics: [
            "Setting up Visual Studio & .NET SDK",
            "Variables, Data Types, and Operators",
            "Control Flow (If/Else, Loops, Switch)",
            "Functions & Methods Deep Dive",
            "Object-Oriented Programming (OOP) Pillars",
            "Exception Handling & Debugging",
            "Git & GitHub Version Control"
        ]
    },
    {
        id: 2,
        title: "Advanced C# & Data Structures",
        duration: "4 Weeks",
        topics: [
            "Collections (List, Dictionary, HashSet)",
            "LINQ (Language Integrated Query)",
            "Asynchronous Programming (Async/Await)",
            "Generics & Delegates",
            "File I/O & Serialization",
            "Memory Management & Garbage Collection",
            "Data Structures & Algorithms Basics"
        ]
    },
    {
        id: 3,
        title: "Database Mastery with SQL Server",
        duration: "3 Weeks",
        topics: [
            "Relational Database Design (Normalization)",
            "T-SQL Basics (Select, Insert, Update, Delete)",
            "Joins, Unions, and Subqueries",
            "Stored Procedures & Functions",
            "Indexing & Performance Optimization",
            "Entity Framework Core (ORM) Introduction",
            "Code-First vs Database-First Migrations"
        ]
    },
    {
        id: 4,
        title: "Building APIs with ASP.NET Core",
        duration: "5 Weeks",
        topics: [
            "RESTful API Architecture",
            "Controller-based APIs vs Minimal APIs",
            "Dependency Injection Container",
            "Middleware & Request Pipeline",
            "Authentication & Authorization (JWT)",
            "Error Handling & Logging (Serilog)",
            "Swagger/OpenAPI Documentation"
        ]
    },
    {
        id: 5,
        title: "Modern Frontend with React & Tailwind",
        duration: "5 Weeks",
        topics: [
            "Modern JavaScript (ES6+)",
            "React Components, Props, and State",
            "Hooks (useState, useEffect, useContext)",
            "Routing with React Router",
            "State Management (Redux Toolkit)",
            "API Integration with Axios/TanStack Query",
            "Responsive UI with Tailwind CSS"
        ]
    },
    {
        id: 6,
        title: "Full Stack Integration & Deployment",
        duration: "3 Weeks",
        topics: [
            "Connecting .NET Backend with React Frontend",
            "CORS & Security Best Practices",
            "Docker Containerization",
            "CI/CD Pipelines (GitHub Actions)",
            "Deploying to Azure App Service / Vercel",
            "Domain Configuration & SSL",
            "Final Capstone Project Kickoff"
        ]
    }
]

export function CourseDetails() {
    // Open the first module by default
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

  return (
    <section id="curriculum" className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-6">

            <div className="text-center mb-16">
                <p className="text-emerald-500 font-bold tracking-wider uppercase text-sm mb-3">Course Curriculum</p>
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                    What will you learn?
                </h2>
                <p className="text-slate-500 max-w-2xl mx-auto">
                    A comprehensive, zero-to-hero journey designed to make you an industry-ready Full Stack .NET Developer.
                </p>
            </div>

            <div className="flex flex-col gap-4">
                {curriculum.map((module, index) => {
                    const isOpen = openIndex === index
                    return (
                        <div
                            key={module.id}
                            className={`border transition-all duration-300 rounded-2xl overflow-hidden ${isOpen ? 'border-emerald-500 shadow-lg bg-emerald-50/10' : 'border-slate-200 bg-white hover:border-emerald-200'}`}
                        >
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                            >
                                <div className="flex items-center gap-6">
                                    <div className={`hidden md:flex flex-col items-center justify-center w-16 h-16 rounded-xl border ${isOpen ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-slate-50 border-slate-100 text-slate-400'} transition-colors`}>
                                        <span className="text-xs font-bold uppercase">Mod</span>
                                        <span className="text-2xl font-bold">0{module.id}</span>
                                    </div>
                                    <div>
                                        <h3 className={`text-lg md:text-xl font-bold ${isOpen ? 'text-emerald-700' : 'text-slate-900'}`}>
                                            {module.title}
                                        </h3>
                                        <p className="text-sm text-slate-500 mt-1">{module.duration} • {module.topics.length} Lessons</p>
                                    </div>
                                </div>
                                <div className={`p-2 rounded-full border ${isOpen ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-slate-200 text-slate-400'}`}>
                                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                </div>
                            </button>

                            <div
                                className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="p-6 md:p-8 pt-0 border-t border-dashed border-emerald-100/50">
                                    <ul className="grid md:grid-cols-2 gap-4 mt-6">
                                        {module.topics.map((topic, i) => (
                                            <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                                <span>{topic}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="mt-12 text-center">
                 <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition-colors shadow-xl">
                     Download Full Syllabus PDF
                 </button>
            </div>

        </div>
    </section>
  )
}
