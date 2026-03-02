import React from 'react';
import { Link } from 'react-router-dom';

export default function SitemapPage() {
  const links = [
    { title: "Home", path: "/" },
    { title: "Search Projects", path: "/search" },
    { title: "List an Asset", path: "/list" },
    { title: "Marketplace", path: "/marketplace" },
    { title: "Agents", path: "/agents" },
    { title: "About Us", path: "/about" },
    { title: "How It Works", path: "/how-it-works" },
    { title: "Pricing", path: "/pricing" },
    { title: "Contact", path: "/enquiry" },
    { title: "Legal", path: "/legal/terms" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Sitemap</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {links.map((link) => (
            <li key={link.path}>
              <Link to={link.path} className="text-slate-600 hover:text-brand-orange hover:underline">
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
