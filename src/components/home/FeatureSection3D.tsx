'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Briefcase, ShieldCheck, Zap, Activity, Users, Files, Calendar } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    title: "Smart Case Management",
    description: "Organize and track all your cases with intelligent categorization and deadlines.",
    icon: Briefcase,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Document Vault",
    description: "Secure, encrypted storage for all your sensitive legal documents.",
    icon: Files,
    color: "from-emerald-500 to-teal-600",
  },
  {
    title: "Team Collaboration",
    description: "Work seamlessly with your team with real-time updates and commenting.",
    icon: Users,
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "High Performance",
    description: "Lightning fast access to your data, powered by edge computing.",
    icon: Zap,
    color: "from-orange-500 to-orange-600",
  },
  {
    title: "Enterprise Security",
    description: "Bank-grade encryption and compliance with global standards.",
    icon: ShieldCheck,
    color: "from-red-500 to-red-600",
  },
  {
    title: "Real-time Analytics",
    description: "Gain actionable insights with our advanced reporting dashboard.",
    icon: Activity,
    color: "from-cyan-500 to-cyan-600",
  },
]

export function FeatureSection3D() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return
        gsap.fromTo(
          card,
          {
            y: 100,
            opacity: 0,
            rotateX: -15,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom-=100',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.1,
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="features" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Performance <br />
            <span className="text-emerald-600">at Scale</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Built for the cloud-native world, delivering speed, security, and scalability for your AI infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el }}
              className="group relative bg-white border border-slate-200 rounded-2xl p-8 hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold font-mono text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-500 leading-relaxed font-sans">
                {feature.description}
              </p>

              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-slate-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
