import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface CompanyInfoFormProps {
  data: {
    name: string;
    website: string;
    description: string;
    logo?: string;
  };
  onChange: (field: string, value: string) => void;
}

export function CompanyInfoForm({ data, onChange }: CompanyInfoFormProps) {
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 2MB.",
          variant: "destructive",
        });
        return;
      }
      
      // Mock upload - create object URL
      const url = URL.createObjectURL(file);
      onChange('logo', url);
      toast({
        title: "Logo uploaded",
        description: "Company logo has been updated.",
      });
    }
  };

  const handleRemoveLogo = () => {
    onChange('logo', '');
  };

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="pb-4 border-b border-slate-100">
        <CardTitle className="text-lg font-semibold text-slate-900">Company Information</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={data.name}
              onChange={(e) => onChange('name', e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={data.website}
              onChange={(e) => onChange('website', e.target.value)}
              placeholder="https://example.com"
            />
          </div>
          <div className="grid gap-2 md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={data.description}
              onChange={(e) => onChange('description', e.target.value)}
              placeholder="Briefly describe your company..."
              className="min-h-[100px]"
            />
          </div>
        </div>

        {/* Logo Upload */}
        <div className="space-y-2">
          <Label>Company Logo</Label>
          {data.logo ? (
            <div className="relative w-32 h-32 rounded-lg border border-slate-200 overflow-hidden group">
              <img src={data.logo} alt="Company Logo" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button variant="destructive" size="icon" onClick={handleRemoveLogo}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div
              className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                isDragging ? 'border-brand-orange bg-orange-50' : 'border-slate-300 hover:bg-slate-50'
              }`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const file = e.dataTransfer.files[0];
                if (file) {
                    // Mock upload logic for drop
                    const url = URL.createObjectURL(file);
                    onChange('logo', url);
                }
              }}
            >
              <input
                type="file"
                className="hidden"
                id="logo-upload"
                accept="image/png, image/jpeg, image/svg+xml"
                onChange={handleLogoUpload}
              />
              <label htmlFor="logo-upload" className="cursor-pointer flex flex-col items-center w-full h-full">
                <div className="p-3 bg-slate-100 rounded-full mb-3">
                  <Upload className="h-6 w-6 text-slate-400" />
                </div>
                <p className="text-sm font-medium text-slate-900">Click to upload or drag and drop</p>
                <p className="text-xs text-slate-500 mt-1">SVG, PNG, JPG (max. 2MB)</p>
              </label>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
