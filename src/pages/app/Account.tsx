import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ProfileHeaderCard } from '@/components/account/ProfileHeaderCard';
import { LoginInfoCard } from '@/components/account/LoginInfoCard';
import { SocialConnectionsCard } from '@/components/account/SocialConnectionsCard';
import { PersonalInfoForm } from '@/components/account/PersonalInfoForm';
import { AccountSettingsCard } from '@/components/account/AccountSettingsCard';
import { DeleteAccountModal } from '@/components/account/DeleteAccountModal';
import { useToast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';

import { useDemo } from '@/context/DemoContext';

export default function AccountPage() {
  const { userRole, setUserRole } = useDemo();
  const [isLoading, setIsLoading] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Mock User Data
  const [user, setUser] = useState({
    firstName: "Alex",
    lastName: "Morgan",
    email: "alex.morgan@example.com",
    customerId: "CUST-88291",
    // role is now managed by context
    avatar: "https://i.pravatar.cc/150?u=alex",
    dob: "1985-04-12",
    phone: "+1 (555) 123-4567",
    gender: "male",
    languages: "english",
    occupation: "Senior Geologist",
    about: "Experienced geologist with 15 years in gold exploration...",
    connections: {
      google: true,
      apple: false,
    }
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleFieldChange = (field: string, value: string) => {
    setUser(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleEmailChange = (newEmail: string) => {
    setUser(prev => ({ ...prev, email: newEmail }));
    // Email change is immediate in this mock, but could be dirty state
  };

  const handlePasswordChange = (newPassword: string) => {
    // Mock password change
    console.log("Password changed to:", newPassword);
  };

  const handleToggleConnection = (provider: 'google' | 'apple') => {
    setUser(prev => ({
      ...prev,
      connections: {
        ...prev.connections,
        [provider]: !prev.connections[provider]
      }
    }));
  };

  const handleConvertToAgent = () => {
    setUserRole('agent');
  };

  const handleSaveChanges = () => {
    setIsDirty(false);
    toast({
      title: "Changes saved",
      description: "Your profile information has been updated.",
    });
  };

  const handleDeleteAccount = () => {
    // Simulate delete
    console.log("Account deleted");
    navigate('/'); // Redirect to home/login
  };

  if (isLoading) {
    return (
      <div className="space-y-6 p-6 max-w-3xl mx-auto">
        <Skeleton className="h-48 w-full rounded-lg" />
        <Skeleton className="h-64 w-full rounded-lg" />
        <Skeleton className="h-32 w-full rounded-lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 max-w-3xl mx-auto pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Account Information</h1>
        <p className="text-slate-500">Manage your profile, login details, and account settings.</p>
      </div>

      <div className="space-y-6">
        {/* Profile Header */}
        <ProfileHeaderCard user={user} />

        {/* Login Info */}
        <LoginInfoCard
          email={user.email}
          onEmailChange={handleEmailChange}
          onPasswordChange={handlePasswordChange}
        />

        {/* Social Connections */}
        <SocialConnectionsCard
          connections={user.connections}
          onToggleConnection={handleToggleConnection}
        />

        {/* Personal Info */}
        <PersonalInfoForm
          data={user}
          onChange={handleFieldChange}
        />

        {/* Account Settings */}
        <AccountSettingsCard
          role={userRole}
          onConvertToAgent={handleConvertToAgent}
        />
      </div>

      {/* Footer Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-200">
        <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => setIsDeleteModalOpen(true)}>
          Delete account
        </Button>
        <Button onClick={handleSaveChanges} disabled={!isDirty} className="w-full sm:w-auto">
          Save changes
        </Button>
      </div>

      {/* Delete Modal */}
      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteAccount}
      />
    </div>
  );
}
