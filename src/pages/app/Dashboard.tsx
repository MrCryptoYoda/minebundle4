import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, ChevronRight, Bell, MoreHorizontal, ArrowUpRight, FileText, MessageSquare, Briefcase, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockSavedSearches } from '@/data/mockSavedSearches';
import { mockReceivedMessages } from '@/data/mockMessages';
import { MOCK_LISTINGS } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';
import { SkeletonGrid } from '@/components/dashboard/SkeletonGrid';
import { cn } from '@/lib/utils';

import { useDemo } from '@/context/DemoContext';

export default function Dashboard() {
  const { userRole } = useDemo();
  const [isLoading, setIsLoading] = useState(true);

  // Mock Data Selection
  const recentListings = MOCK_LISTINGS.slice(0, 3);
  const recentSavedSearches = mockSavedSearches.slice(0, 3);
  const recentMessages = mockReceivedMessages.slice(0, 3);
  
  // Mock User
  const user = {
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    avatar: "https://i.pravatar.cc/150?u=alex",
    role: userRole === 'agent' ? 'Authorized Agent' : 
          userRole === 'service_provider' ? 'Service Provider' : 
          userRole === 'admin' ? 'Admin' : 'Individual Investor',
    listingsCount: 12,
    draftsCount: 2,
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-8 p-8 max-w-[1600px] mx-auto">
        <div className="flex justify-between items-center">
          <div className="h-10 w-48 bg-slate-800 rounded-xl animate-pulse" />
          <div className="h-10 w-32 bg-slate-800 rounded-xl animate-pulse" />
        </div>
        <SkeletonGrid />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 md:p-8 max-w-[1600px] mx-auto font-sans text-slate-100">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Dashboard
          </h1>
          <p className="text-slate-400 mt-1 text-lg">Welcome back, {user.name}</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-brand-orange transition-colors" />
            <input 
              type="text" 
              placeholder="Search Projects..." 
              className="h-11 pl-10 pr-4 rounded-full border border-slate-700 bg-[#1C1C24] text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange w-64 transition-all placeholder:text-slate-500"
            />
          </div>
          <Button size="lg" className="rounded-full bg-brand-orange hover:bg-brand-orange/90 text-white shadow-lg shadow-brand-orange/20 px-6 gap-2" asChild>
            <Link to="/list">
              <Plus className="h-5 w-5" />
              List an Asset
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 1. Profile Card */}
        <Card className="bg-[#1C1C24] border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 rounded-[32px] overflow-hidden h-full flex flex-col">
          <CardHeader className="border-b border-slate-800 p-8 pb-4">
            <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
              <LayoutDashboard className="h-5 w-5 text-brand-orange" />
              Profile Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 flex flex-col h-full">
            <div className="flex items-center gap-6 mb-8">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-[#13131A] shadow-lg shadow-black/20">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-slate-800 text-slate-400 text-2xl font-bold">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-1 right-1 h-5 w-5 bg-emerald-500 border-4 border-[#1C1C24] rounded-full"></div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{user.name}</h2>
                <p className="text-slate-400 mb-3">{user.email}</p>
                <Badge variant="outline" className="bg-brand-orange/10 text-brand-orange border-brand-orange/20 px-3 py-1 rounded-full font-medium">
                  {user.role}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-auto">
              <div className="bg-[#13131A] rounded-2xl p-6 text-center border border-slate-800 group hover:border-brand-orange/30 hover:bg-brand-orange/5 transition-all cursor-pointer">
                <div className="text-4xl font-bold text-white mb-2 group-hover:text-brand-orange transition-colors">{user.listingsCount}</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-slate-400">Live Listings</div>
              </div>
              <div className="bg-[#13131A] rounded-2xl p-6 text-center border border-slate-800 group hover:border-brand-orange/30 hover:bg-brand-orange/5 transition-all cursor-pointer">
                <div className="text-4xl font-bold text-white mb-2 group-hover:text-brand-orange transition-colors">{user.draftsCount}</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-slate-400">Drafts</div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-800 flex justify-center">
               <Button variant="ghost" className="text-slate-400 hover:text-white hover:bg-white/5 text-xs font-bold uppercase tracking-widest flex items-center gap-2 rounded-full h-10 px-6" asChild>
                 <Link to="/app/account">
                   View Full Profile <ChevronRight className="h-4 w-4" />
                 </Link>
               </Button>
            </div>
          </CardContent>
        </Card>

        {/* 2. Your Projects */}
        <Card className="bg-[#1C1C24] border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 rounded-[32px] overflow-hidden h-full flex flex-col">
          <CardHeader className="border-b border-slate-800 p-8 pb-4">
            <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-brand-orange" />
              Your Projects
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-1 flex flex-col">
            <div className="divide-y divide-slate-800 flex-1">
              {recentListings.map((listing, index) => (
                <div key={listing.id} className="p-6 hover:bg-white/5 transition-colors group cursor-pointer flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "mt-2 h-2.5 w-2.5 rounded-full shrink-0 shadow-[0_0_10px_rgba(0,0,0,0.5)]",
                       index === 0 ? 'bg-blue-500 shadow-blue-500/50' : index === 1 ? 'bg-indigo-500 shadow-indigo-500/50' : 'bg-emerald-500 shadow-emerald-500/50'
                    )} />
                    <div>
                      <h3 className="font-bold text-slate-200 text-base mb-1 group-hover:text-brand-orange transition-colors">{listing.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Badge variant="outline" className="rounded-md border-slate-700 text-slate-400 font-normal text-xs px-2 py-0.5 bg-[#13131A]">
                          {listing.stage}
                        </Badge>
                        <span>•</span>
                        <span>Updated {formatDistanceToNow(new Date(listing.createdAt))} ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-[#13131A] border border-slate-700 flex items-center justify-center text-slate-500 group-hover:border-brand-orange group-hover:text-brand-orange transition-all">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-slate-800 mt-auto">
               <Button variant="ghost" className="w-full text-slate-400 hover:text-white hover:bg-white/5 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded-full h-10" asChild>
                 <Link to="/app/listings">
                   View All Projects <ChevronRight className="h-4 w-4" />
                 </Link>
               </Button>
            </div>
          </CardContent>
        </Card>

        {/* 3. Saved Searches */}
        <Card className="bg-[#1C1C24] border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 rounded-[32px] overflow-hidden h-full flex flex-col">
          <CardHeader className="border-b border-slate-800 p-8 pb-4">
            <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-brand-orange" />
              Saved Searches
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-1 flex flex-col">
            <div className="divide-y divide-slate-800 flex-1">
              {recentSavedSearches.map((search) => (
                <div key={search.id} className="p-6 hover:bg-white/5 transition-colors group flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-[#13131A] border border-slate-800 flex items-center justify-center text-slate-500 group-hover:border-brand-orange/30 group-hover:text-brand-orange transition-all">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-200 text-sm mb-0.5 group-hover:text-white transition-colors">{search.name}</h3>
                      <p className="text-xs text-slate-500 font-mono">{search.query}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {search.emailAlerts && (
                      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide font-bold">
                        Alerts On
                      </Badge>
                    )}
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-500 hover:text-white hover:bg-white/10 rounded-full" asChild>
                      <Link to={`/search?q=${search.query}`}>
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-slate-800 mt-auto">
               <Button variant="ghost" className="w-full text-slate-400 hover:text-white hover:bg-white/5 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded-full h-10" asChild>
                 <Link to="/app/saved-searches">
                   View All Searches <ChevronRight className="h-4 w-4" />
                 </Link>
               </Button>
            </div>
          </CardContent>
        </Card>

        {/* 4. Project Enquiries */}
        <Card className="bg-[#1C1C24] border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 rounded-[32px] overflow-hidden h-full flex flex-col">
          <CardHeader className="border-b border-slate-800 p-8 pb-4">
            <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-brand-orange" />
              Project Enquiries
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-1 flex flex-col">
            <div className="divide-y divide-slate-800 flex-1">
              {recentMessages.map((msg) => (
                <div key={msg.id} className="p-6 hover:bg-white/5 transition-colors group cursor-pointer flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-10 w-10 border border-slate-700">
                        <AvatarImage src={msg.sender.avatar} />
                        <AvatarFallback className="bg-slate-800 text-slate-400 text-xs font-bold">
                          {msg.sender.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {msg.status === 'new' && (
                        <span className="absolute -top-1 -right-1 h-3 w-3 bg-blue-500 border-2 border-[#1C1C24] rounded-full shadow-lg shadow-blue-500/50" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-bold text-slate-200 text-sm group-hover:text-white transition-colors">{msg.sender.name}</h3>
                        <span className="text-xs text-slate-500">• {formatDistanceToNow(new Date(msg.timestamp))} ago</span>
                      </div>
                      <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">Re: {msg.enquiry.title}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-600 group-hover:text-white transition-colors" />
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-slate-800 mt-auto">
               <Button variant="ghost" className="w-full text-slate-400 hover:text-white hover:bg-white/5 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded-full h-10" asChild>
                 <Link to="/app/messages">
                   View All Enquiries <ChevronRight className="h-4 w-4" />
                 </Link>
               </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
