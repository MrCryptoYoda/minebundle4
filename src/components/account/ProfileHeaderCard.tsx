import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera } from 'lucide-react';

interface ProfileHeaderCardProps {
  user: {
    avatar: string;
    firstName: string;
    lastName: string;
    email: string;
    customerId: string;
    role: string;
  };
  onEditPhoto?: () => void;
}

export function ProfileHeaderCard({ user, onEditPhoto }: ProfileHeaderCardProps) {
  return (
    <Card className="border-slate-800 bg-[#1C1C24] shadow-sm">
      <CardHeader className="pb-4 border-b border-slate-800">
        <CardTitle className="text-lg font-semibold text-white">Profile</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative group">
            <Avatar className="h-24 w-24 border-4 border-[#1C1C24] shadow-md">
              <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
              <AvatarFallback className="bg-slate-800 text-slate-300 text-2xl font-medium">
                {user.firstName[0]}{user.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              variant="secondary"
              className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity bg-slate-700 text-white hover:bg-slate-600"
              onClick={onEditPhoto}
              aria-label="Edit profile photo"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 text-center sm:text-left space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start">
              <h2 className="text-xl font-bold text-white">{user.firstName} {user.lastName}</h2>
              <Badge variant="outline" className="w-fit mx-auto sm:mx-0 border-slate-700 text-slate-400 font-normal">
                {user.role}
              </Badge>
            </div>
            <p className="text-slate-400">{user.email}</p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#13131A] text-xs font-mono text-slate-400 border border-slate-800">
                ID: {user.customerId}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
