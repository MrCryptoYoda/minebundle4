import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getServiceById, ServiceListing } from '@/data/marketplaceData';
import { EnquiryDrawer } from '@/components/marketplace/EnquiryDrawer';
import { ServiceListingHero } from '@/components/marketplace/ServiceListingHero';
import { ServiceSidebar } from '@/components/marketplace/ServiceSidebar';
import { 
  MapPin, 
  CheckCircle2, 
  ChevronRight, 
  Heart, 
  MessageSquare, 
  Home, 
  FileText, 
  Briefcase, 
  Users, 
  FileDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<ServiceListing | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      if (id) {
        const result = getServiceById(id);
        setService(result);
      }
      setIsLoading(false);
    }, 800);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 pb-20">
        <div className="h-14 bg-slate-900 border-b border-slate-800" />
        <div className="h-[400px] bg-slate-900 animate-pulse" />
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <Skeleton className="h-12 w-full rounded-lg bg-slate-800" />
            <Skeleton className="h-[300px] w-full rounded-xl bg-slate-800" />
          </div>
          <div className="lg:col-span-4">
            <Skeleton className="h-[400px] w-full rounded-xl bg-slate-800" />
          </div>
        </div>
      </div>
    );
  }

  if (!service) {
    return <div className="p-12 text-center text-white">Service not found</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 pb-24 lg:pb-20 relative">
      {/* Breadcrumb */}
      <div className="bg-slate-950 border-b border-white/5">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-xs text-slate-400">
            <Link to="/" className="hover:text-white transition-colors"><Home className="h-3 w-3" /></Link>
            <ChevronRight className="h-3 w-3 opacity-50" />
            <Link to="/marketplace" className="hover:text-white transition-colors">Marketplace</Link>
            <ChevronRight className="h-3 w-3 opacity-50" />
            <Link to={`/marketplace/category/${service.category.toLowerCase().replace(/ /g, '-')}`} className="hover:text-white transition-colors">
              {service.category}
            </Link>
            <ChevronRight className="h-3 w-3 opacity-50" />
            <span className="text-white font-medium truncate max-w-[200px]">{service.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <ServiceListingHero 
        service={service}
        isSaved={isSaved}
        onSave={() => setIsSaved(!isSaved)}
        onEnquire={() => setEnquiryOpen(true)}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-8">
            <Tabs defaultValue="overview" className="w-full">
              <div className="sticky top-[4.5rem] z-20 bg-slate-950/95 backdrop-blur-sm pt-2 pb-4 -mx-4 px-4 lg:mx-0 lg:px-0">
                <TabsList className="w-full justify-start bg-slate-950 border border-white/5 p-1 h-auto overflow-x-auto flex-nowrap shadow-sm rounded-lg">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-slate-900 data-[state=active]:text-brand-orange text-slate-400 rounded-md px-4 py-2 text-sm whitespace-nowrap gap-2">
                    <FileText className="h-4 w-4" /> Overview
                  </TabsTrigger>
                  <TabsTrigger value="capabilities" className="data-[state=active]:bg-slate-900 data-[state=active]:text-brand-orange text-slate-400 rounded-md px-4 py-2 text-sm whitespace-nowrap gap-2">
                    <CheckCircle2 className="h-4 w-4" /> Capabilities
                  </TabsTrigger>
                  <TabsTrigger value="experience" className="data-[state=active]:bg-slate-900 data-[state=active]:text-brand-orange text-slate-400 rounded-md px-4 py-2 text-sm whitespace-nowrap gap-2">
                    <Briefcase className="h-4 w-4" /> Experience
                  </TabsTrigger>
                  <TabsTrigger value="team" className="data-[state=active]:bg-slate-900 data-[state=active]:text-brand-orange text-slate-400 rounded-md px-4 py-2 text-sm whitespace-nowrap gap-2">
                    <Users className="h-4 w-4" /> Team
                  </TabsTrigger>
                  <TabsTrigger value="docs" className="data-[state=active]:bg-slate-900 data-[state=active]:text-brand-orange text-slate-400 rounded-md px-4 py-2 text-sm whitespace-nowrap gap-2">
                    <FileDown className="h-4 w-4" /> Brochures
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="space-y-8 mt-4">
                {/* Overview Tab */}
                <TabsContent value="overview" className="mt-0 focus-visible:outline-none">
                  <Card className="border-white/5 bg-slate-950 shadow-sm overflow-hidden">
                    <CardHeader className="bg-slate-950 border-b border-white/5 pb-4">
                      <CardTitle className="text-lg font-bold text-white">Service Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 sm:p-8">
                      <div className="prose prose-invert max-w-none text-sm sm:text-base leading-relaxed text-slate-400">
                        <p className="mb-6 font-medium text-slate-200 text-lg">
                          {service.summary}
                        </p>
                        <p className="whitespace-pre-line mb-8">
                          {service.description}
                        </p>
                        
                        <h4 className="text-white font-bold text-lg mb-4">Key Benefits</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            'Industry leading expertise and technology',
                            'Proven track record of successful project delivery',
                            'Commitment to safety and environmental standards',
                            'Cost-effective solutions tailored to your needs'
                          ].map((benefit, i) => (
                            <div key={i} className="flex items-start gap-3 bg-slate-900/50 p-4 rounded-lg border border-white/5">
                              <div className="h-6 w-6 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0 mt-0.5">
                                <CheckCircle2 className="h-3.5 w-3.5 text-brand-orange" />
                              </div>
                              <span className="font-medium text-slate-200">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Capabilities Tab */}
                <TabsContent value="capabilities" className="mt-0 focus-visible:outline-none">
                  <Card className="border-white/5 bg-slate-950 shadow-sm overflow-hidden">
                    <CardHeader className="bg-slate-950 border-b border-white/5 pb-4">
                      <CardTitle className="text-lg font-bold text-white">Core Capabilities</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 sm:p-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(service.capabilities || ['Project Management', 'Technical Consulting', 'Data Analysis', 'Field Operations', 'Reporting', 'Compliance']).map((cap, i) => (
                          <div key={i} className="flex items-center gap-3 p-4 bg-slate-900/50 border border-white/5 rounded-lg hover:border-brand-orange/30 hover:shadow-sm transition-all">
                            <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center shrink-0">
                              <CheckCircle2 className="h-4 w-4 text-slate-400" />
                            </div>
                            <span className="font-semibold text-slate-200">{cap}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Experience Tab */}
                <TabsContent value="experience" className="mt-0 focus-visible:outline-none">
                  <Card className="border-white/5 bg-slate-950 shadow-sm overflow-hidden">
                    <CardHeader className="bg-slate-950 border-b border-white/5 pb-4">
                      <CardTitle className="text-lg font-bold text-white">Featured Projects</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 sm:p-8 space-y-6">
                      {service.projects && service.projects.length > 0 ? (
                        service.projects.map((project, i) => (
                          <div key={i} className="flex flex-col md:flex-row gap-6 border border-white/5 rounded-xl overflow-hidden hover:shadow-md transition-shadow bg-slate-900/50">
                            <div className="w-full md:w-48 h-48 md:h-auto bg-slate-900 shrink-0">
                              {project.image && (
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                              )}
                            </div>
                            <div className="p-6 flex flex-col justify-center">
                              <div className="flex items-center gap-2 text-xs font-bold text-brand-orange uppercase tracking-wide mb-2">
                                <MapPin className="h-3 w-3" /> {project.location}
                              </div>
                              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                              <p className="text-slate-400 leading-relaxed">{project.summary}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12 bg-slate-900/50 rounded-lg border border-dashed border-white/10">
                          <Briefcase className="h-10 w-10 text-slate-600 mx-auto mb-3" />
                          <p className="text-slate-400">No specific project case studies listed.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Team Tab */}
                <TabsContent value="team" className="mt-0 focus-visible:outline-none">
                  <Card className="border-white/5 bg-slate-950 shadow-sm overflow-hidden">
                    <CardHeader className="bg-slate-950 border-b border-white/5 pb-4">
                      <CardTitle className="text-lg font-bold text-white">Key Personnel</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 sm:p-8">
                      {service.team && service.team.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                          {service.team.map((member, i) => (
                            <div key={i} className="text-center p-6 bg-slate-900/50 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                              <div className="w-24 h-24 mx-auto bg-slate-900 rounded-full p-1 mb-4 shadow-sm">
                                <img 
                                  src={member.image || `https://ui-avatars.com/api/?name=${member.name}&background=random`} 
                                  alt={member.name} 
                                  className="w-full h-full rounded-full object-cover"
                                />
                              </div>
                              <h4 className="font-bold text-white">{member.name}</h4>
                              <p className="text-sm text-brand-orange font-medium mt-1">{member.role}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 bg-slate-900/50 rounded-lg border border-dashed border-white/10">
                          <Users className="h-10 w-10 text-slate-600 mx-auto mb-3" />
                          <p className="text-slate-400">Team information not available.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Documents Tab */}
                <TabsContent value="docs" className="mt-0 focus-visible:outline-none">
                  <Card className="border-white/5 bg-slate-950 shadow-sm overflow-hidden">
                    <CardHeader className="bg-slate-950 border-b border-white/5 pb-4">
                      <CardTitle className="text-lg font-bold text-white">Brochures & Documents</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 sm:p-8">
                      {service.documents && service.documents.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {service.documents.map((doc, i) => (
                            <div key={i} className="flex items-center justify-between p-4 border border-white/5 rounded-lg hover:border-brand-orange/30 hover:bg-slate-900 transition-all group cursor-pointer bg-slate-900/50">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-red-900/20 rounded-lg flex items-center justify-center text-red-500 shrink-0">
                                  <FileText className="h-5 w-5" />
                                </div>
                                <div>
                                  <h4 className="font-medium text-white group-hover:text-brand-orange transition-colors">{doc.title}</h4>
                                  <p className="text-xs text-slate-500">{doc.type} • {doc.size}</p>
                                </div>
                              </div>
                              <Button variant="ghost" size="icon" className="text-slate-500 group-hover:text-brand-orange hover:bg-slate-800">
                                <FileDown className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 bg-slate-900/50 rounded-lg border border-dashed border-white/10">
                          <FileDown className="h-10 w-10 text-slate-600 mx-auto mb-3" />
                          <p className="text-slate-400">No downloadable documents available.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4">
            <ServiceSidebar 
              service={service}
              onEnquire={() => setEnquiryOpen(true)}
              onSave={() => setIsSaved(!isSaved)}
              isSaved={isSaved}
            />
          </div>

        </div>
      </div>

      {/* Mobile Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950 border-t border-white/5 p-4 lg:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3)]">
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 h-12 border-white/10 text-white bg-slate-900 hover:bg-slate-800 hover:text-white" onClick={() => setIsSaved(!isSaved)}>
            <Heart className={cn("h-5 w-5 mr-2", isSaved && "fill-current text-brand-orange")} />
            {isSaved ? 'Saved' : 'Save'}
          </Button>
          <Button className="flex-[2] bg-brand-orange hover:bg-brand-orange/90 h-12 text-base shadow-lg shadow-brand-orange/20" onClick={() => setEnquiryOpen(true)}>
            <MessageSquare className="h-4 w-4 mr-2" /> Enquire Now
          </Button>
        </div>
      </div>

      {/* Enquiry Drawer */}
      {service && (
        <EnquiryDrawer 
          isOpen={enquiryOpen} 
          onOpenChange={setEnquiryOpen} 
          service={service} 
        />
      )}
    </div>
  );
}
