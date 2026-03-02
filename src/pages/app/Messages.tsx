import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Plus } from 'lucide-react';
import { MessagesTable } from '@/components/messages/MessagesTable';
import { MessagesEmptyState } from '@/components/messages/MessagesEmptyState';
import { MessageDetailDrawer } from '@/components/messages/MessageDetailDrawer';
import { SkeletonTable } from '@/components/messages/SkeletonTable';
import { mockReceivedMessages, mockSentMessages, Message } from '@/data/mockMessages';

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message);
    setIsDrawerOpen(true);
  };

  const filteredReceived = mockReceivedMessages.filter(m => 
    m.sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.enquiry.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSent = mockSentMessages.filter(m => 
    m.recipient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.enquiry.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Messages</h1>
          <p className="text-slate-400">Manage enquiries about your listings and opportunities.</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Optional: Add "New Message" button if needed, though usually initiated from listing */}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'received' | 'sent')} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-2 sm:w-[400px] bg-[#1C1C24] border border-slate-800">
            <TabsTrigger value="received" className="data-[state=active]:bg-[#2D2D2D] data-[state=active]:text-white text-slate-400 hover:text-white transition-colors">
              Received
              <span className="ml-2 rounded-full bg-slate-800 px-2 py-0.5 text-xs font-medium text-slate-300 group-data-[state=active]:bg-slate-700 group-data-[state=active]:text-white">
                {mockReceivedMessages.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="sent" className="data-[state=active]:bg-[#2D2D2D] data-[state=active]:text-white text-slate-400 hover:text-white transition-colors">
              Sent
              <span className="ml-2 rounded-full bg-slate-800 px-2 py-0.5 text-xs font-medium text-slate-300 group-data-[state=active]:bg-slate-700 group-data-[state=active]:text-white">
                {mockSentMessages.length}
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search messages..."
              className="pl-9 bg-[#1C1C24] border-slate-800 text-white placeholder:text-slate-500 focus-visible:ring-slate-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0 bg-[#1C1C24] border-slate-800 text-slate-400 hover:bg-white/5 hover:text-white">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {isLoading ? (
          <SkeletonTable />
        ) : activeTab === 'received' ? (
          filteredReceived.length > 0 ? (
            <MessagesTable 
              messages={filteredReceived} 
              type="received" 
              onMessageClick={handleMessageClick} 
            />
          ) : (
            <MessagesEmptyState type="received" />
          )
        ) : (
          filteredSent.length > 0 ? (
            <MessagesTable 
              messages={filteredSent} 
              type="sent" 
              onMessageClick={handleMessageClick} 
            />
          ) : (
            <MessagesEmptyState type="sent" />
          )
        )}
      </div>

      {/* Detail Drawer */}
      <MessageDetailDrawer
        message={selectedMessage}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        type={activeTab}
      />
    </div>
  );
}
