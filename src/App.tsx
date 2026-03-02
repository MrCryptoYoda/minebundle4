import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DemoProvider } from '@/context/DemoContext';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { AppLayout } from '@/components/layout/AppLayout';
import { DemoConsole } from '@/components/demo/DemoConsole';
import PagePlaceholder from '@/components/PagePlaceholder';

// Real Pages
import HomePage from '@/pages/public/HomePage';
import SearchPage from '@/pages/public/SearchPage';
import ListingDetailPage from '@/pages/public/ListingDetailPage';

import HowItWorksPage from '@/pages/public/HowItWorksPage';
import ExploreAgentsPage from '@/pages/public/ExploreAgentsPage';
import BecomeAgentPage from '@/pages/public/BecomeAgentPage';
import AboutPage from '@/pages/public/AboutPage';
import HowToGuidesPage from '@/pages/public/HowToGuidesPage';
import MxeTvPage from '@/pages/public/MxeTvPage';
import BuyerInterestPage from '@/pages/public/BuyerInterestPage';
import NoraPartnerPage from '@/pages/public/partners/NoraPartnerPage';
import ReetokenPartnerPage from '@/pages/public/partners/ReetokenPartnerPage';

import PrivacyPolicyPage from '@/pages/legal/PrivacyPolicyPage';
import NdaPage from '@/pages/legal/NdaPage';
import FacilitationAgreementPage from '@/pages/legal/FacilitationAgreementPage';
import AgentFacilitationAgreementPage from '@/pages/legal/AgentFacilitationAgreementPage';
import TermsPage from '@/pages/legal/TermsPage';
import CookiesPage from '@/pages/legal/CookiesPage';
import AccessibilityPage from '@/pages/legal/AccessibilityPage';
import PricingPage from '@/pages/public/PricingPage';
import GeneralEnquiryPage from '@/pages/public/GeneralEnquiryPage';
import SitemapPage from '@/pages/public/SitemapPage';

// Wizard Pages
import ListPickerPage from '@/pages/wizard/ListPickerPage';
import ListingWizardLayout from '@/pages/wizard/ListingWizardLayout';
import Step1Offtake from '@/pages/wizard/Step1Offtake';
import Step2Offtake from '@/pages/wizard/Step2Offtake';
import Step1General from '@/pages/wizard/Step1General';
import Step2General from '@/pages/wizard/Step2General';
import Step3Common from '@/pages/wizard/Step3Common';

// App Pages
import Dashboard from '@/pages/app/Dashboard';
import ListingsPage from '@/pages/app/Listings';
import MessagesPage from '@/pages/app/Messages';
import SavedSearchesPage from '@/pages/app/SavedSearches';
import AccountPage from '@/pages/app/Account';
import AgentProfilePage from '@/pages/app/AgentProfile';
import NotificationsPage from '@/pages/app/Notifications';
import MyProjectsPage from '@/pages/app/MyProjects';
import SoldProjectsPage from '@/pages/app/SoldProjects';
import MessageThreadPage from '@/pages/app/MessageThreadPage';

// Marketplace Pages
import MarketplaceHome from '@/pages/marketplace/MarketplaceHome';
import CategoryResults from '@/pages/marketplace/CategoryResults';
import ServiceDetail from '@/pages/marketplace/ServiceDetail';
import ProviderProfile from '@/pages/marketplace/ProviderProfile';
import ProviderOnboarding from '@/pages/marketplace/provider/ProviderOnboarding';
import ServiceManagement from '@/pages/marketplace/provider/ServiceManagement';
import CreateEditService from '@/pages/marketplace/provider/CreateEditService';

// Insights Pages
import InsightsEntry from '@/pages/insights/InsightsEntry';
import InsightsDashboard from '@/pages/insights/InsightsDashboard';
import InsightsLeads from '@/pages/insights/InsightsLeads';
import LeadDetailView from '@/pages/insights/LeadDetailView';
import CompareLeadsPage from '@/pages/insights/leads/CompareLeadsPage';
import InsightsEnquiries from '@/pages/insights/InsightsEnquiries';
import InsightsServiceListings from '@/pages/insights/InsightsServiceListings';
import InsightsTeam from '@/pages/insights/InsightsTeam';
import InsightsProfile from '@/pages/insights/InsightsProfile';
import InsightsBilling from '@/pages/insights/InsightsBilling';
import InsightsNotifications from '@/pages/insights/InsightsNotifications';
import InsightsIntelligence from '@/pages/insights/InsightsIntelligence';
import InsightsOnboarding from '@/pages/insights/InsightsOnboarding';
import { InsightsLayout } from '@/components/layout/InsightsLayout';

// Auth Pages
import AuthLayout from '@/components/auth/AuthLayout';
import SignIn from '@/pages/auth/SignIn';
import SignUp from '@/pages/auth/SignUp';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import ResetPassword from '@/pages/auth/ResetPassword';

// Admin Pages
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import UserManagement from '@/pages/admin/UserManagement';
import ProjectManagement from '@/pages/admin/ProjectManagement';
import ProjectApprovals from '@/pages/admin/ProjectApprovals';
import RejectedProjects from '@/pages/admin/RejectedProjects';
import ArbitrationClaims from '@/pages/admin/ArbitrationClaims';
import ArbitrationApprovals from '@/pages/admin/ArbitrationApprovals';
import RejectedArbitration from '@/pages/admin/RejectedArbitration';
import ProjectContacts from '@/pages/admin/ProjectContacts';
import ProjectEnquiries from '@/pages/admin/ProjectEnquiries';
import CapitalRequirements from '@/pages/admin/CapitalRequirements';
import QuestionManagement from '@/pages/admin/QuestionManagement';
import QuestionSections from '@/pages/admin/QuestionSections';
import AdminSettings from '@/pages/admin/AdminSettings';
import AdminLayout from '@/components/admin/layout/AdminLayout';

import { AIAssistant } from '@/components/ai/AIAssistant';

import { Toaster } from "@/components/ui/toaster";

export default function App() {
  return (
    <DemoProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />

            <Route path="/search" element={<SearchPage />} />
            <Route path="/listing/:id" element={<ListingDetailPage />} />
            
            <Route path="/marketplace" element={<MarketplaceHome />} />
            <Route path="/marketplace/category/:slug" element={<CategoryResults />} />
            <Route path="/marketplace/service/:id" element={<ServiceDetail />} />
            <Route path="/marketplace/provider/:id" element={<ProviderProfile />} />
            <Route path="/marketplace/provider/onboarding" element={<ProviderOnboarding />} />
            <Route path="/marketplace/provider/services" element={<ServiceManagement />} />
            <Route path="/marketplace/provider/services/new" element={<CreateEditService />} />
            <Route path="/marketplace/provider/services/:id/edit" element={<CreateEditService />} />
            
            <Route path="/about" element={<AboutPage />} />
            <Route path="/how-to-guides" element={<HowToGuidesPage />} />
            <Route path="/mxe-tv" element={<MxeTvPage />} />
            <Route path="/buyer-interest" element={<BuyerInterestPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/agents" element={<ExploreAgentsPage />} />
            <Route path="/agents/become" element={<BecomeAgentPage />} />
            <Route path="/partners/nora" element={<NoraPartnerPage />} />
            
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/enquiry" element={<GeneralEnquiryPage />} />
            <Route path="/sitemap" element={<SitemapPage />} />

            {/* Legal Routes */}
            <Route path="/legal/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/legal/terms" element={<TermsPage />} />
            <Route path="/legal/cookies" element={<CookiesPage />} />
            <Route path="/legal/accessibility" element={<AccessibilityPage />} />
            <Route path="/legal/nda" element={<NdaPage />} />
            <Route path="/legal/facilitation-agreement" element={<FacilitationAgreementPage />} />
            <Route path="/legal/agent-facilitation-agreement" element={<AgentFacilitationAgreementPage />} />
          </Route>

          {/* Standalone Pages (No Header/Footer) */}
          <Route path="/partners/reetoken" element={<ReetokenPartnerPage />} />

          {/* Auth Routes */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>

          {/* App Routes (Authenticated) */}
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="messages/:threadId" element={<MessageThreadPage />} />
            <Route path="listings" element={<ListingsPage />} />
            <Route path="my-projects" element={<MyProjectsPage />} />
            <Route path="sold-projects" element={<SoldProjectsPage />} />
            <Route path="saved-searches" element={<SavedSearchesPage />} />
            <Route path="account" element={<AccountPage />} />
            <Route path="agent-profile" element={<AgentProfilePage />} />
            <Route path="notifications" element={<NotificationsPage />} />
          </Route>

          {/* Insights Routes (Service Provider) */}
          <Route path="/insights" element={<InsightsLayout />}>
             <Route index element={<InsightsEntry />} />
             <Route path="dashboard" element={<InsightsDashboard />} />
             <Route path="leads" element={<InsightsLeads />} />
             <Route path="leads/compare" element={<CompareLeadsPage />} />
             <Route path="leads/:id" element={<LeadDetailView />} />
             <Route path="enquiries" element={<InsightsEnquiries />} />
             <Route path="service-listings" element={<InsightsServiceListings />} />
             <Route path="team" element={<InsightsTeam />} />
             <Route path="profile" element={<InsightsProfile />} />
             <Route path="billing" element={<InsightsBilling />} />
             <Route path="notifications" element={<InsightsNotifications />} />
             <Route path="intelligence" element={<InsightsIntelligence />} />
             <Route path="onboarding" element={<InsightsOnboarding />} />
          </Route>

          {/* Listing Wizard Routes */}
          <Route path="/list">
             <Route index element={<ListPickerPage />} />
             <Route element={<ListingWizardLayout />}>
               {/* Mining Project */}
               <Route path="mining-project/step/1" element={<Step1General />} />
               <Route path="mining-project/step/2" element={<Step2General />} />
               <Route path="mining-project/step/3" element={<Step3Common />} />
               
               {/* Renewable Asset */}
               <Route path="renewable-asset/step/1" element={<Step1General />} />
               <Route path="renewable-asset/step/2" element={<Step2General />} />
               <Route path="renewable-asset/step/3" element={<Step3Common />} />

               {/* Claim */}
               <Route path="claim/step/1" element={<Step1General />} />
               <Route path="claim/step/2" element={<Step2General />} />
               <Route path="claim/step/3" element={<Step3Common />} />

               {/* Royalty Asset */}
               <Route path="royalty-asset/step/1" element={<Step1General />} />
               <Route path="royalty-asset/step/2" element={<Step2General />} />
               <Route path="royalty-asset/step/3" element={<Step3Common />} />

               {/* Offtake (NEW) */}
               <Route path="offtake/step/1" element={<Step1Offtake />} />
               <Route path="offtake/step/2" element={<Step2Offtake />} />
               <Route path="offtake/step/3" element={<Step3Common />} />
             </Route>
          </Route>

          {/* Admin Routes */}
          <Route path="/admin">
             <Route path="login" element={<AdminLogin />} />
             <Route element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="projects" element={<ProjectManagement />} />
                <Route path="project-approvals" element={<ProjectApprovals />} />
                <Route path="rejected-projects" element={<RejectedProjects />} />
                <Route path="arbitration-claims" element={<ArbitrationClaims />} />
                <Route path="arbitration-approvals" element={<ArbitrationApprovals />} />
                <Route path="rejected-arbitration" element={<RejectedArbitration />} />
                <Route path="project-contacts" element={<ProjectContacts />} />
                <Route path="project-enquiries" element={<ProjectEnquiries />} />
                <Route path="capital-requirements" element={<CapitalRequirements />} />
                <Route path="question-management" element={<QuestionManagement />} />
                <Route path="question-sections" element={<QuestionSections />} />
                <Route path="settings" element={<AdminSettings />} />
             </Route>
          </Route>

        </Routes>
        <AIAssistant />
        <DemoConsole />
        <Toaster />
      </BrowserRouter>
    </DemoProvider>
  );
}
