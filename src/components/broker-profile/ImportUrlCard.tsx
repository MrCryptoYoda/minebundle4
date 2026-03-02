import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ImportUrlCardProps {
  title: string;
  description?: string;
  placeholder: string;
  onImport: (url: string) => Promise<void>;
  helperText?: string;
  manualText?: string;
  onManualClick?: () => void;
}

export function ImportUrlCard({ 
  title, 
  description, 
  placeholder, 
  onImport, 
  helperText, 
  manualText,
  onManualClick 
}: ImportUrlCardProps) {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleImport = async () => {
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }
    
    // Basic URL validation
    try {
      new URL(url);
    } catch (_) {
      setError('Please enter a valid URL (e.g., https://linkedin.com/in/...)');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await onImport(url);
      toast({
        title: "Import successful",
        description: "Profile details have been imported. Please review and save changes.",
      });
      setUrl('');
    } catch (err) {
      setError('Failed to import profile. Please try again or enter manually.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="pb-4 border-b border-slate-100">
        <CardTitle className="text-lg font-semibold text-slate-900">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              placeholder={placeholder}
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError('');
              }}
              className={error ? 'border-red-500 focus-visible:ring-red-500' : ''}
              disabled={isLoading}
            />
            {error && (
              <div className="flex items-center gap-1 mt-1.5 text-xs text-red-500">
                <AlertCircle className="h-3 w-3" />
                <span>{error}</span>
              </div>
            )}
          </div>
          <Button 
            onClick={handleImport} 
            disabled={isLoading}
            className="sm:w-auto w-full bg-slate-900 hover:bg-slate-800 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Importing...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Import
              </>
            )}
          </Button>
        </div>
        
        {helperText && (
          <p className="text-xs text-slate-500">{helperText}</p>
        )}

        {(manualText || onManualClick) && (
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-100" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500">Or</span>
            </div>
            <div className="mt-4 text-center">
              <Button 
                variant="link" 
                className="text-slate-600 hover:text-slate-900 h-auto p-0"
                onClick={onManualClick}
              >
                {manualText || "Enter details manually"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
