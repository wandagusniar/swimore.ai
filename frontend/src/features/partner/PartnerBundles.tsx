import React from 'react'
import { Settings2, Plus } from 'lucide-react'

const bundles = [
  {
    name: 'Enterprise Reasoning Suite',
    slug: 'ent-reasoning-v2',
    models: ['claude-3-5-sonnet', 'deepseek-r1'],
    quota: '2.0M tok/day · 120 TPS',
    customers: 14,
    usage: '$9,420',
    status: 'ACTIVE',
  },
  {
    name: 'Code Intelligence & Dev',
    slug: 'code-intel-v1',
    models: ['qwen-2-5-72b-coder', 'deepseek-r1'],
    quota: '1.2M tok/day · 90 TPS',
    customers: 9,
    usage: '$6,110',
    status: 'ACTIVE',
  },
  {
    name: 'General Mesh Fallback',
    slug: 'mesh-fallback-v1',
    models: ['llama-3-3-70b-failover', 'mistral-large-2'],
    quota: '800K tok/day · 60 TPS',
    customers: 5,
    usage: '$2,260',
    status: 'ACTIVE',
  },
  {
    name: 'Starter Sandbox',
    slug: 'starter-sandbox',
    models: ['llama-3-3-70b-failover'],
    quota: '100K tok/day · 10 TPS',
    customers: 0,
    usage: '$0',
    status: 'DRAFT',
  },
]

export const PartnerBundles: React.FC = () => (
  <div className="p-6 lg:p-8 flex flex-col gap-6 max-w-[1400px] mx-auto w-full">
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex flex-col gap-1.5">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">
          03 · MULTI-MODEL PACKAGES &amp; SUBSCRIBER TIERS
        </span>
        <h1 className="text-2xl lg:text-3xl font-serif font-normal tracking-tight text-[#F5F5F2]">
          Partner <span className="italic">Bundles</span>
        </h1>
        <p className="text-sm text-[#98A0A8] max-w-xl">
          Create and package curated model suites, set quota caps, and distribute to customer tenants.
        </p>
      </div>
      <div className="flex items-center gap-2.5">
        <button className="px-4 py-2 rounded-full border border-[#22272B] hover:border-[#333A40] text-xs font-mono text-[#98A0A8] hover:text-[#F5F5F2] flex items-center gap-1.5 transition-colors">
          <Settings2 className="w-3.5 h-3.5" /> Configure Default SLA Policy
        </button>
        <button className="px-4 py-2 rounded-full bg-[#F5F5F2] hover:bg-white text-[#060808] text-xs font-medium flex items-center gap-1.5 transition-colors">
          <Plus className="w-3.5 h-3.5" /> Create Bundle
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-5 flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">ACTIVE BUNDLES</span>
        <span className="text-3xl font-mono font-bold text-[#F5F5F2]">3</span>
        <span className="text-[11px] font-mono text-[#5A626A]">1 draft awaiting publish</span>
      </div>
      <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-5 flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">TOTAL SUBSCRIBERS / TENANTS</span>
        <span className="text-3xl font-mono font-bold text-[#F5F5F2]">28</span>
        <span className="text-[11px] font-mono text-[#00E599]">+4 this week</span>
      </div>
      <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-5 flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">AGGREGATE TOKEN VOLUME</span>
        <span className="text-3xl font-mono font-bold text-[#38BDF8]">41.6B</span>
        <span className="text-[11px] font-mono text-[#5A626A]">rolling 30d</span>
      </div>
    </div>

    <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-[#5A626A] border-b border-[#161B1E]">
              <th className="px-5 py-3.5 font-normal">BUNDLE NAME / SLUG</th>
              <th className="px-5 py-3.5 font-normal">INCLUDED MODELS</th>
              <th className="px-5 py-3.5 font-normal">QUOTA LIMIT / TPS</th>
              <th className="px-5 py-3.5 font-normal">ACTIVE CUSTOMERS</th>
              <th className="px-5 py-3.5 font-normal">MONTHLY USAGE</th>
              <th className="px-5 py-3.5 font-normal text-right">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#161B1E]">
            {bundles.map((b) => (
              <tr key={b.slug} className="hover:bg-[#0E1215] transition-colors">
                <td className="px-5 py-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[#F5F5F2] font-medium">{b.name}</span>
                    <span className="text-[#5A626A] text-[10px]">{b.slug}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-1.5">
                    {b.models.map((m) => (
                      <span key={m} className="px-2 py-0.5 rounded bg-[#121619] border border-[#22272B] text-[10px] text-[#98A0A8]">
                        {m}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-4 text-[#F5F5F2]">{b.quota}</td>
                <td className="px-5 py-4 text-[#F5F5F2]">{b.customers}</td>
                <td className="px-5 py-4 text-[#38BDF8]">{b.usage}</td>
                <td className="px-5 py-4 text-right">
                  <span
                    className={`px-2 py-0.5 rounded border text-[10px] uppercase ${
                      b.status === 'ACTIVE'
                        ? 'bg-[#00E599]/10 border-[#00E599]/40 text-[#00E599]'
                        : 'bg-[#E5A93C]/10 border-[#E5A93C]/40 text-[#E5A93C]'
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6 flex flex-col gap-3">
      <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">
        TENANT ISOLATION &amp; CONCURRENCY THROTTLE STRATEGY
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#98A0A8] leading-relaxed">
        <div className="rounded-xl bg-[#0E1215] border border-[#161B1E] p-4">
          <span className="text-[#F5F5F2] font-medium block mb-1">Per-tenant quota caps</span>
          Hard daily token ceilings enforced at the gateway before dispatch reaches your nodes.
        </div>
        <div className="rounded-xl bg-[#0E1215] border border-[#161B1E] p-4">
          <span className="text-[#F5F5F2] font-medium block mb-1">Burst smoothing</span>
          TPS throttles absorb tenant bursts and shed load to standby channels first.
        </div>
        <div className="rounded-xl bg-[#0E1215] border border-[#161B1E] p-4">
          <span className="text-[#F5F5F2] font-medium block mb-1">Fair-share scheduling</span>
          Weighted round-robin keeps one noisy tenant from starving the rest of the bundle.
        </div>
      </div>
    </div>
  </div>
)

export default PartnerBundles
