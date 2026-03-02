import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight, Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { MOCK_FUNDRAISERS, MOCK_TRENDING_COMMODITIES, MOCK_NEWS } from "@/data/mockInsightsData";

// Mock Chart Data
const GOLD_DATA = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  price: 2300 + Math.random() * 100 + (i * 2),
}));

const URANIUM_DATA = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  price: 85 + Math.random() * 10 + (i * 0.5),
}));

interface ExpandedMarketIntelligenceProps {
  onCollapse: () => void;
}

export function ExpandedMarketIntelligence({ onCollapse }: ExpandedMarketIntelligenceProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header & Controls */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Market Intelligence</h2>
          <p className="text-slate-400">Real-time commodity trends and competitor analysis.</p>
        </div>
        
        {/* Search & Filter Bar */}
        <div className="bg-[#1C1C24] p-1.5 rounded-full shadow-sm border border-slate-800 flex flex-col md:flex-row gap-2 items-center w-full xl:w-auto">
          <div className="relative flex-1 w-full md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input placeholder="Search commodities..." className="pl-10 h-10 bg-[#13131A] border-transparent focus-visible:ring-0 text-sm rounded-full text-slate-200 placeholder:text-slate-600" />
          </div>
          <div className="flex gap-1 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 px-1 md:px-0 scrollbar-hide">
               {['All', 'Energy', 'Metals', 'Tech'].map((filter) => (
                  <Button key={filter} variant="ghost" size="sm" className="rounded-full text-slate-400 hover:bg-slate-800 hover:text-white whitespace-nowrap h-10 px-4 font-medium text-xs">
                      {filter}
                  </Button>
               ))}
          </div>
          <div className="flex gap-1 w-full md:w-auto px-1 md:px-0">
               <Button variant="outline" className="rounded-full border-slate-700 text-slate-400 h-10 px-4 bg-[#1C1C24] hover:bg-slate-800 hover:text-white text-xs">
                  1M <ChevronDown className="ml-1 h-3 w-3" />
               </Button>
          </div>
        </div>
      </div>

      {/* Main Grid Layout - Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Gold Chart */}
        <Card className="bg-[#1C1C24] border-slate-800 shadow-sm rounded-[24px] overflow-hidden flex flex-col h-full">
          <CardContent className="p-6 flex flex-col h-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-yellow-900/20 flex items-center justify-center text-yellow-500 font-bold text-lg border border-yellow-900/30 shrink-0">
                Au
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Gold</h3>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-2xl font-bold text-white">$2,341.60</span>
                  <span className="text-xs text-slate-400 font-medium">/oz</span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-900/20 px-1.5 py-0.5 rounded-full flex items-center border border-emerald-900/30">
                    +1.2% <ArrowUpRight className="h-3 w-3 ml-0.5" />
                  </span>
                </div>
              </div>
            </div>

            <div className="h-40 w-full mb-auto">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={GOLD_DATA}>
                  <defs>
                    <linearGradient id="colorGold" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EAB308" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#EAB308" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="price" stroke="#EAB308" fillOpacity={1} fill="url(#colorGold)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800 mt-4">
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Capital Raised</p>
                <div className="flex items-center gap-2 mt-1">
                   <div>
                      <span className="text-lg font-bold text-white">$185M</span>
                      <span className="text-xs text-emerald-500 font-bold ml-1">+2.1%</span>
                   </div>
                </div>
              </div>
              <div className="text-right">
                 <p className="text-xs text-slate-400 font-medium bg-slate-800/50 px-2 py-1 rounded-lg">27 Deals</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Uranium Chart */}
        <Card className="bg-[#1C1C24] border-slate-800 shadow-sm rounded-[24px] overflow-hidden flex flex-col h-full">
          <CardContent className="p-6 flex flex-col h-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-emerald-900/20 flex items-center justify-center text-emerald-500 font-bold text-lg border border-emerald-900/30 shrink-0">
                U
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Uranium</h3>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-2xl font-bold text-white">$91.25</span>
                  <span className="text-xs text-slate-400 font-medium">/lb</span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-900/20 px-1.5 py-0.5 rounded-full flex items-center border border-emerald-900/30">
                    +1.8% <ArrowUpRight className="h-3 w-3 ml-0.5" />
                  </span>
                </div>
              </div>
            </div>

            <div className="h-40 w-full mb-auto">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={URANIUM_DATA}>
                  <defs>
                    <linearGradient id="colorUranium" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="price" stroke="#10B981" fillOpacity={1} fill="url(#colorUranium)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800 mt-4">
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Capital Raised</p>
                <div className="flex items-center gap-2 mt-1">
                   <div>
                      <span className="text-lg font-bold text-white">$41M</span>
                      <span className="text-xs text-red-500 font-bold ml-1">-5.3%</span>
                   </div>
                </div>
              </div>
              <div className="text-right">
                 <p className="text-xs text-slate-400 font-medium bg-slate-800/50 px-2 py-1 rounded-lg">15 Deals</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Top Fundraisers List */}
        <Card className="bg-[#1C1C24] border-slate-800 shadow-sm rounded-[24px] overflow-hidden flex flex-col h-full">
          <CardHeader className="pb-2 pt-6 px-6 shrink-0">
            <CardTitle className="text-lg font-bold text-white">Top Fundraisers</CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex flex-col flex-1 min-h-0">
            <div className="divide-y divide-slate-800 overflow-y-auto flex-1 custom-scrollbar">
              {MOCK_FUNDRAISERS.map((fund, i) => (
                <div key={i} className="flex justify-between items-center p-4 px-6 hover:bg-slate-800/50 transition-colors">
                  <span className="text-sm font-medium text-slate-300 truncate pr-2">{fund.name}</span>
                  <span className="text-xs font-bold text-white bg-slate-800 px-2 py-1 rounded-md whitespace-nowrap">{fund.amount}</span>
                </div>
              ))}
            </div>
            <div className="p-4 px-6 border-t border-slate-800 shrink-0">
              <Button variant="ghost" size="sm" className="w-full bg-[#2D2D35] hover:bg-slate-700 text-slate-300 rounded-xl h-9 text-xs font-medium border border-slate-700">
                View all <ChevronRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Trending & News */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Trending Commodities Table */}
        <div className="xl:col-span-2">
          <Card className="bg-[#1C1C24] border-slate-800 shadow-sm rounded-[24px] overflow-hidden h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6 px-6">
              <CardTitle className="text-xl font-bold text-white">Trending Commodities</CardTitle>
              <Button variant="outline" size="sm" className="text-slate-300 rounded-full border-slate-700 hover:bg-slate-800 hover:text-white bg-transparent text-xs h-8">
                View more
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left whitespace-nowrap">
                  <thead className="text-xs text-slate-500 uppercase bg-slate-800/50 border-b border-slate-800">
                    <tr>
                      <th className="px-6 py-4 font-bold tracking-wider">Commodity</th>
                      <th className="px-6 py-4 font-bold tracking-wider">Price</th>
                      <th className="px-6 py-4 font-bold tracking-wider">1 Mo Trend</th>
                      <th className="px-6 py-4 font-bold tracking-wider">Capital Raised</th>
                      <th className="px-6 py-4 font-bold tracking-wider text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {MOCK_TRENDING_COMMODITIES.map((item, i) => (
                      <tr key={i} className="hover:bg-slate-800/50 transition-colors group">
                        <td className="px-6 py-4 font-bold text-white">{item.name}</td>
                        <td className="px-6 py-4 font-mono text-slate-400 font-medium">{item.price}</td>
                        <td className={`px-6 py-4 font-bold ${item.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                          {item.change}
                        </td>
                        <td className="px-6 py-4 font-bold text-white">{item.capital}</td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 rounded-full hover:bg-slate-700 text-slate-400 hover:text-white">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Card 4: Latest News List */}
        <div className="xl:col-span-1">
          <Card className="bg-[#1C1C24] border-slate-800 shadow-sm rounded-[24px] overflow-hidden flex flex-col h-full">
            <CardHeader className="pb-2 pt-6 px-6 shrink-0">
              <CardTitle className="text-lg font-bold text-white">Latest News</CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex flex-col flex-1 min-h-0">
              <div className="divide-y divide-slate-800 overflow-y-auto flex-1 custom-scrollbar">
                {MOCK_NEWS.slice(0, 4).map((news) => (
                  <div key={news.id} className="p-4 px-6 hover:bg-slate-800/50 transition-colors cursor-pointer group">
                    <h5 className="text-sm font-bold text-white group-hover:text-brand-orange line-clamp-2 leading-snug mb-2 transition-colors">
                      {news.title}
                    </h5>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium uppercase tracking-wide">
                      <span className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 truncate max-w-[80px]">{news.source}</span>
                      <span>•</span>
                      <span className="whitespace-nowrap">{news.timeAgo}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 px-6 border-t border-slate-800 shrink-0">
                <Button variant="ghost" size="sm" className="w-full bg-[#2D2D35] hover:bg-slate-700 text-slate-300 rounded-xl h-9 text-xs font-medium border border-slate-700">
                  View all <ChevronRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
