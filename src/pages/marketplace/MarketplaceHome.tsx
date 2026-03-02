import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, ArrowRight, ArrowUpRight } from 'lucide-react';
import { MARKETPLACE_CATEGORIES } from '@/data/marketplaceData';
import { IMAGES } from '@/data/mockData';
import { motion } from 'motion/react';
import { FilterDrawer } from '@/components/marketplace/FilterDrawer';

export default function MarketplaceHome() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/marketplace/category/all?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 font-sans">
      <FilterDrawer 
        isOpen={isFilterOpen} 
        onOpenChange={setIsFilterOpen}
      />

      {/* Hero Section - Luxury Card Style (Matching HomePage Structure) */}
      <div className="p-4 md:p-8 lg:p-12">
        <section className="relative h-[85vh] min-h-[600px] bg-slate-900 text-white overflow-hidden flex flex-col justify-center rounded-3xl shadow-2xl">
          {/* Background Image with Spotlight Effect */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://pub-a5745bb2a56d4cb0a6acea2e8f8fda37.r2.dev/ChatGPT%20Image%20Mar%201%2C%202026%2C%2011_07_10%20PM.webp" 
              alt="Mining Services Marketplace" 
              className="w-full h-full object-cover opacity-100"
            />
            {/* Vignette / Spotlight Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
          </div>
          
          <div className="container mx-auto px-4 relative z-20 flex flex-col items-center text-center max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6 leading-[1.1]">
                The Leading <span className="font-medium text-brand-orange">Mining Services</span> Marketplace
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-lg md:text-xl text-slate-200 mb-12 max-w-3xl mx-auto font-light tracking-wide leading-relaxed"
            >
              Connect with top mining service providers and discover a wide range of professional services for the mining and resources industry.
            </motion.p>

            {/* Search Module - "Shop Now" Pill Style */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="w-full max-w-2xl mx-auto relative group"
            >
              <form onSubmit={handleSearch} className="relative flex items-center bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-full p-2 shadow-2xl shadow-black/20 transition-transform hover:scale-[1.02]">
                <Search className="ml-4 h-5 w-5 text-slate-400 shrink-0" />
                <Input 
                  className="flex-1 border-none shadow-none focus-visible:ring-0 bg-transparent text-white placeholder:text-slate-400 h-12 text-lg" 
                  placeholder="Search MXE Marketplace by services, providers, projects or location" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button 
                  type="submit" 
                  size="icon"
                  className="h-12 w-12 rounded-full bg-brand-orange text-white hover:bg-brand-orange/90 transition-colors shrink-0 shadow-lg shadow-brand-orange/20"
                >
                  <ArrowRight className="h-5 w-5 -rotate-45" />
                </Button>
              </form>
              
              {/* Filter Trigger (Text Link below) */}
              <div className="mt-6 flex justify-center">
                 <button 
                   onClick={() => setIsFilterOpen(true)}
                   className="text-white/60 hover:text-white text-sm font-medium flex items-center gap-2 transition-colors uppercase tracking-widest"
                 >
                   <Filter className="h-3 w-3" /> Advanced Filters
                 </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Categories Grid */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MARKETPLACE_CATEGORIES.map((category) => (
            <div key={category.id} className="group relative flex flex-col rounded-[32px] bg-slate-900 border border-slate-800 p-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              {/* Image Area */}
              <div className="h-64 w-full overflow-hidden relative rounded-[24px]">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60" />
                
                {/* Badge Overlay */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border-none rounded-full px-3 py-1 font-normal tracking-wide">
                    Service Category
                  </Badge>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 px-2 pt-5 pb-2 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold text-white group-hover:text-brand-orange transition-colors">
                    {category.name}
                  </h3>
                </div>
                
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-6">
                  {category.description}
                </p>

                <div className="mt-auto flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-slate-500 text-xs uppercase tracking-wider font-medium">Available Now</span>
                    <span className="text-white font-semibold">View Providers</span>
                  </div>

                  <Button 
                    asChild
                    className="bg-yellow-500 hover:bg-yellow-400 text-black rounded-full pl-5 pr-1.5 h-12 flex items-center gap-3 transition-all group-hover:shadow-[0_0_20px_rgba(234,179,8,0.3)]"
                  >
                    <Link to={`/marketplace/category/${category.slug}`}>
                      <span className="font-bold text-base">Explore</span>
                      <div className="h-9 w-9 bg-black rounded-full flex items-center justify-center text-white">
                        <ArrowUpRight className="h-5 w-5" />
                      </div>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Area (Visual spacer to match dark theme feel before global footer) */}
      <div className="h-20 bg-slate-950" />
    </div>
  );
}
