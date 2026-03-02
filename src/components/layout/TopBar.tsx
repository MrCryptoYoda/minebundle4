import React from 'react';
import { Search, Bell, Menu, User, ChevronDown, Sparkles, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useInsights } from '@/context/InsightsContext';
import { Link, useLocation } from 'react-router-dom';

import { NotificationsTray } from '@/components/layout/NotificationsTray';

export function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  const { plan } = useInsights();
  const location = useLocation();
  const isInsights = location.pathname.startsWith('/insights');

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-[#13131A]">
      <div className="flex h-16 items-center px-4 md:px-6 gap-4">
        {/* Mobile Menu Trigger */}
        <Button variant="ghost" size="icon" className="md:hidden text-slate-400 hover:text-white hover:bg-white/10" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>

        {/* Brand Lockup (Mobile only, desktop is in sidebar) */}
        <div className="md:hidden flex items-center gap-2 font-bold text-white">
          <div className="h-8 w-8 bg-brand-orange rounded-lg flex items-center justify-center text-white shadow-lg shadow-brand-orange/20">
            <Sparkles className="h-4 w-4 fill-current" />
          </div>
          <span className="hidden sm:inline-block">ACRU</span>
        </div>

        {/* Global Search or Back Link */}
        <div className="flex-1 max-w-xl ml-auto md:ml-0 relative group">
          {isInsights ? (
            <Link to="/marketplace" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Marketplace
            </Link>
          ) : (
            <>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-brand-orange transition-colors" />
              <Input 
                placeholder="Search leads, companies, projects..." 
                className="pl-10 bg-[#1C1C24] border-slate-800 text-slate-200 placeholder:text-slate-600 focus-visible:ring-brand-orange/50 focus-visible:border-brand-orange transition-all rounded-full h-10 text-sm"
              />
            </>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-4 ml-auto">
          {/* Plan Badge */}
          {plan === 'SP_FREE' ? (
            <div className="hidden md:flex items-center gap-2 bg-[#1C1C24] border border-slate-800 rounded-full pl-3 pr-1 py-1">
              <span className="text-xs font-medium text-slate-400">Free Plan</span>
              <Button size="sm" className="h-7 rounded-full text-xs px-3 bg-brand-orange hover:bg-brand-orange/90 text-white">
                Upgrade
              </Button>
            </div>
          ) : (
            <Badge variant="secondary" className="hidden md:flex bg-emerald-900/30 text-emerald-400 border-emerald-800 px-3 py-1 rounded-full font-medium">
              Pro Active
            </Badge>
          )}

          {/* Notifications */}
          <NotificationsTray>
            <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-white hover:bg-white/10 rounded-full">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-[#13131A]" />
            </Button>
          </NotificationsTray>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0 border border-slate-700 shadow-sm hover:ring-2 hover:ring-brand-orange/50 transition-all">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://picsum.photos/seed/user/100" alt="User" />
                  <AvatarFallback className="bg-slate-800 text-slate-300">AI</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[#1C1C24] border-slate-800 text-slate-200" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-white">AI Biz Dev</p>
                  <p className="text-xs leading-none text-slate-500">
                    service@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-800" />
              <DropdownMenuItem asChild className="focus:bg-slate-800 focus:text-white cursor-pointer">
                <Link to="/insights/profile">Provider Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="focus:bg-slate-800 focus:text-white cursor-pointer">
                <Link to="/insights/billing">Billing Plans</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="focus:bg-slate-800 focus:text-white cursor-pointer">
                <Link to="/insights/notifications">Notifications</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-800" />
              <DropdownMenuItem className="focus:bg-slate-800 focus:text-white cursor-pointer">
                Switch to Buyer Dashboard
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-800" />
              <DropdownMenuItem className="text-red-400 focus:text-red-300 focus:bg-red-900/20 cursor-pointer">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
