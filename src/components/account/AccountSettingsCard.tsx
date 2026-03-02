import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

interface AccountSettingsCardProps {
  role: string;
  onConvertToAgent: () => void;
}

export function AccountSettingsCard({ role, onConvertToAgent }: AccountSettingsCardProps) {
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
  const { toast } = useToast();

  const handleConfirm = () => {
    onConvertToAgent();
    setIsConfirmOpen(false);
    toast({
      title: "Account converted",
      description: "You have successfully converted to an Agent account.",
    });
  };

  return (
    <Card className="border-slate-800 bg-[#1C1C24] shadow-sm">
      <CardHeader className="pb-4 border-b border-slate-800">
        <CardTitle className="text-lg font-semibold text-white">Account Settings</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {role === 'agent' ? (
          <div className="flex items-center justify-between p-4 bg-green-900/20 rounded-lg border border-green-900/50">
            <div>
              <h4 className="text-sm font-medium text-green-400">Agent Account Enabled</h4>
              <p className="text-xs text-green-300 mt-1">
                You have access to advanced listing features and agent tools.
              </p>
            </div>
            <Button variant="outline" className="bg-[#1C1C24] text-green-400 border-green-900 hover:bg-green-900/20 hover:text-green-300" asChild>
              <Link to="/app/agent-profile">Go to Agent Profile</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#13131A] rounded-lg border border-slate-800">
            <div>
              <h4 className="text-sm font-medium text-white">Convert to Agent Account</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-md">
                Unlock professional tools, create an agent profile, and manage multiple listings efficiently.
              </p>
            </div>
            <Button onClick={() => setIsConfirmOpen(true)} className="bg-brand-orange hover:bg-brand-orange/90 text-white">
              Convert to Agent
            </Button>
          </div>
        )}

        <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
          <DialogContent className="bg-[#1C1C24] border-slate-800 text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Convert to Agent Account?</DialogTitle>
              <DialogDescription className="text-slate-400">
                This will enable Agent Profile features and allow you to list on behalf of others.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-white/5 hover:text-white">Cancel</Button>
              </DialogClose>
              <Button onClick={handleConfirm} className="bg-brand-orange hover:bg-brand-orange/90 text-white">Convert to Agent</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
