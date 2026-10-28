import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '@/features/home/HomePage'
import { ChatWorkspace } from '@/features/chat/ChatWorkspace'
import { ModelsCatalog } from '@/features/models/ModelsCatalog'
import { ModelDetails } from '@/features/models/ModelDetails'
import { PartnerMarketplace } from '@/features/marketplace/PartnerMarketplace'
import { PricingMatrix } from '@/features/pricing/PricingMatrix'
import { DocumentationView } from '@/features/docs/DocumentationView'
import { ApiKeysDashboard } from '@/features/dashboard/ApiKeysDashboard'
import { AdminLayout } from '@/layouts/AdminLayout'
import AdminOverview from '@/features/admin/AdminOverview'
import AdminUsers from '@/features/admin/AdminUsers'
import AdminPartners from '@/features/admin/AdminPartners'
import AdminProviders from '@/features/admin/AdminProviders'
import AdminModelRegistry from '@/features/admin/AdminModelRegistry'
import AdminRouting from '@/features/admin/AdminRouting'
import AdminPools from '@/features/admin/AdminPools'
import AdminBundles from '@/features/admin/AdminBundles'
import { AdminAnalytics } from '@/features/admin/AdminAnalytics'
import { AdminLogs } from '@/features/admin/AdminLogs'
import { AdminSecurity } from '@/features/admin/AdminSecurity'
import { AdminSettings } from '@/features/admin/AdminSettings'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/chat',
    element: <ChatWorkspace />,
  },
  {
    path: '/models',
    element: <ModelsCatalog />,
  },
  {
    path: '/models/:id',
    element: <ModelDetails />,
  },
  {
    path: '/marketplace',
    element: <PartnerMarketplace />,
  },
  {
    path: '/pricing',
    element: <PricingMatrix />,
  },
  {
    path: '/docs',
    element: <DocumentationView />,
  },
  {
    path: '/docs/:slug*',
    element: <DocumentationView />,
  },
  {
    path: '/dashboard/keys',
    element: <ApiKeysDashboard />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminOverview /> },
      { path: 'users', element: <AdminUsers /> },
      { path: 'partners', element: <AdminPartners /> },
      { path: 'providers', element: <AdminProviders /> },
      { path: 'models', element: <AdminModelRegistry /> },
      { path: 'routing', element: <AdminRouting /> },
      { path: 'pools', element: <AdminPools /> },
      { path: 'bundles', element: <AdminBundles /> },
      { path: 'analytics', element: <AdminAnalytics /> },
      { path: 'logs', element: <AdminLogs /> },
      { path: 'security', element: <AdminSecurity /> },
      { path: 'settings', element: <AdminSettings /> },
    ],
  },
  {
    path: '*',
    element: <HomePage />,
  },
])