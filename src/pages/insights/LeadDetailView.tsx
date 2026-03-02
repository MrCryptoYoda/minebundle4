import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_LEADS } from '@/data/insightsMockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Calendar, 
  Briefcase, 
  DollarSign, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Share2, 
  MoreHorizontal,
  Sparkles,
  Send,
  Copy,
  FileText
} from 'lucide-react';
import { useInsights } from '@/context/InsightsContext';

export default function LeadDetailView() {
  const { id } = useParams();
  const { plan } = useInsights();
  const isPaid = plan === 'SP_PAID';
  
  const lead = MOCK_LEADS.find(l => l.id === id);
  const [activeTab, setActiveTab] = useState('overview');
  const [emailDraft, setEmailDraft] = useState('');
  const [isDrafting, setIsDrafting] = useState(false);

  if (!lead) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
        <AlertCircle className="h-12 w-12 mb-4 text-slate-600" />
        <h2 className="text-xl font-semibold text-white">Lead not found</h2>
        <p className="mb-6">The lead you are looking for does not exist or has been removed.</p>
        <Button asChild variant="outline">
          <Link to="/insights/leads">Back to Leads</Link>
        </Button>
      </div>
    );
  }

  const handleGenerateDraft = () => {
    setIsDrafting(true);
    // Simulate AI generation
    setTimeout(() => {
      setEmailDraft(`Subject: Partnership Opportunity - ${lead.company} & Your Services

Dear ${lead.company} Team,

I noticed your recent announcement regarding the ${lead.title} project in ${lead.region.join(', ')}. Given your focus on ${lead.commodity.join(' and ')}, I believe our services could be a strong fit for your upcoming needs.

We specialize in supporting projects at the ${lead.stage.join(', ')} stage, particularly in...

[AI continues to draft based on your profile...]

Best regards,
[Your Name]`);
      setIsDrafting(false);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Navigation */}
      <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
        <Link to="/insights/leads" className="hover:text-white transition-colors flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back to Leads
        </Link>
        <span>/</span>
        <span className="text-slate-200">{lead.company}</span>
      </div>

      {/* Header Card */}
      <div className="bg-[#1C1C24] border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
        
        <div className="flex flex-col md:flex-row justify-between gap-6 relative z-10">
          <div className="flex items-start gap-6">
            <div className="h-20 w-20 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl font-bold text-slate-300 shrink-0">
              {lead.company.substring(0, 2).toUpperCase()}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl font-bold text-white">{lead.title}</h1>
                <Badge variant="outline" className="border-brand-orange/30 text-brand-orange bg-brand-orange/10">
                  {lead.status}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-slate-400 text-sm flex-wrap">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4" />
                  {lead.company}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {lead.region.join(', ')}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  Posted {new Date(lead.postedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-4">
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white border-none">
                <Mail className="h-4 w-4 mr-2" />
                Contact
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Match Score */}
            <div className="flex items-center gap-3 bg-slate-800/50 p-2 rounded-lg border border-slate-700/50">
              <div className="text-right">
                <div className="text-xs text-slate-400 font-medium">AI Match Score</div>
                <div className="text-lg font-bold text-emerald-400">{lead.fitScore}%</div>
              </div>
              <div className="h-10 w-10 relative flex items-center justify-center">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-700"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="text-emerald-500"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeDasharray={`${lead.fitScore}, 100`}
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="bg-[#1C1C24] border border-slate-800 p-1 h-auto w-full justify-start rounded-xl mb-6">
          <TabsTrigger value="overview" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white text-slate-400 px-6 py-2.5 rounded-lg">Overview</TabsTrigger>
          <TabsTrigger value="intelligence" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white text-slate-400 px-6 py-2.5 rounded-lg">Intelligence</TabsTrigger>
          <TabsTrigger value="outreach" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white text-slate-400 px-6 py-2.5 rounded-lg">AI Outreach</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column (2 cols) */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-[#1C1C24] border-slate-800">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-white">Why this matches you</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-900/10 border border-blue-900/20 rounded-xl p-4 flex gap-4">
                    <Sparkles className="h-6 w-6 text-blue-400 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium text-blue-300 mb-1">High Relevance</h4>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {lead.whyThisLead}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-800">
                      <div className="text-slate-400 text-xs font-medium mb-1">Commodity Match</div>
                      <div className="text-white font-medium flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        {lead.commodity.join(', ')}
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-800">
                      <div className="text-slate-400 text-xs font-medium mb-1">Region Match</div>
                      <div className="text-white font-medium flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        {lead.region.join(', ')}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1C1C24] border-slate-800">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-white">Project Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 leading-relaxed">
                    {lead.aiSummary}
                  </p>
                  <div className="mt-6 space-y-4">
                    <h4 className="text-sm font-medium text-white">Key Highlights</h4>
                    <ul className="space-y-2">
                      {[
                        "Project recently approved for next phase of development",
                        "Secured $15M in additional funding for exploration",
                        "Looking for partners in environmental compliance and logistics"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                          <div className="h-1.5 w-1.5 rounded-full bg-brand-orange mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column (1 col) */}
            <div className="space-y-6">
              <Card className="bg-[#1C1C24] border-slate-800">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold text-white uppercase tracking-wider">Company Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-slate-800 flex items-center justify-center">
                      <Globe className="h-5 w-5 text-slate-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">Website</div>
                      <a href="#" className="text-xs text-brand-orange hover:underline">Visit website</a>
                    </div>
                  </div>
                  <Separator className="bg-slate-800" />
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-slate-800 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-slate-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">Headquarters</div>
                      <div className="text-xs text-slate-400">Perth, Western Australia</div>
                    </div>
                  </div>
                  <Separator className="bg-slate-800" />
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-slate-800 flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-slate-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">Market Cap</div>
                      <div className="text-xs text-slate-400">$145M AUD</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1C1C24] border-slate-800">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold text-white uppercase tracking-wider">Key Contacts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Sarah Jenkins", role: "Project Director", email: "s.jenkins@example.com" },
                    { name: "Michael Ross", role: "Procurement Manager", email: "m.ross@example.com" }
                  ].map((contact, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-slate-700 text-xs">{contact.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white truncate">{contact.name}</div>
                        <div className="text-xs text-slate-400 truncate">{contact.role}</div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-white">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Intelligence Tab */}
        <TabsContent value="intelligence" className="mt-0">
          <Card className="bg-[#1C1C24] border-slate-800">
            <CardContent className="p-8 text-center py-20">
              <div className="h-16 w-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-slate-500" />
              </div>
              <h3 className="text-lg font-medium text-white">Deep Intelligence</h3>
              <p className="text-slate-500 max-w-md mx-auto mt-2 mb-6">
                Unlock detailed financial reports, news sentiment analysis, and regulatory filings for this company.
              </p>
              <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                Upgrade to Pro to Unlock
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Outreach Tab */}
        <TabsContent value="outreach" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-[#1C1C24] border-slate-800">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-brand-orange" />
                    AI Draft Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!emailDraft ? (
                    <div className="text-center py-12 border border-dashed border-slate-700 rounded-xl bg-slate-800/20">
                      <Mail className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                      <h3 className="text-white font-medium mb-2">Generate a personalized outreach email</h3>
                      <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
                        Our AI analyzes the lead's project details and your service profile to create a highly relevant introduction.
                      </p>
                      <Button 
                        onClick={handleGenerateDraft} 
                        disabled={isDrafting}
                        className="bg-brand-orange hover:bg-brand-orange/90 text-white"
                      >
                        {isDrafting ? "Generating..." : "Generate Draft Email"}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4 animate-in fade-in zoom-in-95">
                      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                        {emailDraft}
                      </div>
                      <div className="flex gap-3">
                        <Button className="bg-white text-slate-900 hover:bg-slate-200">
                          <Copy className="h-4 w-4 mr-2" />
                          Copy to Clipboard
                        </Button>
                        <Button variant="outline" className="border-slate-700 text-slate-300 hover:text-white" onClick={() => setEmailDraft('')}>
                          Discard
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
               <Card className="bg-[#1C1C24] border-slate-800">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold text-white uppercase tracking-wider">Outreach Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-xs font-bold shrink-0">1</div>
                    <p className="text-sm text-slate-400">Mention their recent funding round to show you've done your research.</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-xs font-bold shrink-0">2</div>
                    <p className="text-sm text-slate-400">Highlight your experience in {lead.region[0]} specifically.</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-xs font-bold shrink-0">3</div>
                    <p className="text-sm text-slate-400">Keep the initial email under 150 words.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
