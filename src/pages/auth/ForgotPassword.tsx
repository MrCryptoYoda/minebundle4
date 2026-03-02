
import * as React from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, MailCheck, ArrowLeft } from "lucide-react"

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSent, setIsSent] = React.useState(false)
  const [email, setEmail] = React.useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate network request
    setTimeout(() => {
      setIsLoading(false)
      setIsSent(true)
    }, 1500)
  }

  if (isSent) {
    return (
      <div className="p-8 sm:p-10 text-center">
        <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <MailCheck className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Check your email</h1>
        <p className="text-slate-500 mb-8">
          If an account exists for <strong>{email}</strong>, we have sent a password reset link.
        </p>
        <Link to="/auth/sign-in">
          <Button variant="outline" className="w-full">
            Back to sign in
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="p-8 sm:p-10">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Forgot password?</h1>
        <p className="text-slate-500 mt-2">Enter your email to receive a reset link</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="name@company.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11"
            required
          />
        </div>

        <Button 
          type="submit" 
          className="w-full h-11 bg-brand-orange hover:bg-brand-orange/90 text-base"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending link...
            </>
          ) : (
            "Send reset link"
          )}
        </Button>
      </form>

      <div className="mt-8 text-center">
        <Link 
          to="/auth/sign-in" 
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to sign in
        </Link>
      </div>
    </div>
  )
}
