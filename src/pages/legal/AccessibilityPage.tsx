import React from 'react';

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Accessibility Statement</h1>
        <p className="text-slate-600 mb-4">
          The Minexchange is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone, and applying the relevant accessibility standards.
        </p>
        <h2 className="text-xl font-bold text-slate-900 mt-6 mb-4">Conformance Status</h2>
        <p className="text-slate-600 mb-4">
          The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. The Minexchange is partially conformant with WCAG 2.1 level AA. Partially conformant means that some parts of the content do not fully conform to the accessibility standard.
        </p>
        <h2 className="text-xl font-bold text-slate-900 mt-6 mb-4">Feedback</h2>
        <p className="text-slate-600 mb-4">
          We welcome your feedback on the accessibility of The Minexchange. Please let us know if you encounter accessibility barriers on The Minexchange:
        </p>
        <ul className="list-disc pl-6 text-slate-600">
          <li>E-mail: accessibility@minexchange.com</li>
          <li>Postal address: 100 Mining Way, Suite 400, Toronto, ON M5J 2T3</li>
        </ul>
      </div>
    </div>
  );
}
