import React, { useState } from 'react'
import { Plus, Settings2 } from 'lucide-react'

const pools = [
  {
    name: 'DeepSeek-V3 Cluster',
    stake: '12,000 SCU',
    utilization: 68,
    yield: '$182.40',
    status: 'ACTIVE',
  },
  {
    name: 'Llama-3.3-70B Failover Pool',
    stake: '7,500 SCU',
    utilization: 41,
    yield: '$96.10',
    status: 'ACTIVE',
  },
  {
    name: 'Qwen-2.5 Coder Regional Stake',
    stake: '4,000 SCU',
    utilization: 87,
    yield: '$101.50',
    status: 'YIELD SETTLING',
  },
]

const tabs = ['All Contributions (3)', 'Active Pools', 'Yield Settling']

export const PartnerQuota: React.FC = () => {
  const [tab, setTab] = useState(tabs[0])
  const visible = tab === tabs[1] ? pools.filter((p) => p.status === 'ACTIVE') : tab === tabs[2] ? pools.filter((p) => p.status !== 'ACTIVE') : pools

  return (
    <div className="p-6 lg:p-8 flex flex-col gap-6 max-w-[1400px] mx-auto w-full">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">
            03 · LIQUIDITY CONTRIBUTIONS &amp; FAIR SCU POOL
          </span>
          <h1 className="text-2xl lg:text-3xl font-serif font-normal tracking-tight text-[#F5F5F2]">
            Quota <span className="italic">Contribution</span>
          </h1>
          <p className="text-sm text-[#98A0A8] max-w-xl">
            Stake compute quotas into the shared fair SCU liquidity pool, track real-time utilization, and calculate partner yield settlement.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="px-4 py-2 rounded-full border border-[#22272B] hover:border-[#333A40] text-xs font-mono text-[#98A0A8] hover:text-[#F5F5F2] flex items-center gap-1.5 transition-colors">
            <Settings2 className="w-3.5 h-3.5" /> Adjust Auto-Rebalance Policy
          </button>
          <button className="px-4 py-2 rounded-full bg-[#F5F5F2] hover:bg-white text-[#060808] text-xs font-medium flex items-center gap-1.5 transition-colors">
            <Plus className="w-3.5 h-3.5" /> Add Quota Contribution
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-5 flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">TOTAL QUOTA CONTRIBUTED</span>
          <span className="text-3xl font-mono font-bold text-[#F5F5F2]">23,500 SCU</span>
          <span className="text-[11px] font-mono text-[#5A626A]">across 3 pools</span>
        </div>
        <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-5 flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">REAL-TIME POOL UTILIZATION</span>
          <span className="text-3xl font-mono font-bold text-[#38BDF8]">65.3%</span>
          <span className="text-[11px] font-mono text-[#00E599]">healthy utilization band</span>
        </div>
        <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-5 flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">EARNED YIELD / MONTH-TO-DATE</span>
          <span className="text-3xl font-mono font-bold text-[#00E599]">$380.00</span>
          <span className="text-[11px] font-mono text-[#5A626A]">settles bi-weekly</span>
        </div>
      </div>

      <div className="rounded-2xl bg-[#0A0C0E] border border-[#38BDF8]/30 p-6 flex flex-col gap-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#38BDF8]">
          FAIR SCU STANDARDIZATION FORMULA
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div className="flex flex-col gap-1">
            <span className="text-[#5A626A] text-[10px] uppercase">AVAILABILITY FACTOR</span>
            <span className="text-[#F5F5F2]">uptime_30d × capacity</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[#5A626A] text-[10px] uppercase">UNIT NORMALIZATION</span>
            <span className="text-[#F5F5F2]">1 SCU = 1K tok @ 7200 t/s</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[#5A626A] text-[10px] uppercase">SETTLEMENT INTERVAL</span>
            <span className="text-[#F5F5F2]">bi-weekly · 00:00 UTC</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1 rounded-full bg-[#0A0C0E] border border-[#22272B] p-1 font-mono text-[11px] w-fit">
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

      <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-[#5A626A] border-b border-[#161B1E]">
                <th className="px-5 py-3.5 font-normal">POOL</th>
                <th className="px-5 py-3.5 font-normal">STAKE</th>
                <th className="px-5 py-3.5 font-normal">UTILIZATION</th>
                <th className="px-5 py-3.5 font-normal">YIELD / MTD</th>
                <th className="px-5 py-3.5 font-normal text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#161B1E]">
              {visible.map((p) => (
                <tr key={p.name} className="hover:bg-[#0E1215] transition-colors">
                  <td className="px-5 py-4 text-[#F5F5F2] font-medium">{p.name}</td>
                  <td className="px-5 py-4 text-[#F5F5F2]">{p.stake}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 rounded-full bg-[#161B1E] overflow-hidden">
                        <div
                          className={`h-full rounded-full ${p.utilization > 85 ? 'bg-[#E5A93C]' : 'bg-[#38BDF8]'}`}
                          style={{ width: `${p.utilization}%` }}
                        />
                      </div>
                      <span className="text-[#98A0A8]">{p.utilization}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[#00E599]">{p.yield}</td>
                  <td className="px-5 py-4 text-right">
                    <span
                      className={`px-2 py-0.5 rounded border text-[10px] uppercase ${
                        p.status === 'ACTIVE'
                          ? 'bg-[#00E599]/10 border-[#00E599]/40 text-[#00E599]'
                          : 'bg-[#E5A93C]/10 border-[#E5A93C]/40 text-[#E5A93C]'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-5 flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-[#F5F5F2] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E599]" /> Dynamic Liquidity Governor
          </span>
          <span className="text-xs text-[#98A0A8] leading-relaxed">
            Auto-rebalances your stake toward pools approaching saturation, maximizing yield without manual intervention.
          </span>
        </div>
        <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-5 flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-[#F5F5F2] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" /> Yield Settlement Engine
          </span>
          <span className="text-xs text-[#98A0A8] leading-relaxed">
            Computes SCU-weighted yield every block interval and settles to your payout account bi-weekly.
          </span>
        </div>
      </div>
    </div>
  )
}

export default PartnerQuota
