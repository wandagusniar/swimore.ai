import React from 'react'
import { Link } from 'react-router-dom'

const stats = [
  { label: 'ACTIVE CHANNELS', value: '3 / 4', note: '1 standby node configured', to: '/partner/channels' },
  { label: 'EARNED YIELD / MTD', value: '$380.00', note: 'Next settlement Fri 00:00 UTC', to: '/partner/earnings', color: 'text-[#00E599]' },
  { label: 'AVG DISPATCH LATENCY', value: '142 ms', note: '99.94% edge route target met', to: '/partner/models', color: 'text-[#38BDF8]' },
  { label: 'ACTIVE TENANTS', value: '28', note: '31 scoped API keys', to: '/partner/customers' },
]

const activity = [
  { time: '12:04 UTC', event: 'CHANNEL_HEALTH_OK', detail: 'novacompute-claude-primary p99 19ms' },
  { time: '11:52 UTC', event: 'QUOTA_SETTLED', detail: 'DeepSeek-V3 Cluster · +2,410 SCU' },
  { time: '11:31 UTC', event: 'TENANT_GRANTED', detail: 'acme-research → Enterprise Reasoning Suite' },
  { time: '10:58 UTC', event: 'PAYOUT_EXECUTED', detail: '$1,240.00 → SeaBank •• 4471' },
]

export const PartnerOverview: React.FC = () => (
  <div className="p-6 lg:p-8 flex flex-col gap-6 max-w-[1400px] mx-auto w-full">
    <div className="flex flex-col gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">
        01 · PARTNER SPACE
      </span>
      <h1 className="text-2xl lg:text-3xl font-serif font-normal tracking-tight text-[#F5F5F2]">
        Supply-side, <span className="italic">at a glance.</span>
      </h1>
      <p className="text-sm text-[#98A0A8]">
        Channel health, pool yield, and tenant consumption for @novacompute.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <Link
          key={s.label}
          to={s.to}
          className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-5 flex flex-col gap-2 hover:border-[#333A40] transition-colors"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">{s.label}</span>
          <span className={`text-3xl font-mono font-bold ${s.color ?? 'text-[#F5F5F2]'}`}>{s.value}</span>
          <span className="text-[11px] font-mono text-[#5A626A]">{s.note}</span>
        </Link>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6 flex flex-col gap-4">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">
          DISPATCH THROUGHPUT (7D)
        </span>
        <svg viewBox="0 0 600 160" preserveAspectRatio="none" className="w-full h-36">
          <defs>
            <linearGradient id="pOvArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00E599" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#00E599" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="0" y1="45" x2="600" y2="45" stroke="#161B1E" strokeWidth="1" />
          <line x1="0" y1="95" x2="600" y2="95" stroke="#161B1E" strokeWidth="1" />
          <line x1="0" y1="140" x2="600" y2="140" stroke="#161B1E" strokeWidth="1" />
          <polygon
            fill="url(#pOvArea)"
            points="0,120 85,110 170,96 255,104 340,78 425,84 510,58 600,70 600,160 0,160"
          />
          <polyline
            fill="none"
            stroke="#00E599"
            strokeWidth="2"
            strokeLinejoin="round"
            points="0,120 85,110 170,96 255,104 340,78 425,84 510,58 600,70"
          />
        </svg>
        <div className="flex justify-between font-mono text-[10px] text-[#5A626A]">
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
        </div>
      </div>

      <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6 flex flex-col gap-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">
          RECENT ACTIVITY
        </span>
        <div className="flex flex-col divide-y divide-[#161B1E]">
          {activity.map((a) => (
            <div key={a.time + a.event} className="py-3 flex flex-col gap-0.5">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="text-[#00E599]">{a.event}</span>
                <span className="text-[#5A626A]">{a.time}</span>
              </div>
              <span className="text-xs text-[#98A0A8]">{a.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

export default PartnerOverview
