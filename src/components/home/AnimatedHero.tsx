'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import { ArrowRight, Terminal } from 'lucide-react'
import { TypedCode } from "@/components/shared/TypedCode"

export function AnimatedHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const leftContentRef = useRef<HTMLDivElement>(null)
  const rightContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(leftContentRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 }
      )
      .fromTo(rightContentRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 },
        '-=0.8'
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={heroRef} className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-16">

        {/* Left Content */}
        <div ref={leftContentRef} className="lg:w-1/2 text-left opacity-0">
          <h1 className="text-5xl md:text-7xl font-bold font-mono tracking-tighter mb-8 leading-[1.1]">
            <span className="text-slate-900">High Performance</span> <br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">Object Storage</span>
          </h1>

          <p className="text-xl text-slate-600 mb-10 leading-relaxed font-mono">
            GenAI is the standard for building high-performance data infrastructure for machine learning, analytics and application data workloads.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/register"
              className="btn-animate px-8 py-4 bg-slate-900 text-white font-mono font-bold rounded-none flex items-center gap-2 isolate"
            >
              <span className="z-10 flex items-center gap-2">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link
              href="#docs"
              className="px-8 py-4 bg-white border-2 border-slate-900 text-slate-900 hover:bg-slate-50 font-mono font-bold rounded-none transition-all"
            >
              Read Docs
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-8 text-sm font-mono text-slate-500">
            <div>
              <span className="block text-2xl font-bold text-slate-900">1.4B+</span>
              Docker Pulls
            </div>
            <div>
              <span className="block text-2xl font-bold text-slate-900">44K+</span>
              GitHub Stars
            </div>
            <div>
              <span className="block text-2xl font-bold text-slate-900">28K+</span>
              Slack Members
            </div>
          </div>
        </div>

        {/* Right Graphic/Terminal */}
        <div ref={rightContentRef} className="lg:w-1/2 opacity-0 w-full">
           <div className="relative rounded-lg bg-[#0a0b0d] p-1">
              <div className="absolute top-0 left-0 w-full h-8 bg-slate-900 rounded-t-lg flex items-center px-4 gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-500"/>
                 <div className="w-3 h-3 rounded-full bg-yellow-500"/>
                 <div className="w-3 h-3 rounded-full bg-green-500"/>
              </div>
              <div className="mt-8 p-6 font-mono text-sm text-slate-300 overflow-x-auto">
                 <div className="font-mono text-sm text-slate-300">
                    <div className="mb-4 flex">
                        <span className="text-emerald-400 mr-2">$</span>
                        <TypedCode code="brew install genai/stable/genai" startDelay={500} speed={50} />
                    </div>
                    <div className="mb-4 flex">
                        <span className="text-emerald-400 mr-2">$</span>
                        <TypedCode code="genai server /data" startDelay={2500} speed={50} />
                    </div>
                    {/* These static outputs appear after typing finishes, or we can animate them too.
                        For simplicity and effect, let's fade them in using CSS/GSAP or just use a helper component.
                        Let's try a simple CSS animation with delay for the output block.
                    */}
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-1000 fill-mode-forwards opacity-0" style={{ animationDelay: '4s' }}>
                        <p className="text-slate-500 mb-2">Endpoint: http://127.0.0.1:9000</p>
                        <p className="text-slate-500">AccessKey: genaiadmin </p>
                        <p className="text-slate-500 mb-4">SecretKey: genaiadmin </p>
                        <p className="animate-pulse"><span className="text-emerald-400">$</span> _</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  )
}
