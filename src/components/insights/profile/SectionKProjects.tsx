import React, { useState } from 'react';
import { useProfileStore } from '@/store/profileStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Briefcase } from 'lucide-react';

export function SectionKProjects() {
  const { pastProjects, updateField } = useProfileStore();
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [year, setYear] = useState('');
  const [value, setValue] = useState('');
  const [desc, setDesc] = useState('');

  const addProject = () => {
    if (title && client) {
      const newProject = {
        id: Date.now().toString(),
        title,
        client,
        year,
        value,
        description: desc
      };
      updateField('pastProjects', [...pastProjects, newProject]);
      setTitle('');
      setClient('');
      setYear('');
      setValue('');
      setDesc('');
    }
  };

  const removeProject = (id: string) => {
    updateField('pastProjects', pastProjects.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-semibold text-white mb-1">Past Projects</h2>
        <p className="text-slate-400 text-sm">Showcase your experience to build trust with potential clients.</p>
      </div>

      <Card className="bg-[#1C1C24] border-slate-800">
        <CardHeader>
          <CardTitle className="text-base text-white">Project Portfolio</CardTitle>
          <CardDescription>Add significant projects you have delivered.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Project Title *</Label>
              <Input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Pilbara Iron Ore Expansion"
                className="bg-[#13131A] border-slate-700"
              />
            </div>
            <div className="space-y-2">
              <Label>Client Name *</Label>
              <Input 
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="e.g. BHP"
                className="bg-[#13131A] border-slate-700"
              />
            </div>
            <div className="space-y-2">
              <Label>Year Completed</Label>
              <Input 
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="e.g. 2023"
                className="bg-[#13131A] border-slate-700"
              />
            </div>
            <div className="space-y-2">
              <Label>Contract Value (Optional)</Label>
              <Input 
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="e.g. $5M"
                className="bg-[#13131A] border-slate-700"
              />
            </div>
            <div className="col-span-1 md:col-span-2 space-y-2">
              <Label>Description</Label>
              <Textarea 
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Briefly describe the scope and outcome..."
                className="bg-[#13131A] border-slate-700 min-h-[80px]"
              />
            </div>
          </div>
          <Button onClick={addProject} className="w-full md:w-auto bg-brand-orange hover:bg-brand-orange/90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>

          <div className="space-y-4 mt-6">
            {pastProjects.map((project) => (
              <div key={project.id} className="p-4 bg-[#13131A] rounded-lg border border-slate-800 relative group">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                    <Briefcase className="h-5 w-5 text-slate-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-slate-200 truncate pr-8">{project.title}</h4>
                      <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                        {project.year}
                      </span>
                    </div>
                    <p className="text-sm text-brand-orange mb-2">{project.client}</p>
                    <p className="text-sm text-slate-400 line-clamp-2">{project.description}</p>
                    {project.value && (
                      <p className="text-xs text-slate-500 mt-2 font-mono">Value: {project.value}</p>
                    )}
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 h-8 w-8 text-slate-500 hover:text-red-400 hover:bg-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeProject(project.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {pastProjects.length === 0 && (
              <div className="text-center py-8 border border-dashed border-slate-800 rounded-lg">
                <p className="text-sm text-slate-500">No projects added yet.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
