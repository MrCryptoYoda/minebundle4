import React from 'react';
import { useLocation } from 'react-router-dom';

export default function PagePlaceholder({ title }: { title?: string }) {
  const location = useLocation();
  const pageTitle = title || location.pathname.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Page';

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center space-y-4">
      <div className="h-16 w-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
        <span className="text-2xl">🚧</span>
      </div>
      <h1 className="text-3xl font-bold text-slate-900">{pageTitle}</h1>
      <p className="text-slate-500 max-w-md">
        This page is currently under construction. Please check back later or use the Demo Console to navigate to implemented pages.
      </p>
      <div className="text-xs font-mono bg-slate-100 px-3 py-1 rounded text-slate-500 mt-4">
        Route: {location.pathname}
      </div>
    </div>
  );
}
