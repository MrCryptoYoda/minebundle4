import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, X, CheckCircle, CloudUpload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface UploadDropzoneProps {
  label: string;
  accept?: string;
  multiple?: boolean;
  onUpload?: (files: File[]) => void;
  className?: string;
  helperText?: string;
}

export function UploadDropzone({ label, accept, multiple, onUpload, className, helperText }: UploadDropzoneProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files) as File[];
      handleFiles(droppedFiles);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files) as File[];
      handleFiles(selectedFiles);
    }
  };

  const handleFiles = (newFiles: File[]) => {
    setFiles(prev => multiple ? [...prev, ...newFiles] : [newFiles[0]]);
    onUpload?.(newFiles);
  };

  const removeFile = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "group relative flex flex-col items-center justify-center w-full rounded-xl border border-dashed transition-all duration-300 cursor-pointer overflow-hidden",
          "min-h-[160px] p-8 text-center",
          isDragging 
            ? "border-brand-orange bg-brand-orange/5 scale-[1.01] shadow-lg shadow-brand-orange/10" 
            : "border-slate-300 hover:border-brand-orange/50 hover:bg-slate-50/50 hover:shadow-sm bg-slate-50/30",
          files.length > 0 && !multiple ? "border-emerald-500/50 bg-emerald-50/30" : ""
        )}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
        />
        
        <div className={cn(
          "mb-4 h-12 w-12 rounded-full flex items-center justify-center transition-all duration-300",
          isDragging ? "bg-brand-orange/10 text-brand-orange scale-110" : "bg-white border border-slate-200 text-slate-400 group-hover:border-brand-orange/30 group-hover:text-brand-orange group-hover:scale-110 shadow-sm"
        )}>
          <CloudUpload className="h-6 w-6" />
        </div>
        
        <div className="space-y-1 relative z-10">
          <p className="text-sm font-medium text-slate-900 group-hover:text-brand-orange transition-colors">
            <span className="font-semibold underline decoration-slate-300 underline-offset-4 group-hover:decoration-brand-orange/50">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-slate-500 font-light">
            {helperText || `SVG, PNG, JPG or GIF (max. 800x400px)`}
          </p>
        </div>

        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      {files.length > 0 && (
        <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
          {files.map((file, index) => (
            <div 
              key={`${file.name}-${index}`} 
              className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-all group/file"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="h-10 w-10 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5 text-slate-400 group-hover/file:text-brand-orange transition-colors" />
                </div>
                <div className="min-w-0 flex flex-col items-start">
                  <p className="text-sm font-medium text-slate-700 truncate max-w-[200px] group-hover/file:text-slate-900 transition-colors">
                    {file.name}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={(e) => removeFile(index, e)} 
                  className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
