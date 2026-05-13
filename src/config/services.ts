// src/config/services.ts — copied from auth-service/auth-ui
import {
  BarChart2, Bell, Box, Briefcase, Coffee, CreditCard,
  LayoutDashboard, Monitor, ShoppingCart, Ticket,
  Truck, TrendingUp, Wifi, Zap, type LucideIcon,
} from 'lucide-react';

export type ServiceStatus = 'live' | 'beta' | 'coming-soon' | 'offline';

export interface Service {
  id: string;
  name: string;
  shortName?: string;
  description: string;
  icon: LucideIcon;
  url: string;
  apiUrl?: string;
  color: string;
  gradient: string;
  category: 'core' | 'operations' | 'enterprise' | 'specialized';
  status: ServiceStatus;
}

export const SERVICES: Service[] = [
  {
    id: 'ordering', name: 'Codevertex Ordering', shortName: 'Ordering',
    description: 'Multi-tenant online ordering and delivery platform with real-time tracking and PWA support.',
    icon: ShoppingCart, url: 'https://ordersapp.codevertexitsolutions.com',
    color: 'bg-blue-500', gradient: 'from-blue-500 to-cyan-500',
    category: 'core', status: 'live',
  },
  {
    id: 'pos', name: 'Codevertex POS', shortName: 'POS',
    description: 'Offline-capable point of sale for retail, hospitality and QSR with inventory intelligence.',
    icon: Monitor, url: 'https://pos.codevertexitsolutions.com',
    color: 'bg-indigo-600', gradient: 'from-indigo-600 to-purple-600',
    category: 'core', status: 'live',
  },
  {
    id: 'erp', name: 'Codevertex ERP', shortName: 'ERP',
    description: 'Enterprise resource planning with unified finance, HR, procurement, and CRM modules.',
    icon: LayoutDashboard, url: 'https://erp.codevertexitsolutions.com',
    color: 'bg-slate-700', gradient: 'from-slate-700 to-slate-900',
    category: 'enterprise', status: 'live',
  },
  {
    id: 'books', name: 'Codevertex Books', shortName: 'Books',
    description: 'Treasury, payments, financial reconciliation and project tracking with Paystack & M-Pesa.',
    icon: CreditCard, url: 'https://books.codevertexitsolutions.com',
    color: 'bg-purple-500', gradient: 'from-purple-500 to-pink-500',
    category: 'enterprise', status: 'live',
  },
  {
    id: 'logistics', name: 'Codevertex Logistics', shortName: 'Logistics',
    description: 'Fleet management and real-time rider orchestration for delivery and logistics operations.',
    icon: Truck, url: 'https://logistics.codevertexitsolutions.com',
    color: 'bg-green-500', gradient: 'from-green-500 to-emerald-500',
    category: 'operations', status: 'coming-soon',
  },
  {
    id: 'inventory', name: 'Codevertex Inventory', shortName: 'Inventory',
    description: 'Real-time stock management, procurement, and recipe/BOM management across all outlets.',
    icon: Box, url: 'https://inventory.codevertexitsolutions.com',
    color: 'bg-amber-600', gradient: 'from-amber-500 to-orange-500',
    category: 'operations', status: 'coming-soon',
  },
  {
    id: 'projects', name: 'Codevertex Projects', shortName: 'Projects',
    description: 'Collaborative project management and task tracking for internal and client initiatives.',
    icon: Briefcase, url: 'https://projects.codevertexitsolutions.com',
    color: 'bg-cyan-600', gradient: 'from-cyan-500 to-blue-500',
    category: 'enterprise', status: 'coming-soon',
  },
  {
    id: 'ticketing', name: 'Codevertex Ticketing', shortName: 'Support',
    description: 'Multi-tenant customer support and helpdesk with real-time updates and knowledge base.',
    icon: Ticket, url: 'https://ticketing.codevertexitsolutions.com',
    color: 'bg-rose-500', gradient: 'from-rose-500 to-red-500',
    category: 'enterprise', status: 'coming-soon',
  },
  {
    id: 'marketflow', name: 'MarketFlow CRM', shortName: 'MarketFlow',
    description: 'AI-powered marketing automation, lead funnels, nurture sequences and ad analytics.',
    icon: TrendingUp, url: 'https://marketflow.codevertexitsolutions.com',
    color: 'bg-violet-500', gradient: 'from-violet-500 to-pink-500',
    category: 'enterprise', status: 'beta',
  },
  {
    id: 'analytics', name: 'Codevertex Analytics', shortName: 'Analytics',
    description: 'Executive BI dashboards powered by Apache Superset for data-driven decision making.',
    icon: BarChart2, url: 'https://superset.codevertexitsolutions.com',
    color: 'bg-emerald-500', gradient: 'from-emerald-500 to-teal-500',
    category: 'enterprise', status: 'live',
  },
  {
    id: 'isp', name: 'ISP Billing', shortName: 'ISP',
    description: 'Comprehensive billing and management for ISPs, captive portals, and subscriber automation.',
    icon: Wifi, url: 'https://ispbilling.codevertexitsolutions.com',
    color: 'bg-sky-500', gradient: 'from-sky-500 to-blue-500',
    category: 'specialized', status: 'live',
  },
  {
    id: 'truload', name: 'TruLoad', shortName: 'TruLoad',
    description: 'IoT axle-load monitoring, tamper-proof compliance reporting, and fleet management.',
    icon: Zap, url: 'https://truload.codevertexitsolutions.com',
    color: 'bg-yellow-500', gradient: 'from-yellow-500 to-orange-500',
    category: 'specialized', status: 'live',
  },
  {
    id: 'notifications', name: 'Notifications Engine', shortName: 'Notifications',
    description: 'Centralized SMS, email, and push notification delivery with templates and analytics.',
    icon: Bell, url: 'https://notifications.codevertexitsolutions.com',
    color: 'bg-blue-600', gradient: 'from-blue-600 to-indigo-600',
    category: 'specialized', status: 'live',
  },
  {
    id: 'cafe', name: 'Codevertex Cafe', shortName: 'Cafe',
    description: 'Premium dining, business hub, and event bookings at The Urban Loft Cafe.',
    icon: Coffee, url: 'https://theurbanloftcafe.com',
    color: 'bg-orange-500', gradient: 'from-orange-500 to-amber-500',
    category: 'core', status: 'live',
  },
];

export const SERVICE_CATEGORIES = [
  { id: 'core', name: 'Core Services', services: SERVICES.filter(s => s.category === 'core') },
  { id: 'operations', name: 'Operations', services: SERVICES.filter(s => s.category === 'operations') },
  { id: 'enterprise', name: 'Enterprise', services: SERVICES.filter(s => s.category === 'enterprise') },
  { id: 'specialized', name: 'Specialized', services: SERVICES.filter(s => s.category === 'specialized') },
];

export const STATUS_STYLES: Record<ServiceStatus, string> = {
  live: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  beta: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  'coming-soon': 'bg-slate-200/60 text-slate-500 border-slate-200 dark:bg-slate-800/60 dark:text-slate-500 dark:border-slate-700',
  offline: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
};
