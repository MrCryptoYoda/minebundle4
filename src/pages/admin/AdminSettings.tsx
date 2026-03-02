
import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

export default function AdminSettings() {
  const { toast } = useToast()

  const handleSave = () => {
    toast({ title: "Settings Saved", description: "Platform configuration updated." })
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Platform Settings</h1>
        <p className="text-slate-600">Global configuration for Minexchange.</p>
      </div>

      {/* Branding */}
      <Card>
        <CardHeader>
          <CardTitle>Branding</CardTitle>
          <CardDescription>Manage logos and app identity.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 bg-slate-100 rounded-lg flex items-center justify-center border border-dashed border-slate-300 text-slate-400">
              Logo
            </div>
            <div className="space-y-2">
              <Button variant="outline" size="sm">Upload Logo</Button>
              <p className="text-xs text-slate-500">Recommended size: 512x512px</p>
            </div>
          </div>
          <div className="grid gap-4 max-w-md">
            <div className="space-y-2">
              <Label>App Name</Label>
              <Input defaultValue="The Minexchange" />
            </div>
            <div className="space-y-2">
              <Label>Default Currency</Label>
              <Input defaultValue="USD" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Toggles */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Toggles</CardTitle>
          <CardDescription>Enable or disable key platform features.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Live Mode</Label>
              <p className="text-sm text-slate-500">When disabled, the site is in maintenance mode.</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Become an Agent</Label>
              <p className="text-sm text-slate-500">Allow users to apply for agent status.</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">New Registrations</Label>
              <p className="text-sm text-slate-500">Allow new users to sign up.</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Public facing contact details.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 max-w-md">
          <div className="space-y-2">
            <Label>Support Email</Label>
            <Input defaultValue="support@minexchange.com" />
          </div>
          <div className="space-y-2">
            <Label>Verification Email</Label>
            <Input defaultValue="verify@minexchange.com" />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90" onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  )
}
