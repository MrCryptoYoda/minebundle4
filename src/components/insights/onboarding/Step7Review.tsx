import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProfileStore } from '@/store/profileStore';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export function Step7Review() {
  const state = useProfileStore();
  const completeness = state.calculateCompleteness();

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-4 bg-emerald-500/10 rounded-full mb-4">
          <CheckCircle2 className="h-12 w-12 text-emerald-500" />
        </div>
        <h2 className="text-3xl font-bold text-white">Ready to Launch!</h2>
        <p className="text-slate-400 max-w-lg mx-auto">
          You've completed the essential onboarding steps. Your profile is now {completeness}% complete.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card className="bg-[#13131A] border-slate-800">
          <CardHeader>
            <CardTitle className="text-lg text-white">Company Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-500">Name:</span>
              <span>{state.companyName || 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">HQ:</span>
              <span>{state.hqCountry || 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Website:</span>
              <span>{state.website || 'Not set'}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#13131A] border-slate-800">
          <CardHeader>
            <CardTitle className="text-lg text-white">Capabilities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-500">Services:</span>
              <span>{state.serviceCategories.length} selected</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Regions:</span>
              <span>{state.coverageCountries.length} countries</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Commodities:</span>
              <span>{state.commodities.length} selected</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {completeness < 80 && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3 max-w-2xl mx-auto">
          <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
          <div>
            <h4 className="font-bold text-amber-500">Profile Strength: Moderate</h4>
            <p className="text-sm text-slate-400 mt-1">
              Adding more details about past projects and team structure will improve your visibility to project owners.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
