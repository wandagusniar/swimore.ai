import React, { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Search, Zap, Menu } from 'lucide-react'
import { useSessionStore } from '@/store/session-store'

const navItems = [
  { to: '/admin', label: 'Overview', end: true },
  { to: '/admin/users', label: 'Users' },
  { to: '/admin/partners', label: 'Partners' },
  { to: '/admin/providers', label: 'Providers & Channels' },
  { to: '/admin/models', label: 'Model Registry' },
  { to: '/admin/routing', label: 'Routing & Failover' },
  { to: '/admin/pools', label: 'Pool & Quotas' },
  { to: '/admin/bundles', label: 'Bundle Management' },
  { to: '/admin/analytics', label: 'Usage & Analytics' },
  { to: '/admin/logs', label: 'Monitoring & Logs' },
  { to: '/admin/security', label: 'Security & Audit' },
  { to: '/admin/settings', label: 'Platform Settings' },
]

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const { user } = useSessionStore()

  const currentCrumb =
    navItems
      .filter((i) => (i.end ? location.pathname === i.to : location.pathname.startsWith(i.to)))
      .sort((a, b) => b.to.length - a.to.length)[0]?.label ?? 'Overview'

  return (
    <div className="flex h-screen w-screen bg-[#060808] text-[#F5F5F2] overflow-hidden font-sans ocean-bg">
      {/* Mobile drawer backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Left Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 md:z-20 w-[240px] h-full bg-[#0A0C0E] border-r border-[#22272B] flex flex-col p-4 flex-shrink-0 transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:static md:translate-x-0`}
      >
        {/* Brand */}
        <div className="flex items-center gap-2.5 pb-4 border-b border-[#22272B]">
          <div className="w-7 h-7 rounded-md bg-[#38BDF8] flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 fill-[#060808] text-[#060808]" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs tracking-widest font-semibold text-[#F5F5F2] uppercase">
              SWIMORE
            </span>
            <span className="font-mono text-[9px] tracking-widest text-[#38BDF8] uppercase">
              CONTROL CENTER
            </span>
          </div>
        </div>

        {/* Navigation */}
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

        {/* Sidebar footer */}
        <footer className="pt-3 border-t border-[#22272B] font-mono text-[10px] flex items-center justify-between">
          <span className="text-[#5A626A]">v2.4.0-prod</span>
          <span className="flex items-center gap-1.5 text-[#00E599]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E599]" />
            Online
          </span>
        </footer>
      </aside>

      {/* Right column: topbar + content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 border-b border-[#22272B] bg-[#060808]/90 backdrop-blur px-4 sm:px-6 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-1.5 -ml-1.5 rounded-lg text-[#98A0A8] hover:text-[#F5F5F2] hover:bg-[#121619] transition-colors"
              aria-label="Toggle admin sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <nav className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest">
              <span className="text-[#98A0A8]">ADMIN</span>
              <span className="text-[#5A626A]">/</span>
              <span className="text-[#38BDF8]">{currentCrumb}</span>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A0C0E] border border-[#22272B] text-xs text-[#98A0A8]">
              <Search className="w-3.5 h-3.5 text-[#5A626A]" />
              <span className="text-[#5A626A]">Search admin...</span>
              <kbd className="px-1.5 py-0.5 rounded bg-[#121619] border border-[#22272B] font-mono text-[10px] text-[#98A0A8]">
                ⌘K
              </kbd>
            </div>

            <span className="px-2 py-0.5 rounded bg-[#E5A93C]/15 border border-[#E5A93C]/40 text-[#E5A93C] font-mono text-[10px] uppercase tracking-wider">
              ADMIN
            </span>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#7C3AED] text-white flex items-center justify-center text-xs font-bold">
                {(user?.name || 'A')[0]}
              </div>
              <span className="hidden sm:block text-xs font-medium text-[#F5F5F2]">{user?.name}</span>
            </div>
          </div>
        </header>

        {/* Main outlet */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
