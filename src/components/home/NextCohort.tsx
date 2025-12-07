'use client'

import React from 'react'
import { Calendar, Clock, Star } from 'lucide-react'

export function NextCohort() {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="bg-slate-800/50 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-8">

                {/* Left: Info */}
                <div className="flex-1">
                    <div className="inline-flex items-center gap-2 text-emerald-400 font-bold tracking-wider text-sm uppercase mb-4">
                        <span className="animate-pulse">●</span> Enrollment Closing Soon
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Next Batch Starts <span className="text-white">January 15, 2026</span>
                    </h2>
                    <p className="text-slate-400 mb-8 max-w-lg">
                        Don't miss the chance to master Full Stack Development. Limited seats available for the upcoming cohort.
                    </p>

                    <div className="flex flex-wrap gap-6 text-sm font-medium text-slate-300">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-blue-400" />
                            <span>1 Year Duration</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-purple-400" />
                            <span>Evening Batches</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-amber-400" />
                            <span>4.9/5 Student Rating</span>
                        </div>
                    </div>
                </div>

                {/* Right: CTA */}
                <div className="flex-shrink-0 w-full md:w-auto">
                    <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm">
                        <div className="text-slate-900 font-bold text-3xl mb-1">
                            $12.99 <span className="text-base text-slate-500 font-normal line-through">$84.99</span>
                        </div>
                        <div className="text-red-600 text-sm font-bold mb-6">84% OFF expires in 2 days</div>

                        <button className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors mb-3">
                            Enroll Now
                        </button>
                        <p className="text-center text-xs text-slate-500">30-Day Money-Back Guarantee</p>
                    </div>
                </div>

            </div>
        </div>
    </section>
  )
}
