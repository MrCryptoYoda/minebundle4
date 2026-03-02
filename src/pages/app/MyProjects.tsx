import React, { useState, useEffect } from 'react';
import { SavedProject, MOCK_SAVED_PROJECTS } from '@/data/mockSavedProjects';
import { ProjectCard, ProjectCardProps } from '@/components/projects/ProjectCard';
import { ProjectRow } from '@/components/projects/ProjectRow';
import { ViewToggle } from '@/components/projects/ViewToggle';
import { EmptyState } from '@/components/saved-projects/EmptyState';
import { SkeletonCards } from '@/components/saved-projects/SkeletonCards';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { AlertCircle, MoreVertical, Share2, Trash2, MapPin, Pickaxe, Banknote, Bookmark } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function MyProjectsPage() {
  const [projects, setProjects] = useState<SavedProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setProjects(MOCK_SAVED_PROJECTS);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleUnsave = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    toast({
      title: "Removed from saved projects",
      description: "The project has been removed from your list.",
    });
  };

  const handleShare = (id: string) => {
    // Mock share
    toast({
      title: "Link copied",
      description: "Project link copied to clipboard.",
    });
  };

  const renderSavedProject = (project: SavedProject) => {
    const metrics = [
      <div className="flex items-center gap-2" title={project.location}>
        <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
        <span className="text-xs text-slate-500 truncate">{project.location.split(',')[0]}</span>
      </div>,
      <div className="flex items-center gap-2">
        <Pickaxe className="h-4 w-4 text-slate-400 shrink-0" />
        <span className="text-xs text-slate-500 truncate">
          {project.commodity}
        </span>
      </div>,
      <div className="flex items-center gap-2">
        <Banknote className="h-4 w-4 text-slate-400 shrink-0" />
        <span className="text-xs text-slate-500 truncate font-medium">{project.price}</span>
      </div>
    ];

    const actions = (
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full bg-white/90 backdrop-blur-md text-brand-orange hover:bg-white hover:text-brand-orange shadow-sm border border-white/20"
          onClick={(e) => {
            e.preventDefault();
            handleUnsave(project.id);
          }}
          aria-label="Remove from saved projects"
        >
          <Bookmark className="h-4 w-4 fill-current" />
        </Button>
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
              onClick={() => handleUnsave(project.id)}
              className="text-red-600 focus:text-red-600 focus:bg-red-50"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Remove from saved
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );

    const badge = (
      <div className="flex flex-col gap-2 items-start">
        <Badge className="bg-slate-900/60 backdrop-blur-md text-white hover:bg-slate-900/70 border-none px-3 py-1.5 rounded-lg font-medium text-xs tracking-wide">
          {project.status}
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
        image={project.imageUrl}
        link={`/listing/${project.id}`}
        badge={badge}
        subtitle={subtitle}
        description={`A ${project.stage} ${project.type} focused on ${project.commodity} exploration and development in ${project.location.split(',')[0]}.`}
        metrics={metrics}
        actions={actions}
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
        <p className="text-slate-400">Couldn't load saved projects.</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto pb-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-white">Saved Projects</h1>
          <p className="text-slate-400">Projects you saved to review later.</p>
        </div>
        <ViewToggle viewMode={viewMode} onChange={setViewMode} />
      </div>

      {projects.length > 0 ? (
        <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
          {projects.map(renderSavedProject)}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
