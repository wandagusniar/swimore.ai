import React, { useState } from 'react'
import { Plus } from 'lucide-react'

const tenants = [
  { name: 'acme-research', bundle: 'Enterprise Reasoning Suite', key: 'sk-nc-…8f2a', usage: 61, status: 'ACTIVE' },
  { name: 'halodoc-ai', bundle: 'Enterprise Reasoning Suite', key: 'sk-nc-…31bc', usage: 42, status: 'ACTIVE' },
  { name: 'finara-dev', bundle: 'Code Intelligence & Dev', key: 'sk-nc-…77c1', usage: 38, status: 'ACTIVE' },
  { name: 'oceanic-labs', bundle: 'General Mesh Fallback', key: 'sk-nc-…e9d4', usage: 88, status: 'RATE-LIMITED' },
  { name: 'studio-kramat', bundle: 'Code Intelligence & Dev', key: 'sk-nc-…12b8', usage: 11, status: 'ACTIVE' },
  { name: 'pt-sinar-data', bundle: 'Enterprise Reasoning Suite', key: 'sk-nc-…aa09', usage: 96, status: 'RATE-LIMITED' },
  { name: 'legacy-imports-co', bundle: 'General Mesh Fallback', key: 'sk-nc-…f551', usage: 0, status: 'REVOKED' },
]

const filters = ['All (31)', 'Active (28)', 'Rate-Limited (2)', 'Revoked (1)']

export const PartnerCustomers: React.FC = () => {
  const [filter, setFilter] = useState(filters[0])
  const visible =
    filter === filters[1]
      ? tenants.filter((t) => t.status === 'ACTIVE')
      : filter === filters[2]
        ? tenants.filter((t) => t.status === 'RATE-LIMITED')
        : filter === filters[3]
          ? tenants.filter((t) => t.status === 'REVOKED')
          : tenants

  return (
    <div className="p-6 lg:p-8 flex flex-col gap-6 max-w-[1400px] mx-auto w-full">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">
            07 · TENANT PERMISSIONS &amp; CREDENTIALS
          </span>
          <h1 className="text-2xl lg:text-3xl font-serif font-normal tracking-tight text-[#F5F5F2]">
            Customers &amp; <span className="italic">Access</span>
          </h1>
          <p className="text-sm text-[#98A0A8] max-w-xl">
            Manage tenant subscriptions, provisioned bundle access, and scoped API credentials provisioned by @novacompute.
          </p>
        </div>
        <button className="px-4 py-2 rounded-full bg-[#F5F5F2] hover:bg-white text-[#060808] text-xs font-medium flex items-center gap-1.5 transition-colors">
          <Plus className="w-3.5 h-3.5" /> Grant Access
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-5 flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">ACTIVE TENANTS</span>
          <span className="text-3xl font-mono font-bold text-[#F5F5F2]">28</span>
          <span className="text-[11px] font-mono text-[#00E599]">+4 this week</span>
        </div>
        <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-5 flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">SCOPED API KEYS</span>
          <span className="text-3xl font-mono font-bold text-[#F5F5F2]">31</span>
          <span className="text-[11px] font-mono text-[#5A626A]">prefixed sk-nc-</span>
        </div>
        <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-5 flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">QUOTA ALLOCATED</span>
          <span className="text-3xl font-mono font-bold text-[#38BDF8]">$19.8k</span>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full bg-[#161B1E] overflow-hidden">
              <div className="h-full rounded-full bg-[#38BDF8]" style={{ width: '74.8%' }} />
            </div>
            <span className="text-[10px] font-mono text-[#98A0A8]">74.8%</span>
          </div>
        </div>
        <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-5 flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">RATE LIMITS / REVOKED</span>
          <span className="text-3xl font-mono font-bold text-[#E5A93C]">2 / 1</span>
          <span className="text-[11px] font-mono text-[#5A626A]">1 flagged for review</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1 rounded-full bg-[#0A0C0E] border border-[#22272B] p-1 font-mono text-[11px] w-fit">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-full transition-colors ${
              filter === f ? 'bg-[#1E2328] text-[#00E599] font-semibold' : 'text-[#98A0A8] hover:text-[#F5F5F2]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-[#5A626A] border-b border-[#161B1E]">
                <th className="px-5 py-3.5 font-normal">CUSTOMER / TENANT</th>
                <th className="px-5 py-3.5 font-normal">BUNDLE</th>
                <th className="px-5 py-3.5 font-normal">ACCESS KEY</th>
                <th className="px-5 py-3.5 font-normal">USAGE VS CAP</th>
                <th className="px-5 py-3.5 font-normal">STATUS</th>
                <th className="px-5 py-3.5 font-normal text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#161B1E]">
              {visible.map((t) => (
                <tr key={t.name} className="hover:bg-[#0E1215] transition-colors">
                  <td className="px-5 py-4 text-[#F5F5F2] font-medium">{t.name}</td>
                  <td className="px-5 py-4 text-[#98A0A8]">{t.bundle}</td>
                  <td className="px-5 py-4 text-[#38BDF8]">{t.key}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 rounded-full bg-[#161B1E] overflow-hidden">
                        <div
                          className={`h-full rounded-full ${t.usage > 85 ? 'bg-[#E5A93C]' : 'bg-[#00E599]'}`}
                          style={{ width: `${t.usage}%` }}
                        />
                      </div>
                      <span className="text-[#98A0A8]">{t.usage}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`px-2 py-0.5 rounded border text-[10px] uppercase ${
                        t.status === 'ACTIVE'
                          ? 'bg-[#00E599]/10 border-[#00E599]/40 text-[#00E599]'
                          : t.status === 'RATE-LIMITED'
                            ? 'bg-[#E5A93C]/10 border-[#E5A93C]/40 text-[#E5A93C]'
                            : 'bg-[#EF4444]/10 border-[#EF4444]/40 text-[#EF4444]'
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button className="text-[#98A0A8] hover:text-[#F5F5F2] transition-colors">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-[#161B1E] font-mono text-[10px] text-[#5A626A]">
          Access keys grant scoped routing authorization directly through @novacompute&apos;s upstream channels.
        </div>
      </div>
    </div>
  )
}

export default PartnerCustomers
