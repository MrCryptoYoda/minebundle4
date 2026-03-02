import React from 'react';
import { MOCK_LEADS } from '@/data/insightsMockData';
import { useInsights } from '@/context/InsightsContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CompareLeadsPage() {
  const { plan } = useInsights();
  const isPaid = plan === 'SP_PAID';

  // Mock: Just take the first 3 leads for demo
  const leads = MOCK_LEADS.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="text-slate-400 hover:text-white hover:bg-slate-800">
          <Link to="/insights/leads">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-white">Compare Leads</h1>
      </div>

      <div className="overflow-x-auto pb-6">
        <table className="w-full min-w-[800px] border-collapse">
          <thead>
            <tr>
              <th className="w-48 p-4 text-left bg-[#13131A] border-b border-slate-800 sticky left-0">
                <span className="text-xs font-bold uppercase text-slate-500">Feature</span>
              </th>
              {leads.map(lead => (
                <th key={lead.id} className="w-64 p-4 text-left border-b border-slate-800 align-top bg-[#1C1C24]">
                  <div className="space-y-2">
                    <h3 className="font-bold text-white line-clamp-2 min-h-[3rem]">{lead.title}</h3>
                    <div className="text-xs text-slate-400">{lead.company}</div>
                    <Button size="sm" className="w-full mt-2 bg-brand-orange hover:bg-brand-orange/90 text-white border-none">View Details</Button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {/* Fit Score */}
            <tr>
              <td className="p-4 font-medium text-slate-300 bg-[#13131A] sticky left-0 border-r border-slate-800">Fit Score</td>
              {leads.map(lead => (
                <td key={lead.id} className="p-4 bg-[#1C1C24]">
                  {isPaid ? (
                    <div className="flex items-center gap-2">
                      <span className={`text-lg font-bold ${lead.fitScore > 80 ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {lead.fitScore}%
                      </span>
                      <div className="h-1.5 w-16 bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${lead.fitScore > 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${lead.fitScore}%` }} />
                      </div>
                    </div>
                  ) : (
                    <span className="text-slate-500 italic text-sm">Locked</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Urgency */}
            <tr>
              <td className="p-4 font-medium text-slate-300 bg-[#13131A] sticky left-0 border-r border-slate-800">Urgency</td>
              {leads.map(lead => (
                <td key={lead.id} className="p-4 bg-[#1C1C24]">
                  {isPaid ? (
                    <Badge variant="outline" className={`
                      ${lead.urgency === 'Act now' ? 'bg-red-900/20 text-red-400 border-red-900/30' : 
                        lead.urgency === 'Monitor' ? 'bg-amber-900/20 text-amber-400 border-amber-900/30' : 
                        'bg-blue-900/20 text-blue-400 border-blue-900/30'}
                    `}>
                      {lead.urgency}
                    </Badge>
                  ) : (
                    <span className="text-slate-500 italic text-sm">Locked</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Commodity */}
            <tr>
              <td className="p-4 font-medium text-slate-300 bg-[#13131A] sticky left-0 border-r border-slate-800">Commodity</td>
              {leads.map(lead => (
                <td key={lead.id} className="p-4 text-sm text-slate-400 bg-[#1C1C24]">
                  {lead.commodity.join(', ')}
                </td>
              ))}
            </tr>

            {/* Region */}
            <tr>
              <td className="p-4 font-medium text-slate-300 bg-[#13131A] sticky left-0 border-r border-slate-800">Region</td>
              {leads.map(lead => (
                <td key={lead.id} className="p-4 text-sm text-slate-400 bg-[#1C1C24]">
                  {lead.region.join(', ')}
                </td>
              ))}
            </tr>

            {/* Stage */}
            <tr>
              <td className="p-4 font-medium text-slate-300 bg-[#13131A] sticky left-0 border-r border-slate-800">Stage</td>
              {leads.map(lead => (
                <td key={lead.id} className="p-4 text-sm text-slate-400 bg-[#1C1C24]">
                  {lead.stage.join(', ')}
                </td>
              ))}
            </tr>

            {/* AI Summary */}
            <tr>
              <td className="p-4 font-medium text-slate-300 bg-[#13131A] sticky left-0 align-top border-r border-slate-800">Summary</td>
              {leads.map(lead => (
                <td key={lead.id} className="p-4 text-sm text-slate-400 leading-relaxed align-top bg-[#1C1C24]">
                  {lead.aiSummary}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
