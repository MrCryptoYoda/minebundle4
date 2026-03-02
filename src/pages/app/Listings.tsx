import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, MoreVertical, Share2, CheckCircle, Trash2, MapPin, Pickaxe, Banknote } from 'lucide-react';
import { Listing, MOCK_LISTINGS } from '@/data/mockData';
import { ProjectCard, ProjectCardProps } from '@/components/projects/ProjectCard';
import { ProjectRow } from '@/components/projects/ProjectRow';
import { ViewToggle } from '@/components/projects/ViewToggle';
import { EmptyState } from '@/components/listings/EmptyState';
import { SkeletonCards } from '@/components/listings/SkeletonCards';
import { ShareModal } from '@/components/listings/ShareModal';
import { ConfirmModal } from '@/components/listings/ConfirmModal';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function ListingsPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('live');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Local state for listings to handle updates
  const [listings, setListings] = useState<Listing[]>([]);
  const [drafts, setDrafts] = useState<Listing[]>([]);

  // Modals state
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{id: string, type: 'live' | 'draft'} | null>(null);
  
  const [convertModalOpen, setConvertModalOpen] = useState(false);
  const [itemToConvert, setItemToConvert] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      // Split mock data into live and drafts for demo purposes
      // In a real app, this would be filtered by status from API
      const allListings = [...MOCK_LISTINGS];
      
      // Create some mock drafts from the existing listings
      const mockDrafts = allListings.slice(0, 2).map(l => ({
        ...l,
        id: `draft_${l.id}`,
        title: `${l.title} (Draft)`,
        createdAt: new Date()
      }));

      setListings(allListings);
      setDrafts(mockDrafts);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleShare = (id: string) => {
    setSelectedListingId(id);
    setShareModalOpen(true);
  };

  const handleDeleteClick = (id: string, type: 'live' | 'draft') => {
    setItemToDelete({ id, type });
    setDeleteModalOpen(true);
  };

  const handleConvertClick = (id: string) => {
    setItemToConvert(id);
    setConvertModalOpen(true);
  };

  const confirmDelete = () => {
    if (!itemToDelete) return;

    if (itemToDelete.type === 'live') {
      setListings(prev => prev.filter(l => l.id !== itemToDelete.id));
    } else {
      setDrafts(prev => prev.filter(d => d.id !== itemToDelete.id));
    }
    
    setDeleteModalOpen(false);
    setItemToDelete(null);
    
    toast({
      title: "Listing deleted",
      description: "The listing has been permanently removed.",
    });
  };

  const confirmConvert = () => {
    if (!itemToConvert) return;

    const listingToConvert = listings.find(l => l.id === itemToConvert);
    if (listingToConvert) {
      // Save to localStorage for Sold Projects page to pick up
      const soldProject = {
        ...listingToConvert,
        soldDate: new Date()
      };
      
      const existingSold = JSON.parse(localStorage.getItem('convertedSoldProjects') || '[]');
      localStorage.setItem('convertedSoldProjects', JSON.stringify([...existingSold, soldProject]));
    }

    setListings(prev => prev.filter(l => l.id !== itemToConvert));
    setConvertModalOpen(false);
    setItemToConvert(null);

    toast({
      title: "Listing converted to Sold",
      description: "The listing has been moved to your Sold Projects.",
    });
  };

  const handleCompleteDraft = (id: string) => {
    // In a real app, we'd check the draft type and route accordingly
    // For demo, we'll just route to the offtake wizard
    navigate('/list/offtake/step/1');
  };

  const formatPrice = (price: Listing['price']) => {
    if (price.type === 'Contact for Price') return 'Contact';
    if (price.type === 'Auction') return 'Auction';
    if (price.amount === null) return 'POA';
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: price.currency,
      maximumFractionDigits: 0,
      notation: 'compact',
      compactDisplay: 'short'
    }).format(price.amount);
  };

  const renderListingCard = (listing: Listing) => {
    const metrics = [
      <div className="flex items-center gap-2" title={`${listing.location.region}, ${listing.location.country}`}>
        <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
        <span className="text-xs text-slate-500 truncate">{listing.location.region}</span>
      </div>,
      <div className="flex items-center gap-2">
        <Pickaxe className="h-4 w-4 text-slate-400 shrink-0" />
        <span className="text-xs text-slate-500 truncate">
          {listing.commodity[0]}
          {listing.commodity.length > 1 && ` +${listing.commodity.length - 1}`}
        </span>
      </div>,
      <div className="flex items-center gap-2">
        <Banknote className="h-4 w-4 text-slate-400 shrink-0" />
        <span className="text-xs text-slate-500 truncate font-medium">{formatPrice(listing.price)}</span>
      </div>
    ];

    const actions = (
      <div className="flex gap-2">
        <div className="h-9 w-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-700 shadow-sm border border-white/20">
           {listing.seller.avatar ? (
              <img src={listing.seller.avatar} alt={listing.seller.name} className="h-full w-full rounded-full object-cover" />
           ) : (
              <span className="text-xs font-bold text-brand-orange">{listing.seller.name.charAt(0)}</span>
           )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:bg-white hover:text-brand-orange shadow-sm border border-white/20">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 rounded-xl">
            <DropdownMenuItem onClick={() => handleShare(listing.id)} className="cursor-pointer">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleConvertClick(listing.id)} className="cursor-pointer">
              <CheckCircle className="mr-2 h-4 w-4" />
              Convert to Sold
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDeleteClick(listing.id, 'live')} className="cursor-pointer text-red-600 focus:text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );

    const badge = (
      <Badge className="bg-slate-900/60 backdrop-blur-md text-white hover:bg-slate-900/70 border-none px-3 py-1.5 rounded-lg font-medium text-xs tracking-wide">
        {listing.stage || listing.type}
      </Badge>
    );

    const subtitle = (
      <div className="flex items-center gap-1.5">
        <span className="text-brand-orange font-bold text-xs truncate">{listing.seller.name}</span>
        <CheckCircle className="h-3.5 w-3.5 text-brand-orange shrink-0" />
      </div>
    );

    const Component = (viewMode === 'grid' ? ProjectCard : ProjectRow) as React.ComponentType<ProjectCardProps>;

    return (
      <Component
        key={listing.id}
        title={listing.title}
        image={listing.image}
        link={`/listing/${listing.id}`}
        badge={badge}
        subtitle={subtitle}
        description={listing.summary}
        metrics={metrics}
        actions={actions}
      />
    );
  };

  const renderDraftCard = (draft: Listing) => {
    const metrics = [
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
        <span className="text-xs text-slate-500 truncate">{draft.location.region}</span>
      </div>,
      <div className="flex items-center gap-2">
        <Pickaxe className="h-4 w-4 text-slate-400 shrink-0" />
        <span className="text-xs text-slate-500 truncate">{draft.commodity[0]}</span>
      </div>
    ];

    const actions = (
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:bg-white hover:text-brand-orange shadow-sm border border-white/20">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 rounded-xl">
            <DropdownMenuItem onClick={() => handleCompleteDraft(draft.id)} className="cursor-pointer">
              <CheckCircle className="mr-2 h-4 w-4" />
              Complete Listing
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDeleteClick(draft.id, 'draft')} className="cursor-pointer text-red-600 focus:text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );

    const badge = (
      <Badge variant="secondary" className="bg-slate-100/80 backdrop-blur-md text-slate-600 hover:bg-slate-200 border-none px-3 py-1.5 rounded-lg font-medium text-xs tracking-wide">
        DRAFT
      </Badge>
    );

    const subtitle = (
      <div className="flex items-center gap-1.5">
        <span className="text-slate-500 font-medium text-xs">Last edited recently</span>
      </div>
    );

    const Component = (viewMode === 'grid' ? ProjectCard : ProjectRow) as React.ComponentType<ProjectCardProps>;

    return (
      <Component
        key={draft.id}
        title={draft.title}
        image={draft.image}
        link={`/list/offtake/step/1`} // Redirect to edit
        badge={badge}
        subtitle={subtitle}
        description="This listing is incomplete. Finish adding details to publish it to the marketplace."
        metrics={metrics}
        actions={actions}
      />
    );
  };

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Listings</h1>
          <p className="text-slate-400 mt-1">Manage your live listings and drafts.</p>
        </div>
        <div className="flex items-center gap-3">
          <ViewToggle viewMode={viewMode} onChange={setViewMode} />
          <Button asChild className="bg-brand-orange hover:bg-brand-orange/90 shadow-sm text-white">
            <Link to="/list">
              <Plus className="mr-2 h-4 w-4" />
              List New Project
            </Link>
          </Button>
        </div>
      </div>

      {/* Tabs & Content */}
      <Tabs defaultValue="live" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-[#1C1C24] border border-slate-800 p-1 h-12 w-full sm:w-auto justify-start rounded-xl">
          <TabsTrigger 
            value="live" 
            className="rounded-lg px-6 h-10 text-slate-400 data-[state=active]:bg-[#2D2D2D] data-[state=active]:text-white data-[state=active]:shadow-none hover:text-white transition-colors"
          >
            Live Projects <span className="ml-2 bg-slate-700 text-slate-300 py-0.5 px-2 rounded-full text-xs font-medium">{listings.length}</span>
          </TabsTrigger>
          <TabsTrigger 
            value="drafts" 
            className="rounded-lg px-6 h-10 text-slate-400 data-[state=active]:bg-[#2D2D2D] data-[state=active]:text-white data-[state=active]:shadow-none hover:text-white transition-colors"
          >
            Saved Drafts <span className="ml-2 bg-slate-700 text-slate-300 py-0.5 px-2 rounded-full text-xs font-medium">{drafts.length}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-6 focus-visible:outline-none">
          {isLoading ? (
            <SkeletonCards />
          ) : listings.length > 0 ? (
            <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
              {listings.map(renderListingCard)}
            </div>
          ) : (
            <EmptyState 
              title="No live projects yet"
              description="Publish a listing to start receiving enquiries from potential buyers."
              ctaText="List New Project"
              ctaLink="/list"
              secondaryText="Learn how listing works"
              secondaryLink="/how-it-works"
            />
          )}
        </TabsContent>

        <TabsContent value="drafts" className="space-y-6 focus-visible:outline-none">
          {isLoading ? (
            <SkeletonCards />
          ) : drafts.length > 0 ? (
            <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
              {drafts.map(renderDraftCard)}
            </div>
          ) : (
            <EmptyState 
              title="No saved drafts"
              description="Start a listing and save it anytime to finish later."
              ctaText="List New Project"
              ctaLink="/list"
            />
          )}
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <ShareModal 
        isOpen={shareModalOpen} 
        onClose={() => setShareModalOpen(false)} 
        listingId={selectedListingId || ''} 
      />

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete listing?"
        description="This action cannot be undone. This will permanently delete the listing and remove it from our servers."
        confirmText="Delete"
        variant="destructive"
      />

      <ConfirmModal
        isOpen={convertModalOpen}
        onClose={() => setConvertModalOpen(false)}
        onConfirm={confirmConvert}
        title="Convert to Sold?"
        description="This will move the listing to your Sold Projects section. It will no longer be visible in search results."
        confirmText="Convert"
      />
    </div>
  );
}
