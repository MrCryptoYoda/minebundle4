import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-sm text-slate-500 hover:text-brand-orange transition-colors mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <FileText className="h-8 w-8 text-brand-orange" />
            Terms of Service
          </h1>
          <p className="text-slate-500 mt-2">Last Updated: October 24, 2025</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-8 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using The Minexchange platform ("Platform"), you agree to comply with and be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">2. Platform Services</h2>
            <p>
              The Minexchange provides a digital marketplace for the listing, discovery, and facilitation of mining asset transactions. We act as a venue provider and facilitator but are not a party to the actual transaction between buyers and sellers unless explicitly stated otherwise.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">3. User Accounts</h2>
            <p className="mb-4">
              To access certain features, you must register for an account. You agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate, current, and complete information.</li>
              <li>Maintain the security of your password and identification.</li>
              <li>Accept all responsibility for any and all activities that occur under your account.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">4. Listing Accuracy</h2>
            <p>
              Sellers and Agents are solely responsible for the accuracy, completeness, and legality of the information provided in their listings. The Minexchange does not verify all data points and makes no warranties regarding the viability of any project listed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">5. Confidentiality & NDAs</h2>
            <p>
              Users agree to respect the confidentiality of information accessed through the Platform's Data Rooms. Accessing sensitive documents typically requires the electronic execution of a Non-Disclosure Agreement (NDA). You agree that your electronic signature on such NDAs is legally binding.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">6. Limitation of Liability</h2>
            <p>
              In no event shall The Minexchange be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Platform.
            </p>
          </section>

          <div className="pt-8 border-t border-slate-100">
            <p className="text-sm text-slate-500 mb-4">
              For questions regarding these terms, please contact our legal team.
            </p>
            <Button asChild variant="outline">
              <Link to="/enquiry">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
