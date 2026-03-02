import React from 'react';
// Sheet import removed as we are using custom motion drawer
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, RotateCcw } from 'lucide-react';
import { COMMODITIES, LOCATIONS } from '@/data/mockData';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

export function FilterDrawer({ isOpen, onClose, onApply }: FilterDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          
          {/* Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full sm:w-[400px] bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">Filters</h2>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-400 hover:text-slate-900">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Asset Type */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-slate-900">Asset Type</Label>
                <div className="grid grid-cols-2 gap-2">
                  {['Mining Project', 'Claim', 'Royalty', 'Renewable Asset', 'Offtake'].map((type) => (
                    <label key={type} className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 cursor-pointer hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-all">
                      <input type="checkbox" className="rounded border-slate-300 text-brand-orange focus:ring-brand-orange" />
                      <span className="text-sm text-slate-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Commodity */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-slate-900">Commodity</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Commodity" />
                  </SelectTrigger>
                  <SelectContent>
                    {COMMODITIES.map(c => (
                      <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-slate-900">Location</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Region" />
                  </SelectTrigger>
                  <SelectContent>
                    {LOCATIONS.map(l => (
                      <SelectItem key={l.region} value={l.region.toLowerCase()}>{l.region}, {l.country}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Stage */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-slate-900">Stage</Label>
                <div className="space-y-2">
                  {['Exploration', 'Development', 'Production', 'Care & Maintenance'].map((stage) => (
                    <label key={stage} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-slate-300 text-brand-orange focus:ring-brand-orange" />
                      <span className="text-sm text-slate-600">{stage}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-slate-900">Price Range (USD)</Label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-2.5 text-slate-400 text-xs">$</span>
                    <Input type="number" placeholder="Min" className="pl-6" />
                  </div>
                  <span className="text-slate-400">-</span>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-2.5 text-slate-400 text-xs">$</span>
                    <Input type="number" placeholder="Max" className="pl-6" />
                  </div>
                </div>
              </div>

              {/* Resource Standard */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-slate-900">Resource Standard</Label>
                <div className="flex flex-wrap gap-2">
                  {['JORC', 'NI 43-101', 'SAMREC', 'N/A'].map((std) => (
                    <Badge key={std} variant="outline" className="cursor-pointer hover:bg-slate-100 font-normal">
                      {std}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-slate-100 bg-slate-50 flex items-center gap-3">
              <Button variant="outline" className="flex-1 gap-2" onClick={() => {}}>
                <RotateCcw className="h-4 w-4" /> Reset
              </Button>
              <Button className="flex-[2]" onClick={() => { onApply({}); onClose(); }}>
                Apply Filters
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
