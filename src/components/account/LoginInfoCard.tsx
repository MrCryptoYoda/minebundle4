import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil, Save, X, Lock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

interface LoginInfoCardProps {
  email: string;
  onEmailChange: (newEmail: string) => void;
  onPasswordChange: (newPassword: string) => void;
}

export function LoginInfoCard({ email, onEmailChange, onPasswordChange }: LoginInfoCardProps) {
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [tempEmail, setTempEmail] = useState(email);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const { toast } = useToast();

  const handleSaveEmail = () => {
    onEmailChange(tempEmail);
    setIsEditingEmail(false);
    toast({
      title: "Email updated",
      description: "Your email address has been successfully updated.",
    });
  };

  const handleCancelEmail = () => {
    setTempEmail(email);
    setIsEditingEmail(false);
  };

  return (
    <Card className="border-slate-800 bg-[#1C1C24] shadow-sm">
      <CardHeader className="pb-4 border-b border-slate-800">
        <CardTitle className="text-lg font-semibold text-white">Login Information</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Email Field */}
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-sm font-medium text-slate-400">Email</Label>
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Input
                id="email"
                type="email"
                value={isEditingEmail ? tempEmail : email}
                onChange={(e) => setTempEmail(e.target.value)}
                disabled={!isEditingEmail}
                className={`bg-[#13131A] border-slate-800 text-white ${isEditingEmail ? 'bg-[#1C1C24] border-brand-orange ring-brand-orange/20' : ''}`}
              />
              {!isEditingEmail && (
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-500" />
                </div>
              )}
            </div>
            {isEditingEmail ? (
              <div className="flex items-center gap-2">
                <Button size="sm" onClick={handleSaveEmail} className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button size="sm" variant="ghost" onClick={handleCancelEmail} className="text-slate-400 hover:text-white hover:bg-white/10">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button size="sm" variant="outline" onClick={() => setIsEditingEmail(true)} className="border-slate-700 bg-transparent text-slate-300 hover:bg-white/5 hover:text-white">
                <Pencil className="h-3.5 w-3.5 mr-2" />
                Edit
              </Button>
            )}
          </div>
        </div>

        {/* Password Field */}
        <div className="grid gap-2">
          <Label htmlFor="password" className="text-sm font-medium text-slate-400">Password</Label>
          <div className="flex items-center gap-3">
            <Input
              id="password"
              type="password"
              value="••••••••"
              disabled
              className="bg-[#13131A] border-slate-800 font-mono tracking-widest text-slate-500"
            />
            <Button size="sm" variant="outline" onClick={() => setIsPasswordModalOpen(true)} className="border-slate-700 bg-transparent text-slate-300 hover:bg-white/5 hover:text-white">
              Change
            </Button>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Your login details are encrypted and never shared.
          </p>
        </div>

        {/* Password Change Modal */}
        <PasswordChangeModal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
          onSave={onPasswordChange}
        />
      </CardContent>
    </Card>
  );
}

interface PasswordChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (password: string) => void;
}

function PasswordChangeModal({ isOpen, onClose, onSave }: PasswordChangeModalProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleSave = () => {
    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    onSave(newPassword);
    toast({
      title: "Password changed",
      description: "Your password has been updated successfully.",
    });
    onClose();
    // Reset form
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave}>Save Password</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
