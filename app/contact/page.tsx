"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/lib/stores/auth-store"
import { useSubmissionsStore } from "@/lib/stores/submissions-store"
import toast from "react-hot-toast"
import { CheckCircle, Mail, User, Phone, MessageSquare, Send, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"
import { ContactFormData, contactSchema } from "@/lib/schemas/contact-schemas"
import { LoadingButton } from "@/components/ui/Loading-button"
import { FormInput } from "@/components/ui/Form-input"
import { Textarea } from "@/components/ui/textarea"
import { ProtectedRoute } from "@/components/Protected-route"

function ContactForm() {
  const { user } = useAuthStore()
  const { addSubmission, submissions } = useSubmissionsStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [submissionCount, setSubmissionCount] = useState(0)

  // Update submission count when component mounts or submissions change
  useEffect(() => {
    setSubmissionCount(submissions.length)
  }, [submissions])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: user?.email || "",
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    try {
      //  API call
      const response = await fetch("/apis/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      const result = await response.json()

      addSubmission(data)

      setShowSuccess(true)
      setSubmissionCount(submissions.length + 1) 

      toast.success("Message sent successfully! 🎉", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#10B981",
          color: "#fff",
          fontWeight: "500",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#10B981",
        },
      })

      reset({
        fullName: "",
        email: user?.email || "",
        phoneNumber: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      toast.error("Failed to send message. Please try again.", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#EF4444",
          color: "#fff",
          fontWeight: "500",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#EF4444",
        },
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSendAnother = () => {
    setShowSuccess(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center px-4">
        <Card className="w-full max-w-lg border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardContent className="pt-12 pb-8">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg animate-pulse">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Thank You!</h2>
                <p className="text-gray-600 text-lg">Your message has been sent successfully.</p>
                <p className="text-gray-500 text-sm mt-2">We'll get back to you as soon as possible.</p>

                {submissionCount > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                       You have sent <strong>{submissionCount}</strong> message{submissionCount !== 1 ? "s" : ""}{" "}
                      total
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <LoadingButton onClick={handleSendAnother} variant="outline" className="px-6">
                  Send Another Message
                </LoadingButton>
                <Link href="/submissions">
                  <LoadingButton className="px-6 w-full sm:w-auto">
                    View All Submissions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </LoadingButton>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Get In Touch</h1>
          <p className="text-gray-600">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>

          {submissionCount > 0 && (
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              <CheckCircle className="h-4 w-4 mr-2" />
              You have {submissionCount} previous submission{submissionCount !== 1 ? "s" : ""}
            </div>
          )}
        </div>

        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl flex items-center justify-center space-x-2">
              <Sparkles className="h-6 w-6 text-purple-600" />
              <span>Contact Form</span>
            </CardTitle>
            <CardDescription className="text-base">
              Fill out the form below and we'll get back to you shortly
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <User className="absolute left-3 top-9 h-4 w-4 text-gray-400" />
                  <FormInput
                    label="Full Name"
                    placeholder="Enter your full name"
                    className="pl-10"
                    error={errors.fullName?.message}
                    {...register("fullName")}
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-9 h-4 w-4 text-gray-400" />
                  <FormInput
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    error={errors.email?.message}
                    {...register("email")}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <Phone className="absolute left-3 top-9 h-4 w-4 text-gray-400" />
                  <FormInput
                    label="Phone Number"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="pl-10"
                    error={errors.phoneNumber?.message}
                    helperText="At least 10 digits required"
                    {...register("phoneNumber")}
                  />
                </div>

                <div className="relative">
                  <MessageSquare className="absolute left-3 top-9 h-4 w-4 text-gray-400" />
                  <FormInput
                    label="Subject"
                    placeholder="Enter the subject"
                    className="pl-10"
                    error={errors.subject?.message}
                    {...register("subject")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-semibold text-gray-700">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Enter your message (minimum 10 characters)"
                  className={`
                    min-h-32 transition-all duration-200 resize-none
                    ${
                      errors.message
                        ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                    }
                  `}
                  rows={6}
                  {...register("message")}
                />
                {errors.message && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span className="text-red-400">•</span>
                    {errors.message.message}
                  </p>
                )}
              </div>

              <LoadingButton
                type="submit"
                loading={isSubmitting}
                className="w-full h-12 text-base font-semibold"
              >
                {isSubmitting ? (
                  "Sending Message..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </LoadingButton>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function ContactPage() {
  return (
    <ProtectedRoute>
      <ContactForm />
    </ProtectedRoute>
  )
}
