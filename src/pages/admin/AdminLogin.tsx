
import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import { ShieldCheck } from "lucide-react"

export default function AdminLogin() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = React.useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Mock login delay
    setTimeout(() => {
      setIsLoading(false)
      navigate('/admin/dashboard')
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <Card className="w-full max-w-md shadow-xl border-slate-200">
        <CardHeader className="text-center space-y-2 pb-6">
          <div className="mx-auto h-12 w-12 bg-brand-orange rounded-xl flex items-center justify-center text-white mb-2">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900">Admin Console</CardTitle>
          <p className="text-sm text-slate-500">Secure access for Minexchange administrators</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="admin@minexchange.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full bg-brand-orange hover:bg-brand-orange/90" disabled={isLoading}>
              {isLoading ? "Authenticating..." : "Sign In"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Button variant="link" className="text-sm text-slate-500">Forgot password?</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
