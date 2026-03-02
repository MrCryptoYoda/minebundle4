import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, ArrowRight, ShieldCheck, Globe, Zap, Filter, Loader2 } from 'lucide-react';
import { MOCK_LISTINGS } from '@/data/mockData';
import { motion } from 'motion/react';
import { ListingCard } from '@/components/listing/ListingCard';
import { FilterDrawer } from '@/components/search/FilterDrawer';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { AgentsCarousel } from '@/components/home/AgentsCarousel';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const visibleCount = isExpanded ? 12 : 8;
  const featuredListings = MOCK_LISTINGS.filter(l => l.isFeatured).slice(0, visibleCount);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleSeeMore = () => {
    if (isExpanded) {
      navigate('/search');
    } else {
      setIsExpanded(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <FilterDrawer 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        onApply={(filters) => {
          console.log('Filters applied:', filters);
          navigate('/search');
        }} 
      />

      {/* Hero Section - Luxury Card Style */}
      <div className="p-4 md:p-8 lg:p-12 bg-white">
        <section className="relative h-[85vh] min-h-[600px] bg-slate-950 text-white overflow-hidden flex flex-col justify-center rounded-3xl shadow-2xl">
          {/* Background Image with Spotlight Effect */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://pub-a5745bb2a56d4cb0a6acea2e8f8fda37.r2.dev/ChatGPT%20Image%20Mar%201%2C%202026%2C%2011_07_10%20PM.webp" 
              alt="Background" 
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-12 leading-[1.1]">
                The world's leading platform for <br className="hidden md:block" />
                <span className="font-medium text-brand-orange">mining asset</span> transactions
              </h1>
            </motion.div>

            {/* Search Module - "Shop Now" Pill Style */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="w-full max-w-2xl mx-auto relative group flex flex-col items-center"
            >
              <form onSubmit={handleSearch} className="w-full relative">
                <div className="relative flex items-center bg-white shadow-2xl shadow-brand-orange/10 w-full overflow-hidden h-16 rounded-full">
                  <Search className="ml-6 h-5 w-5 text-slate-400 shrink-0" />
                  <Input 
                    className="flex-1 border-none shadow-none focus-visible:ring-0 bg-transparent text-slate-900 placeholder:text-slate-400 h-full text-lg px-4" 
                    placeholder="Search 'Gold in Australia'..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="pr-2">
                    <Button 
                      type="submit" 
                      size="icon"
                      className="h-12 w-12 rounded-full bg-slate-950 text-white hover:bg-brand-orange hover:text-white transition-colors shrink-0"
                    >
                      <ArrowRight className="h-5 w-5 -rotate-45" />
                    </Button>
                  </div>
                </div>
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

      {/* Trust & Value Props - Redesigned */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-4xl mx-auto mb-16 text-center md:text-left">
            <div className="text-brand-orange font-semibold text-sm tracking-wider uppercase mb-3">
              Why Choose MXE
            </div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-slate-900 mb-6 leading-[1.1]">
              The world's largest database of transactable mining assets. <span className="text-slate-400">We connect buyers, sellers, and agents through a secure, verified marketplace.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
            {/* Left Panel - Feature Showcase (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
               <div className="bg-slate-50 rounded-3xl p-2 border border-slate-100 h-full flex flex-col">
                  {/* Image Area */}
                  <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-2xl mb-2">
                    <img 
                      src="https://pub-a5745bb2a56d4cb0a6acea2e8f8fda37.r2.dev/ChatGPT%20Image%20Mar%201%2C%202026%2C%2011_07_10%20PM.webp" 
                      alt="Mining Operations" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  
                  {/* Features Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 flex-1">
                    <div className="bg-white rounded-xl p-6 border border-slate-100 flex flex-col justify-between group hover:shadow-md transition-all">
                       <div className="h-10 w-10 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange mb-4 group-hover:scale-110 transition-transform">
                          <Globe className="h-5 w-5" />
                       </div>
                       <div>
                         <h3 className="font-semibold text-slate-900 mb-2">Global Marketplace</h3>
                         <p className="text-sm text-slate-500 leading-relaxed">Access qualified investors and projects across 50+ jurisdictions.</p>
                       </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-slate-100 flex flex-col justify-between group hover:shadow-md transition-all">
                       <div className="h-10 w-10 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange mb-4 group-hover:scale-110 transition-transform">
                          <ShieldCheck className="h-5 w-5" />
                       </div>
                       <div>
                         <h3 className="font-semibold text-slate-900 mb-2">Verified & Secure</h3>
                         <p className="text-sm text-slate-500 leading-relaxed">Bank-grade security with integrated NDA gating and verified profiles.</p>
                       </div>
                    </div>
                  </div>
               </div>
            </div>

            {/* Right Panel - Grid Stats (5 cols) */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
               {/* Card 1 */}
               <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-brand-orange/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between min-h-[200px] group relative overflow-hidden">
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="h-5 w-5 -rotate-45 text-brand-orange" />
                  </div>
                  <div className="h-12 w-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 mb-4 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-1">AI Matching</h3>
                    <p className="text-sm text-slate-500">Smart deal flow algorithms</p>
                  </div>
               </div>

               {/* Card 2 */}
               <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-brand-orange/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between min-h-[200px] group relative overflow-hidden">
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="h-5 w-5 -rotate-45 text-brand-orange" />
                  </div>
                  <div className="h-12 w-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 mb-4 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-1">Secure NDA</h3>
                    <p className="text-sm text-slate-500">Integrated access control</p>
                  </div>
               </div>

               {/* Card 3 */}
               <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-brand-orange/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between min-h-[200px] group relative overflow-hidden">
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="h-5 w-5 -rotate-45 text-brand-orange" />
                  </div>
                  <div className="h-12 w-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 mb-4 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                    <Globe className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-1">Direct Comms</h3>
                    <p className="text-sm text-slate-500">Connect with sellers directly</p>
                  </div>
               </div>

               {/* Card 4 */}
               <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-brand-orange/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between min-h-[200px] group relative overflow-hidden">
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="h-5 w-5 -rotate-45 text-brand-orange" />
                  </div>
                  <div className="h-12 w-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 mb-4 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                    <Filter className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-1">Curated</h3>
                    <p className="text-sm text-slate-500">High-quality opportunities</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Highlight Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">The Minexchange exclusive partners</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* NORA Card */}
            <Link to="/partners/nora" className="group block">
              <Card className="h-full border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden bg-white p-6 md:p-8 rounded-2xl">
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">NORA</h3>
                    <p className="text-slate-500 mb-4 leading-relaxed">Unlocking the Future of Mineral Extraction from Mining Waste through Next-Generation Nanotechnologies</p>
                    <div className="flex items-center text-brand-orange font-semibold group-hover:translate-x-1 transition-transform">
                      Learn more <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                  <div className="mt-auto bg-blue-50 rounded-xl h-48 flex items-center justify-center relative overflow-hidden p-8">
                     <img 
                       src="https://pub-a5745bb2a56d4cb0a6acea2e8f8fda37.r2.dev/Nore%20Logo.png" 
                       alt="NORA Future Technologies" 
                       className="w-auto h-16 object-contain"
                     />
                  </div>
                </div>
              </Card>
            </Link>

            {/* REEToken Card */}
            <Link to="/partners/reetoken" className="group block">
              <Card className="h-full border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden bg-white p-6 md:p-8 rounded-2xl">
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">REEToken</h3>
                    <p className="text-slate-500 mb-4 leading-relaxed">REEToken is a Luxembourg-based company that provides regulated tokenization infrastructure.</p>
                    <div className="flex items-center text-brand-orange font-semibold group-hover:translate-x-1 transition-transform">
                      Learn more <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                  <div className="mt-auto bg-slate-950 rounded-xl h-48 flex items-center justify-center relative overflow-hidden p-8">
                     <img 
                       src="https://pub-a5745bb2a56d4cb0a6acea2e8f8fda37.r2.dev/REELogo.png" 
                       alt="REEToken" 
                       className="w-auto h-16 object-contain"
                     />
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>





      {/* Featured Projects */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-brand-orange font-semibold text-sm tracking-wider uppercase mb-2">This Week's</div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Featured Projects</h2>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-[420px] rounded-xl bg-slate-100 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredListings.map(listing => (
                <ListingCard key={listing.id} listing={listing} showSaveIcon={true} />
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center">
            <Button 
              variant="outline" 
              onClick={handleSeeMore}
              className="min-w-[200px] border-slate-200 hover:border-brand-orange hover:text-brand-orange transition-colors"
            >
              {isExpanded ? 'See all projects' : 'See more'}
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Our Agents Carousel */}
      <AgentsCarousel />
    </div>
  );
}
