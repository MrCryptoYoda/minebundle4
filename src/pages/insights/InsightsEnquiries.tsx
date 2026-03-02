
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MoreHorizontal, Reply, MessageSquare } from "lucide-react"

const MOCK_ENQUIRIES = [
  {
    id: 1,
    from: "Red Earth Minerals",
    subject: "Re: Drilling Contractor Required",
    preview: "Hi John, thanks for reaching out. We are interested in your RC capabilities...",
    date: "10:30 AM",
    status: "Replied",
    unread: false
  },
  {
    id: 2,
    from: "Silver Peak Mining",
    subject: "Enquiry about Mine Planning Services",
    preview: "We saw your profile and would like to discuss the PFS scope...",
    date: "Yesterday",
    status: "New",
    unread: true
  },
  {
    id: 3,
    from: "Green Energy Metals",
    subject: "Camp Construction Tender",
    preview: "Please find attached the tender documents for the camp construction...",
    date: "2 days ago",
    status: "Closed",
    unread: false
  }
]

export default function InsightsEnquiries() {
  const [selectedId, setSelectedId] = React.useState<number | null>(null)

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Enquiries</h1>
          <p className="text-slate-400">Manage conversations from leads and your marketplace profile.</p>
        </div>
      </div>

      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* Left List */}
        <div className="w-full md:w-1/3 flex flex-col bg-[#1C1C24] rounded-xl border border-slate-800 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex gap-2">
            <div className="relative flex-1">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
               <Input placeholder="Search..." className="pl-9 h-9 bg-[#13131A] border-slate-700 text-slate-300 placeholder:text-slate-500" />
            </div>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-white hover:bg-slate-800">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {MOCK_ENQUIRIES.map((enquiry) => (
              <div 
                key={enquiry.id}
                className={`p-4 border-b border-slate-800 cursor-pointer hover:bg-[#13131A] transition-colors ${selectedId === enquiry.id ? 'bg-brand-orange/10 border-l-4 border-l-brand-orange' : 'border-l-4 border-l-transparent'}`}
                onClick={() => setSelectedId(enquiry.id)}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`text-sm font-semibold ${enquiry.unread ? 'text-white' : 'text-slate-400'}`}>
                    {enquiry.from}
                  </h4>
                  <span className="text-xs text-slate-500">{enquiry.date}</span>
                </div>
                <p className="text-sm font-medium text-slate-300 mb-1 truncate">{enquiry.subject}</p>
                <p className="text-xs text-slate-500 line-clamp-2">{enquiry.preview}</p>
                <div className="mt-2">
                  <Badge variant="outline" className={`text-xs font-normal ${enquiry.status === 'New' ? 'bg-blue-900/30 text-blue-400 border-blue-900/50' : 'text-slate-500 border-slate-700'}`}>
                    {enquiry.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Detail (Placeholder for now) */}
        <div className="hidden md:flex flex-1 bg-[#1C1C24] rounded-xl border border-slate-800 shadow-sm flex-col">
          {selectedId ? (
            <>
              <div className="p-6 border-b border-slate-800 flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-slate-700 text-white">RE</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-lg font-bold text-white">Red Earth Minerals</h2>
                    <p className="text-sm text-slate-400">Re: Drilling Contractor Required</p>
                  </div>
                </div>
                <div className="flex gap-2">
                   <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white bg-transparent">Mark Closed</Button>
                   <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800"><MoreHorizontal className="h-4 w-4" /></Button>
                </div>
              </div>
              <div className="flex-1 p-6 overflow-y-auto space-y-6">
                 <div className="flex gap-4">
                    <Avatar className="h-8 w-8 mt-1">
                       <AvatarFallback className="bg-slate-700 text-white">RE</AvatarFallback>
                    </Avatar>
                    <div className="bg-[#13131A] p-4 rounded-lg rounded-tl-none border border-slate-800 max-w-[80%]">
                       <p className="text-sm text-slate-300">Hi John, thanks for reaching out. We are interested in your RC capabilities. Do you have availability in Q3?</p>
                       <span className="text-xs text-slate-500 mt-2 block">10:30 AM</span>
                    </div>
                 </div>
                 
                 <div className="flex gap-4 flex-row-reverse">
                    <Avatar className="h-8 w-8 mt-1">
                       <AvatarFallback className="bg-brand-orange text-white">ME</AvatarFallback>
                    </Avatar>
                    <div className="bg-brand-orange/20 p-4 rounded-lg rounded-tr-none border border-brand-orange/30 max-w-[80%]">
                       <p className="text-sm text-white">Hi Team, yes we have 2 rigs available starting August. I've attached our rate card.</p>
                       <span className="text-xs text-slate-400 mt-2 block">10:45 AM</span>
                    </div>
                 </div>
              </div>
              <div className="p-4 border-t border-slate-800 bg-[#13131A]">
                 <div className="flex gap-2">
                    <Input placeholder="Type your reply..." className="bg-[#1C1C24] border-slate-700 text-slate-300 placeholder:text-slate-500" />
                    <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white border-none">
                       <Reply className="h-4 w-4 mr-2" /> Send
                    </Button>
                 </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-500 flex-col gap-4">
               <div className="h-16 w-16 rounded-full bg-[#13131A] flex items-center justify-center">
                  <MessageSquare className="h-8 w-8 text-slate-600" />
               </div>
               <p>Select an enquiry to view the conversation</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
