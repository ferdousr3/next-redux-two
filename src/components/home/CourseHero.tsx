'use client'

import React, { useRef, useLayoutEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { CheckCircle2, Calendar, Clock, Award, Users } from 'lucide-react'

export function CourseHero() {
  const containerRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal Text
      gsap.from('.hero-text-reveal', {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.1
      })

      // Card Float
      gsap.to('.hero-card', {
        y: -20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
      {/* Premium Background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-100/40 via-purple-100/40 to-pink-100/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-100/40 via-teal-100/40 to-blue-100/40 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid lg:grid-cols-2 gap-16 items-center pt-20">

        {/* Left: Text Content */}
        <div className="text-center lg:text-left order-2 lg:order-1 relative z-20">
          <div className="hero-text-reveal inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 rounded-full mb-8 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full bg-emerald-400 opacity-75 rounded-full"></span>
              <span className="relative inline-flex h-2.5 w-2.5 bg-emerald-500 rounded-full"></span>
            </span>
            <span className="text-sm font-semibold text-slate-700 tracking-wide uppercase">Enrollment Open</span>
          </div>

          <h1 className="hero-text-reveal text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.9] mb-8 text-slate-900 tracking-tight">
            Full Stack <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Architect</span>
          </h1>

          <p className="hero-text-reveal text-xl text-slate-500 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            Master the complete enterprise stack. <br className="hidden md:block"/>
            <span className="text-slate-800 font-bold">C# & .NET 8</span> for robust backends. <span className="text-slate-800 font-bold">React & Angular</span> for dynamic frontends.
          </p>

          <div className="hero-text-reveal flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <Link href="#enroll" className="px-8 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-black transition-all shadow-xl shadow-slate-200/50 flex items-center gap-3 active:scale-95 transform duration-150">
              Start Learning Now
            </Link>
          </div>

          <div className="hero-text-reveal mt-12 flex flex-wrap justify-center lg:justify-start gap-8 border-t border-slate-100 pt-8">
             <div className="flex flex-col">
                 <span className="text-3xl font-bold text-slate-900">4.9/5</span>
                 <span className="text-sm text-slate-500 font-medium">Student Rating</span>
             </div>
             <div className="flex flex-col">
                 <span className="text-3xl font-bold text-slate-900">12K+</span>
                 <span className="text-sm text-slate-500 font-medium">Graduates</span>
             </div>
             <div className="flex flex-col">
                 <span className="text-3xl font-bold text-slate-900">92%</span>
                 <span className="text-sm text-slate-500 font-medium">Hiring Rate</span>
             </div>
          </div>
        </div>

        {/* Right: Enrollment Details Card (Requested Replacement) */}
        <div className="hero-image-reveal relative flex items-center justify-center order-1 lg:order-2 perspective-[1000px]">
           <div className="hero-card relative w-full max-w-md bg-white border border-slate-100 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] rounded-3xl p-8 backdrop-blur-sm bg-white/90">
                {/* Decorative Elements */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-500/10 rounded-full blur-[20px]" />
                <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-500/10 rounded-full blur-[30px]" />

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-lg mb-2">
                                New Batch
                            </span>
                            <h3 className="text-2xl font-bold text-slate-900">Full Stack 2025</h3>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-bold text-slate-900">$299</div>
                            <div className="text-sm text-slate-400 line-through">$499</div>
                        </div>
                    </div>

                    <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                            <Calendar className="w-5 h-5 text-slate-500" />
                            <div>
                                <span className="block text-xs text-slate-400 font-bold uppercase">Start Date</span>
                                <span className="text-sm font-semibold text-slate-900">January 15, 2025</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                            <Clock className="w-5 h-5 text-slate-500" />
                            <div>
                                <span className="block text-xs text-slate-400 font-bold uppercase">Schedule</span>
                                <span className="text-sm font-semibold text-slate-900">Eve: 8:00 PM - 10:00 PM (Mon-Thu)</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 mb-8">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            <span>Live Interactive Classes</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            <span>15+ Real World Projects</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            <span>24/7 Support on DIscord</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            <span>Job Placement Assistance</span>
                        </div>
                    </div>

                    <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all text-lg">
                        Secure Your Seat Now
                    </button>

                    <p className="text-center text-xs text-slate-400 mt-4">
                        30-Day Money-Back Guarantee. No Questions Asked.
                    </p>
                </div>
           </div>
        </div>

      </div>
    </section>
  )
}
