import React, { useState } from 'react'
import { Download } from 'lucide-react'

const ranges = ['24 Hours', 'Last 7 Days', 'Last 30 Days', 'Custom'] as const

const bundleShare = [
  { name: 'Enterprise Reasoning Suite', pct: 53.4 },
  { name: 'Code Intelligence & Dev', pct: 34.3 },
  { name: 'General Mesh Fallback', pct: 9.8 },
  { name: 'Starter Sandbox', pct: 2.5 },
]

const topCustomers = [
  { rank: 1, customer: 'acme-research', bundle: 'Enterprise Reasoning Suite', requests: '412K', spend: '$3,214', share: 61 },
  { rank: 2, customer: 'halodoc-ai', bundle: 'Enterprise Reasoning Suite', requests: '286K', spend: '$2,208', share: 42 },
  { rank: 3, customer: 'finara-dev', bundle: 'Code Intelligence & Dev', requests: '301K', spend: '$1,742', share: 38 },
  { rank: 4, customer: 'oceanic-labs', bundle: 'General Mesh Fallback', requests: '188K', spend: '$906', share: 22 },
  { rank: 5, customer: 'studio-kramat', bundle: 'Code Intelligence & Dev', requests: '94K', spend: '$512', share: 11 },
]

export const PartnerAnalytics: React.FC = () => {
  const [range, setRange] = useState<(typeof ranges)[number]>('Last 30 Days')

  return (
    <div className="p-6 lg:p-8 flex flex-col gap-6 max-w-[1400px] mx-auto w-full">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">
            04 · TELEMETRY &amp; CONSUMPTION ANALYTICS
          </span>
          <h1 className="text-2xl lg:text-3xl font-serif font-normal tracking-tight text-[#F5F5F2]">
            Usage &amp; <span className="italic">Analytics</span> Telemetry
          </h1>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1 rounded-full bg-[#0A0C0E] border border-[#22272B] p-1 font-mono text-[11px]">
            {ranges.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1 rounded-full transition-colors ${
                  range === r ? 'bg-[#1E2328] text-[#00E599] font-semibold' : 'text-[#98A0A8] hover:text-[#F5F5F2]'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <button className="px-4 py-2 rounded-full bg-[#F5F5F2] hover:bg-white text-[#060808] text-xs font-medium flex items-center gap-1.5 transition-colors">
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'TOTAL REQUESTS', value: '1.42M', note: '+8.1% vs prior', noteColor: 'text-[#00E599]' },
          { label: 'TOTAL DATA SERVED', value: '41.6B tok', note: 'rolling window', noteColor: 'text-[#5A626A]' },
          { label: 'SUCCESS RATE', value: '99.98%', note: '0 failovers dropped', noteColor: 'text-[#00E599]', valueColor: 'text-[#00E599]' },
          { label: 'AVG LATENCY', value: '142 ms', note: 'p50 · p99 310ms', noteColor: 'text-[#5A626A]', valueColor: 'text-[#38BDF8]' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-5 flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">{s.label}</span>
            <span className={`text-3xl font-mono font-bold ${s.valueColor ?? 'text-[#F5F5F2]'}`}>{s.value}</span>
            <span className={`text-[11px] font-mono ${s.noteColor}`}>{s.note}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">
              REQUESTS ({range})
            </span>
            <span className="font-mono text-[10px] text-[#38BDF8]">peak May 24 · 68.2K</span>
          </div>
          <svg viewBox="0 0 600 160" preserveAspectRatio="none" className="w-full h-40">
            <defs>
              <linearGradient id="pAnArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
              </linearGradient>
            </defs>
            <line x1="0" y1="40" x2="600" y2="40" stroke="#161B1E" strokeWidth="1" />
            <line x1="0" y1="90" x2="600" y2="90" stroke="#161B1E" strokeWidth="1" />
            <line x1="0" y1="140" x2="600" y2="140" stroke="#161B1E" strokeWidth="1" />
            <polygon
              fill="url(#pAnArea)"
              points="0,128 100,118 200,124 300,84 360,52 420,74 500,66 600,58 600,160 0,160"
            />
            <polyline
              fill="none"
              stroke="#38BDF8"
              strokeWidth="2"
              strokeLinejoin="round"
              points="0,128 100,118 200,124 300,84 360,52 420,74 500,66 600,58"
            />
            <circle cx="360" cy="52" r="4" fill="#38BDF8" />
          </svg>
          <div className="flex justify-between font-mono text-[10px] text-[#5A626A]">
            <span>May 1</span><span>May 8</span><span>May 15</span><span>May 22</span><span>May 29</span>
          </div>
        </div>

        <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6 flex flex-col gap-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">
            USAGE BY BUNDLE ($ SPEND)
          </span>
          <div className="flex flex-col gap-3.5">
            {bundleShare.map((b) => (
              <div key={b.name} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#F5F5F2] truncate">{b.name}</span>
                  <span className="font-mono text-[#98A0A8]">{b.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-[#161B1E] overflow-hidden">
                  <div className="h-full rounded-full bg-[#00E599]" style={{ width: `${b.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6 flex flex-col gap-4">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">
          TOP CUSTOMERS (BY MONTHLY SPEND)
        </span>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-[#5A626A] border-b border-[#161B1E]">
                <th className="pb-3 font-normal">RANK</th>
                <th className="pb-3 font-normal">CUSTOMER</th>
                <th className="pb-3 font-normal">BUNDLE</th>
                <th className="pb-3 font-normal">REQUESTS</th>
                <th className="pb-3 font-normal">USAGE SPEND</th>
                <th className="pb-3 font-normal text-right">QUOTA SHARE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#161B1E]">
              {topCustomers.map((c) => (
                <tr key={c.customer}>
                  <td className="py-3 text-[#5A626A]">{c.rank}</td>
                  <td className="py-3 text-[#F5F5F2] font-medium">{c.customer}</td>
                  <td className="py-3 text-[#98A0A8]">{c.bundle}</td>
                  <td className="py-3 text-[#F5F5F2]">{c.requests}</td>
                  <td className="py-3 text-[#38BDF8]">{c.spend}</td>
                  <td className="py-3 text-right text-[#98A0A8]">{c.share}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <span className="font-mono text-[10px] text-[#5A626A]">
          Usage aggregated over rolling window · settle engine excludes zero-log traffic content
        </span>
      </div>
    </div>
  )
}

export default PartnerAnalytics
