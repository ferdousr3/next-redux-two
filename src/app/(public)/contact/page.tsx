'use client';

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"
import {
  ChevronDown,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
} from "lucide-react"

// Define schema locally if not available, or import if I ported it.
// I didn't see `contact.schema.ts` ported yet. I'll define it here or use a dummy one for now,
// but better to reproduce the one from the file if simple.
// The file imported `@/lib/contact/contact.schema`.
// I'll create a simple schema here.

const contactSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  inquiryType: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  terms: z.boolean().refine((val) => val === true, "You must agree to the terms"),
})

type ContactFormValues = z.infer<typeof contactSchema>

export default function ContactPage() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      inquiryType: "General Counsel",
      message: "",
      terms: false,
    },
  })

  function onSubmit(data: ContactFormValues) {
    console.log("Contact data:", data)
    // Simulate API call
    setTimeout(() => {
      toast.success("Message sent successfully!")
      form.reset()
    }, 1000)
  }

  return (
    <div className="container py-10 md:py-20">
      <section className="py-24 ">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100 flex flex-col md:flex-row">
            {/* Contact Info */}
            <div className="md:w-5/12 bg-emerald-900 p-10 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>

              <div className="relative z-10">
                <h3 className="text-2xl font-medium tracking-tight mb-2">
                  Get in touch
                </h3>
                <p className="text-emerald-200 text-sm mb-8">
                  Ready to modernize your legal strategy? Reach out to our
                  intake team.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 mt-1 text-emerald-400" />
                    <div>
                      <div className="font-medium text-sm">Headquarters</div>
                      <div className="text-emerald-200 text-sm mt-1">
                        100 Financial District Blvd
                        <br />
                        New York, NY 10005
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 mt-1 text-emerald-400" />
                    <div>
                      <div className="font-medium text-sm">Email</div>
                      <div className="text-emerald-200 text-sm mt-1">
                        counsel@veritas.legal
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 mt-1 text-emerald-400" />
                    <div>
                      <div className="font-medium text-sm">Phone</div>
                      <div className="text-emerald-200 text-sm mt-1">
                        +1 (212) 555-0199
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-12">
                <div className="text-xs text-emerald-400 uppercase tracking-widest font-medium mb-4">
                  Connect
                </div>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="p-2 rounded-full bg-emerald-800 hover:bg-emerald-700 transition-colors"
                  >
                    <Linkedin className="w-[18px] h-[18px]" />
                  </a>
                  <a
                    href="#"
                    className="p-2 rounded-full bg-emerald-800 hover:bg-emerald-700 transition-colors"
                  >
                    <Twitter className="w-[18px] h-[18px]" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:w-7/12 p-10 bg-white">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                           <FormLabel className="text-xs font-semibold text-slate-700 uppercase tracking-wide">First Name</FormLabel>
                           <FormControl>
                              <Input {...field} className="w-full h-11 px-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm" placeholder="Jane" />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                           <FormLabel className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Last Name</FormLabel>
                           <FormControl>
                              <Input {...field} className="w-full h-11 px-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm" placeholder="Doe" />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                           <FormLabel className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Work Email</FormLabel>
                           <FormControl>
                              <Input {...field} type="email" className="w-full h-11 px-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm" placeholder="jane@company.com" />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                    />

                   <FormField
                      control={form.control}
                      name="inquiryType"
                      render={({ field }) => (
                        <FormItem>
                           <FormLabel className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Inquiry Type</FormLabel>
                           <div className="relative">
                            <FormControl>
                                <select {...field} className="w-full h-11 px-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm appearance-none cursor-pointer">
                                  <option>General Counsel</option>
                                  <option>Litigation Support</option>
                                  <option>User Management Demo</option>
                                  <option>Compliance Audit</option>
                                </select>
                            </FormControl>
                            <div className="absolute right-4 top-3.5 pointer-events-none text-slate-400">
                                <ChevronDown className="w-4 h-4" />
                            </div>
                           </div>
                           <FormMessage />
                        </FormItem>
                      )}
                    />

                  <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                           <FormLabel className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Message</FormLabel>
                           <FormControl>
                              <Textarea {...field} rows={4} className="w-full p-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm resize-none" placeholder="Tell us about your legal needs..." />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                    />

                  <FormField
                      control={form.control}
                      name="terms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md pt-2">
                           <FormControl>
                                <input
                                    type="checkbox"
                                    checked={field.value}
                                    onChange={field.onChange}
                                    className="h-4 w-4 cursor-pointer rounded border border-slate-300 bg-white transition-all checked:border-emerald-600 checked:bg-emerald-600"
                                />
                           </FormControl>
                           <div className="space-y-1 leading-none">
                              <FormLabel className="text-xs text-slate-500 cursor-pointer select-none font-normal">
                                I agree to the{" "}
                                <a
                                  href="#"
                                  className="text-emerald-600 underline decoration-emerald-600/30 underline-offset-2"
                                >
                                  Terms of Service
                                </a>{" "}
                                and{" "}
                                <a
                                  href="#"
                                  className="text-emerald-600 underline decoration-emerald-600/30 underline-offset-2"
                                >
                                  Privacy Policy
                                </a>
                                .
                              </FormLabel>
                           </div>
                        </FormItem>
                      )}
                    />

                  <button
                    type="submit"
                    className="w-full h-11 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm transition-all shadow-lg flex items-center justify-center gap-2 group"
                  >
                    Send Message
                    <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
