import React from 'react';
import { Link } from 'react-router-dom';
import { MarketplaceCategory } from '@/data/marketplaceData';
import { ArrowRight } from 'lucide-react';

interface CategoryTileProps {
  category: MarketplaceCategory;
}

export function CategoryTile({ category }: CategoryTileProps) {
  return (
    <Link 
      to={`/marketplace/category/${category.slug}`}
      className="group relative overflow-hidden rounded-xl bg-slate-900 aspect-[4/3] flex flex-col justify-end p-6 transition-all hover:shadow-xl hover:-translate-y-1"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={category.image} 
          alt={category.name}
          className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col gap-2">
        <h3 className="text-xl font-bold text-white leading-tight group-hover:text-brand-orange transition-colors">
          {category.name}
        </h3>
        <p className="text-sm text-slate-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
          {category.description}
        </p>
        <div className="flex items-center gap-2 text-brand-orange text-sm font-medium mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 transform translate-y-2 group-hover:translate-y-0">
          Explore <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
