'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Database, FileCode, GitBranch, Globe, Laptop, Server } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const modules = [
  { id: 1, title: 'HTML5 & CSS3', desc: 'Master the building blocks of the web.', icon: Globe },
  { id: 2, title: 'JavaScript (ES6+)', desc: 'Add interactivity and logic to your apps.', icon: FileCode },
  { id: 3, title: 'React Ecosystem', desc: 'Build modern, component-based UIs.', icon: Laptop },
  { id: 4, title: 'Backend Integration', desc: 'Connect to robust APIs and services.', icon: Server },
  { id: 5, title: 'Database Design', desc: 'Store and manage data at scale.', icon: Database },
  { id: 6, title: 'DevOps & Deploy', desc: 'Ci/CD pipelines and cloud hosting.', icon: GitBranch },
];

export function RoadmapSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
        // Animate the line filling up
        if (lineRef.current) {
            gsap.fromTo(lineRef.current,
                { height: '0%' },
                {
                    height: '100%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top center',
                        end: 'bottom center',
                        scrub: 1,
                    }
                }
            );
        }

        // Animate Cards popping in
        const cards = gsap.utils.toArray('.roadmap-card');
        cards.forEach((card: any) => {
            gsap.fromTo(card,
                { opacity: 0, x: -50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top bottom-=100',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative">

        <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-mono text-slate-900 mb-4">Web Fundamentals</h2>
            <p className="text-slate-500">The comprehensive roadmap to full stack mastery.</p>
        </div>

        <div className="relative">
            {/* The Vertical Line Background */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-slate-100 -translate-x-1/2 rounded-full" />

            {/* The Filling Line (Green) */}
            <div
                ref={lineRef}
                className="absolute left-8 md:left-1/2 top-0 w-1 bg-gradient-to-b from-emerald-500 to-teal-500 -translate-x-1/2 rounded-full"
                style={{ height: '0%' }}
            />

            <div className="space-y-12">
                {modules.map((mod, index) => (
                    <div key={mod.id} className={`roadmap-card flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                        {/* Content Card */}
                        <div className="flex-1 w-full md:text-right p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-lg transition-all z-10">
                             <div className={`flex items-center gap-3 mb-2 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                <h3 className="text-xl font-bold font-mono text-slate-800">{mod.title}</h3>
                             </div>
                             <p className="text-slate-500 text-sm leading-relaxed">{mod.desc}</p>
                        </div>

                        {/* Center Icon Marker */}
                        <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-white border-4 border-slate-100 flex items-center justify-center group">
                            <div className="absolute inset-0 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity" />
                            <mod.icon className="w-6 h-6 text-emerald-600 transition-transform group-hover:scale-110" />
                        </div>

                        {/* Spacer for alternate side */}
                        <div className="flex-1 hidden md:block" />
                    </div>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
}
