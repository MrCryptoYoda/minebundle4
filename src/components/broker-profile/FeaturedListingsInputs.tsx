import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X, Link as LinkIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface FeaturedListingsInputsProps {
  title: string;
  description: string;
  listings: string[];
  onChange: (listings: string[]) => void;
  maxListings?: number;
}

export function FeaturedListingsInputs({ 
  title, 
  description, 
  listings, 
  onChange, 
  maxListings = 3 
}: FeaturedListingsInputsProps) {
  const { toast } = useToast();

  const handleAddListing = () => {
    if (listings.length < maxListings) {
      onChange([...listings, '']);
    } else {
      toast({
        title: "Limit reached",
        description: `You can only feature up to ${maxListings} listings.`,
        variant: "destructive",
      });
    }
  };

  const handleRemoveListing = (index: number) => {
    const newListings = [...listings];
    newListings.splice(index, 1);
    onChange(newListings);
  };

  const handleListingChange = (index: number, value: string) => {
    const newListings = [...listings];
    newListings[index] = value;
    onChange(newListings);
  };

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="pb-4 border-b border-slate-100">
        <CardTitle className="text-lg font-semibold text-slate-900">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        {listings.map((url, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <LinkIcon className="h-4 w-4 text-slate-400" />
              </div>
              <Input
                value={url}
                onChange={(e) => handleListingChange(index, e.target.value)}
                placeholder="https://minexchange.com/listing/..."
                className="pl-9"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-red-500 hover:bg-red-50"
              onClick={() => handleRemoveListing(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}

        {listings.length < maxListings && (
          <Button
            variant="outline"
            size="sm"
            className="w-full border-dashed border-slate-300 text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            onClick={handleAddListing}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Featured Listing
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
