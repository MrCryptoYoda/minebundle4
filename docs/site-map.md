# The Minexchange - Site Map & Documentation

## Overview
This document outlines the implemented routes, layout shells, and key features of The Minexchange platform.

## Layout Shells
- **PublicLayout**: Standard header (transparent/white) + footer. Used for marketing and discovery pages.
- **AppLayout**: Authenticated shell with left sidebar navigation and header. Used for Account Area, Insights, and Admin.
- **ListingWizardLayout**: Specialized shell with progress stepper and right-side preview panel. Used for "List an Asset" flows.

## Route Structure

### Public (Marketing & Discovery)
- `/` - Homepage (Hero, Featured, Partners)
- `/search` - Asset Search (Filters, AI Overview, Results)
- `/listing/:id` - Listing Detail (NDA Gating, Tabs, Agent Info)
- `/marketplace` - Marketplace Home (Service Categories, Featured Providers)
- `/pricing` - Pricing Page (Subscription Tiers)

### Account Area (Authenticated)
- `/app/dashboard` - User Dashboard (Stats, Active Listings)
- `/app/messages` - Message Center
- `/app/listings` - My Listings Management
- `/app/my-projects` - Saved Projects
- `/app/saved-searches` - Saved Search Alerts
- `/app/account` - Profile Settings

### Listing Wizard (List an Asset)
- `/list` - Asset Type Picker
- `/list/offtake/step/1` - Offtake: Property Details
- `/list/offtake/step/2` - Offtake: Resource & Availability
- `/list/offtake/step/3` - Offtake: Review & Publish
- *(Other asset types use placeholders following the same pattern)*

### Insights (Service Providers Only)
- `/insights/dashboard` - Premium Dashboard (Leads, Signals)
- `/insights/leads` - Lead Feed
- `/insights/enquiries` - Service Enquiries

### Admin Panel
- `/admin/dashboard` - System Overview
- `/admin/users` - User Management Table
- `/admin/projects` - Project Management Table

## Demo Console
A floating drawer (bottom-right gear icon) allows you to simulate different user states:
- **Authentication**: Toggle Sign In / Sign Out.
- **User Role**: Switch between Individual, Agent, Broker, Service Provider, Admin.
- **NDA Status**: Toggle "NDA Signed" to unlock gated content on Listing Detail pages.
- **Subscription**: Toggle "Insights Sub" to unlock the Insights Dashboard (requires Service Provider role).

## Key Components
- **UI Library**: Custom Tailwind components for Button, Card, Input, Badge, Dialog, Tabs, Select.
- **Gating Logic**: `ListingDetailPage` checks `ndaSigned` state to show/hide Data Room content. `InsightsDashboard` checks `userRole` and `hasInsightsSubscription`.
