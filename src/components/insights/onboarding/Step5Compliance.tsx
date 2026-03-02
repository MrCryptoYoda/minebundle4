import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useProfileStore } from '@/store/profileStore';

const COMMON_CERTIFICATIONS = [
  'ISO 9001 (Quality)', 'ISO 14001 (Environment)', 
  'ISO 45001 (Safety)', 'AS/NZS 4801', 
  'NATA Accredited', 'Indigenous Owned'
];

export function Step5Compliance() {
  const { 
    certifications, insuranceCoverage, licensingNotes, 
    updateField 
  } = useProfileStore();

  const toggleCertification = (cert: string) => {
    if (certifications.includes(cert)) {
      updateField('certifications', certifications.filter(c => c !== cert));
    } else {
      updateField('certifications', [...certifications, cert]);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label className="text-lg font-semibold text-white">Certifications & Compliance</Label>
        <p className="text-sm text-slate-400">Select any relevant certifications your company holds.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {COMMON_CERTIFICATIONS.map((cert) => (
            <div key={cert} className="flex items-center space-x-2">
              <Checkbox 
                id={cert} 
                checked={certifications.includes(cert)}
                onCheckedChange={() => toggleCertification(cert)}
                className="border-slate-600 data-[state=checked]:bg-brand-orange data-[state=checked]:border-brand-orange"
              />
              <Label htmlFor={cert} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-300">
                {cert}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="insurance" 
            checked={insuranceCoverage}
            onCheckedChange={(checked) => updateField('insuranceCoverage', checked === true)}
            className="border-slate-600 data-[state=checked]:bg-brand-orange data-[state=checked]:border-brand-orange"
          />
          <Label htmlFor="insurance" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white">
            We have comprehensive insurance coverage (Public Liability, Professional Indemnity, etc.)
          </Label>
        </div>
      </div>

      <div className="space-y-2 pt-4 border-t border-slate-800">
        <Label htmlFor="licensing" className="text-lg font-semibold text-white">Licensing Notes</Label>
        <p className="text-sm text-slate-400 mb-2">Any specific licenses or permits you hold?</p>
        <Textarea 
          id="licensing" 
          value={licensingNotes} 
          onChange={(e) => updateField('licensingNotes', e.target.value)}
          className="bg-[#13131A] border-slate-700 text-white min-h-[100px]"
          placeholder="e.g. Electrical Contractor License #12345..."
        />
      </div>
    </div>
  );
}
