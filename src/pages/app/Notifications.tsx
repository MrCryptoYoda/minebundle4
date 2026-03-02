import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ToggleRow } from '@/components/notifications/ToggleRow';
import { useToast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotificationsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    savedSearches: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleEmailToggle = (checked: boolean) => {
    if (!checked && settings.savedSearches) {
      // Logic: Disabling Email also disables Saved Searches
      setSettings({ emailNotifications: false, savedSearches: false });
      toast({
        title: "Email notifications disabled",
        description: "Saved search alerts were also turned off.",
      });
    } else {
      setSettings(prev => ({ ...prev, emailNotifications: checked }));
      toast({
        title: checked ? "Email notifications enabled" : "Email notifications disabled",
      });
    }
  };

  const handleSavedSearchesToggle = (checked: boolean) => {
    if (checked && !settings.emailNotifications) {
      // Logic: Enabling Saved Searches auto-enables Email
      setSettings({ emailNotifications: true, savedSearches: true });
      toast({
        title: "Saved search alerts enabled",
        description: "Email notifications were automatically enabled.",
      });
    } else {
      setSettings(prev => ({ ...prev, savedSearches: checked }));
      toast({
        title: checked ? "Saved search alerts enabled" : "Saved search alerts disabled",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 p-6 max-w-3xl mx-auto">
        <Skeleton className="h-12 w-48 mb-4" />
        <Card>
           <CardHeader>
             <Skeleton className="h-6 w-32 mb-2" />
             <Skeleton className="h-4 w-64" />
           </CardHeader>
           <CardContent className="space-y-4">
             <Skeleton className="h-12 w-full" />
             <Skeleton className="h-12 w-full" />
           </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
        <AlertCircle className="h-10 w-10 text-red-500" />
        <p className="text-slate-600">Failed to load notification settings.</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 max-w-3xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Notification</h1>
        <p className="text-slate-500">Choose what you want to be notified about.</p>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-4 border-b border-slate-100">
          <CardTitle className="text-lg font-semibold text-slate-900">Alert Types</CardTitle>
          <CardDescription>Manage your email and platform alert preferences.</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <ToggleRow
            id="email-notifications"
            label="Email Notifications"
            description="Receive important updates via email."
            checked={settings.emailNotifications}
            onCheckedChange={handleEmailToggle}
            tooltipText="Global toggle for all email communications."
          />
          <ToggleRow
            id="saved-searches"
            label="Saved Searches"
            description="Receive alerts when new listings match your saved searches."
            checked={settings.savedSearches}
            onCheckedChange={handleSavedSearchesToggle}
            tooltipText="Requires Email Notifications to be enabled."
          />
        </CardContent>
      </Card>
    </div>
  );
}
