"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthStore } from "@/lib/stores/auth-store"
import toast from "react-hot-toast"
import { Mail, Lock, Shield, CheckCircle } from "lucide-react"
import { LoginFormData, loginSchema } from "@/lib/schemas/auth-schemas"
import { FormInput } from "@/components/ui/Form-input"
import { LoadingButton } from "@/components/ui/Loading-button"

async function loginUser(credentials: LoginFormData) {
  const response = await fetch("/apis/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || "Invalid credentials")
  }

  return response.json()
}

export default function LoginPage() {
  const { login } = useAuthStore()
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      login(data.user)

      toast.success(`Welcome back, ${data.user.name}! 🎉`, {
        duration: 3000,
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

      router.push("/contact")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Invalid credentials", {
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
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Login to Your Account</CardTitle>
            <CardDescription>Enter your credentials to access the contact form</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="relative">
                <Mail className="absolute left-3 top-9 h-4 w-4 text-gray-400" />
                <FormInput
                  label="Email Address"
                  type="email"
                  placeholder="test@example.com"
                  className="pl-10"
                  error={errors.email?.message}
                  {...register("email")}
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-9 h-4 w-4 text-gray-400" />
                <FormInput
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10"
                  error={errors.password?.message}
                  {...register("password")}
                />
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <p className="text-sm font-semibold text-blue-800">Test Credentials</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <p className="text-sm text-gray-700">Email: test@example.com</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <p className="text-sm text-gray-700">Password: password123</p>
                  </div>
                </div>
              </div>

              <LoadingButton type="submit" loading={mutation.isPending} className="w-full h-12 text-base font-semibold">
                {mutation.isPending ? "Signing In..." : "Sign In"}
              </LoadingButton>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
