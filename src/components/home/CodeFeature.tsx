'use client'

import { TypedCode } from "@/components/shared/TypedCode"
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Check } from 'lucide-react'

interface CodeFeatureProps {
  title: string
  description: string
  code: string
  features: string[]
  align: 'left' | 'right'
}

export function CodeFeature({ title, description, code, features, align }: CodeFeatureProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom-=200',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex flex-col lg:flex-row gap-16 items-center ${align === 'right' ? 'lg:flex-row-reverse' : ''}`}>

          {/* Text Content */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-5xl font-bold font-mono text-slate-900 mb-6 tracking-tight">
              {title}
            </h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed font-sans">
              {description}
            </p>
            <ul className="space-y-4 font-mono text-sm">
              {features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <Check className="w-3 h-3" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Code/Terminal Mockup */}
          <div className="lg:w-1/2 w-full">
            <div className="rounded-lg bg-[#0a0b0d] overflow-hidden font-mono text-sm">
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-900 border-b border-slate-800">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="p-6 overflow-x-auto">
                <pre className="text-emerald-400">
                  <code>
                    <TypedCode code={code} />
                  </code>
                </pre>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
