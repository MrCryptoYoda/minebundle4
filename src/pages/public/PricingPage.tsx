import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Choose the plan that fits your needs. Whether you're listing a single asset or managing a portfolio.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Tier */}
          <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-slate-900">Basic Listing</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold text-slate-900">$0</span>
                <span className="text-slate-500 ml-2">/ month</span>
              </div>
              <p className="text-slate-500 mt-2">Perfect for single asset visibility.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="text-slate-700">1 Active Listing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="text-slate-700">Basic Search Visibility</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="text-slate-700">Standard Support</span>
                </li>
                <li className="flex items-center gap-2 text-slate-400">
                  <XCircle className="h-5 w-5" />
                  <span className="line-through">Data Room Analytics</span>
                </li>
                <li className="flex items-center gap-2 text-slate-400">
                  <XCircle className="h-5 w-5" />
                  <span className="line-through">Priority Placement</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant="outline">
                <Link to="/auth/sign-up">Get Started</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Professional Tier */}
          <Card className="border-brand-orange shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              POPULAR
            </div>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-slate-900">Professional</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold text-slate-900">$299</span>
                <span className="text-slate-500 ml-2">/ month</span>
              </div>
              <p className="text-slate-500 mt-2">For serious sellers and agents.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-brand-orange" />
                  <span className="text-slate-900 font-medium">Up to 5 Active Listings</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-brand-orange" />
                  <span className="text-slate-900 font-medium">Enhanced Visibility</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-brand-orange" />
                  <span className="text-slate-900 font-medium">Data Room Analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-brand-orange" />
                  <span className="text-slate-900 font-medium">Buyer Interest Matching</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-brand-orange" />
                  <span className="text-slate-900 font-medium">Priority Support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white">
                <Link to="/auth/sign-up?plan=pro">Start Free Trial</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Enterprise Tier */}
          <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-slate-900">Enterprise</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold text-slate-900">Custom</span>
              </div>
              <p className="text-slate-500 mt-2">For large portfolios and institutions.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-slate-700" />
                  <span className="text-slate-700">Unlimited Listings</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-slate-700" />
                  <span className="text-slate-700">Dedicated Account Manager</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-slate-700" />
                  <span className="text-slate-700">Custom Branding</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-slate-700" />
                  <span className="text-slate-700">API Access</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-slate-700" />
                  <span className="text-slate-700">Advanced Security Controls</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant="outline">
                <Link to="/enquiry">Contact Sales</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left mt-8">
            <div>
              <h3 className="font-bold text-slate-900 mb-2">Can I cancel anytime?</h3>
              <p className="text-slate-600">Yes, you can cancel your subscription at any time. Your listing will remain active until the end of the billing period.</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-2">What happens to my data?</h3>
              <p className="text-slate-600">Your data is securely stored and encrypted. We do not share your confidential project data without your explicit permission via NDA.</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-2">Do you take a commission?</h3>
              <p className="text-slate-600">We do not take a commission on transactions facilitated through the platform unless specifically agreed upon in a separate Agent Facilitation Agreement.</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-2">Is there a free trial?</h3>
              <p className="text-slate-600">Yes, the Professional plan comes with a 14-day free trial so you can explore the advanced features risk-free.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
