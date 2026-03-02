import { subHours, subMinutes, subDays } from 'date-fns';

export interface Notification {
  id: string;
  type: 'saved_search' | 'enquiry' | 'system';
  title: string;
  message: string;
  createdAt: Date;
  read: boolean;
  link: string;
}

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif_001',
    type: 'saved_search',
    title: 'New matches for "Gold Mine"',
    message: 'There are 2 new search results for your saved searches.',
    createdAt: subMinutes(new Date(), 45),
    read: false,
    link: '/app/saved-searches'
  },
  {
    id: 'notif_002',
    type: 'enquiry',
    title: 'New enquiry from Sarah Jenkins',
    message: 'I am interested in the Copper Project listing...',
    createdAt: subHours(new Date(), 3),
    read: false,
    link: '/app/messages'
  },
  {
    id: 'notif_003',
    type: 'system',
    title: 'Your listing is now live',
    message: 'High-Grade Gold Project in WA has been approved and is now visible to buyers.',
    createdAt: subDays(new Date(), 1),
    read: true,
    link: '/app/listings'
  },
  {
    id: 'notif_004',
    type: 'system',
    title: 'Draft saved',
    message: 'Your progress on "Lithium Asset" has been saved.',
    createdAt: subDays(new Date(), 2),
    read: true,
    link: '/app/listings'
  }
];
