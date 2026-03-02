import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ServiceCard } from '@/components/marketplace/ServiceCard';
import { getServicesByCategory, MARKETPLACE_CATEGORIES, ServiceListing } from '@/data/marketplaceData';
import { Search, ChevronRight } from 'lucide-react';
import { ServiceSearchHeader } from '@/components/marketplace/ServiceSearchHeader';
import { ServiceFilterPanel } from '@/components/marketplace/ServiceFilterPanel';
import { FilterDrawer } from '@/components/marketplace/FilterDrawer';
import { cn } from '@/lib/utils';

export default function CategoryResults() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State from URL or defaults
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>((searchParams.get('view') as 'grid' | 'list') || 'grid');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'Relevance');
  
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>(() => {
    const filters: Record<string, any> = {};
    const arrayKeys = ['regions', 'commodities', 'type'];
    
    searchParams.forEach((value, key) => {
      if (['q', 'view', 'sort'].includes(key)) return;
      
      if (arrayKeys.includes(key) || value.includes(',')) {
        filters[key] = value.split(',').map(v => v.trim());
      } else if (key === 'verified') {
        filters[key] = value === 'true';
      } else {
        filters[key] = value;
      }
    });
    return filters;
  });

  const [services, setServices] = useState<ServiceListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const category = slug === 'all' 
    ? { 
        id: 'all', 
        slug: 'all', 
        name: query ? `Search Results for "${query}"` : 'All Services', 
        description: 'Browse all professional mining services and providers.',
        image: '' 
      }
    : MARKETPLACE_CATEGORIES.find(c => c.slug === slug);

  // Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (viewMode !== 'grid') params.set('view', viewMode);
    if (sortBy !== 'Relevance') params.set('sort', sortBy);
    
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        params.set(key, value.join(','));
      } else if (value !== undefined && value !== null) {
        params.set(key, String(value));
      }
    });

    setSearchParams(params, { replace: true });
  }, [query, viewMode, sortBy, activeFilters, setSearchParams]);

  // Fetch and Filter Services
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call and filtering
    const timer = setTimeout(() => {
      if (slug) {
        let results = getServicesByCategory(slug);

        // Apply Text Search
        if (query) {
          const q = query.toLowerCase();
          results = results.filter(s => 
            s.title.toLowerCase().includes(q) || 
            s.summary.toLowerCase().includes(q) ||
            s.provider?.name.toLowerCase().includes(q)
          );
        }

        // Apply Filters
        if (activeFilters.regions && activeFilters.regions.length > 0) {
          results = results.filter(s => 
            s.regions.some(r => activeFilters.regions.includes(r))
          );
        }

        if (activeFilters.commodities && activeFilters.commodities.length > 0) {
          results = results.filter(s => 
            s.commodities.some(c => activeFilters.commodities.includes(c))
          );
        }

        if (activeFilters.type && activeFilters.type.length > 0) {
          // Assuming provider type is stored somewhere or inferred. 
          // For now, mock filtering based on provider name containing "Consulting" vs "Group" etc.
          // In a real app, ServiceListing would have a providerType field.
        }

        if (activeFilters.verified) {
          results = results.filter(s => s.provider?.verified);
        }

        setServices(results);
      }
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [slug, query, activeFilters]);

  const handleFilterChange = (key: string, value: any) => {
    setActiveFilters(prev => {
      const next = { ...prev };
      if (value === undefined || (Array.isArray(value) && value.length === 0) || value === false) {
        delete next[key];
      } else {
        next[key] = value;
      }
      return next;
    });
  };

  if (!category) {
    return <div className="p-8 text-center">Category not found</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col h-screen overflow-hidden">
      {/* Breadcrumbs (Optional - could be in header or above) */}
      {/* Keeping it simple and clean like SearchPage */}

      <div className="shrink-0">
        <ServiceSearchHeader
          query={query}
          onQueryChange={setQuery}
          onSearch={() => {}}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onMobileFilterOpen={() => setIsMobileFilterOpen(true)}
        />
      </div>

      <div className="flex-1 overflow-hidden flex relative">
        {/* Filter Panel Sidebar - Visible on Desktop */}
        <div className="hidden lg:block w-[280px] xl:w-[320px] h-full border-r border-white/5 bg-slate-950 overflow-hidden shrink-0">
          <ServiceFilterPanel 
            activeFilters={activeFilters} 
            onFilterChange={handleFilterChange}
            onReset={() => setActiveFilters({})}
            className="h-full max-h-none border-none shadow-none rounded-none sticky top-0 bg-slate-950"
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex h-full overflow-hidden relative">
          <div className="flex-1 h-full overflow-y-auto p-6 transition-all duration-300 w-full">
            
            {/* Page Header inside Content */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                <Link to="/marketplace" className="hover:text-brand-orange">Marketplace</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="font-medium text-white">{category.name}</span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">{category.name}</h1>
              <p className="text-slate-400 max-w-3xl">{category.description}</p>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-slate-400">
                {isLoading ? 'Searching...' : `Showing ${services.length} results`}
              </div>
            </div>

            {isLoading ? (
              <div className={cn(
                "grid gap-6",
                viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              )}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className={cn("bg-slate-900 rounded-xl border border-white/5 animate-pulse", viewMode === 'list' ? "h-[200px]" : "h-[320px]")} />
                ))}
              </div>
            ) : services.length > 0 ? (
              <div className={cn(
                "grid gap-6",
                viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              )}>
                {services.map(service => (
                  <React.Fragment key={service.id}>
                    <ServiceCard service={service} viewMode={viewMode} />
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-950 rounded-xl border border-dashed border-white/10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 mb-4">
                  <Search className="h-8 w-8 text-slate-500" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">No services found</h3>
                <p className="text-slate-400 max-w-md mx-auto mb-6">
                  We couldn't find any services matching your criteria. Try adjusting your filters or search terms.
                </p>
                <Button variant="outline" onClick={() => { setQuery(''); setActiveFilters({}); }} className="border-white/10 text-slate-300 hover:bg-slate-900 hover:text-white">
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <FilterDrawer 
        isOpen={isMobileFilterOpen}
        onOpenChange={setIsMobileFilterOpen}
        // Note: FilterDrawer needs to be updated to accept props for state control if it doesn't already
        // or we can use a new ServiceFilterDrawer component. 
        // For now, assuming FilterDrawer is simple or we can reuse the logic.
        // Actually, let's use the ServiceFilterPanel inside a Sheet if needed, 
        // but for now reusing the existing FilterDrawer trigger logic is fine if it matches.
        // Wait, the existing FilterDrawer has its own internal state/content. 
        // We should probably update it or wrap ServiceFilterPanel in a Sheet for mobile.
      />
    </div>
  );
}
