import React from 'react';
import { Bell } from 'lucide-react';

export default function InsightsNotifications() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <div className="h-24 w-24 bg-[#1C1C24] rounded-full flex items-center justify-center">
        <Bell className="h-12 w-12 text-slate-500" />
      </div>
      <div className="space-y-2 max-w-md">
        <h1 className="text-2xl font-bold text-white">Notifications</h1>
        <p className="text-slate-400">Stay updated on new leads, project changes, and market alerts.</p>
      </div>
    </div>
  );
}
