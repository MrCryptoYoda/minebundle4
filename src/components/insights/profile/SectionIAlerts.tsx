import React from 'react';
import { useProfileStore } from '@/store/profileStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function SectionIAlerts() {
  const { alertFrequency, emailAlerts, smsAlerts, updateField } = useProfileStore();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-semibold text-white mb-1">Alert Preferences</h2>
        <p className="text-slate-400 text-sm">Configure how and when you want to be notified about new leads.</p>
      </div>

      <Card className="bg-[#1C1C24] border-slate-800">
        <CardHeader>
          <CardTitle className="text-base text-white">Notification Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Email Frequency</Label>
            <Select value={alertFrequency} onValueChange={(v) => updateField('alertFrequency', v)}>
              <SelectTrigger className="bg-[#13131A] border-slate-700">
                <SelectValue placeholder="Select Frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Real-time">Real-time (Immediate)</SelectItem>
                <SelectItem value="Daily">Daily Digest</SelectItem>
                <SelectItem value="Weekly">Weekly Summary</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#13131A] rounded-lg border border-slate-800">
            <div className="space-y-0.5">
              <Label className="text-base text-slate-200">Email Notifications</Label>
              <p className="text-sm text-slate-500">Receive leads via email</p>
            </div>
            <Switch 
              checked={emailAlerts}
              onCheckedChange={(v) => updateField('emailAlerts', v)}
              className="data-[state=checked]:bg-brand-orange"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-[#13131A] rounded-lg border border-slate-800">
            <div className="space-y-0.5">
              <Label className="text-base text-slate-200">SMS Notifications</Label>
              <p className="text-sm text-slate-500">Receive urgent alerts via SMS</p>
            </div>
            <Switch 
              checked={smsAlerts}
              onCheckedChange={(v) => updateField('smsAlerts', v)}
              className="data-[state=checked]:bg-brand-orange"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
