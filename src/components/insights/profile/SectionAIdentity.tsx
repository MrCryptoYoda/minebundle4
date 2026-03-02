import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProfileStore } from '@/store/profileStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Upload } from 'lucide-react';

export function SectionAIdentity() {
  const { 
    companyName, website, hqCountry, hqState, tradingName, description, 
    linkedinUrl, contactEmail, contactPhone, companySize, yearEstablished, logo,
    updateField 
  } = useProfileStore();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-semibold text-white mb-1">Company Identity</h2>
        <p className="text-slate-400 text-sm">Basic information about your organization used for verification and profile display.</p>
      </div>

      <Card className="bg-[#1C1C24] border-slate-800">
        <CardHeader>
          <CardTitle className="text-base text-white">Core Information</CardTitle>
          <CardDescription>Required fields marked with *</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Legal Name *</Label>
              <Input 
                id="companyName" 
                value={companyName}
                onChange={(e) => updateField('companyName', e.target.value)}
                placeholder="e.g. Acme Mining Services Pty Ltd"
                className="bg-[#13131A] border-slate-700"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tradingName">Trading Name (Optional)</Label>
              <Input 
                id="tradingName" 
                value={tradingName}
                onChange={(e) => updateField('tradingName', e.target.value)}
                placeholder="e.g. Acme Services"
                className="bg-[#13131A] border-slate-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="website">Website *</Label>
              <Input 
                id="website" 
                value={website}
                onChange={(e) => updateField('website', e.target.value)}
                placeholder="https://..."
                className="bg-[#13131A] border-slate-700"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn URL</Label>
              <Input 
                id="linkedin" 
                value={linkedinUrl}
                onChange={(e) => updateField('linkedinUrl', e.target.value)}
                placeholder="https://linkedin.com/company/..."
                className="bg-[#13131A] border-slate-700"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Company Description</Label>
            <Textarea 
              id="description" 
              value={description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Briefly describe your company's expertise and value proposition..."
              className="bg-[#13131A] border-slate-700 min-h-[100px]"
            />
            <p className="text-xs text-slate-500">This will be displayed on your marketplace profile.</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#1C1C24] border-slate-800">
        <CardHeader>
          <CardTitle className="text-base text-white">Location & Contact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hqCountry">HQ Country *</Label>
              <Select value={hqCountry} onValueChange={(v) => updateField('hqCountry', v)}>
                <SelectTrigger className="bg-[#13131A] border-slate-700">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Australia">Australia</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="USA">USA</SelectItem>
                  <SelectItem value="UK">UK</SelectItem>
                  <SelectItem value="South Africa">South Africa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hqState">HQ State/Province</Label>
              <Input 
                id="hqState" 
                value={hqState}
                onChange={(e) => updateField('hqState', e.target.value)}
                placeholder="e.g. Western Australia"
                className="bg-[#13131A] border-slate-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Primary Contact Email</Label>
              <Input 
                id="contactEmail" 
                type="email"
                value={contactEmail}
                onChange={(e) => updateField('contactEmail', e.target.value)}
                className="bg-[#13131A] border-slate-700"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPhone">Primary Contact Phone</Label>
              <Input 
                id="contactPhone" 
                type="tel"
                value={contactPhone}
                onChange={(e) => updateField('contactPhone', e.target.value)}
                className="bg-[#13131A] border-slate-700"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#1C1C24] border-slate-800">
        <CardHeader>
          <CardTitle className="text-base text-white">Company Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companySize">Company Size</Label>
              <Select value={companySize} onValueChange={(v) => updateField('companySize', v)}>
                <SelectTrigger className="bg-[#13131A] border-slate-700">
                  <SelectValue placeholder="Select Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 Employees</SelectItem>
                  <SelectItem value="11-50">11-50 Employees</SelectItem>
                  <SelectItem value="51-200">51-200 Employees</SelectItem>
                  <SelectItem value="200+">200+ Employees</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearEstablished">Year Established</Label>
              <Input 
                id="yearEstablished" 
                value={yearEstablished}
                onChange={(e) => updateField('yearEstablished', e.target.value)}
                placeholder="YYYY"
                className="bg-[#13131A] border-slate-700"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Company Logo</Label>
            <div 
              className="border-2 border-dashed border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-800/50 transition-colors cursor-pointer"
              onClick={() => updateField('logo', 'https://via.placeholder.com/150')}
            >
              {logo ? (
                <div className="relative">
                  <img src={logo} alt="Logo" className="h-20 w-20 object-contain rounded" />
                  <p className="text-xs text-green-500 mt-2">Logo Uploaded</p>
                </div>
              ) : (
                <>
                  <div className="h-10 w-10 bg-slate-800 rounded-full flex items-center justify-center mb-2">
                    <Upload className="h-5 w-5 text-slate-400" />
                  </div>
                  <p className="text-sm text-slate-300 font-medium">Click to upload logo</p>
                  <p className="text-xs text-slate-500 mt-1">SVG, PNG, JPG or GIF (max. 2MB)</p>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
