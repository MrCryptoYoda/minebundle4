
import * as React from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useDemo, UserRole } from "@/context/DemoContext"
import { Loader2, User, Briefcase, Building2, ArrowRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

export default function SignUp() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { login, setUserRole } = useDemo()
  const { toast } = useToast()
  
  const [isLoading, setIsLoading] = React.useState(false)
  const [step, setStep] = React.useState(1)
  const [accountType, setAccountType] = React.useState<UserRole>('individual')
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false
  })

  const redirectTo = searchParams.get("redirectTo") || "/app/dashboard"

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords do not match",
        description: "Please ensure both passwords are the same."
      })
      return
    }

    if (!formData.agreeTerms) {
      toast({
        variant: "destructive",
        title: "Terms required",
        description: "Please agree to the Terms of Service to continue."
      })
      return
    }

    setIsLoading(true)

    // Simulate network request
    setTimeout(() => {
      setIsLoading(false)
      setUserRole(accountType)
      login()
      
      toast({
        title: "Account created!",
        description: `Welcome to Minexchange, ${formData.firstName}.`,
      })

      if (accountType === 'service_provider' && !searchParams.get("redirectTo")) {
        navigate('/insights') 
      } else {
        navigate(redirectTo)
      }
    }, 1500)
  }

  const AccountTypeCard = ({ type, icon: Icon, label, description }: { type: UserRole, icon: any, label: string, description: string }) => (
    <div 
      onClick={() => setAccountType(type)}
      className={cn(
        "relative flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 text-left",
        accountType === type 
          ? "border-brand-orange bg-brand-orange/5" 
          : "border-slate-200 hover:border-brand-orange/50 hover:bg-slate-50"
      )}
    >
      <div className={cn(
        "h-12 w-12 rounded-full flex items-center justify-center shrink-0 transition-colors",
        accountType === type ? "bg-brand-orange text-white" : "bg-white border border-slate-200 text-slate-500"
      )}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className={cn("font-semibold text-sm", accountType === type ? "text-brand-orange" : "text-slate-700")}>
          {label}
        </h3>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      {accountType === type && (
        <div className="absolute top-4 right-4">
          <div className="h-2 w-2 rounded-full bg-brand-orange" />
        </div>
      )}
    </div>
  )

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Create an account</h1>
        <p className="text-slate-500 mt-2 text-lg">Join the global mining community</p>
      </div>

      {step === 1 ? (
        <div className="space-y-6">
          <div className="space-y-3">
            <Label className="text-base font-medium text-slate-700">I am a...</Label>
            <div className="grid grid-cols-1 gap-3">
              <AccountTypeCard 
                type="individual" 
                icon={User} 
                label="Individual Investor / Buyer" 
                description="I want to browse projects and invest." 
              />
              <AccountTypeCard 
                type="agent" 
                icon={Briefcase} 
                label="Agent / Broker" 
                description="I want to list assets and represent sellers." 
              />
              <AccountTypeCard 
                type="service_provider" 
                icon={Building2} 
                label="Service Provider" 
                description="I offer mining services and consultancy." 
              />
            </div>
          </div>

          <Button 
            onClick={() => setStep(2)}
            className="w-full h-12 rounded-xl bg-brand-orange hover:bg-brand-orange/90 text-white font-medium text-base transition-all shadow-lg shadow-brand-orange/20"
          >
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <div className="text-center text-sm">
            <span className="text-slate-500">Already have an account? </span>
            <Link 
              to={`/auth/sign-in${redirectTo ? `?redirectTo=${redirectTo}` : ''}`} 
              className="font-semibold text-brand-orange hover:text-brand-orange/80 transition-all"
            >
              Sign in
            </Link>
          </div>
        </div>
      ) : (
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
            Sign up with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-100" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-400 font-medium">Or</span>
            </div>
          </div>

          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-slate-700 font-medium">First name</Label>
                <Input 
                  id="firstName" 
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="h-12 rounded-xl bg-white border-slate-200 focus:border-brand-orange focus:ring-brand-orange/20 transition-all"
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-slate-700 font-medium">Last name</Label>
                <Input 
                  id="lastName" 
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="h-12 rounded-xl bg-white border-slate-200 focus:border-brand-orange focus:ring-brand-orange/20 transition-all"
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-medium">Email address</Label>
              <Input 
                id="email" 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="h-12 rounded-xl bg-white border-slate-200 focus:border-brand-orange focus:ring-brand-orange/20 transition-all"
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="h-12 rounded-xl bg-white border-slate-200 focus:border-brand-orange focus:ring-brand-orange/20 transition-all"
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-700 font-medium">Confirm password</Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="h-12 rounded-xl bg-white border-slate-200 focus:border-brand-orange focus:ring-brand-orange/20 transition-all"
                required 
              />
            </div>

            <div className="flex items-start space-x-2 pt-2">
              <Checkbox 
                id="terms" 
                checked={formData.agreeTerms}
                onCheckedChange={(c) => setFormData({...formData, agreeTerms: c as boolean})}
                className="mt-1 rounded border-slate-300 data-[state=checked]:bg-brand-orange data-[state=checked]:border-brand-orange"
              />
              <label
                htmlFor="terms"
                className="text-sm leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-600"
              >
                I agree to the <Link to="/terms" className="text-brand-orange font-medium hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-brand-orange font-medium hover:underline">Privacy Policy</Link>
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setStep(1)}
                className="h-12 w-12 rounded-xl border-slate-200 hover:bg-slate-50"
              >
                ←
              </Button>
              <Button 
                type="submit" 
                className="flex-1 h-12 rounded-xl bg-brand-orange hover:bg-brand-orange/90 text-white font-medium text-base transition-all shadow-lg shadow-brand-orange/20"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </Button>
            </div>
          </form>

          <div className="text-center text-sm">
            <span className="text-slate-500">Already have an account? </span>
            <Link 
              to={`/auth/sign-in${redirectTo ? `?redirectTo=${redirectTo}` : ''}`} 
              className="font-semibold text-brand-orange hover:text-brand-orange/80 transition-all"
            >
              Sign in
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
