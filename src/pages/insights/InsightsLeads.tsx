
import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_LEADS, Lead } from '@/data/insightsMockData';
import { useInsights } from '@/context/InsightsContext';
import { useProfileStore } from '@/store/profileStore';
import { LeadCard } from '@/components/insights/leads/LeadCard';
import { FilterBar } from '@/components/insights/leads/FilterBar';
import { RightRail } from '@/components/insights/leads/RightRail';
import { LeadDrawer } from '@/components/insights/leads/LeadDrawer';
import { FilterDrawer } from '@/components/insights/leads/FilterDrawer';
import { LeadsMapView } from '@/components/insights/leads/LeadsMapView';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Download, 
  ArrowUpDown, 
  Plus,
  AlertTriangle,
  ArrowRight,
  List,
  Map as MapIcon
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function InsightsLeads() {
  const { plan } = useInsights();
  const location = useLocation();
  const { calculateCompleteness } = useProfileStore();
  const completeness = calculateCompleteness();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  // Handle "Preview in Leads" deep link
  const shouldApplyCoverage = location.state?.applyCoverage;
  
  useEffect(() => {
    if (shouldApplyCoverage) {
      setIsFilterDrawerOpen(true);
    }
  }, [shouldApplyCoverage]);

  // Filter Logic (Mock)
  const filteredLeads = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return MOCK_LEADS.filter(lead => {
      return (
        lead.title.toLowerCase().includes(query) ||
        lead.company.toLowerCase().includes(query) ||
        lead.commodity.some(c => c.toLowerCase().includes(query)) ||
        lead.region.some(r => r.toLowerCase().includes(query))
      );
    });
  }, [searchQuery]);

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDrawerOpen(true);
  };

  const handleSelectLead = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedLeadIds([...selectedLeadIds, id]);
    } else {
      setSelectedLeadIds(selectedLeadIds.filter(lid => lid !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Biz Dev Leads</h1>
          <p className="text-slate-400 text-sm">Personalized opportunities based on your service profile and coverage regions.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="h-9 gap-2 bg-[#1C1C24] border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
             <Download className="h-4 w-4" />
             Export
           </Button>
           <Button className="h-9 gap-2 bg-brand-orange hover:bg-brand-orange/90 text-white border-none">
             <Plus className="h-4 w-4" />
             New Lead
           </Button>
        </div>
      </div>

      {/* Profile Incomplete Banner */}
      {completeness < 70 && (
        <div className="bg-amber-900/10 border border-amber-900/30 rounded-xl p-4 flex items-start gap-4 animate-in fade-in slide-in-from-top-2">
          <div className="h-10 w-10 rounded-full bg-amber-900/20 flex items-center justify-center shrink-0 border border-amber-900/30">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-white mb-1">Profile Incomplete ({completeness}%)</h3>
            <p className="text-sm text-slate-400 mb-3">
              Complete your profile to unlock better matching and remove limits on lead visibility.
            </p>
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white border-none h-8 text-xs" asChild>
              <Link to="/insights/profile">
                Complete Profile
                <ArrowRight className="h-3 w-3 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* Global Lead Search Bar */}
      <div className="relative max-w-2xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
        <Input 
          placeholder="Search leads, companies, projects, tickers, commodities..." 
          className="pl-10 h-12 rounded-xl border-slate-800 bg-[#1C1C24] text-white placeholder:text-slate-500 shadow-sm focus-visible:ring-brand-orange/20 focus-visible:border-brand-orange"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filter Bar */}
      <FilterBar onOpenAdvanced={() => setIsFilterDrawerOpen(true)} />

      {/* Batch Actions Bar */}
      {selectedLeadIds.length > 0 && (
        <div className="bg-brand-orange text-white px-4 py-3 rounded-xl flex items-center justify-between shadow-lg animate-in fade-in slide-in-from-bottom-2 sticky top-20 z-20">
          <span className="text-sm font-medium">{selectedLeadIds.length} leads selected</span>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 h-8">Mark Contacted</Button>
            <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 h-8">Archive</Button>
            <div className="h-4 w-px bg-white/30 mx-2" />
            <Button size="sm" className="bg-white text-brand-orange hover:bg-slate-100 h-8 border-none" asChild>
              <Link to="/insights/leads/compare">Compare ({selectedLeadIds.length})</Link>
            </Button>
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Feed */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between pb-2">
            <span className="text-sm font-medium text-slate-400">
              Showing {filteredLeads.length} results
            </span>
            <div className="flex items-center gap-2">
               <div className="bg-[#1C1C24] rounded-lg p-1 flex items-center border border-slate-800 mr-2">
                 <Button 
                   variant="ghost" 
                   size="sm" 
                   className={`h-7 px-2 text-xs ${viewMode === 'list' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
                   onClick={() => setViewMode('list')}
                 >
                   <List className="h-3.5 w-3.5 mr-1.5" />
                   List
                 </Button>
                 <Button 
                   variant="ghost" 
                   size="sm" 
                   className={`h-7 px-2 text-xs ${viewMode === 'map' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
                   onClick={() => setViewMode('map')}
                 >
                   <MapIcon className="h-3.5 w-3.5 mr-1.5" />
                   Map
                 </Button>
               </div>

               <span className="text-xs text-slate-500">Sort by:</span>
               <Button variant="ghost" size="sm" className="h-8 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 gap-1">
                 Recommended
                 <ArrowUpDown className="h-3 w-3" />
               </Button>
            </div>
          </div>

          {viewMode === 'list' ? (
            <div className="space-y-4">
              {filteredLeads.map(lead => (
                <LeadCard 
                  key={lead.id} 
                  lead={lead} 
                  isSelected={selectedLeadIds.includes(lead.id)}
                  onSelect={(checked) => handleSelectLead(lead.id, checked)}
                  onClick={() => handleLeadClick(lead)}
                />
              ))}
            </div>
          ) : (
            <LeadsMapView 
              leads={filteredLeads} 
              onLeadClick={handleLeadClick} 
            />
          )}
          
          {filteredLeads.length === 0 && (
            <div className="text-center py-20 bg-[#1C1C24] rounded-2xl border border-dashed border-slate-800">
              <div className="h-16 w-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-slate-500" />
              </div>
              <h3 className="text-lg font-medium text-white">No leads match your filters</h3>
              <p className="text-slate-500 max-w-sm mx-auto mt-2">Try adjusting your search terms or clearing some filters to see more results.</p>
              <Button variant="outline" className="mt-6 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white bg-transparent" onClick={() => setSearchQuery('')}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Right Column: Intelligence Rail */}
        <div className="hidden lg:block lg:col-span-4 sticky top-24">
          <RightRail />
        </div>
      </div>

      {/* Lead Detail Drawer */}
      <LeadDrawer 
        lead={selectedLead} 
        open={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />

      {/* Advanced Filter Drawer */}
      <FilterDrawer 
        open={isFilterDrawerOpen} 
        onClose={() => setIsFilterDrawerOpen(false)} 
        forceApplyCoverage={shouldApplyCoverage}
      />
    </div>
  );
}
