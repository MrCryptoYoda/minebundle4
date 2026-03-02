import React from 'react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import { Notification } from '@/data/mockNotifications';

interface NotificationItemProps {
  notification: Notification;
  onClick: () => void;
}

export function NotificationItem({ notification, onClick }: NotificationItemProps) {
  return (
    <DropdownMenuItem asChild className="cursor-pointer focus:bg-slate-50 p-0">
      <Link
        to={notification.link}
        onClick={onClick}
        className={cn(
          "flex items-start gap-3 p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors w-full",
          !notification.read && "bg-blue-50/30"
        )}
      >
        <div className={cn(
          "mt-1.5 h-2 w-2 rounded-full flex-shrink-0",
          !notification.read ? "bg-blue-600" : "bg-transparent"
        )} />
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <span className={cn("text-sm font-medium text-slate-900 truncate", !notification.read && "font-semibold")}>
            {notification.title}
          </span>
          <p className="text-xs text-slate-500 line-clamp-1">
            {notification.message}
          </p>
          <span className="text-[10px] text-slate-400">
            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
          </span>
        </div>
      </Link>
    </DropdownMenuItem>
  );
}
