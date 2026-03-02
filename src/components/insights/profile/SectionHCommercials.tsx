import React from 'react';
import { useProfileStore } from '@/store/profileStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Upload } from 'lucide-react';

const CONTRACT_MODELS = [
  'Fixed Price',
  'Time & Materials',
  'Schedule of Rates',
  'Cost Plus',
  'Alliance / JV',
  'Early Contractor Involvement (ECI)'
];

const CURRENCIES = ['USD', 'AUD', 'CAD', 'EUR', 'GBP'];

export function SectionHCommercials() {
  const { 
    contractModels, paymentTerms, currencies, 
    updateField 
  } = useProfileStore();

  const toggleModel = (model: string) => {
    if (contractModels.includes(model)) {
      updateField('contractModels', contractModels.filter(m => m !== model));
    } else {
      updateField('contractModels', [...contractModels, model]);
    }
  };

  const toggleCurrency = (currency: string) => {
    if (currencies.includes(currency)) {
      updateField('currencies', currencies.filter(c => c !== currency));
    } else {
      updateField('currencies', [...currencies, currency]);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-semibold text-white mb-1">Commercials</h2>
        <p className="text-slate-400 text-sm">Manage your rate cards and standard terms.</p>
      </div>

      <Card className="bg-[#1C1C24] border-slate-800">
        <CardHeader>
          <CardTitle className="text-base text-white">Commercial Terms</CardTitle>
          <CardDescription>Define your preferred engagement models.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div className="space-y-3">
            <Label>Accepted Contract Models</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CONTRACT_MODELS.map((model) => (
                <div 
                  key={model}
                  className="flex items-center space-x-2 p-2 rounded hover:bg-slate-800/50"
                >
                  <Checkbox 
                    id={model}
                    checked={contractModels.includes(model)}
                    onCheckedChange={() => toggleModel(model)}
                    className="data-[state=checked]:bg-brand-orange data-[state=checked]:border-brand-orange"
                  />
                  <Label htmlFor={model} className="font-normal cursor-pointer text-slate-300">
                    {model}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Standard Payment Terms</Label>
              <Select value={paymentTerms} onValueChange={(v) => updateField('paymentTerms', v)}>
                <SelectTrigger className="bg-[#13131A] border-slate-700">
                  <SelectValue placeholder="Select Terms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7 Days">7 Days</SelectItem>
                  <SelectItem value="14 Days">14 Days</SelectItem>
                  <SelectItem value="30 Days">30 Days</SelectItem>
                  <SelectItem value="45 Days">45 Days</SelectItem>
                  <SelectItem value="60 Days">60 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Accepted Currencies</Label>
              <div className="flex flex-wrap gap-2">
                {CURRENCIES.map((currency) => (
                  <Button
                    key={currency}
                    variant="outline"
                    size="sm"
                    onClick={() => toggleCurrency(currency)}
                    className={`
                      ${currencies.includes(currency) 
                        ? 'bg-brand-orange/10 border-brand-orange text-brand-orange' 
                        : 'bg-[#13131A] border-slate-700 text-slate-400'}
                    `}
                  >
                    {currency}
                  </Button>
                ))}
              </div>
            </div>
          </div>

        </CardContent>
      </Card>

      <Card className="bg-[#1C1C24] border-slate-800">
        <CardHeader>
          <CardTitle className="text-base text-white">Rate Cards</CardTitle>
          <CardDescription>Upload your standard rate cards for faster procurement.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="bg-[#13131A] p-8 rounded-lg border border-slate-800 text-center space-y-3 border-dashed">
             <div className="h-12 w-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto">
               <Upload className="h-6 w-6 text-slate-400" />
             </div>
             <div>
               <p className="text-sm font-medium text-slate-200">Upload Rate Card</p>
               <p className="text-xs text-slate-500 mt-1">PDF or Excel</p>
             </div>
             <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent">
               Select File
             </Button>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
