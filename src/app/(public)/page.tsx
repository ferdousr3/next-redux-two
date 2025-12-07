'use client'

import { CourseHero } from "@/components/home/CourseHero"
import { CourseDetails } from "@/components/home/CourseDetails"
import { CourseRoadmap } from "@/components/home/CourseRoadmap"
import { CourseProjects } from "@/components/home/CourseProjects"
import { CourseFAQ } from "@/components/home/CourseFAQ"
import { NextCohort } from "@/components/home/NextCohort"
import { CourseNetwork } from "@/components/home/CourseNetwork"

export default function LandingPage() {
  return (
    <div className="bg-white min-h-screen text-slate-900 antialiased overflow-x-hidden">

      {/* 1. Hero Section */}
      <CourseHero />

      {/* 2. Next Batch (NextCohort) */}
      <NextCohort />

      {/* 3. The Codian Ecosystem (Connection Beam) - New Section */}
      <CourseNetwork />

      {/* 4. Course Details (Descriptive/Attractive Grid) */}
      <CourseDetails />

      {/* 5. Codian Roadmap (Vertical Line + Dark Veil) */}
      <CourseRoadmap />

      {/* 6. Projects Section (Border Beam Cards) */}
      <CourseProjects />

      {/* 7. FAQ Section */}
      <CourseFAQ />

    </div>
  )
}
