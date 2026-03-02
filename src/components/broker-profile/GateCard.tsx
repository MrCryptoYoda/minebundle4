import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

export function GateCard() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Card className="border-slate-200 shadow-md text-center py-8">
        <CardHeader className="flex flex-col items-center space-y-4">
          <div className="p-4 bg-slate-50 rounded-full">
            <Lock className="h-8 w-8 text-slate-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900">Agent Profile Access</CardTitle>
          <CardDescription className="text-base max-w-md mx-auto">
            Agent profile features are available exclusively to Agent accounts. Showcase your agency and featured opportunities to buyers.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center pt-4">
          <Button asChild size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">
            <Link to="/app/account">Convert to Agent Account</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
