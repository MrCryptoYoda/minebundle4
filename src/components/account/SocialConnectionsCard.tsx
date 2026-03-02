import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle2, XCircle } from 'lucide-react';

interface SocialConnectionsCardProps {
  connections: {
    google: boolean;
    apple: boolean;
  };
  onToggleConnection: (provider: 'google' | 'apple') => void;
}

export function SocialConnectionsCard({ connections, onToggleConnection }: SocialConnectionsCardProps) {
  const { toast } = useToast();

  const handleToggle = (provider: 'google' | 'apple') => {
    const isConnected = connections[provider];
    onToggleConnection(provider);
    toast({
      title: isConnected ? `${provider} disconnected` : `${provider} connected`,
      description: `You have successfully ${isConnected ? 'disconnected' : 'connected'} your ${provider} account.`,
    });
  };

  return (
    <Card className="border-slate-800 bg-[#1C1C24] shadow-sm">
      <CardHeader className="pb-4 border-b border-slate-800">
        <CardTitle className="text-lg font-semibold text-white">Social Connections</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Google Tile */}
        <div className="flex items-center justify-between p-4 bg-[#13131A] rounded-lg border border-slate-800">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-sm">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white">Google</h4>
              <p className="text-xs text-slate-400">
                {connections.google ? 'Connected' : 'Not connected'}
              </p>
            </div>
          </div>
          <Button
            size="sm"
            variant={connections.google ? "outline" : "default"}
            onClick={() => handleToggle('google')}
            className={connections.google ? "text-red-400 hover:text-red-300 hover:bg-red-900/20 border-red-900/50 bg-transparent" : "bg-blue-600 hover:bg-blue-700 text-white"}
          >
            {connections.google ? 'Disconnect' : 'Connect'}
          </Button>
        </div>

        {/* Apple Tile */}
        <div className="flex items-center justify-between p-4 bg-[#13131A] rounded-lg border border-slate-800">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-sm text-black">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.02 3.96-.86 1.34.14 2.68.79 3.43 1.94-3.31 1.66-2.69 6.42.68 7.91-.53 1.49-1.29 2.6-2.15 3.24zm-3.61-17.03c.6.73.84 1.8.6 2.85-1.18.13-2.52-.79-3.03-1.75-.47-.85-.3-1.85.6-2.66.96-.92 2.31-.72 2.83 1.56z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-medium text-white">Apple</h4>
              <p className="text-xs text-slate-400">
                {connections.apple ? 'Connected' : 'Not connected'}
              </p>
            </div>
          </div>
          <Button
            size="sm"
            variant={connections.apple ? "outline" : "default"}
            onClick={() => handleToggle('apple')}
            className={connections.apple ? "text-red-400 hover:text-red-300 hover:bg-red-900/20 border-red-900/50 bg-transparent" : "bg-white hover:bg-slate-200 text-black"}
          >
            {connections.apple ? 'Disconnect' : 'Connect'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
