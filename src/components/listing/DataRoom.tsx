import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Eye, Lock, File, FileSpreadsheet, FileImage, Map, Presentation, FolderOpen } from 'lucide-react';
import { GatedContent } from './GatedContent';
import { DataRoomSkeleton } from './DataRoomSkeleton';
import { Listing } from '@/data/mockData';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface DataRoomProps {
  listing: Listing;
  isAuthenticated: boolean;
  isNdaSigned: boolean;
  onSignNda: () => void;
  onLogin: () => void;
}

export function DataRoom({ listing, isAuthenticated, isNdaSigned, onSignNda, onLogin }: DataRoomProps) {
  const [selectedFile, setSelectedFile] = useState<any | null>(null);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'PDF': return <FileText className="h-5 w-5 text-red-500" />;
      case 'XLSX': 
      case 'CSV': return <FileSpreadsheet className="h-5 w-5 text-green-600" />;
      case 'JPG': 
      case 'PNG': return <FileImage className="h-5 w-5 text-blue-500" />;
      case 'ZIP': return <FolderOpen className="h-5 w-5 text-yellow-600" />;
      default: return <File className="h-5 w-5 text-slate-400" />;
    }
  };

  // Group files by category
  const filesByCategory = listing.dataRoom?.files.reduce((acc, file) => {
    const category = file.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(file);
    return acc;
  }, {} as Record<string, typeof listing.dataRoom.files>) || {};

  const categories = Object.keys(filesByCategory);

  if (!isAuthenticated || !isNdaSigned) {
    return (
      <DataRoomSkeleton 
        isAuthenticated={isAuthenticated}
        onAction={isAuthenticated ? onSignNda : onLogin}
      />
    );
  }

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-brand-orange/10 rounded-full flex items-center justify-center">
              <FolderOpen className="h-5 w-5 text-brand-orange" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-slate-900">Project Data Room</CardTitle>
              <p className="text-sm text-slate-500">
                {listing.dataRoom?.files.length || 0} files available for review
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" /> Download All
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {categories.length > 0 ? (
          <Accordion type="multiple" defaultValue={categories} className="w-full">
            {categories.map((category, index) => (
              <AccordionItem key={category} value={category} className="border-b border-slate-100 last:border-0">
                <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-1.5 rounded-md">
                      {category === 'Maps' ? <Map className="h-4 w-4 text-slate-600" /> :
                       category === 'Presentation' ? <Presentation className="h-4 w-4 text-slate-600" /> :
                       <FolderOpen className="h-4 w-4 text-slate-600" />}
                    </div>
                    <span className="font-semibold text-slate-700">{category}</span>
                    <span className="text-xs text-slate-400 font-normal ml-2 bg-slate-100 px-2 py-0.5 rounded-full">
                      {filesByCategory[category].length}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-0">
                  <div className="grid gap-3">
                    {filesByCategory[category].map((file, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-brand-orange/30 hover:bg-brand-orange/5 transition-all group"
                      >
                        <div className="flex items-center gap-4 overflow-hidden">
                          <div className="h-10 w-10 bg-white rounded-lg border border-slate-100 flex items-center justify-center shadow-sm shrink-0">
                            {getFileIcon(file.type)}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-medium text-slate-900 truncate group-hover:text-brand-orange transition-colors">
                              {file.name}
                            </h4>
                            <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                              <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-medium">{file.type}</span>
                              <span>{file.size}</span>
                              <span className="text-slate-300">•</span>
                              <span>{file.date}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 shrink-0">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-slate-400 hover:text-brand-orange hover:bg-brand-orange/10"
                            onClick={() => setSelectedFile(file)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-slate-400 hover:text-brand-orange hover:bg-brand-orange/10"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="p-12 text-center text-slate-500">
            <FolderOpen className="h-12 w-12 mx-auto text-slate-300 mb-4" />
            <p>No documents available in the data room yet.</p>
          </div>
        )}
      </CardContent>

      {/* File Preview Modal */}
      <Dialog open={!!selectedFile} onOpenChange={(open) => !open && setSelectedFile(null)}>
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedFile && getFileIcon(selectedFile.type)}
              {selectedFile?.name}
            </DialogTitle>
            <DialogDescription>
              {selectedFile?.size} • {selectedFile?.date} • {selectedFile?.category}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center overflow-hidden relative">
            {selectedFile?.type === 'PDF' ? (
              <div className="text-center p-8">
                <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">PDF Preview Placeholder</p>
                <p className="text-sm text-slate-400 mt-2">In a real app, this would render the PDF.</p>
              </div>
            ) : selectedFile?.type === 'JPG' || selectedFile?.type === 'PNG' ? (
              <img src="https://picsum.photos/seed/doc/800/600" alt="Preview" className="max-w-full max-h-full object-contain" />
            ) : (
              <div className="text-center p-8">
                <File className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">Preview not available for this file type.</p>
                <Button variant="outline" className="mt-4 gap-2">
                  <Download className="h-4 w-4" /> Download to View
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
