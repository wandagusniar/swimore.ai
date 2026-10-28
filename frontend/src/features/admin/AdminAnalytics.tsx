import React, { useState } from 'react'

const ranges = ['24H', '7D', '30D', '90D'] as const

const stats = [
  { label: 'TOTAL REQUESTS', value: '54.2M', delta: '+12.4% vs prior', deltaColor: 'text-[#00E599]' },
  { label: 'TOKENS SERVED', value: '812B', delta: '+9.1% vs prior', deltaColor: 'text-[#00E599]' },
  { label: 'GROSS REVENUE', value: '$182,400', delta: '+14.8% vs prior', deltaColor: 'text-[#00E599]', valueColor: 'text-[#38BDF8]' },
  { label: 'ACTIVE API KEYS', value: '3,904', delta: '312 issued this week', deltaColor: 'text-[#98A0A8]' },
]

const providerShare = [
  { name: 'OpenAI', pct: 38, color: '#38BDF8' },
  { name: 'Anthropic', pct: 27, color: '#38BDF8' },
  { name: 'DeepSeek', pct: 18, color: '#38BDF8' },
  { name: 'Partner Mesh', pct: 12, color: '#00E599' },
  { name: 'Other', pct: 5, color: '#5A626A' },
]

const topModels = [
  { model: 'gpt-4o', provider: 'OpenAI', requests: '18.4M', tokens: '241B', revenue: '$61,200', share: 34 },
  { model: 'claude-3-5-sonnet', provider: 'Anthropic', requests: '12.1M', tokens: '198B', revenue: '$48,900', share: 22 },
  { model: 'deepseek-r1', provider: 'DeepSeek', requests: '9.8M', tokens: '162B', revenue: '$21,300', share: 18 },
  { model: 'llama-3.3-70b', provider: '@novacompute', requests: '6.5M', tokens: '118B', revenue: '$14,800', share: 12 },
  { model: 'qwen-2.5-72b', provider: '@tokenforge', requests: '4.2M', tokens: '61B', revenue: '$9,600', share: 8 },
  { model: 'glm-4-plus', provider: 'ZAI', requests: '3.2M', tokens: '32B', revenue: '$7,900', share: 6 },
]

export const AdminAnalytics: React.FC = () => {
  const [range, setRange] = useState<(typeof ranges)[number]>('30D')

  return (
    <div className="p-6 lg:p-8 flex flex-col gap-6 max-w-[1400px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">
            07 · TELEMETRY
          </span>
          <h1 className="text-2xl lg:text-3xl font-serif font-normal tracking-tight text-[#F5F5F2]">
            Usage &amp; <span className="italic">Analytics</span>
          </h1>
          <p className="text-sm text-[#98A0A8]">Platform-wide consumption telemetry</p>
        </div>

        <div className="flex items-center gap-1 rounded-full bg-[#0A0C0E] border border-[#22272B] p-1 font-mono text-[11px]">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3.5 py-1 rounded-full transition-colors ${
                range === r ? 'bg-[#1E2328] text-[#00E599] font-semibold' : 'text-[#98A0A8] hover:text-[#F5F5F2]'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-5 flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">{s.label}</span>
            <span className={`text-3xl font-mono font-bold ${s.valueColor ?? 'text-[#F5F5F2]'}`}>{s.value}</span>
            <span className={`text-[11px] font-mono ${s.deltaColor}`}>{s.delta}</span>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Request volume by provider */}
        <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6 flex flex-col gap-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">
            REQUEST VOLUME BY PROVIDER
          </span>
          <div className="flex flex-col gap-3.5">
            {providerShare.map((p) => (
              <div key={p.name} className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-xs text-[#F5F5F2] truncate">{p.name}</span>
                <div className="flex-1 h-2 rounded-full bg-[#161B1E] overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${p.pct}%`, backgroundColor: p.color }} />
                </div>
                <span className="w-10 text-right font-mono text-xs text-[#98A0A8]">{p.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue trend */}
        <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">
              REVENUE TREND (30D)
            </span>
            <span className="font-mono text-[10px] text-[#38BDF8]">$182,400 total</span>
          </div>
          <svg viewBox="0 0 600 160" preserveAspectRatio="none" className="w-full h-36">
            <defs>
              <linearGradient id="revArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
              </linearGradient>
            </defs>
            <line x1="0" y1="40" x2="600" y2="40" stroke="#161B1E" strokeWidth="1" />
            <line x1="0" y1="90" x2="600" y2="90" stroke="#161B1E" strokeWidth="1" />
            <line x1="0" y1="140" x2="600" y2="140" stroke="#161B1E" strokeWidth="1" />
            <polygon
              fill="url(#revArea)"
              points="0,130 100,118 200,122 300,96 400,84 500,66 600,48 600,160 0,160"
            />
            <polyline
              fill="none"
              stroke="#38BDF8"
              strokeWidth="2"
              strokeLinejoin="round"
              points="0,130 100,118 200,122 300,84 400,84 500,66 600,48"
            />
          </svg>
          <div className="flex justify-between font-mono text-[10px] text-[#5A626A]">
            <span>W1</span>
            <span>W2</span>
            <span>W3</span>
            <span>W4</span>
          </div>
        </div>
      </div>

      {/* Top models table */}
      <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6 flex flex-col gap-4">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">
          TOP MODELS BY REQUESTS
        </span>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-[#5A626A] border-b border-[#161B1E]">
                <th className="pb-3 font-normal">MODEL</th>
                <th className="pb-3 font-normal">PROVIDER</th>
                <th className="pb-3 font-normal">REQUESTS</th>
                <th className="pb-3 font-normal">TOKENS</th>
                <th className="pb-3 font-normal">REVENUE</th>
                <th className="pb-3 font-normal text-right">SHARE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#161B1E]">
              {topModels.map((m) => (
                <tr key={m.model}>
                  <td className="py-3 text-[#F5F5F2] font-medium">{m.model}</td>
                  <td className="py-3 text-[#98A0A8]">{m.provider}</td>
                  <td className="py-3 text-[#F5F5F2]">{m.requests}</td>
                  <td className="py-3 text-[#98A0A8]">{m.tokens}</td>
                  <td className="py-3 text-[#38BDF8]">{m.revenue}</td>
                  <td className="py-3 text-right text-[#98A0A8]">{m.share}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminAnalytics
