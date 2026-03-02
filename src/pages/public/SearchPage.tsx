import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Map as MapIcon, List, LayoutGrid } from 'lucide-react';
import { MOCK_LISTINGS } from '@/data/mockData';
import { ListingCard } from '@/components/listing/ListingCard';
import { SearchHeader } from '@/components/search/SearchHeader';
import { MapView } from '@/components/search/MapView';
import { SaveSearchModal } from '@/components/search/SaveSearchModal';
import { FilterDrawer } from '@/components/search/FilterDrawer';
import { FilterPanel } from '@/components/search/FilterPanel';
import { cn } from '@/lib/utils';
import { interpretSearchQuery } from '@/services/geminiService';
import { COMMODITY_TAXONOMY } from '@/data/commodityTaxonomy';
import { LOCATION_TAXONOMY } from '@/data/locationTaxonomy';
import { AISummaryPanel } from '@/components/search/AISummaryPanel';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State from URL or defaults
  const [query, setQuery] = useState(searchParams.get('q') || '');
  // View mode: 'grid' | 'list' | 'map'
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>((searchParams.get('view') as 'grid' | 'list' | 'map') || 'grid');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'Relevance');
  
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>(() => {
    const filters: Record<string, any> = {};
    const arrayKeys = ['commodity', 'location', 'stage', 'sector', 'region'];
    
    searchParams.forEach((value, key) => {
      if (['q', 'view', 'sort'].includes(key)) return;
      
      if (arrayKeys.includes(key) || value.includes(',')) {
        filters[key] = value.split(',').map(v => v.trim());
      } else {
        filters[key] = value;
      }
    });
    return filters;
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (viewMode !== 'grid') params.set('view', viewMode);
    if (sortBy !== 'Relevance') params.set('sort', sortBy);
    
    // Add active filters to params (simplified for demo)
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        params.set(key, value.join(','));
      } else if (value) {
        params.set(key, String(value));
      }
    });

    setSearchParams(params, { replace: true });
  }, [query, viewMode, sortBy, activeFilters, setSearchParams]);

  // AI Query Interpretation & Filtering
  useEffect(() => {
    const fetchFilters = async () => {
      setIsLoading(true);
      
      // If query looks like natural language (e.g., "gold mines in chile"), try to interpret it
      if (query && query.split(' ').length > 2) {
        try {
          const interpreted = await interpretSearchQuery(query);
          if (Object.keys(interpreted).length > 0) {
            setActiveFilters(prev => ({ ...prev, ...interpreted }));
          }
        } catch (e) {
          console.error("AI interpretation failed", e);
        }
      }

      // Simulate network delay for realism
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    };

    const timer = setTimeout(fetchFilters, 500); // Debounce
    return () => clearTimeout(timer);
  }, [query]); // Only re-run when query changes

  const handleSearch = () => {
    // Triggered by search button, handled by effect
  };

  const handleFilterChange = (key: string, value: any) => {
    setActiveFilters(prev => {
      const next = { ...prev };
      if (value === undefined || (Array.isArray(value) && value.length === 0)) {
        delete next[key];
      } else {
        next[key] = value;
      }
      return next;
    });
  };

  const filteredListings = MOCK_LISTINGS.filter(l => {
    // Basic text match
    const matchesQuery = !query || 
      l.title.toLowerCase().includes(query.toLowerCase()) ||
      l.commodity.some(c => c.toLowerCase().includes(query.toLowerCase())) ||
      l.location.country.toLowerCase().includes(query.toLowerCase());
    
    // Filter logic
    const matchesFilters = Object.entries(activeFilters).every(([key, value]) => {
      if (!value) return true;
      
      if (key === 'commodity' && Array.isArray(value)) {
        // Resolve IDs to Names using Taxonomy to handle cases like 'iron-ore' vs 'Iron Ore'
        const taxonomyCommodities = COMMODITY_TAXONOMY.flatMap(s => s.commodities);
        const targetNames = value.flatMap(v => {
            const match = taxonomyCommodities.find(c => c.id === v || c.name.toLowerCase() === v.toLowerCase());
            return match ? [match.name.toLowerCase()] : [v.toLowerCase()];
        });
        
        return l.commodity.some(c => targetNames.includes(c.toLowerCase()));
      }
      
      if (key === 'sector' && Array.isArray(value)) {
        const allowedCommodities = COMMODITY_TAXONOMY
           .filter(s => value.includes(s.id))
           .flatMap(s => s.commodities.map(c => c.id));
        return l.commodity.some(c => allowedCommodities.includes(c.toLowerCase()));
      }

      if (key === 'location' && Array.isArray(value)) {
        // value is array of Country Names
        return value.some(v => l.location.country.toLowerCase() === v.toLowerCase() || l.location.region.toLowerCase() === v.toLowerCase());
      }

      if (key === 'region' && Array.isArray(value)) {
        const allowedCountries = LOCATION_TAXONOMY
           .filter(r => value.includes(r.id))
           .flatMap(r => r.countries.map(c => c.name));
        return allowedCountries.some(c => c.toLowerCase() === l.location.country.toLowerCase());
      }

      if (key === 'stage' && Array.isArray(value)) {
        return value.includes(l.stage);
      }
      return true;
    });
    
    return matchesQuery && matchesFilters;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col h-screen overflow-hidden">
      <div className="shrink-0">
        <SearchHeader
            query={query}
            onQueryChange={setQuery}
            onSearch={handleSearch}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onSaveSearch={() => setIsSaveModalOpen(true)}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onMobileFilterOpen={() => setIsMobileFilterOpen(true)}
        />
      </div>

      <div className="flex-1 overflow-hidden flex relative">
          {/* Filter Panel Sidebar - Visible in Grid/List */}
          {(viewMode === 'grid' || viewMode === 'list') && (
            <div className="hidden lg:block w-[280px] xl:w-[320px] h-full border-r border-slate-200 bg-white overflow-hidden shrink-0">
               <FilterPanel 
                  activeFilters={activeFilters} 
                  onFilterChange={handleFilterChange}
                  onReset={() => setActiveFilters({})}
                  className="h-full max-h-none border-none shadow-none rounded-none sticky top-0"
               />
            </div>
          )}

          {/* Main Content Area */}
          <div className="flex-1 flex h-full overflow-hidden relative">
              {/* Results List */}
              <div className={cn(
                "flex-1 h-full overflow-y-auto p-6 transition-all duration-300",
                viewMode === 'map' ? "w-full lg:w-[55%]" : "w-full"
              )}>


                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Active Advertisements</h2>
                    <p className="text-slate-500 text-sm mt-1">
                      {isLoading ? 'Searching...' : `Showing ${filteredListings.length} properties matching your criteria`}
                    </p>
                  </div>
                </div>

                {/* AI Summary Panel */}
                {!isLoading && filteredListings.length > 0 && (
                  <div className="mb-8">
                    <AISummaryPanel 
                      query={query || "Mining Assets"} 
                      resultCount={filteredListings.length} 
                      type="assets"
                    />
                  </div>
                )}

                {/* Filter Pills (Design Reference) */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                    <Button variant="default" size="sm" className="rounded-full px-6 bg-slate-900 text-white hover:bg-slate-800">All</Button>
                    <Button variant="outline" size="sm" className="rounded-full px-6 border-slate-200 text-slate-600">Sale {filteredListings.length}</Button>
                </div>

                {isLoading ? (
                  <div className={cn(
                    "grid gap-6",
                    viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : 
                    viewMode === 'map' ? "grid-cols-1 xl:grid-cols-2" : "grid-cols-1"
                  )}>
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={cn("bg-white rounded-3xl border border-slate-100 animate-pulse", viewMode === 'list' ? "h-[200px]" : "h-[320px]")} />
                    ))}
                  </div>
                ) : filteredListings.length > 0 ? (
                  <div className={cn(
                    "grid gap-6",
                    viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : 
                    viewMode === 'map' ? "grid-cols-1 xl:grid-cols-2" : "grid-cols-1"
                  )}>
                    {filteredListings.map((listing) => (
                      <ListingCard 
                        key={listing.id} 
                        listing={listing} 
                        className={cn("hover:shadow-lg transition-shadow duration-300", viewMode === 'list' ? "flex flex-row h-auto" : "h-full")}
                        showSaveIcon={true}
                        matchReason={query ? `Matches "${query}"` : undefined}
                        viewMode={viewMode === 'list' ? 'list' : 'grid'}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 border-dashed">
                    <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">No results found</h3>
                    <p className="text-slate-500 max-w-md mx-auto mb-6">
                      We couldn't find any assets matching your criteria. Try adjusting your filters or search term.
                    </p>
                    <Button variant="outline" onClick={() => { setQuery(''); setActiveFilters({}); }}>
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </div>

              {/* Map Column - Visible in Map View */}
              {viewMode === 'map' && (
                <div className="hidden lg:block w-[45%] h-full border-l border-slate-200 relative">
                   <MapView listings={filteredListings} className="h-full w-full border-none shadow-none" />
                </div>
              )}
          </div>
      </div>

      <SaveSearchModal 
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        query={query}
        filters={activeFilters}
      />

      <FilterDrawer 
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        onApply={(filters) => {
          setActiveFilters(prev => ({ ...prev, ...filters }));
          setIsMobileFilterOpen(false);
        }}
      />
    </div>
  );
}
