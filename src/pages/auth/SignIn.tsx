
import * as React from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useDemo } from "@/context/DemoContext"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function SignIn() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { login } = useDemo()
  const { toast } = useToast()
  
  const [isLoading, setIsLoading] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const redirectTo = searchParams.get("redirectTo") || "/app/dashboard"

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate network request
    setTimeout(() => {
      setIsLoading(false)
      if (email && password) {
        login()
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        })
        navigate(redirectTo)
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please enter both email and password.",
        })
      }
    }, 1500)
  }

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back</h1>
        <p className="text-slate-500 mt-2 text-lg">Sign in to access your dashboard</p>
      </div>

      <div className="space-y-6">
        {/* Social Login */}
        <Button 
          variant="outline" 
          className="w-full h-12 rounded-xl border-none bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium flex items-center justify-center gap-3 transition-colors"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Sign in with Google
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-100" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-400 font-medium">Or</span>
          </div>
        </div>

        <form onSubmit={handleSignIn} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700 font-medium">Email address</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="name@company.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-xl bg-white border-slate-200 focus:border-brand-orange focus:ring-brand-orange/20 transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
              <Link 
                to="/auth/forgot-password" 
                className="text-sm font-medium text-slate-500 hover:text-brand-orange transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 rounded-xl bg-white border-slate-200 focus:border-brand-orange focus:ring-brand-orange/20 transition-all"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="remember" className="rounded border-slate-300 data-[state=checked]:bg-brand-orange data-[state=checked]:border-brand-orange" />
            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-600"
            >
              Remember me
            </label>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 rounded-xl bg-brand-orange hover:bg-brand-orange/90 text-white font-medium text-base transition-all shadow-lg shadow-brand-orange/20"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-slate-500">Don't have an account? </span>
          <Link 
            to={`/auth/sign-up${redirectTo ? `?redirectTo=${redirectTo}` : ''}`} 
            className="font-semibold text-brand-orange hover:text-brand-orange/80 transition-all"
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  )
}
