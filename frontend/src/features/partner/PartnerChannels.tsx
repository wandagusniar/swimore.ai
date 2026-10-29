import React, { useState } from 'react'
import { Settings2, Plus, Search } from 'lucide-react'

const channels = [
  {
    name: 'novacompute-claude-primary',
    slug: 'claude-3-5-sonnet-core',
    provider: 'Anthropic',
    target: 'Claude 3.5 Sonnet · 20241022',
    endpoint: 'https://api.anthropic.com/v1',
    priority: 'P1 (100)',
    latency: '19 ms',
    status: 'ACTIVE',
  },
  {
    name: 'novacompute-deepseek-r1',
    slug: 'deepseek-r1-inference-vllm',
    provider: 'Self-hosted DeepSeek',
    target: 'DeepSeek R1 · vLLM TensorRT-LLM',
    endpoint: 'https://edge.novacompute.ai/ds-r1',
    priority: 'P1 (80)',
    latency: '22 ms',
    status: 'ACTIVE',
  },
  {
    name: 'novacompute-qwen-coder',
    slug: 'qwen-2-5-72b-instruct',
    provider: 'Alibaba Qwen',
    target: 'Qwen 2.5 72B Instruct · vLLM Cluster US-West',
    endpoint: 'https://cluster-us.novacompute.ai/qwen',
    priority: 'P2 (40)',
    latency: '27 ms',
    status: 'ACTIVE',
  },
  {
    name: 'novacompute-mistral-backup',
    slug: 'mistral-large-2-relay',
    provider: 'Mistral Relay',
    target: 'Mistral Large 2 Relay · Standby Node',
    endpoint: 'https://api.mistral.ai/v1',
    priority: 'P3 (20)',
    latency: '—',
    status: 'STANDBY',
  },
]

const tabs = ['All Channels (4)', 'Anthropic', 'Self-hosted DeepSeek', 'Alibaba Qwen', 'Mistral Relay']

export const PartnerChannels: React.FC = () => {
  const [tab, setTab] = useState(tabs[0])
  const [query, setQuery] = useState('')

  const visible = channels.filter((c) => {
    const byTab = tab === tabs[0] || c.provider === tab
    const byQuery = !query || `${c.name} ${c.slug} ${c.target}`.toLowerCase().includes(query.toLowerCase())
    return byTab && byQuery
  })

  return (
    <div className="p-6 lg:p-8 flex flex-col gap-6 max-w-[1400px] mx-auto w-full">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">
            02 · PARTNER INFRASTRUCTURE · UPSTREAM ROUTING MESH
          </span>
          <h1 className="text-2xl lg:text-3xl font-serif font-normal tracking-tight text-[#F5F5F2]">
            Partner <span className="italic">Channels</span>
          </h1>
          <p className="text-sm text-[#98A0A8] max-w-xl">
            Manage verified provider endpoint connections, cryptographic secret keys, and dispatch routing health for this partner.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="px-4 py-2 rounded-full border border-[#22272B] hover:border-[#333A40] text-xs font-mono text-[#98A0A8] hover:text-[#F5F5F2] flex items-center gap-1.5 transition-colors">
            <Settings2 className="w-3.5 h-3.5" /> Mesh Config
          </button>
          <button className="px-4 py-2 rounded-full bg-[#F5F5F2] hover:bg-white text-[#060808] text-xs font-medium flex items-center gap-1.5 transition-colors">
            <Plus className="w-3.5 h-3.5" /> Add Channel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-5 flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">ACTIVE CHANNELS</span>
          <span className="text-3xl font-mono font-bold text-[#F5F5F2]">3 / 4 <span className="text-sm font-normal text-[#98A0A8]">Allocated</span></span>
          <span className="text-[11px] font-mono text-[#5A626A]">1 standby node configured</span>
        </div>
        <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-5 flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">AVG LATENCY (P99)</span>
          <span className="text-3xl font-mono font-bold text-[#38BDF8]">19 ms</span>
          <span className="text-[11px] font-mono text-[#00E599]">-4.2ms vs prior 24h window</span>
        </div>
        <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-5 flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">MONTHLY INGRESS</span>
          <span className="text-3xl font-mono font-bold text-[#F5F5F2]">1.42 M reqs</span>
          <span className="text-[11px] font-mono text-[#00E599]">99.98% successful dispatches</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#5A626A]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search channels..."
            className="pl-9 pr-3 py-1.5 rounded-full bg-[#0A0C0E] border border-[#22272B] text-xs text-[#F5F5F2] placeholder-[#5A626A] focus:outline-none focus:border-[#38BDF8]/50"
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
                <th className="px-5 py-3.5 font-normal">NAME &amp; SLUG</th>
                <th className="px-5 py-3.5 font-normal">PROVIDER / TARGET</th>
                <th className="px-5 py-3.5 font-normal">ENDPOINT URL</th>
                <th className="px-5 py-3.5 font-normal">PRIORITY</th>
                <th className="px-5 py-3.5 font-normal">LATENCY</th>
                <th className="px-5 py-3.5 font-normal text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#161B1E]">
              {visible.map((c) => (
                <tr key={c.name} className="hover:bg-[#0E1215] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[#F5F5F2] font-medium">{c.name}</span>
                      <span className="text-[#5A626A] text-[10px]">{c.slug}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[#F5F5F2]">{c.provider}</span>
                      <span className="text-[#98A0A8] text-[10px]">{c.target}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[#38BDF8]">{c.endpoint}</td>
                  <td className="px-5 py-4 text-[#F5F5F2]">{c.priority}</td>
                  <td className="px-5 py-4 text-[#38BDF8]">{c.latency}</td>
                  <td className="px-5 py-4 text-right">
                    <span
                      className={`px-2 py-0.5 rounded border text-[10px] uppercase ${
                        c.status === 'ACTIVE'
                          ? 'bg-[#00E599]/10 border-[#00E599]/40 text-[#00E599]'
                          : 'bg-[#E5A93C]/10 border-[#E5A93C]/40 text-[#E5A93C]'
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-[#161B1E] flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-[#5A626A]">
          <span>4 channels indexed · Automated weighted round-robin distribution</span>
          <span>Global Egress Filter: Strict MTLS · Last synced: 24s ago</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: 'Channel SLA 99.98%', desc: 'Uptime SLA guaranteed across active nodes with automatic failover handling.' },
          { title: 'Edge Ingress Gateway', desc: 'us-east-1 and ap-southeast-1 mesh synchronization nominal.' },
          { title: 'Automated Health Probe', desc: 'Active ping intervals running every 10s via low-overhead WebSocket telemetry.' },
        ].map((c) => (
          <div key={c.title} className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-5 flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-[#F5F5F2] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E599]" /> {c.title}
            </span>
            <span className="text-xs text-[#98A0A8] leading-relaxed">{c.desc}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PartnerChannels
