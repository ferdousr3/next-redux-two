'use client'

import React from 'react'
import { BookOpen, Trophy, Code, Users } from 'lucide-react'

const stats = [
    {
        label: "Total Classes",
        value: "120+",
        description: "Live interactive sessions",
        icon: BookOpen,
        color: "text-blue-600",
        bg: "bg-blue-50"
    },
    {
        label: "Coding Projects",
        value: "25+",
        description: "Real-world applications",
        icon: Code,
        color: "text-purple-600",
        bg: "bg-purple-50"
    },
    {
        label: "Exams & Quizzes",
        value: "50+",
        description: "Test your knowledge",
        icon: Trophy,
        color: "text-amber-600",
        bg: "bg-amber-50"
    },
    {
        label: "Community",
        value: "Daily",
        description: "Active Discord support",
        icon: Users,
        color: "text-emerald-600",
        bg: "bg-emerald-50"
    }
]

export function CourseStats() {
  return (
    <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, idx) => (
                    <div key={idx} className="p-8 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                        <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center mb-6`}>
                            <stat.icon className={`w-7 h-7 ${stat.color}`} />
                        </div>
                        <h3 className="text-4xl font-extrabold text-slate-900 mb-2">{stat.value}</h3>
                        <p className="text-lg font-bold text-slate-700 mb-1">{stat.label}</p>
                        <p className="text-sm text-slate-500 font-medium">{stat.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}
