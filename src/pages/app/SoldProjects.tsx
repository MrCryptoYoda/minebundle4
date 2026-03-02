import React, { useState, useEffect } from 'react';
import { SoldProject, MOCK_SOLD_PROJECTS } from '@/data/mockSoldProjects';
import { ProjectCard, ProjectCardProps } from '@/components/projects/ProjectCard';
import { ProjectRow } from '@/components/projects/ProjectRow';
import { ViewToggle } from '@/components/projects/ViewToggle';
import { EmptyState } from '@/components/sold-projects/EmptyState';
import { SkeletonCards } from '@/components/sold-projects/SkeletonCards';
import { ConfirmModal } from '@/components/listings/ConfirmModal';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { AlertCircle, MoreVertical, Share2, Trash2, MapPin, Pickaxe, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';

export default function SoldProjectsPage() {
  const [projects, setProjects] = useState<SoldProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { toast } = useToast();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      try {
        // Load from mock data
        let allProjects = [...MOCK_SOLD_PROJECTS];
        
        // Load from localStorage (simulating persistence from Listings page)
        const storedSold = localStorage.getItem('convertedSoldProjects');
        if (storedSold) {
          const parsed = JSON.parse(storedSold);
          // Merge, avoiding duplicates if any
          const existingIds = new Set(allProjects.map(p => p.id));
          const newProjects = parsed.filter((p: any) => !existingIds.has(p.id));
          allProjects = [...newProjects, ...allProjects];
        }

        setProjects(allProjects);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to load sold projects", err);
        setError(true);
        setIsLoading(false);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (!itemToDelete) return;

    setProjects(prev => prev.filter(p => p.id !== itemToDelete));
    
    // Update localStorage if needed
    const storedSold = localStorage.getItem('convertedSoldProjects');
    if (storedSold) {
      const parsed = JSON.parse(storedSold);
      const updated = parsed.filter((p: any) => p.id !== itemToDelete);
      localStorage.setItem('convertedSoldProjects', JSON.stringify(updated));
    }

    setDeleteModalOpen(false);
    setItemToDelete(null);
    
    toast({
      title: "Sold project deleted",
      description: "The project has been removed from your sold archive.",
    });
  };

  const handleShare = (id: string) => {
    toast({
      title: "Link copied",
      description: "Project link copied to clipboard.",
    });
  };

  const renderSoldProject = (project: SoldProject) => {
    const metrics = [
      <div className="flex items-center gap-2" title={`${project.location.region}, ${project.location.country}`}>
        <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
        <span className="text-xs text-slate-500 truncate">{project.location.region}</span>
      </div>,
      <div className="flex items-center gap-2">
        <Pickaxe className="h-4 w-4 text-slate-400 shrink-0" />
        <span className="text-xs text-slate-500 truncate">
          {project.commodity.join(', ')}
        </span>
      </div>,
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
        <span className="text-xs text-slate-500 truncate font-medium">
          {format(new Date(project.soldDate), 'MMM d, yyyy')}
        </span>
      </div>
    ];

    const actions = (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:bg-white hover:text-brand-orange shadow-sm border border-white/20">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 rounded-xl">
          <DropdownMenuItem onClick={() => handleShare(project.id)}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleDeleteClick(project.id)}
            className="text-red-600 focus:text-red-600 focus:bg-red-50"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const badge = (
      <div className="flex flex-col gap-2 items-start">
        <Badge className="bg-slate-900/90 backdrop-blur-md text-white font-medium shadow-sm border border-white/20 px-3 py-1.5 text-xs tracking-wide rounded-lg hover:bg-slate-800">
          SOLD
        </Badge>
        {project.stage && (
          <Badge className="bg-slate-900/60 backdrop-blur-md text-white hover:bg-slate-900/70 border-none px-3 py-1.5 rounded-lg font-medium text-xs tracking-wide">
            {project.stage}
          </Badge>
        )}
      </div>
    );

    const subtitle = null;

    const Component = (viewMode === 'grid' ? ProjectCard : ProjectRow) as React.ComponentType<ProjectCardProps>;

    return (
      <Component
        key={project.id}
        title={project.title}
        image={project.image}
        link={`/listing/${project.id}`}
        badge={badge}
        subtitle={subtitle}
        description={project.summary}
        metrics={metrics}
        actions={actions}
        className={viewMode === 'grid' ? "grayscale-[0.2]" : ""}
      />
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6 p-6 max-w-7xl mx-auto">
        <div className="flex flex-col gap-2">
          <div className="h-8 w-48 bg-slate-800 rounded animate-pulse" />
          <div className="h-4 w-64 bg-slate-800 rounded animate-pulse" />
        </div>
        <SkeletonCards />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
        <AlertCircle className="h-10 w-10 text-red-500" />
        <p className="text-slate-400">Couldn't load sold projects.</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto pb-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-white">Sold Projects</h1>
          <p className="text-slate-400">Projects you've marked as sold.</p>
        </div>
        <ViewToggle viewMode={viewMode} onChange={setViewMode} />
      </div>

      {projects.length > 0 ? (
        <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
          {projects.map(renderSoldProject)}
        </div>
      ) : (
        <EmptyState />
      )}

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete sold project?"
        description="This removes it from your sold archive. This action cannot be undone."
        confirmText="Delete"
        variant="destructive"
      />
    </div>
  );
}
