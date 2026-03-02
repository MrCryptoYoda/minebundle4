import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useProfileStore } from '@/store/profileStore';
import { Trash2, Plus } from 'lucide-react';

export function Step6Projects() {
  const { pastProjects, updateField } = useProfileStore();
  const [newProject, setNewProject] = useState({
    title: '', client: '', year: '', value: '', description: ''
  });

  const addProject = () => {
    if (!newProject.title || !newProject.client) return;
    updateField('pastProjects', [...pastProjects, { ...newProject, id: Date.now().toString() }]);
    setNewProject({ title: '', client: '', year: '', value: '', description: '' });
  };

  const removeProject = (id: string) => {
    updateField('pastProjects', pastProjects.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label className="text-lg font-semibold text-white">Past Projects</Label>
        <p className="text-sm text-slate-400">Showcase your experience. Add at least 1 project.</p>
        
        <div className="space-y-4 border border-slate-700 rounded-xl p-4 bg-[#13131A]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-slate-200">Project Title</Label>
              <Input 
                id="title" 
                value={newProject.title} 
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                className="bg-[#1C1C24] border-slate-700 text-white"
                placeholder="e.g. Pilbara Rail Expansion"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client" className="text-slate-200">Client</Label>
              <Input 
                id="client" 
                value={newProject.client} 
                onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                className="bg-[#1C1C24] border-slate-700 text-white"
                placeholder="e.g. Rio Tinto"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year" className="text-slate-200">Year</Label>
              <Input 
                id="year" 
                value={newProject.year} 
                onChange={(e) => setNewProject({ ...newProject, year: e.target.value })}
                className="bg-[#1C1C24] border-slate-700 text-white"
                placeholder="e.g. 2023"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="value" className="text-slate-200">Value (Optional)</Label>
              <Input 
                id="value" 
                value={newProject.value} 
                onChange={(e) => setNewProject({ ...newProject, value: e.target.value })}
                className="bg-[#1C1C24] border-slate-700 text-white"
                placeholder="e.g. $5M"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="desc" className="text-slate-200">Description</Label>
            <Textarea 
              id="desc" 
              value={newProject.description} 
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              className="bg-[#1C1C24] border-slate-700 text-white min-h-[80px]"
              placeholder="Briefly describe the scope of work..."
            />
          </div>
          <Button onClick={addProject} className="w-full bg-slate-700 hover:bg-slate-600 text-white">
            <Plus className="mr-2 h-4 w-4" /> Add Project
          </Button>
        </div>

        <div className="space-y-4 mt-6">
          {pastProjects.map((project) => (
            <div key={project.id} className="flex justify-between items-start p-4 rounded-xl bg-[#1C1C24] border border-slate-800">
              <div>
                <h4 className="font-bold text-white">{project.title}</h4>
                <p className="text-sm text-slate-400">{project.client} • {project.year}</p>
                {project.value && <p className="text-xs text-slate-500 mt-1">Value: {project.value}</p>}
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeProject(project.id)} className="text-slate-500 hover:text-red-500">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {pastProjects.length === 0 && (
            <p className="text-center text-slate-500 py-4">No projects added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
