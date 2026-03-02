import React, { useState } from 'react';
import { useProfileStore } from '@/store/profileStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, X, FileText, CheckCircle2 } from 'lucide-react';

const COMMON_CERTS = [
  'ISO 9001 (Quality)',
  'ISO 14001 (Environment)',
  'ISO 45001 (Occupational Health)',
  'Indigenous Procurement Policy (IPP)',
  'Modern Slavery Statement',
  'Reconciliation Action Plan (RAP)'
];

export function SectionGCompliance() {
  const { certifications, updateField } = useProfileStore();
  const [customCert, setCustomCert] = useState('');

  const toggleCert = (cert: string) => {
    if (certifications.includes(cert)) {
      updateField('certifications', certifications.filter(c => c !== cert));
    } else {
      updateField('certifications', [...certifications, cert]);
    }
  };

  const addCustomCert = () => {
    if (customCert && !certifications.includes(customCert)) {
      updateField('certifications', [...certifications, customCert]);
      setCustomCert('');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-semibold text-white mb-1">Compliance & ESG</h2>
        <p className="text-slate-400 text-sm">Upload certifications to improve your trust score and eligibility.</p>
      </div>

      <Card className="bg-[#1C1C24] border-slate-800">
        <CardHeader>
          <CardTitle className="text-base text-white">Certifications & Standards</CardTitle>
          <CardDescription>Select held certifications or add your own.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div className="flex flex-wrap gap-3">
            {COMMON_CERTS.map((cert) => {
              const isSelected = certifications.includes(cert);
              return (
                <div 
                  key={cert}
                  onClick={() => toggleCert(cert)}
                  className={`
                    cursor-pointer px-4 py-3 rounded-lg border text-sm font-medium transition-all flex items-center gap-2
                    ${isSelected 
                      ? 'bg-emerald-900/20 border-emerald-500/50 text-emerald-400' 
                      : 'bg-[#13131A] border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200'}
                  `}
                >
                  {isSelected ? <CheckCircle2 className="h-4 w-4" /> : <div className="h-4 w-4 rounded-full border border-slate-600" />}
                  {cert}
                </div>
              );
            })}
          </div>

          <div className="flex gap-2">
            <Input 
              placeholder="Add other certification (e.g. NATA, JAS-ANZ)" 
              value={customCert}
              onChange={(e) => setCustomCert(e.target.value)}
              className="bg-[#13131A] border-slate-700"
              onKeyDown={(e) => e.key === 'Enter' && addCustomCert()}
            />
            <Button onClick={addCustomCert} variant="secondary" className="bg-slate-800 text-white hover:bg-slate-700">
              Add
            </Button>
          </div>

          {certifications.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <Label className="text-slate-300">Active Certifications</Label>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert} className="flex items-center justify-between p-3 bg-[#13131A] rounded-lg border border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded bg-slate-800 flex items-center justify-center">
                        <FileText className="h-4 w-4 text-brand-orange" />
                      </div>
                      <span className="text-sm text-slate-200">{cert}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="ghost" size="sm" className="h-8 text-xs text-brand-orange hover:text-brand-orange hover:bg-brand-orange/10">
                        <Upload className="h-3 w-3 mr-1" />
                        Upload Doc
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-slate-500 hover:text-red-400 hover:bg-red-900/10"
                        onClick={() => toggleCert(cert)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </CardContent>
      </Card>

      <Card className="bg-[#1C1C24] border-slate-800">
        <CardHeader>
          <CardTitle className="text-base text-white">ESG Commitment</CardTitle>
        </CardHeader>
        <CardContent>
           <div className="bg-[#13131A] p-4 rounded-lg border border-slate-800 text-center space-y-3">
             <div className="h-12 w-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto">
               <Upload className="h-6 w-6 text-slate-400" />
             </div>
             <div>
               <p className="text-sm font-medium text-slate-200">Upload ESG Policy</p>
               <p className="text-xs text-slate-500 mt-1">PDF or DOCX up to 10MB</p>
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
