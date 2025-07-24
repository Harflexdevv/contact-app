"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSubmissionsStore } from "@/lib/stores/submissions-store"
import { formatDistanceToNow } from "date-fns"
import { Mail, Phone, User, MessageSquare, FileText, Clock, Send, RefreshCw } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { ProtectedRoute } from "@/components/Protected-route"

function SubmissionsList() {
  const { submissions } = useSubmissionsStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (submissions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
        <Card className="w-full max-w-lg border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardContent className="pt-12 pb-8">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <FileText className="h-10 w-10 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">No Submissions Yet</h2>
                <p className="text-gray-600 text-lg mb-2">You haven't submitted any messages yet.</p>
                <p className="text-gray-500 text-sm">Visit the contact page to send your first message.</p>
              </div>
              <Link href="/contact">
                <Button className="px-8 py-3 text-base font-semibold">
                  <Send className="mr-2 h-4 w-4" />
                  Send Your First Message
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Submissions</h1>
          <div className="flex items-center justify-center space-x-2 text-gray-600 mb-6">
            <MessageSquare className="h-5 w-5" />
            <span className="text-lg">
              You have {submissions.length} submission{submissions.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link href="/contact">
              <Button className="px-6 py-2">
                <Send className="mr-2 h-4 w-4" />
                Send New Message
              </Button>
            </Link>
            <Button variant="outline" onClick={() => window.location.reload()} className="px-6 py-2">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {submissions
            .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
            .map((submission, index) => (
              <Card
                key={submission.id}
                className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300"
              >
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-lg">#{index + 1}</span>
                      </div>
                      <div>
                        <CardTitle className="text-xl text-gray-900 mb-1">{submission.subject}</CardTitle>
                        <CardDescription className="flex items-center gap-2 text-base">
                          <Clock className="h-4 w-4" />
                          Submitted {formatDistanceToNow(new Date(submission.submittedAt), { addSuffix: true })}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 font-mono">ID: {submission.id}</div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Name</p>
                        <p className="text-sm font-medium text-gray-900">{submission.fullName}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <Mail className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                        <p className="text-sm font-medium text-gray-900 break-all">{submission.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Phone className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Phone</p>
                        <p className="text-sm font-medium text-gray-900">{submission.phoneNumber}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-2 mb-3">
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                      <p className="text-sm font-semibold text-blue-800 uppercase tracking-wide">Message</p>
                    </div>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{submission.message}</p>
                  </div>

                  <div className="text-xs text-gray-400 text-center">
                    Submitted on {new Date(submission.submittedAt).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/contact">
            <Button size="lg" className="px-8 py-3 text-base font-semibold">
              <Send className="mr-2 h-4 w-4" />
              Send Another Message
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function SubmissionsPage() {
  return (
    <ProtectedRoute>
      <SubmissionsList />
    </ProtectedRoute>
  )
}
