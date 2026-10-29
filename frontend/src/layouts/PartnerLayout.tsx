import React, { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Search, Zap, Menu } from 'lucide-react'
import { useSessionStore } from '@/store/session-store'

const navItems = [
  { to: '/partner', label: 'Overview', end: true },
  { to: '/partner/channels', label: 'Channels' },
  { to: '/partner/models', label: 'Models' },
  { to: '/partner/bundles', label: 'Bundles' },
  { to: '/partner/quota', label: 'Quota Contribution' },
  { to: '/partner/analytics', label: 'Usage & Analytics' },
  { to: '/partner/customers', label: 'Customers / Access' },
  { to: '/partner/earnings', label: 'Earnings & Settlements' },
  { to: '/partner/settings', label: 'Partner Settings' },
]

const crumbs: Record<string, string> = {
  '/partner': '01 / PARTNER SPACE / OVERVIEW',
  '/partner/channels': '02 / PARTNER INFRASTRUCTURE / UPSTREAM ROUTING MESH',
  '/partner/models': '02 / MODEL CATALOG & PROTOCOL MAPPING / PARTNER DISPATCH',
  '/partner/bundles': '03 / MULTI-MODEL PACKAGES & SUBSCRIBER TIERS',
  '/partner/quota': '03 / LIQUIDITY CONTRIBUTIONS & FAIR SCU POOL',
  '/partner/analytics': '04 / TELEMETRY & CONSUMPTION ANALYTICS',
  '/partner/customers': '07 / TENANT PERMISSIONS & CREDENTIALS',
  '/partner/earnings': '06 / REVENUE DISBURSEMENT & LEDGER',
  '/partner/settings': '05 / TENANT PREFERENCES & CONFIGURATION',
}

export const PartnerLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const { user } = useSessionStore()
  const crumb = crumbs[location.pathname] ?? 'PARTNER SPACE'

  return (
    <div className="flex h-screen w-screen bg-[#060808] text-[#F5F5F2] overflow-hidden font-sans ocean-bg">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 md:z-20 w-[240px] h-full bg-[#0A0C0E] border-r border-[#22272B] flex flex-col p-4 flex-shrink-0 transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:static md:translate-x-0`}
      >
        <div className="flex items-center gap-2.5 pb-4 border-b border-[#22272B]">
          <div className="w-7 h-7 rounded-md bg-[#00E599] flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 fill-[#060808] text-[#060808]" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs tracking-widest font-semibold text-[#F5F5F2] uppercase">
              SWIMORE AI
            </span>
            <span className="font-mono text-[9px] tracking-widest text-[#00E599] uppercase">
              PARTNER SPACE
            </span>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-0.5 py-4 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `font-mono text-xs uppercase tracking-wider py-2 px-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#00E599]/10 border-l-2 border-[#00E599] text-[#00E599]'
                    : 'text-[#98A0A8] hover:text-[#F5F5F2] hover:bg-[#121619] border-l-2 border-transparent'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <footer className="pt-3 border-t border-[#22272B] font-mono text-[10px] flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[#00E599]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E599]" />
            NODES ONLINE
          </span>
          <span className="text-[#5A626A]">v2.4.0</span>
        </footer>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-14 border-b border-[#22272B] bg-[#060808]/90 backdrop-blur px-4 sm:px-6 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-1.5 -ml-1.5 rounded-lg text-[#98A0A8] hover:text-[#F5F5F2] hover:bg-[#121619] transition-colors"
              aria-label="Toggle partner sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#98A0A8] truncate">
              {crumb}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A0C0E] border border-[#22272B] text-xs text-[#98A0A8]">
              <Search className="w-3.5 h-3.5 text-[#5A626A]" />
              <span className="text-[#5A626A]">Search...</span>
              <kbd className="px-1.5 py-0.5 rounded bg-[#121619] border border-[#22272B] font-mono text-[10px] text-[#98A0A8]">
                ⌘K
              </kbd>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#00E599]/15 border border-[#00E599]/40 text-[#00E599] font-mono text-[10px] uppercase tracking-wider">
              PARTNER
            </span>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#7C3AED] text-white flex items-center justify-center text-xs font-bold">
                {(user?.name || 'N')[0]}
              </div>
              <span className="hidden sm:block text-xs font-medium text-[#F5F5F2]">
                {user?.name ?? 'Nova Compute'}
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default PartnerLayout
