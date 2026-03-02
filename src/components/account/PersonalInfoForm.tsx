import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface PersonalInfoFormProps {
  data: {
    firstName: string;
    lastName: string;
    dob: string;
    phone: string;
    gender: string;
    languages: string;
    occupation: string;
    about: string;
  };
  onChange: (field: string, value: string) => void;
}

export function PersonalInfoForm({ data, onChange }: PersonalInfoFormProps) {
  return (
    <Card className="border-slate-800 bg-[#1C1C24] shadow-sm">
      <CardHeader className="pb-4 border-b border-slate-800">
        <CardTitle className="text-lg font-semibold text-white">Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div className="grid gap-2">
          <Label htmlFor="firstName" className="text-slate-400">First Name</Label>
          <Input
            id="firstName"
            value={data.firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
            className="bg-[#13131A] border-slate-800 text-white placeholder:text-slate-600"
          />
        </div>

        {/* Last Name */}
        <div className="grid gap-2">
          <Label htmlFor="lastName" className="text-slate-400">Last Name</Label>
          <Input
            id="lastName"
            value={data.lastName}
            onChange={(e) => onChange('lastName', e.target.value)}
            className="bg-[#13131A] border-slate-800 text-white placeholder:text-slate-600"
          />
        </div>

        {/* Date of Birth */}
        <div className="grid gap-2">
          <Label htmlFor="dob" className="text-slate-400">Date of Birth</Label>
          <Input
            id="dob"
            type="date"
            value={data.dob}
            onChange={(e) => onChange('dob', e.target.value)}
            className="bg-[#13131A] border-slate-800 text-white placeholder:text-slate-600"
          />
        </div>

        {/* Phone Number */}
        <div className="grid gap-2">
          <Label htmlFor="phone" className="text-slate-400">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="+1 (555) 000-0000"
            className="bg-[#13131A] border-slate-800 text-white placeholder:text-slate-600"
          />
        </div>

        {/* Gender */}
        <div className="grid gap-2">
          <Label htmlFor="gender" className="text-slate-400">Gender</Label>
          <Select value={data.gender} onValueChange={(value) => onChange('gender', value)}>
            <SelectTrigger id="gender" className="bg-[#13131A] border-slate-800 text-white">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent className="bg-[#1C1C24] border-slate-800 text-white">
              <SelectItem value="male" className="focus:bg-white/5 focus:text-white">Male</SelectItem>
              <SelectItem value="female" className="focus:bg-white/5 focus:text-white">Female</SelectItem>
              <SelectItem value="non-binary" className="focus:bg-white/5 focus:text-white">Non-binary</SelectItem>
              <SelectItem value="prefer-not-to-say" className="focus:bg-white/5 focus:text-white">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Languages */}
        <div className="grid gap-2">
          <Label htmlFor="languages" className="text-slate-400">Languages</Label>
          <Select value={data.languages} onValueChange={(value) => onChange('languages', value)}>
            <SelectTrigger id="languages" className="bg-[#13131A] border-slate-800 text-white">
              <SelectValue placeholder="Select languages" />
            </SelectTrigger>
            <SelectContent className="bg-[#1C1C24] border-slate-800 text-white">
              <SelectItem value="english" className="focus:bg-white/5 focus:text-white">English</SelectItem>
              <SelectItem value="spanish" className="focus:bg-white/5 focus:text-white">Spanish</SelectItem>
              <SelectItem value="french" className="focus:bg-white/5 focus:text-white">French</SelectItem>
              <SelectItem value="mandarin" className="focus:bg-white/5 focus:text-white">Mandarin</SelectItem>
              <SelectItem value="german" className="focus:bg-white/5 focus:text-white">German</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Occupation */}
        <div className="grid gap-2 md:col-span-2">
          <Label htmlFor="occupation" className="text-slate-400">Occupation</Label>
          <Input
            id="occupation"
            value={data.occupation}
            onChange={(e) => onChange('occupation', e.target.value)}
            placeholder="e.g. Senior Geologist"
            className="bg-[#13131A] border-slate-800 text-white placeholder:text-slate-600"
          />
        </div>

        {/* About Me */}
        <div className="grid gap-2 md:col-span-2">
          <Label htmlFor="about" className="text-slate-400">About Me</Label>
          <Textarea
            id="about"
            value={data.about}
            onChange={(e) => onChange('about', e.target.value)}
            placeholder="Tell us a bit about yourself..."
            className="min-h-[100px] bg-[#13131A] border-slate-800 text-white placeholder:text-slate-600"
          />
        </div>
      </CardContent>
    </Card>
  );
}
