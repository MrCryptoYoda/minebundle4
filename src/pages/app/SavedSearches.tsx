import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { SavedSearchTable } from '@/components/saved-searches/SavedSearchTable';
import { SavedSearchEmptyState } from '@/components/saved-searches/SavedSearchEmptyState';
import { EditSavedSearchModal } from '@/components/saved-searches/EditSavedSearchModal';
import { DeleteSavedSearchModal } from '@/components/saved-searches/DeleteSavedSearchModal';
import { mockSavedSearches, mockGlobalNotificationSettings, SavedSearch } from '@/data/mockSavedSearches';
import { useToast } from '@/components/ui/use-toast';
import { SkeletonTable } from '@/components/messages/SkeletonTable'; // Reusing skeleton table
import { Link } from 'react-router-dom';

export default function SavedSearchesPage() {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingSearch, setEditingSearch] = useState<SavedSearch | null>(null);
  const [deletingSearch, setDeletingSearch] = useState<SavedSearch | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setSavedSearches(mockSavedSearches);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleEmail = (id: string, enabled: boolean) => {
    setSavedSearches(prev => prev.map(s => s.id === id ? { ...s, emailAlerts: enabled } : s));
    
    if (enabled && !mockGlobalNotificationSettings.savedSearchesEnabled) {
      toast({
        title: "Email alerts enabled for this search",
        description: "Note: Global saved search notifications are currently disabled in your settings.",
        variant: "warning",
      });
    } else {
      toast({
        title: enabled ? "Email alerts enabled" : "Email alerts disabled",
        description: `You will ${enabled ? 'now' : 'no longer'} receive alerts for this search.`,
      });
    }
  };

  const handleSaveEdit = (id: string, name: string, emailAlerts: boolean) => {
    setSavedSearches(prev => prev.map(s => s.id === id ? { ...s, name, emailAlerts } : s));
    toast({
      title: "Saved search updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleDelete = (id: string) => {
    setSavedSearches(prev => prev.filter(s => s.id !== id));
    toast({
      title: "Saved search deleted",
      description: "The saved search has been removed.",
    });
  };

  const handleCreateSuggestion = (name: string, query: string) => {
    const newSearch: SavedSearch = {
      id: `ss-${Date.now()}`,
      name,
      query,
      filters: {},
      emailAlerts: true,
      lastRun: new Date().toISOString(),
      resultsCount: 0,
    };
    setSavedSearches(prev => [newSearch, ...prev]);
  };

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Saved Searches</h1>
          <p className="text-slate-400">Save searches and receive alerts when new listings match your criteria.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="gap-2 bg-transparent border-slate-700 text-white hover:bg-white/10 hover:text-white" asChild>
             <Link to="/search">
               <Plus className="h-4 w-4" />
               New Saved Search
             </Link>
           </Button>
        </div>
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {isLoading ? (
          <SkeletonTable />
        ) : savedSearches.length > 0 ? (
          <>
            <SavedSearchTable
              savedSearches={savedSearches}
              onToggleEmail={handleToggleEmail}
              onEdit={setEditingSearch}
              onDelete={setDeletingSearch}
            />
            {!mockGlobalNotificationSettings.savedSearchesEnabled && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-100 rounded-md text-sm text-yellow-800">
                Global saved search notifications are disabled. <Link to="/app/notifications" className="underline font-medium hover:text-yellow-900">Enable them in Notifications settings</Link> to receive email alerts.
              </div>
            )}
          </>
        ) : (
          <SavedSearchEmptyState onSaveSuggestion={handleCreateSuggestion} />
        )}
      </div>

      {/* Modals */}
      <EditSavedSearchModal
        savedSearch={editingSearch}
        isOpen={!!editingSearch}
        onClose={() => setEditingSearch(null)}
        onSave={handleSaveEdit}
      />
      
      <DeleteSavedSearchModal
        savedSearch={deletingSearch}
        isOpen={!!deletingSearch}
        onClose={() => setDeletingSearch(null)}
        onConfirm={() => deletingSearch && handleDelete(deletingSearch.id)}
      />
    </div>
  );
}
