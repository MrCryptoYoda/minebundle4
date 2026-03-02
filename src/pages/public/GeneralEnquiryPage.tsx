import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Mail, Phone, MapPin } from 'lucide-react';

export default function GeneralEnquiryPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Enquiry Sent",
        description: "We've received your message and will get back to you shortly.",
      });
      // Reset form logic would go here
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
        
        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Get in Touch</h1>
            <p className="text-xl text-slate-600">
              Have questions about listing an asset, finding a project, or partnering with us? We're here to help.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-brand-orange/10 p-3 rounded-lg">
                <Mail className="h-6 w-6 text-brand-orange" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Email Us</h3>
                <p className="text-slate-600">support@minexchange.com</p>
                <p className="text-slate-600">partnerships@minexchange.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-brand-orange/10 p-3 rounded-lg">
                <Phone className="h-6 w-6 text-brand-orange" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Call Us</h3>
                <p className="text-slate-600">+1 (555) 123-4567</p>
                <p className="text-sm text-slate-500">Mon-Fri, 9am - 5pm EST</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-brand-orange/10 p-3 rounded-lg">
                <MapPin className="h-6 w-6 text-brand-orange" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Headquarters</h3>
                <p className="text-slate-600">
                  100 Mining Way, Suite 400<br />
                  Toronto, ON M5J 2T3<br />
                  Canada
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <Card className="shadow-lg border-slate-200">
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
            <CardDescription>Fill out the form below and we'll direct your enquiry to the right team.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input id="firstName" required placeholder="Jane" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" required placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" type="email" required placeholder="jane@company.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="listing">Listing Support</SelectItem>
                    <SelectItem value="buying">Buyer Enquiry</SelectItem>
                    <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                    <SelectItem value="technical">Technical Issue</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea id="message" required placeholder="How can we help you?" className="min-h-[150px]" />
              </div>

              <Button type="submit" className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
