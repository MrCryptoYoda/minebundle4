import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useProfileStore } from '@/store/profileStore';
import { useNavigate } from 'react-router-dom';

// Steps
import { Step1Basics } from '@/components/insights/onboarding/Step1Basics';
import { Step2Services } from '@/components/insights/onboarding/Step2Services';
import { Step3Regions } from '@/components/insights/onboarding/Step3Regions';
import { Step4Team } from '@/components/insights/onboarding/Step4Team';
import { Step5Compliance } from '@/components/insights/onboarding/Step5Compliance';
import { Step6Projects } from '@/components/insights/onboarding/Step6Projects';
import { Step7Review } from '@/components/insights/onboarding/Step7Review';

const STEPS = [
  { id: 1, title: 'Company Basics', component: Step1Basics },
  { id: 2, title: 'Services', component: Step2Services },
  { id: 3, title: 'Regions', component: Step3Regions },
  { id: 4, title: 'Team', component: Step4Team },
  { id: 5, title: 'Compliance', component: Step5Compliance },
  { id: 6, title: 'Projects', component: Step6Projects },
  { id: 7, title: 'Review', component: Step7Review },
];

export default function InsightsOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const updateField = useProfileStore(state => state.updateField);

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      // Submit
      navigate('/insights/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const CurrentComponent = STEPS[currentStep - 1].component;
  const progress = (currentStep / STEPS.length) * 100;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8 space-y-4">
        <div className="flex justify-between items-center text-sm text-slate-400">
          <span>Step {currentStep} of {STEPS.length}</span>
          <span>{Math.round(progress)}% Completed</span>
        </div>
        <Progress value={progress} className="h-2 bg-slate-800" indicatorClassName="bg-brand-orange" />
        <h1 className="text-3xl font-bold text-white">{STEPS[currentStep - 1].title}</h1>
      </div>

      <div className="bg-[#1C1C24] border border-slate-800 rounded-2xl p-6 md:p-8 mb-8 min-h-[400px]">
        <CurrentComponent />
      </div>

      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handleBack} 
          disabled={currentStep === 1}
          className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button 
          onClick={handleNext}
          className="bg-brand-orange hover:bg-brand-orange/90 text-white"
        >
          {currentStep === STEPS.length ? 'Complete Profile' : 'Next Step'} 
          {currentStep !== STEPS.length && <ChevronRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
