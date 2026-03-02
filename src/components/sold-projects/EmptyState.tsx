import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Plus, FileText } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24 px-4 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
      <div className="bg-white p-4 rounded-full shadow-sm mb-6">
        <FileText className="h-10 w-10 text-slate-300" />
      </div>
      <h2 className="text-xl font-semibold text-slate-900 mb-2">No sold projects yet</h2>
      <p className="text-slate-500 max-w-md mb-8">
        Once you convert a listing to Sold, it will appear here.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Button asChild size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white shadow-sm shadow-brand-orange/20">
          <Link to="/list">
            <Plus className="mr-2 h-4 w-4" />
            Create Your First Project Listing
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="bg-white hover:bg-slate-50 text-slate-700 border-slate-200">
          <Link to="/app/listings">
            View your listings
          </Link>
        </Button>
      </div>
    </div>
  );
}
