import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-7xl font-bold text-gray-900 mb-4">Welcome to ContactApp</h1>
        <p className="text-xl text-gray-600 mb-8">
          A modern contact form application with authentication and state management
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-7xl">Get Started</CardTitle>
            <CardDescription>Login to access the contact form and manage your submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">Use these test credentials:</p>
              <div className="bg-gray-100 p-3 rounded-md text-sm">
                <p>
                  <strong>Email:</strong> test@example.com
                </p>
                <p>
                  <strong>Password:</strong> password123
                </p>
              </div>
              <Link href="/login">
                <Button className="w-full">Login Now</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
            <CardDescription>Built with modern technologies and best practices</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Mock authentication system</li>
              <li>• Form validation with Zod</li>
              <li>• State management with Zustand</li>
              <li>• Data fetching with React Query</li>
              <li>• Responsive design with Tailwind CSS</li>
              <li>• TypeScript for type safety</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
