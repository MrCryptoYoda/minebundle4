
import * as React from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function ResetPassword() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { toast } = useToast()
  
  const token = searchParams.get("token")
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")

  if (!token) {
    return (
      <div className="p-8 sm:p-10 text-center">
        <div className="h-16 w-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Invalid Link</h1>
        <p className="text-slate-500 mb-8">
          This password reset link is invalid or has expired.
        </p>
        <Link to="/auth/forgot-password">
          <Button className="w-full bg-brand-orange hover:bg-brand-orange/90">
            Request new link
          </Button>
        </Link>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords do not match",
        description: "Please ensure both passwords are the same."
      })
      return
    }

    setIsLoading(true)

    // Simulate network request
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
      toast({
        title: "Password reset successful",
        description: "You can now sign in with your new password.",
      })
    }, 1500)
  }

  if (isSuccess) {
    return (
      <div className="p-8 sm:p-10 text-center">
        <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Password Reset</h1>
        <p className="text-slate-500 mb-8">
          Your password has been successfully updated.
        </p>
        <Link to="/auth/sign-in">
          <Button className="w-full bg-brand-orange hover:bg-brand-orange/90">
            Sign in now
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="p-8 sm:p-10">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Reset Password</h1>
        <p className="text-slate-500 mt-2">Enter your new password below</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <Input 
            id="password" 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input 
            id="confirmPassword" 
            type="password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
              Resetting...
            </>
          ) : (
            "Reset password"
          )}
        </Button>
      </form>
    </div>
  )
}
