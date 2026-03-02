import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, Plus, MapPin, Pickaxe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MessagesEmptyStateProps {
  type: 'received' | 'sent';
}

export function MessagesEmptyState({ type }: MessagesEmptyStateProps) {
  const navigate = useNavigate();

  if (type === 'received') {
    return (
      <Card className="flex flex-col items-center justify-center py-16 px-4 text-center border-dashed border-slate-800 bg-[#1C1C24]">
        <div className="bg-[#13131A] p-4 rounded-full shadow-sm mb-4">
          <Pickaxe className="h-8 w-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">
          You haven't received any project enquiries yet
        </h3>
        <p className="text-slate-400 max-w-md mb-8">
          Communicate with sellers and potential buyers directly and securely on Minexchange.
          List a project to get started.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={() => navigate('/list')} className="gap-2 bg-brand-orange hover:bg-brand-orange/90 text-white border-none">
            <Plus className="h-4 w-4" />
            List Your Project
          </Button>
          <Button variant="outline" onClick={() => navigate('/search')} className="gap-2 bg-[#13131A] border-slate-800 text-slate-300 hover:bg-white/5 hover:text-white">
            <Search className="h-4 w-4" />
            Search Projects
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col items-center justify-center py-16 px-4 text-center border-dashed border-slate-800 bg-[#1C1C24]">
      <div className="bg-[#13131A] p-4 rounded-full shadow-sm mb-4">
        <Search className="h-8 w-8 text-slate-400" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">
        You haven't sent any enquiries yet
      </h3>
      <p className="text-slate-400 max-w-md mb-8">
        Find projects and contact agents for more information.
        Start by searching for assets or browsing locations.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={() => navigate('/search')} className="gap-2 bg-brand-orange hover:bg-brand-orange/90 text-white border-none">
          <Search className="h-4 w-4" />
          Search Projects
        </Button>
        <Button variant="outline" onClick={() => navigate('/search')} className="gap-2 bg-[#13131A] border-slate-800 text-slate-300 hover:bg-white/5 hover:text-white">
          <MapPin className="h-4 w-4" />
          View All Locations
        </Button>
      </div>
    </Card>
  );
}
