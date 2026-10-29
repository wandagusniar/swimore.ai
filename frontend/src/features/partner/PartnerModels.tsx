import React, { useState } from 'react'
import { Search, Plus } from 'lucide-react'

const models = [
  {
    badge: 'AN',
    name: 'claude-3-5-sonnet',
    channel: 'novacompute-claude-primary',
    context: '200,000 tok',
    input: '$2.70',
    inputNote: '10% off-peak',
    output: '$13.50',
    status: 'PUBLISHED',
  },
  {
    badge: 'DS',
    name: 'deepseek-r1',
    channel: 'novacompute-deepseek-r1',
    context: '64,000 tok',
    input: '$0.50',
    inputNote: 'standard',
    output: '$2.60',
    status: 'PUBLISHED',
  },
  {
    badge: 'QW',
    name: 'qwen-2-5-72b-coder',
    channel: 'novacompute-qwen-coder',
    context: '131,072 tok',
    input: '$0.32',
    inputNote: 'standard',
    output: '$0.96',
    status: 'PUBLISHED',
  },
  {
    badge: 'LL',
    name: 'llama-3-3-70b-failover',
    channel: 'novacompute-deepseek-r1',
    context: '131,072 tok',
    input: '$0.30',
    inputNote: 'mesh rate',
    output: '$0.90',
    status: 'PUBLISHED',
  },
  {
    badge: 'MI',
    name: 'mistral-large-2',
    channel: 'novacompute-mistral-backup',
    context: '128,000 tok',
    input: '$2.00',
    inputNote: 'standby',
    output: '$6.00',
    status: 'STANDBY',
  },
]

const tabs = ['All (5)', 'Reasoning', 'Coding', 'Multimodal', 'General']

export const PartnerModels: React.FC = () => {
  const [tab, setTab] = useState(tabs[0])
  const [query, setQuery] = useState('')

  const visible = models.filter(
    (m) => !query || `${m.name} ${m.channel}`.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="p-6 lg:p-8 flex flex-col gap-6 max-w-[1400px] mx-auto w-full">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">
            02 · MODEL CATALOG &amp; PROTOCOL MAPPING
          </span>
          <h1 className="text-2xl lg:text-3xl font-serif font-normal tracking-tight text-[#F5F5F2]">
            Partner <span className="italic">Models</span>
          </h1>
          <p className="text-sm text-[#98A0A8] max-w-xl">
            Active upstream model mappings, published token tariffs, and endpoint binding states for @novacompute.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-1 rounded-full bg-[#00E599]/10 border border-[#00E599]/30 font-mono text-[10px] text-[#00E599] uppercase">
            ● Gateway sync live · eu-central-sw1
          </span>
          <button className="px-4 py-2 rounded-full bg-[#F5F5F2] hover:bg-white text-[#060808] text-xs font-medium flex items-center gap-1.5 transition-colors">
            <Plus className="w-3.5 h-3.5" /> Map Model
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-5 flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">TOTAL PROVISIONED</span>
          <span className="text-3xl font-mono font-bold text-[#F5F5F2]">5 <span className="text-sm font-normal text-[#98A0A8]">Models</span></span>
          <span className="text-[11px] font-mono text-[#00E599]">100% telemetry pass</span>
        </div>
        <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-5 flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">PUBLIC MARKETPLACE</span>
          <span className="text-3xl font-mono font-bold text-[#F5F5F2]">4 <span className="text-sm font-normal text-[#98A0A8]">Published</span></span>
          <span className="text-[11px] font-mono text-[#5A626A]">1 standby backup</span>
        </div>
        <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-5 flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">AVG BLENDED MARGIN</span>
          <span className="text-3xl font-mono font-bold text-[#00E599]">18.5%</span>
          <span className="text-[11px] font-mono text-[#00E599]">▲ +2.1% vs prior cycle</span>
        </div>
        <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-5 flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">DISPATCH LATENCY</span>
          <span className="text-3xl font-mono font-bold text-[#38BDF8]">142 ms</span>
          <span className="text-[11px] font-mono text-[#00E599]">99.94% edge route target met</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#5A626A]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search model slug, identifier or channel"
            className="w-full pl-9 pr-3 py-2 rounded-full bg-[#0A0C0E] border border-[#22272B] text-xs text-[#F5F5F2] placeholder-[#5A626A] focus:outline-none focus:border-[#38BDF8]/50"
          />
        </div>
        <div className="flex flex-wrap items-center gap-1 rounded-full bg-[#0A0C0E] border border-[#22272B] p-1 font-mono text-[11px]">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1 rounded-full transition-colors ${
                tab === t ? 'bg-[#1E2328] text-[#00E599] font-semibold' : 'text-[#98A0A8] hover:text-[#F5F5F2]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-[#5A626A] border-b border-[#161B1E]">
                <th className="px-5 py-3.5 font-normal">MODEL &amp; UPSTREAM</th>
                <th className="px-5 py-3.5 font-normal">ROUTED CHANNEL</th>
                <th className="px-5 py-3.5 font-normal">CONTEXT</th>
                <th className="px-5 py-3.5 font-normal">INPUT / 1M</th>
                <th className="px-5 py-3.5 font-normal">OUTPUT / 1M</th>
                <th className="px-5 py-3.5 font-normal text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#161B1E]">
              {visible.map((m) => (
                <tr key={m.name} className="hover:bg-[#0E1215] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-md bg-[#0E1215] border border-[#22272B] flex items-center justify-center text-[10px] font-bold text-[#F5F5F2]">
                        {m.badge}
                      </div>
                      <span className="text-[#F5F5F2] font-medium">{m.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[#98A0A8]">{m.channel}</td>
                  <td className="px-5 py-4 text-[#F5F5F2]">{m.context}</td>
                  <td className="px-5 py-4">
                    <span className="text-[#F5F5F2]">{m.input}</span>{' '}
                    <span className="text-[#00E599] text-[10px]">{m.inputNote}</span>
                  </td>
                  <td className="px-5 py-4 text-[#F5F5F2]">{m.output}</td>
                  <td className="px-5 py-4 text-right">
                    <span
                      className={`px-2 py-0.5 rounded border text-[10px] uppercase ${
                        m.status === 'PUBLISHED'
                          ? 'bg-[#00E599]/10 border-[#00E599]/40 text-[#00E599]'
                          : 'bg-[#E5A93C]/10 border-[#E5A93C]/40 text-[#E5A93C]'
                      }`}
                    >
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PartnerModels
