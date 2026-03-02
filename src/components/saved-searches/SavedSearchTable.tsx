import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { SavedSearch } from '@/data/mockSavedSearches';
import { ExternalLink, Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SavedSearchTableProps {
  savedSearches: SavedSearch[];
  onToggleEmail: (id: string, enabled: boolean) => void;
  onEdit: (search: SavedSearch) => void;
  onDelete: (search: SavedSearch) => void;
}

export function SavedSearchTable({ savedSearches, onToggleEmail, onEdit, onDelete }: SavedSearchTableProps) {
  const navigate = useNavigate();

  const handleShowResults = (search: SavedSearch) => {
    // Construct query params based on search filters
    const params = new URLSearchParams();
    if (search.query) params.append('q', search.query);
    Object.entries(search.filters).forEach(([key, value]) => {
      params.append(key, String(value));
    });
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="rounded-md border border-slate-800 bg-[#1C1C24] shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-[#13131A] sticky top-0 z-10">
          <TableRow className="border-slate-800 hover:bg-[#13131A]">
            <TableHead className="w-[300px] font-semibold text-slate-400">Search Name</TableHead>
            <TableHead className="w-[150px] font-semibold text-slate-400">Email Alert</TableHead>
            <TableHead className="w-[120px] font-semibold text-slate-400">Actions</TableHead>
            <TableHead className="w-[150px] text-right font-semibold text-slate-400">Results</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {savedSearches.map((search) => (
            <TableRow key={search.id} className="hover:bg-white/5 transition-colors border-slate-800">
              <TableCell className="font-medium text-slate-300">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="truncate block max-w-[280px] cursor-help border-b border-dotted border-slate-700 w-fit">
                        {search.name}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#1C1C24] border-slate-800 text-slate-300">
                      <p className="text-xs">{search.query}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>
                <Switch
                  checked={search.emailAlerts}
                  onCheckedChange={(checked) => onToggleEmail(search.id, checked)}
                  aria-label={`Toggle email alerts for ${search.name}`}
                  className="data-[state=unchecked]:bg-slate-700"
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-500 hover:text-white hover:bg-white/10"
                    onClick={() => onEdit(search)}
                    aria-label={`Edit ${search.name}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-500 hover:text-red-400 hover:bg-red-500/10"
                    onClick={() => onDelete(search)}
                    aria-label={`Delete ${search.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="link"
                  className="h-auto p-0 text-brand-orange hover:text-brand-orange/80 gap-1 font-medium"
                  onClick={() => handleShowResults(search)}
                >
                  Show Results
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
