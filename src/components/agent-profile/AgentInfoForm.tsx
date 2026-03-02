import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface AgentInfoFormProps {
  data: {
    firstName: string;
    lastName: string;
    bio: string;
  };
  onChange: (field: string, value: string) => void;
}

export function AgentInfoForm({ data, onChange }: AgentInfoFormProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="pb-4 border-b border-slate-100">
        <CardTitle className="text-lg font-semibold text-slate-900">Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="grid gap-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={data.firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={data.lastName}
            onChange={(e) => onChange('lastName', e.target.value)}
          />
        </div>
        <div className="grid gap-2 md:col-span-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={data.bio}
            onChange={(e) => onChange('bio', e.target.value)}
            placeholder="Tell buyers about your experience and expertise..."
            className="min-h-[120px]"
          />
        </div>
      </CardContent>
    </Card>
  );
}
