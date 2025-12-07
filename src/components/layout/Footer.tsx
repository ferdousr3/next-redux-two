import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <span className="text-slate-900 font-bold tracking-tighter text-3xl font-mono">Codian</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              The premium destination for mastering Full Stack Development. We bridge the gap between theory and industry-grade engineering.
            </p>
            <div className="flex gap-4">
                <Link href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-600 transition-all">
                    <Twitter className="w-4 h-4" />
                </Link>
                <Link href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-700 hover:border-blue-700 transition-all">
                    <Linkedin className="w-4 h-4" />
                </Link>
                <Link href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-pink-600 hover:border-pink-600 transition-all">
                    <Instagram className="w-4 h-4" />
                </Link>
            </div>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-lg font-bold text-slate-900 mb-6">Courses</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Full Stack .NET</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Frontend Mastery</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Backend Engineering</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">System Design</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-lg font-bold text-slate-900 mb-6">Community</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Success Stories</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Our Mentors</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Discord Server</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Events & Webinars</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold text-slate-900 mb-6">Get in Touch</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span>123 Tech Park, Silicon Valley, CA 94025</span>
              </li>
              <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span>hello@codian.edu</span>
              </li>
              <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium">
          <p className="text-slate-400">© {new Date().getFullYear()} Codian. All rights reserved.</p>
          <div className="flex gap-8 text-slate-500">
             <Link href="#" className="hover:text-slate-900">Privacy</Link>
             <Link href="#" className="hover:text-slate-900">Terms</Link>
             <Link href="#" className="hover:text-slate-900">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
