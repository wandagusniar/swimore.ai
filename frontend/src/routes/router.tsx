import React from 'react'
import { createBrowserRouter, Navigate, useLocation } from 'react-router-dom'
import { useSessionStore } from '@/store/session-store'
import LoginPage from '@/features/auth/LoginPage'
import SignupPage from '@/features/auth/SignupPage'
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
import { PartnerLayout } from '@/layouts/PartnerLayout'
import PartnerOverview from '@/features/partner/PartnerOverview'
import PartnerChannels from '@/features/partner/PartnerChannels'
import PartnerModels from '@/features/partner/PartnerModels'
import PartnerBundles from '@/features/partner/PartnerBundles'
import PartnerQuota from '@/features/partner/PartnerQuota'
import PartnerAnalytics from '@/features/partner/PartnerAnalytics'
import PartnerCustomers from '@/features/partner/PartnerCustomers'
import PartnerEarnings from '@/features/partner/PartnerEarnings'
import PartnerSettings from '@/features/partner/PartnerSettings'
import { AdminAnalytics } from '@/features/admin/AdminAnalytics'
import { AdminLogs } from '@/features/admin/AdminLogs'
import { AdminSecurity } from '@/features/admin/AdminSecurity'
import { AdminSettings } from '@/features/admin/AdminSettings'

// ponytail: cosmetic gates — real enforcement needs backend JWT verification
const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation()
  const user = useSessionStore((s) => s.user)
  if (!user) return <Navigate to={`/login?next=${encodeURIComponent(location.pathname)}`} replace />
  return <>{children}</>
}

const RequireRole: React.FC<{ role: 'admin' | 'partner'; children: React.ReactNode }> = ({ role, children }) => {
  const location = useLocation()
  const user = useSessionStore((s) => s.user)
  const allowed = role === 'admin' ? !!user?.isAdmin : !!user?.isPartner
  if (!allowed) {
    return <Navigate to={`/login?next=${encodeURIComponent(location.pathname)}`} replace />
  }
  return <>{children}</>
}

const NotFoundPage: React.FC = () => (
  <div className="min-h-screen w-full bg-[#060808] text-[#F5F5F2] flex flex-col items-center justify-center px-6 font-sans ocean-bg gap-4">
    <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">ERROR 404</span>
    <h1 className="text-5xl font-serif font-normal tracking-tight">Page not found.</h1>
    <p className="text-sm text-[#98A0A8] max-w-md text-center">The route you requested doesn't exist in the Swimore mesh.</p>
    <a href="/" className="mt-4 px-6 py-2.5 rounded-full bg-[#F5F5F2] hover:bg-white text-[#060808] text-sm font-medium transition-all">Back to Home</a>
  </div>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/chat',
    element: <RequireAuth><ChatWorkspace /></RequireAuth>,
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
    element: <RequireAuth><PartnerMarketplace /></RequireAuth>,
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
    element: <RequireAuth><ApiKeysDashboard /></RequireAuth>,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/admin',
    element: <RequireRole role="admin"><AdminLayout /></RequireRole>,
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
    path: '/partner',
    element: <RequireRole role="partner"><PartnerLayout /></RequireRole>,
    children: [
      { index: true, element: <PartnerOverview /> },
      { path: 'channels', element: <PartnerChannels /> },
      { path: 'models', element: <PartnerModels /> },
      { path: 'bundles', element: <PartnerBundles /> },
      { path: 'quota', element: <PartnerQuota /> },
      { path: 'analytics', element: <PartnerAnalytics /> },
      { path: 'customers', element: <PartnerCustomers /> },
      { path: 'earnings', element: <PartnerEarnings /> },
      { path: 'settings', element: <PartnerSettings /> },
    ],
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])