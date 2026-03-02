
import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, FileText, CheckCircle, MessageSquare, FileSignature, Save } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const KPICard = ({ title, value, icon: Icon, trend }: { title: string, value: string, icon: any, trend?: string }) => (
  <Card>
    <CardContent className="p-6 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">{title}</p>
        <div className="flex items-baseline gap-2 mt-1">
          <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
          {trend && <span className="text-xs font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded">{trend}</span>}
        </div>
      </div>
      <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center">
        <Icon className="h-6 w-6 text-slate-600" />
      </div>
    </CardContent>
  </Card>
)

const MOCK_CHART_DATA = [
  { name: 'Jan', projects: 4, users: 20 },
  { name: 'Feb', projects: 7, users: 35 },
  { name: 'Mar', projects: 12, users: 50 },
  { name: 'Apr', projects: 18, users: 80 },
  { name: 'May', projects: 24, users: 110 },
  { name: 'Jun', projects: 30, users: 150 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
        <Select defaultValue="30d">
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="Timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Projects" value="142" icon={FileText} trend="+12%" />
        <KPICard title="Sold Projects" value="28" icon={CheckCircle} trend="+4%" />
        <KPICard title="Total Users" value="1,204" icon={Users} trend="+8%" />
        <KPICard title="NDAs Signed" value="342" icon={FileSignature} trend="+15%" />
        <KPICard title="Total Enquiries" value="892" icon={MessageSquare} />
        <KPICard title="Saved Drafts" value="56" icon={Save} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={MOCK_CHART_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#F27D26" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>New Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_CHART_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Bar dataKey="projects" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Secondary Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <Card>
            <CardHeader>
               <CardTitle className="text-base">Recent Approvals</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                  {[1,2,3].map(i => (
                     <div key={i} className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                        <div>
                           <p className="font-medium text-sm text-slate-900">Project Alpha {i}</p>
                           <p className="text-xs text-slate-500">Approved by Admin</p>
                        </div>
                        <span className="text-xs text-slate-400">2h ago</span>
                     </div>
                  ))}
               </div>
            </CardContent>
         </Card>
         <Card>
            <CardHeader>
               <CardTitle className="text-base">Recent Enquiries</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                  {[1,2,3].map(i => (
                     <div key={i} className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                        <div>
                           <p className="font-medium text-sm text-slate-900">Buyer Interest #{i}</p>
                           <p className="text-xs text-slate-500">on Pilbara Gold</p>
                        </div>
                        <span className="text-xs text-slate-400">5h ago</span>
                     </div>
                  ))}
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  )
}
