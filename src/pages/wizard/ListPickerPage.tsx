import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pickaxe, Zap, Map, DollarSign, Package, ArrowRight, Sparkles } from 'lucide-react';

const LISTING_TYPES = [
  {
    id: 'mining-project',
    title: 'Mining Project',
    description: 'List an exploration, development, or operating mine project.',
    icon: Pickaxe,
    path: '/list/mining-project/step/1',
  },
  {
    id: 'renewable-asset',
    title: 'Renewable Asset',
    description: 'List solar, wind, or other renewable energy infrastructure.',
    icon: Zap,
    path: '/list/renewable-asset/step/1',
  },
  {
    id: 'claim',
    title: 'Claim',
    description: 'List individual mining claims or tenements.',
    icon: Map,
    path: '/list/claim/step/1',
  },
  {
    id: 'royalty-asset',
    title: 'Royalty Asset',
    description: 'List a royalty stream or interest in a project.',
    icon: DollarSign,
    path: '/list/royalty-asset/step/1',
  },
  {
    id: 'offtake',
    title: 'Offtake Listing',
    description: 'List product offtake for sale (Concentrate, Doré, etc.).',
    icon: Package,
    path: '/list/offtake/step/1',
    isNew: true,
  },
];

export default function ListPickerPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-slate-100 to-transparent -z-10" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-4xl mx-auto text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-4xl font-serif font-medium text-slate-900 sm:text-5xl mb-4 tracking-tight">List an Asset</h1>
        <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
          Select an asset class to begin your listing. You can save drafts and return at any time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
        {LISTING_TYPES.map((type) => (
          <Link key={type.id} to={type.path} className="group block h-full">
            <Card className="h-full border-slate-200/60 bg-white/80 backdrop-blur-sm hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
              {type.isNew && (
                <div className="absolute top-0 right-0">
                  <div className="bg-brand-orange text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-sm uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> New
                  </div>
                </div>
              )}
              
              <CardHeader className="pb-2 pt-8 px-8">
                <div className="h-14 w-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-orange/10 group-hover:scale-110 transition-all duration-300 border border-slate-100">
                  <type.icon className="h-7 w-7 text-slate-400 group-hover:text-brand-orange transition-colors duration-300" />
                </div>
                <CardTitle className="text-2xl font-serif font-medium text-slate-900 group-hover:text-brand-orange transition-colors duration-300">
                  {type.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <p className="text-slate-500 font-light leading-relaxed mb-8 min-h-[48px] text-sm">{type.description}</p>
                <div className="flex items-center text-brand-orange font-medium text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  Start Listing <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
