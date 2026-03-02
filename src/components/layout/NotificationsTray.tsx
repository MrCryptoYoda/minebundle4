import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Settings, Check, Clock, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from 'react-router-dom';

// Mock Notification Data
const NOTIFICATIONS = [
  {
    id: 1,
    title: "New Lead Match: Gold Exploration WA",
    message: "A new project matches your drilling criteria in Western Australia.",
    time: "2 mins ago",
    read: false,
    type: "lead",
    priority: "high"
  },
  {
    id: 2,
    title: "Project Update: De Grey Mining",
    message: "Status changed from Exploration to PFS.",
    time: "1 hour ago",
    read: false,
    type: "update",
    priority: "medium"
  },
  {
    id: 3,
    title: "Weekly Digest Ready",
    message: "Your weekly insights summary is available for review.",
    time: "5 hours ago",
    read: true,
    type: "system",
    priority: "low"
  },
  {
    id: 4,
    title: "Subscription Renewal",
    message: "Your Pro subscription will renew in 3 days.",
    time: "1 day ago",
    read: true,
    type: "billing",
    priority: "high"
  },
  {
    id: 5,
    title: "New Competitor Activity",
    message: "Competitor X just raised $5M for a similar project.",
    time: "2 days ago",
    read: true,
    type: "intel",
    priority: "medium"
  }
];

interface NotificationsTrayProps {
  children: React.ReactNode;
}

export function NotificationsTray({ children }: NotificationsTrayProps) {
  const [unreadCount, setUnreadCount] = React.useState(2);

  const markAllRead = () => {
    setUnreadCount(0);
    // In a real app, this would call an API
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[400px] bg-[#1C1C24] border-l border-slate-800 text-slate-100 p-0 flex flex-col">
        <SheetHeader className="p-6 pb-2 border-b border-slate-800 shrink-0">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-bold text-white flex items-center gap-2">
              Notifications
              {unreadCount > 0 && (
                <Badge className="bg-brand-orange text-white hover:bg-brand-orange border-0 h-5 px-1.5 min-w-[20px] flex items-center justify-center">
                  {unreadCount}
                </Badge>
              )}
            </SheetTitle>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-full h-8 w-8" asChild>
              <Link to="/insights/notifications">
                <Settings className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </SheetHeader>

        <Tabs defaultValue="all" className="flex-1 flex flex-col min-h-0">
          <div className="px-6 pt-4 pb-2 shrink-0">
            <TabsList className="w-full bg-[#13131A] border border-slate-800 p-1 rounded-lg">
              <TabsTrigger value="all" className="flex-1 text-xs data-[state=active]:bg-[#2D2D35] data-[state=active]:text-white text-slate-400 rounded-md">All</TabsTrigger>
              <TabsTrigger value="unread" className="flex-1 text-xs data-[state=active]:bg-[#2D2D35] data-[state=active]:text-white text-slate-400 rounded-md">Unread</TabsTrigger>
              <TabsTrigger value="system" className="flex-1 text-xs data-[state=active]:bg-[#2D2D35] data-[state=active]:text-white text-slate-400 rounded-md">System</TabsTrigger>
            </TabsList>
          </div>

          <div className="px-6 py-2 flex justify-between items-center shrink-0">
            <span className="text-xs text-slate-500 font-medium">Recent Activity</span>
            <Button variant="ghost" size="sm" onClick={markAllRead} className="h-6 text-[10px] text-brand-orange hover:text-brand-orange hover:bg-brand-orange/10 px-2 rounded-full">
              Mark all read
            </Button>
          </div>

          <ScrollArea className="flex-1 px-6">
            <TabsContent value="all" className="mt-0 space-y-4 pb-6">
              {NOTIFICATIONS.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </TabsContent>
            <TabsContent value="unread" className="mt-0 space-y-4 pb-6">
              {NOTIFICATIONS.filter(n => !n.read).map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
              {NOTIFICATIONS.filter(n => !n.read).length === 0 && (
                <EmptyState message="No unread notifications" />
              )}
            </TabsContent>
            <TabsContent value="system" className="mt-0 space-y-4 pb-6">
              {NOTIFICATIONS.filter(n => n.type === 'system' || n.type === 'billing').map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </TabsContent>
          </ScrollArea>
          
          <div className="p-4 border-t border-slate-800 shrink-0 bg-[#1C1C24]">
            <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white bg-transparent" asChild>
              <Link to="/insights/notifications">View All History</Link>
            </Button>
          </div>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}

const NotificationItem: React.FC<{ notification: any }> = ({ notification }) => {
  return (
    <div className={cn(
      "group relative flex gap-4 p-4 rounded-xl transition-all duration-200 border border-transparent hover:border-slate-700/50",
      !notification.read ? "bg-[#2D2D35]/50 hover:bg-[#2D2D35]" : "hover:bg-slate-800/30"
    )}>
      {!notification.read && (
        <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-brand-orange shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
      )}
      
      <div className={cn(
        "h-10 w-10 rounded-full flex items-center justify-center shrink-0 border border-white/5",
        notification.type === 'lead' ? "bg-brand-orange/10 text-brand-orange" :
        notification.type === 'update' ? "bg-blue-500/10 text-blue-500" :
        notification.type === 'billing' ? "bg-purple-500/10 text-purple-500" :
        "bg-slate-700/30 text-slate-400"
      )}>
        {notification.type === 'lead' ? <AlertCircle className="h-5 w-5" /> :
         notification.type === 'update' ? <Info className="h-5 w-5" /> :
         notification.type === 'billing' ? <AlertCircle className="h-5 w-5" /> :
         <Bell className="h-5 w-5" />}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h4 className={cn("text-sm font-semibold truncate pr-4", !notification.read ? "text-white" : "text-slate-300")}>
            {notification.title}
          </h4>
        </div>
        <p className="text-xs text-slate-400 line-clamp-2 mb-2 leading-relaxed">
          {notification.message}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-500 flex items-center gap-1">
            <Clock className="h-3 w-3" /> {notification.time}
          </span>
          {notification.type === 'lead' && (
            <Badge variant="outline" className="text-[10px] h-4 px-1 py-0 border-brand-orange/30 text-brand-orange bg-brand-orange/5">
              New Lead
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-40 text-center p-6">
      <div className="h-12 w-12 rounded-full bg-slate-800/50 flex items-center justify-center mb-3">
        <Bell className="h-6 w-6 text-slate-600" />
      </div>
      <p className="text-sm text-slate-500">{message}</p>
    </div>
  );
}
