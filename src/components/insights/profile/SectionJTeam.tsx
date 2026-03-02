import React, { useState } from 'react';
import { useProfileStore } from '@/store/profileStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Mail } from 'lucide-react';

export function SectionJTeam() {
  const { teamMembers, updateField } = useProfileStore();
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'Admin' | 'Member'>('Member');

  const addMember = () => {
    if (newName && newEmail) {
      const newMember = { 
        id: Date.now().toString(), 
        name: newName, 
        email: newEmail,
        role: newRole 
      };
      updateField('teamMembers', [...teamMembers, newMember]);
      setNewName('');
      setNewEmail('');
      setNewRole('Member');
    }
  };

  const removeMember = (id: string) => {
    updateField('teamMembers', teamMembers.filter(m => m.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-semibold text-white mb-1">Team Members</h2>
        <p className="text-slate-400 text-sm">Add key personnel who will manage leads and projects.</p>
      </div>

      <Card className="bg-[#1C1C24] border-slate-800">
        <CardHeader>
          <CardTitle className="text-base text-white">Key Personnel</CardTitle>
          <CardDescription>These members will be visible on your profile.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input 
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Full Name"
                className="bg-[#13131A] border-slate-700"
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input 
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="email@company.com"
                className="bg-[#13131A] border-slate-700"
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={newRole} onValueChange={(v: 'Admin' | 'Member') => setNewRole(v)}>
                <SelectTrigger className="bg-[#13131A] border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Member">Member</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={addMember} className="w-full md:w-auto bg-brand-orange hover:bg-brand-orange/90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Team Member
          </Button>

          <div className="space-y-3 mt-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-3 bg-[#13131A] rounded-lg border border-slate-800">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 bg-slate-700 border border-slate-600">
                    <AvatarFallback className="text-slate-300">{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-slate-200">{member.name}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {member.email}
                      </span>
                      <span>•</span>
                      <span className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 border border-slate-700">
                        {member.role}
                      </span>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-slate-500 hover:text-red-400 hover:bg-red-900/10"
                  onClick={() => removeMember(member.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {teamMembers.length === 0 && (
              <div className="text-center py-8 border border-dashed border-slate-800 rounded-lg">
                <p className="text-sm text-slate-500">No team members added yet.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
