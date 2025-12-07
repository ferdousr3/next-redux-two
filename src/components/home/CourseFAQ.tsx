'use client'

import React, { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: "Do I need prior programming experience?",
    answer: "No! This course is designed to take you from absolute zero to mastery. We start with the very basics of how the web works and build up to advanced architectures."
  },
  {
    question: "Why C# and .NET instead of just Node.js?",
    answer: ".NET is the standard for enterprise-level application development. Learning C# along with modern frontend frameworks makes you incredibly versatile and employable in large corporations."
  },
  {
    question: "Is this course live or recorded?",
    answer: "It's a hybrid model. You get high-quality recorded lectures for concepts, combined with 120+ live interactive sessions for doubt clearing, code reviews, and pair programming."
  },
  {
    question: "What if I miss a live class?",
    answer: "All live sessions are recorded and uploaded to the portal within 24 hours. You have lifetime access to all course materials."
  },
  {
    question: "Do you provide job assistance?",
    answer: "Yes. We have a dedicated career services team that helps with resume building, mock interviews, and referrals to our hiring partners."
  }
]

export function CourseFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
                <p className="text-slate-500">Everything you need to know about the program.</p>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full flex items-center justify-between p-6 text-left"
                        >
                            <span className="text-lg font-bold text-slate-900">{faq.question}</span>
                            {openIndex === index ? (
                                <Minus className="w-5 h-5 text-slate-400" />
                            ) : (
                                <Plus className="w-5 h-5 text-slate-400" />
                            )}
                        </button>

                        <div
                            className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}
