import React, { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Bell, CheckCheck } from 'lucide-react';
import { MOCK_NOTIFICATIONS, Notification } from '@/data/mockNotifications';
import { NotificationItem } from '@/components/notifications/NotificationItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

export function NotificationBellDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setNotifications(MOCK_NOTIFICATIONS);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast({
      title: "All notifications marked as read",
    });
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-900 focus-visible:ring-offset-0">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-600 border border-white animate-pulse" />
          )}
          <span className="sr-only">Open notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0 rounded-xl shadow-lg border-slate-200">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50 rounded-t-xl">
          <h3 className="font-semibold text-sm text-slate-900">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-1 text-xs text-brand-orange hover:text-brand-orange/80 hover:bg-orange-50 gap-1"
              onClick={handleMarkAllAsRead}
            >
              <CheckCheck className="h-3 w-3" />
              Mark all read
            </Button>
          )}
        </div>
        
        <ScrollArea className="h-[320px]">
          {isLoading ? (
            <div className="p-4 space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-3 animate-pulse">
                  <div className="h-8 w-8 bg-slate-100 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-24 bg-slate-100 rounded" />
                    <div className="h-2 w-full bg-slate-100 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : notifications.length > 0 ? (
            <div className="flex flex-col">
              {notifications.map(notification => (
                <React.Fragment key={notification.id}>
                  <NotificationItem
                    notification={notification}
                    onClick={() => {
                      handleMarkAsRead(notification.id);
                      setIsOpen(false);
                    }}
                  />
                </React.Fragment>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-center p-4">
              <div className="p-3 bg-slate-50 rounded-full mb-3">
                <Bell className="h-6 w-6 text-slate-300" />
              </div>
              <p className="text-sm font-medium text-slate-900">No notifications yet</p>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                We'll notify you when something important happens.
              </p>
              <Button variant="outline" size="sm" asChild onClick={() => setIsOpen(false)}>
                <Link to="/search">Search Projects</Link>
              </Button>
            </div>
          )}
        </ScrollArea>
        
        <div className="p-2 border-t border-slate-100 bg-slate-50/30 rounded-b-xl">
          <Button variant="ghost" size="sm" className="w-full text-xs text-slate-500 hover:text-slate-900" asChild onClick={() => setIsOpen(false)}>
            <Link to="/app/notifications">View Settings</Link>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
