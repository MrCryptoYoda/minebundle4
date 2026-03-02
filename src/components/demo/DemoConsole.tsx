import * as React from "react"
import { useDemo } from "@/context/DemoContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, X, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

export function DemoConsole() {
  const [isOpen, setIsOpen] = React.useState(false)
  const { 
    isAuthenticated, 
    userRole, 
    ndaSigned, 
    hasInsightsSubscription,
    login,
    logout,
    setUserRole,
    setNdaSigned,
    setHasInsightsSubscription
  } = useDemo()

  return (
    <>
      {/* Floating Trigger */}
      <motion.div 
        className="fixed bottom-24 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        <Button 
          onClick={() => setIsOpen(true)} 
          size="icon" 
          className="h-12 w-12 rounded-full shadow-lg bg-slate-900 hover:bg-slate-800 text-white"
        >
          <Settings className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Console Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed inset-y-0 right-0 z-[60] w-80 bg-white shadow-2xl border-l border-slate-200"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-slate-100">
                <h2 className="font-semibold text-lg">Demo Console</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Auth State */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Authentication</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status</span>
                    <Button 
                      variant={isAuthenticated ? "destructive" : "default"} 
                      size="sm"
                      onClick={isAuthenticated ? logout : login}
                    >
                      {isAuthenticated ? "Sign Out" : "Sign In"}
                    </Button>
                  </div>
                </div>

                {/* Roles */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">User Role</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {(['individual', 'agent', 'service_provider', 'admin'] as const).map((role) => (
                      <Button
                        key={role}
                        variant={userRole === role ? "default" : "outline"}
                        size="sm"
                        className="text-xs capitalize"
                        onClick={() => setUserRole(role)}
                        disabled={!isAuthenticated}
                      >
                        {role.replace('_', ' ')}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Gating */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Gating & Permissions</h3>
                  
                  <div className="flex items-center justify-between p-2 rounded-lg border border-slate-100">
                    <span className="text-sm">NDA Signed</span>
                    <input 
                      type="checkbox" 
                      checked={ndaSigned} 
                      onChange={(e) => setNdaSigned(e.target.checked)}
                      className="accent-brand-orange h-4 w-4"
                      disabled={!isAuthenticated}
                    />
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg border border-slate-100">
                    <span className="text-sm">Insights Sub</span>
                    <input 
                      type="checkbox" 
                      checked={hasInsightsSubscription} 
                      onChange={(e) => setHasInsightsSubscription(e.target.checked)}
                      className="accent-brand-orange h-4 w-4"
                      disabled={!isAuthenticated || userRole !== 'service_provider'}
                    />
                  </div>
                </div>

                {/* Info */}
                <Card className="bg-slate-50 border-none">
                  <CardContent className="p-4 text-xs text-slate-500 space-y-2">
                    <p>Use this console to simulate different user states and permissions.</p>
                    <p>Current Route: {window.location.pathname}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
