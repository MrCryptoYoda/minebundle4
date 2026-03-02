import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, Bookmark, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface SavedSearchEmptyStateProps {
  onSaveSuggestion: (name: string, query: string) => void;
}

export function SavedSearchEmptyState({ onSaveSuggestion }: SavedSearchEmptyStateProps) {
  const navigate = useNavigate();
  const { toast } = useToast();

  const suggestions = [
    { name: 'Gold Mine', query: 'Gold Mine' },
    { name: 'Copper Mine', query: 'Copper Mine' },
    { name: 'Lithium Mine', query: 'Lithium Mine' },
  ];

  const handleSuggestionClick = (suggestion: { name: string; query: string }) => {
    // Option 1: Navigate to search with query
    // navigate(`/search?q=${encodeURIComponent(suggestion.query)}`);
    
    // Option 2 (Mock): Instantly create saved search
    onSaveSuggestion(suggestion.name, suggestion.query);
    toast({
      title: "Search saved",
      description: `"${suggestion.name}" has been added to your saved searches.`,
    });
  };

  return (
    <Card className="flex flex-col items-center justify-center py-16 px-4 text-center border-dashed border-slate-800 bg-[#1C1C24]">
      <div className="bg-[#13131A] p-4 rounded-full shadow-sm mb-4">
        <Bookmark className="h-8 w-8 text-slate-400" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">
        Save your first search
      </h3>
      <p className="text-slate-400 max-w-md mb-8">
        Save frequently used asset searches and optionally receive email alerts for new matches.
      </p>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {suggestions.map((suggestion) => (
          <Button
            key={suggestion.name}
            variant="outline"
            className="gap-2 bg-[#13131A] hover:bg-white/5 border-slate-800 text-slate-300 hover:text-white"
            onClick={() => handleSuggestionClick(suggestion)}
          >
            <Bookmark className="h-3.5 w-3.5 text-slate-500" />
            {suggestion.name}
          </Button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={() => navigate('/search')} className="gap-2 bg-brand-orange hover:bg-brand-orange/90 text-white border-none">
          <Search className="h-4 w-4" />
          Search Projects
        </Button>
        <Button variant="outline" onClick={() => navigate('/search')} className="gap-2 bg-[#13131A] border-slate-800 text-slate-300 hover:bg-white/5 hover:text-white">
          <MapPin className="h-4 w-4" />
          View All Commodities
        </Button>
      </div>
    </Card>
  );
}
