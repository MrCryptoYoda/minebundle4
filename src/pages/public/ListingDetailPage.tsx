import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDemo } from '@/context/DemoContext';
import { MOCK_LISTINGS, IMAGES } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight, Home, Settings, MapPin, FileText, Info, Lock, Database, Building2, Map as MapIcon, FileSignature, MessageSquare, Heart } from 'lucide-react';
import { ListingHero } from '@/components/listing/ListingHero';
import { AgentSidebar } from '@/components/listing/AgentSidebar';
import { DataRoom } from '@/components/listing/DataRoom';
import { EnquiryForm } from '@/components/listing/EnquiryForm';
import { SimilarListings } from '@/components/listing/SimilarListings';
import { NDAPromptModal, NDASigningModal } from '@/components/listing/NDAModals';
import { ListingChatbotPanel } from '@/components/listing/ListingChatbotPanel';
import { SellerInfoSection } from '@/components/listing/SellerInfoSection';
import { GatedContent } from '@/components/listing/GatedContent';
import { LockedTabContent } from '@/components/listing/LockedTabContent';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

export default function ListingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  // We'll use local state for the demo controls to override context if needed, 
  // but syncing with context is better for global consistency.
  // For this specific requirement "Implement 3 states with a controllable mock state",
  // I will add a local override layer.
  const { isAuthenticated: ctxAuth, ndaSigned: ctxNda, login, setNdaSigned } = useDemo();
  
  const [demoAuth, setDemoAuth] = useState(ctxAuth);
  const [demoNda, setDemoNda] = useState(ctxNda);
  const [isSaved, setIsSaved] = useState(false);
  
  // Sync with context initially
  useEffect(() => {
    setDemoAuth(ctxAuth);
    setDemoNda(ctxNda);
  }, [ctxAuth, ctxNda]);

  const listing = MOCK_LISTINGS.find(l => l.id === id) || MOCK_LISTINGS[0];

  // Modals
  const [showNdaPrompt, setShowNdaPrompt] = useState(false);
  const [showNdaSigning, setShowNdaSigning] = useState(false);

  // Handlers
  const handleSave = () => {
    if (!demoAuth) {
      // Trigger login modal or redirect
      alert("Please sign in to save this project.");
      return;
    }
    setIsSaved(!isSaved);
  };

  const handleEnquire = () => {
    document.getElementById('enquiry-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAccessDataRoom = () => {
    if (!demoAuth) {
      alert("Please sign in to access the data room.");
      return;
    }
    if (!demoNda) {
      setShowNdaPrompt(true);
    }
  };

  const handleSignNda = () => {
    setDemoNda(true);
    setNdaSigned(true); // Sync back to context
    setShowNdaSigning(false);
  };

  const handleGatedAction = () => {
    if (!demoAuth) {
      alert("Please sign in to continue.");
    } else {
      setShowNdaPrompt(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 lg:pb-20 relative">
      {/* Debug / Demo Controls */}
      <div className="fixed bottom-24 lg:bottom-4 left-4 z-50 bg-slate-900 text-white p-3 rounded-lg shadow-xl border border-slate-700 opacity-90 hover:opacity-100 transition-opacity hidden lg:block">
        <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Settings className="h-3 w-3" /> Demo Controls
        </div>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-xs cursor-pointer">
            <input 
              type="checkbox" 
              checked={demoAuth} 
              onChange={(e) => {
                setDemoAuth(e.target.checked);
                if (!e.target.checked) setDemoNda(false);
              }}
              className="rounded border-slate-600 bg-slate-800 text-brand-orange focus:ring-brand-orange"
            />
            Authenticated
          </label>
          <label className="flex items-center gap-2 text-xs cursor-pointer">
            <input 
              type="checkbox" 
              checked={demoNda} 
              onChange={(e) => setDemoNda(e.target.checked)}
              disabled={!demoAuth}
              className="rounded border-slate-600 bg-slate-800 text-brand-orange focus:ring-brand-orange disabled:opacity-50"
            />
            NDA Signed
          </label>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-xs text-slate-400">
            <Link to="/" className="hover:text-white transition-colors"><Home className="h-3 w-3" /></Link>
            <ChevronRight className="h-3 w-3 opacity-50" />
            <Link to="/search" className="hover:text-white transition-colors">Search Results</Link>
            <ChevronRight className="h-3 w-3 opacity-50" />
            <span className="text-white font-medium truncate max-w-[200px]">{listing.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <ListingHero 
        listing={listing} 
        isGated={!demoNda} 
        onSave={handleSave}
        isSaved={isSaved}
        onEnquire={handleEnquire}
        onSignNda={() => setShowNdaPrompt(true)}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-8">
          
          {/* Tabs & Sections */}
          <Tabs defaultValue="project" className="w-full">
            <div className="sticky top-[4.5rem] z-20 bg-slate-50/95 backdrop-blur-sm pt-2 pb-4 -mx-4 px-4 lg:mx-0 lg:px-0">
              <TabsList className="w-full justify-start bg-white border border-slate-200 p-1 h-auto overflow-x-auto flex-nowrap shadow-sm rounded-lg">
                <TabsTrigger value="project" className="data-[state=active]:bg-slate-100 data-[state=active]:text-brand-orange rounded-md px-4 py-2 text-sm whitespace-nowrap gap-2">
                  <FileText className="h-4 w-4" /> Project Info
                </TabsTrigger>
                <TabsTrigger value="highlights" className="data-[state=active]:bg-slate-100 data-[state=active]:text-brand-orange rounded-md px-4 py-2 text-sm whitespace-nowrap gap-2">
                  <Info className="h-4 w-4" /> Highlights
                </TabsTrigger>
                <TabsTrigger value="location" className="data-[state=active]:bg-slate-100 data-[state=active]:text-brand-orange rounded-md px-4 py-2 text-sm whitespace-nowrap gap-2">
                  <MapIcon className="h-4 w-4" /> Location
                </TabsTrigger>
                <TabsTrigger value="resource" className="data-[state=active]:bg-slate-100 data-[state=active]:text-brand-orange rounded-md px-4 py-2 text-sm whitespace-nowrap gap-2">
                  <Database className="h-4 w-4" /> Resource
                </TabsTrigger>
                <TabsTrigger value="seller" className="data-[state=active]:bg-slate-100 data-[state=active]:text-brand-orange rounded-md px-4 py-2 text-sm whitespace-nowrap gap-2">
                  <Building2 className="h-4 w-4" /> Seller
                </TabsTrigger>
                <TabsTrigger value="dataroom" className="data-[state=active]:bg-slate-100 data-[state=active]:text-brand-orange rounded-md px-4 py-2 text-sm whitespace-nowrap gap-2">
                  <Lock className="h-4 w-4" /> Data Room
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="space-y-8 mt-4">
              <TabsContent value="project" className="mt-0 focus-visible:outline-none">
                <Card className="border-slate-200 shadow-sm overflow-hidden">
                  <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
                    <CardTitle className="text-lg font-bold text-slate-900">Project Information</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 sm:p-8">
                    <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-slate-600">
                      <p className="mb-6">
                        {listing.summary}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                          <h4 className="font-semibold text-slate-900 mb-2 text-sm uppercase tracking-wide">Development Stage</h4>
                          <p className="text-slate-700 font-medium">{listing.stage}</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                          <h4 className="font-semibold text-slate-900 mb-2 text-sm uppercase tracking-wide">Primary Commodity</h4>
                          <p className="text-slate-700 font-medium">{listing.commodity.join(', ')}</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                          <h4 className="font-semibold text-slate-900 mb-2 text-sm uppercase tracking-wide">Deal Type</h4>
                          <p className="text-slate-700 font-medium">Asset Sale / Joint Venture</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                          <h4 className="font-semibold text-slate-900 mb-2 text-sm uppercase tracking-wide">Project Ownership</h4>
                          <p className="text-slate-700 font-medium">100% Owned</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="highlights" className="mt-0 focus-visible:outline-none">
                {!demoNda ? (
                  <LockedTabContent 
                    title="Exploration Highlights" 
                    isAuthenticated={demoAuth}
                    onAction={handleGatedAction}
                  />
                ) : (
                  <Card className="border-slate-200 shadow-sm overflow-hidden">
                    <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
                      <CardTitle className="text-lg font-bold text-slate-900">Exploration Highlights</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 sm:p-8">
                      <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-slate-600">
                        <p className="mb-4">
                          This project represents a significant opportunity in the region, with historical data suggesting strong potential for resource expansion.
                        </p>
                        <h4 className="text-slate-900 font-semibold mt-6 mb-3">Key Features</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-0 my-6">
                          {listing.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg border border-slate-100">
                              <div className="h-6 w-6 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0 mt-0.5">
                                <div className="h-2 w-2 rounded-full bg-brand-orange" />
                              </div>
                              <span className="font-medium text-slate-800">{highlight}</span>
                            </li>
                          ))}
                          <li className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg border border-slate-100">
                            <div className="h-6 w-6 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0 mt-0.5">
                              <div className="h-2 w-2 rounded-full bg-brand-orange" />
                            </div>
                            <span className="font-medium text-slate-800">Excellent infrastructure access via paved roads</span>
                          </li>
                          <li className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg border border-slate-100">
                            <div className="h-6 w-6 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0 mt-0.5">
                              <div className="h-2 w-2 rounded-full bg-brand-orange" />
                            </div>
                            <span className="font-medium text-slate-800">Strong community support and local workforce</span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="location" className="mt-0 focus-visible:outline-none">
                {!demoNda ? (
                  <LockedTabContent 
                    title="Tenement Location" 
                    isAuthenticated={demoAuth}
                    onAction={handleGatedAction}
                  />
                ) : (
                  <Card className="border-slate-200 shadow-sm overflow-hidden">
                    <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
                      <CardTitle className="text-lg font-bold text-slate-900">Tenement Location</CardTitle>
                    </CardHeader>
                    <div className="aspect-video bg-slate-100 relative group cursor-pointer border-b border-slate-200">
                      <img 
                        src={IMAGES[5]} 
                        alt="Location Map" 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button variant="secondary" className="shadow-lg gap-2 bg-white/90 hover:bg-white text-slate-900">
                          <MapIcon className="h-4 w-4" /> View Interactive Map
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-6 sm:p-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">Access & Infrastructure</h4>
                          <p className="text-sm text-slate-600 leading-relaxed">
                            The project is located approximately 45km from the nearest regional center. Access is via a sealed highway followed by 12km of well-maintained gravel road. Power and water are available on site.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">Tenure Details</h4>
                          <ul className="text-sm text-slate-600 space-y-2">
                            <li className="flex justify-between border-b border-slate-100 pb-2">
                              <span>Tenement ID:</span> <span className="font-mono text-slate-900 bg-slate-100 px-2 py-0.5 rounded">E 45/1234</span>
                            </li>
                            <li className="flex justify-between border-b border-slate-100 pb-2 pt-1">
                              <span>Status:</span> <span className="text-green-600 font-medium flex items-center gap-1"><div className="h-1.5 w-1.5 rounded-full bg-green-500" /> Granted</span>
                            </li>
                            <li className="flex justify-between border-b border-slate-100 pb-2 pt-1">
                              <span>Expiry:</span> <span>12/2028</span>
                            </li>
                            <li className="flex justify-between pt-1">
                              <span>Area:</span> <span>125 blocks</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="resource" className="mt-0 focus-visible:outline-none">
                {!demoNda ? (
                  <LockedTabContent 
                    title="Resource / Reserve Detail" 
                    isAuthenticated={demoAuth}
                    onAction={handleGatedAction}
                  />
                ) : (
                  <Card className="border-slate-200 shadow-sm overflow-hidden">
                    <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
                      <CardTitle className="text-lg font-bold text-slate-900">Resource / Reserve Detail</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 sm:p-8">
                      <div className="space-y-6">
                        <div className="bg-green-50 p-4 rounded-lg border border-green-100 flex items-start gap-3">
                          <div className="bg-green-100 p-2 rounded-full">
                            <Lock className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-green-800 text-sm">Full Access Granted</h4>
                            <p className="text-green-700 text-xs mt-1">You have signed the NDA and can view detailed resource data.</p>
                          </div>
                        </div>
                        
                        <div className="overflow-x-auto border rounded-xl">
                          <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                              <tr>
                                <th className="p-4">Category</th>
                                <th className="p-4">Tonnes (Mt)</th>
                                <th className="p-4">Grade (g/t)</th>
                                <th className="p-4">Contained Metal (koz)</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              <tr className="hover:bg-slate-50/50">
                                <td className="p-4 font-medium text-slate-900">Indicated</td>
                                <td className="p-4 text-slate-600">12.5</td>
                                <td className="p-4 text-slate-600">2.4</td>
                                <td className="p-4 text-slate-600">965</td>
                              </tr>
                              <tr className="hover:bg-slate-50/50">
                                <td className="p-4 font-medium text-slate-900">Inferred</td>
                                <td className="p-4 text-slate-600">8.2</td>
                                <td className="p-4 text-slate-600">1.8</td>
                                <td className="p-4 text-slate-600">475</td>
                              </tr>
                              <tr className="bg-slate-50 font-bold text-slate-900">
                                <td className="p-4">Total</td>
                                <td className="p-4">20.7</td>
                                <td className="p-4">2.16</td>
                                <td className="p-4">1,440</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="border border-slate-200 rounded-lg p-4 hover:border-brand-orange/30 transition-colors">
                            <h4 className="font-bold text-slate-900 mb-2">Resource Block Model</h4>
                            <p className="text-sm text-slate-500 mb-4">Download the full CSV block model for import into Surpac/Micromine.</p>
                            <Button variant="outline" size="sm" className="w-full gap-2">
                              <Database className="h-4 w-4" /> Download CSV (45MB)
                            </Button>
                          </div>
                          <div className="border border-slate-200 rounded-lg p-4 hover:border-brand-orange/30 transition-colors">
                            <h4 className="font-bold text-slate-900 mb-2">Drill Hole Database</h4>
                            <p className="text-sm text-slate-500 mb-4">Complete collar, survey, and assay tables.</p>
                            <Button variant="outline" size="sm" className="w-full gap-2">
                              <FileText className="h-4 w-4" /> Download Access DB (12MB)
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="seller" className="mt-0 focus-visible:outline-none">
                {!demoNda ? (
                  <LockedTabContent 
                    title="Seller Information" 
                    isAuthenticated={demoAuth}
                    onAction={handleGatedAction}
                  />
                ) : (
                  <SellerInfoSection listing={listing} />
                )}
              </TabsContent>

              <TabsContent value="dataroom" className="mt-0 focus-visible:outline-none">
                <DataRoom 
                  listing={listing}
                  isAuthenticated={demoAuth}
                  isNdaSigned={demoNda}
                  onSignNda={() => setShowNdaPrompt(true)}
                  onLogin={() => alert("Please sign in.")}
                />
              </TabsContent>
            </div>
          </Tabs>

            {/* Enquiry Section (Bottom) */}
            <div id="enquiry-section">
              <EnquiryForm 
                isAuthenticated={demoAuth}
                isNdaSigned={demoNda}
                onLogin={() => alert("Please sign in.")}
                onSignNda={() => setShowNdaPrompt(true)}
                listingTitle={listing.title}
              />
            </div>

          </div>

          {/* Right Sidebar Column */}
          <div className="lg:col-span-4">
            <AgentSidebar 
              listing={listing}
              onEnquire={handleEnquire}
              onSave={handleSave}
              onSignNda={() => setShowNdaPrompt(true)}
              isSaved={isSaved}
              isNdaSigned={demoNda}
            />
          </div>

        </div>
      </div>

      {/* Similar Listings */}
      <SimilarListings currentListingId={listing.id} />

      {/* Chatbot */}
      <ListingChatbotPanel 
        listing={listing}
        isGated={!demoNda}
        isAuthenticated={demoAuth}
      />

      {/* Mobile Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 p-4 lg:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="flex gap-3">
          {!demoAuth ? (
            <Button className="w-full bg-brand-orange hover:bg-brand-orange/90 h-12 text-base" onClick={() => alert("Please sign in.")}>
              Sign In to View Details
            </Button>
          ) : !demoNda ? (
            <>
              <Button variant="outline" className="flex-1 h-12" onClick={handleSave}>
                <Heart className={cn("h-5 w-5 mr-2", isSaved && "fill-current text-brand-orange")} />
                {isSaved ? 'Saved' : 'Save'}
              </Button>
              <Button className="flex-[2] bg-slate-900 hover:bg-slate-800 h-12 text-base" onClick={() => setShowNdaPrompt(true)}>
                <Lock className="h-4 w-4 mr-2" /> Sign NDA to Access
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" className="flex-1 h-12" onClick={handleAccessDataRoom}>
                <Database className="h-5 w-5 mr-2" />
                Data Room
              </Button>
              <Button className="flex-[2] bg-brand-orange hover:bg-brand-orange/90 h-12 text-base" onClick={handleEnquire}>
                <MessageSquare className="h-4 w-4 mr-2" /> Enquire Now
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <NDAPromptModal 
        isOpen={showNdaPrompt}
        onClose={() => setShowNdaPrompt(false)}
        onContinue={() => {
          setShowNdaPrompt(false);
          setShowNdaSigning(true);
        }}
        listingTitle={listing.title}
      />

      <NDASigningModal 
        isOpen={showNdaSigning}
        onClose={() => setShowNdaSigning(false)}
        onSign={handleSignNda}
        listingTitle={listing.title}
      />

    </div>
  );
}
