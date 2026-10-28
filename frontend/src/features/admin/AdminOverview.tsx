import React from 'react';
import { LucideIcon } from 'lucide-react';

const data = {
  totalUsers: 12482,
  totalUsersChange: '+4.2%',
  activePartners: 38,
  requests24h: 1840000,
  uptime: '99.99%',
};

const MetricCard = ({ label, value, badgeClass }: any) => (
  <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6">
    <div className="flex items-center justify-between">
      <span className="text-[#F5F5F2]">{label}</span>
      <span className={badgeClass}>{value}</span>
    </div>
  </div>
);

const AdminOverview = () => {
  return (
    <div className="p-6 lg:p-8 flex flex-col gap-6 max-w-[1400px] mx-auto w-full">
      <div className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">
        PLATFORM OVERVIEW
      </div>
      <h1 className="text-2xl lg:text-3xl font-serif font-normal tracking-tight italic">
        Control center, at a glance.
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          label="Total Users"
          value={data.totalUsers}
          badgeClass="bg-[#00E599]/10 border-[#00E599]/30 text-[#00E599]"
        />
        <MetricCard
          label="Active Partners"
          value={data.activePartners}
          badgeClass="bg-[#38BDF8]/10 border-[#38BDF8]/30 text-[#38BDF8]"
        />
        <MetricCard
          label="Requests / 24h"
          value={data.requests24h}
          badgeClass="bg-[#00E599]/10 border-[#00E599]/30 text-[#00E599]"
        />
        <MetricCard
          label="Gateway Uptime"
          value={data.uptime}
          badgeClass="bg-[#00E599]/10 border-[#00E599]/30 text-[#00E599]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Requests Throughput */}
        <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6">
          <h2 className="text-2xl font-serif tracking-tight">REQUESTS THROUGHPUT (7D)</h2>
          <svg className="w-full h-48" viewBox="0 0 600 160" aria-label="Requests throughput chart">
            <line x1="0" y1="80" x2="600" y2="80" stroke="#444" strokeWidth="1" />
            <line x1="85.7" y1="80" x2="85.7" y2="20" stroke="#444" strokeWidth="1" />
            <line x1="171.4" y1="80" x2="171.4" y2="20" stroke="#444" strokeWidth="1" />
            <line x1="257.1" y1="80" x2="257.1" y2="20" stroke="#444" strokeWidth="1" />
            <line x1="342.9" y1="80" x2="342.9" y2="20" stroke="#444" strokeWidth="1" />
            <line x1="428.6" y1="80" x2="428.6" y2="20" stroke="#444" strokeWidth="1" />
            <line x1="514.3" y1="80" x2="514.3" y2="20" stroke="#444" strokeWidth="1" />
            <line x1="600" y1="80" x2="600" y2="20" stroke="#444" strokeWidth="1" />
            <text x="10" y="95" className="text-[#F5F5F2] text-xs" text-anchor="start">Mon</text>
            <text x="85.7" y="95" className="text-[#F5F5F2] text-xs" text-anchor="middle">Tue</text>
            <text x="171.4" y="95" className="text-[#F5F5F2] text-xs" text-anchor="middle">Wed</text>
            <text x="257.1" y="95" className="text-[#F5F5F2] text-xs" text-anchor="middle">Thu</text>
            <text x="342.9" y="95" className="text-[#F5F5F2] text-xs" text-anchor="middle">Fri</text>
            <text x="428.6" y="95" className="text-[#F5F5F2] text-xs" text-anchor="middle">Sat</text>
            <text x="514.3" y="95" className="text-[#F5F5F2] text-xs" text-anchor="middle">Sun</text>
            <text x="600" y="95" className="text-[#F5F5F2] text-xs" text-anchor="end">Sun</text>
            <path d="M0,80 L600,80 L600,20 L0,20 Z" fill="rgba(56,189,248,0.2)" stroke="#38BDF8" />
            <path d="M0,80 L100,70 L200,85 L300,75 L400,90 L500,80" fill="none" stroke="#00E599" strokeWidth="2" />
          </svg>
          <p className="text-[#F5F5F2] text-sm mt-2">Partner mesh (secondary line)</p>
        </div>

        {/* System Health */}
        <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6">
          <h2 className="text-2xl font-serif tracking-tight">SYSTEM HEALTH</h2>
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#00E599] rounded-full"></span>
              <span className="text-[#F5F5F2]">Router Engine Operational</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#00E599] rounded-full"></span>
              <span className="text-[#F5F5F2]">PostgreSQL Primary Operational</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#00E599] rounded-full"></span>
              <span className="text-[#F5F5F2]">Redis Cache Operational</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#E5A93C] rounded-full border border-[#E5A93C]/30"></span>
              <span className="text-[#F5F5F2]">Partner Mesh 1 degraded</span>
            </div>
          </div>
        </div>

        {/* Recent Admin Events */}
        <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6">
          <h2 className="text-2xl font-serif tracking-tight">RECENT ADMIN EVENTS</h2>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-[#F5F5F2] text-sm">
              <span>12:04 UTC</span>
              <span>PARTNER_APPROVED</span>
            </div>
            <div className="flex items-center justify-between text-[#F5F5F2] text-sm">
              <span>11:52</span>
              <span>QUOTA_OVERRIDE</span>
            </div>
            <div className="flex items-center justify-between text-[#F5F5F2] text-sm">
              <span>11:31</span>
              <span>PROVIDER_SUSPENDED</span>
            </div>
            <div className="flex items-center justify-between text-[#F5F5F2] text-sm">
              <span>10:58</span>
              <span>MODEL_DEPRECATION</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;