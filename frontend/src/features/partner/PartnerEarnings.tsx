import React from 'react'
import { Download, ArrowUpRight } from 'lucide-react'

const rows = [
  { date: '2026-10-15', desc: 'Bi-weekly settlement · SCU pool yield', amount: '+$1,240.00', status: 'SETTLED', receipt: 'View' },
  { date: '2026-10-01', desc: 'Bi-weekly settlement · SCU pool yield', amount: '+$1,180.00', status: 'SETTLED', receipt: 'View' },
  { date: '2026-09-15', desc: 'Bi-weekly settlement · bundle overage share', amount: '+$1,302.50', status: 'SETTLED', receipt: 'View' },
  { date: '2026-09-01', desc: 'Bi-weekly settlement · mesh dispatch fees', amount: '+$1,097.50', status: 'SETTLED', receipt: 'View' },
  { date: '2026-10-31', desc: 'Upcoming settlement · current accrual', amount: '+$380.00', status: 'PENDING', receipt: '—' },
]

export const PartnerEarnings: React.FC = () => (
  <div className="p-6 lg:p-8 flex flex-col gap-6 max-w-[1400px] mx-auto w-full">
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex flex-col gap-1.5">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">
          06 · REVENUE DISBURSEMENT &amp; LEDGER
        </span>
        <h1 className="text-2xl lg:text-3xl font-serif font-normal tracking-tight text-[#F5F5F2]">
          Earnings &amp; <span className="italic">Settlements</span>
        </h1>
        <p className="text-sm text-[#98A0A8] max-w-xl">
          Review automated tenant invoice distributions, marketplace payout cycles, and settled disbursements for @novacompute.
        </p>
      </div>
      <div className="flex items-center gap-2.5">
        <button className="px-4 py-2 rounded-full border border-[#22272B] hover:border-[#333A40] text-xs font-mono text-[#98A0A8] hover:text-[#F5F5F2] flex items-center gap-1.5 transition-colors">
          <Download className="w-3.5 h-3.5" /> Export Statement
        </button>
        <button className="px-4 py-2 rounded-full bg-[#F5F5F2] hover:bg-white text-[#060808] text-xs font-medium flex items-center gap-1.5 transition-colors">
          <ArrowUpRight className="w-3.5 h-3.5" /> Request Payout
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="rounded-2xl bg-[#0A0C0E] border border-[#00E599]/40 p-6 flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">AVAILABLE BALANCE</span>
        <span className="text-4xl font-mono font-bold text-[#00E599]">$380.00</span>
        <span className="text-[11px] font-mono text-[#5A626A]">Liquid · withdrawable to SeaBank •• 4471</span>
      </div>
      <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6 flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">SETTLED TO DATE</span>
        <span className="text-4xl font-mono font-bold text-[#F5F5F2]">$5,920.00</span>
        <span className="text-[11px] font-mono text-[#5A626A]">across 4 completed cycles</span>
      </div>
    </div>

    <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] overflow-hidden">
      <div className="px-5 py-4 border-b border-[#161B1E] font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">
        DISBURSEMENT HISTORY
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-[#5A626A] border-b border-[#161B1E]">
              <th className="px-5 py-3.5 font-normal">DATE</th>
              <th className="px-5 py-3.5 font-normal">DESCRIPTION</th>
              <th className="px-5 py-3.5 font-normal">AMOUNT</th>
              <th className="px-5 py-3.5 font-normal">STATUS</th>
              <th className="px-5 py-3.5 font-normal text-right">RECEIPT / ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#161B1E]">
            {rows.map((r) => (
              <tr key={r.date + r.amount} className="hover:bg-[#0E1215] transition-colors">
                <td className="px-5 py-4 text-[#98A0A8]">{r.date}</td>
                <td className="px-5 py-4 text-[#F5F5F2]">{r.desc}</td>
                <td className="px-5 py-4 text-[#00E599]">{r.amount}</td>
                <td className="px-5 py-4">
                  <span
                    className={`px-2 py-0.5 rounded border text-[10px] uppercase ${
                      r.status === 'SETTLED'
                        ? 'bg-[#00E599]/10 border-[#00E599]/40 text-[#00E599]'
                        : 'bg-[#E5A93C]/10 border-[#E5A93C]/40 text-[#E5A93C]'
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-right text-[#38BDF8]">
                  {r.receipt !== '—' ? <button className="hover:underline">{r.receipt}</button> : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-5 py-3 border-t border-[#161B1E] flex items-center justify-between font-mono text-[11px]">
        <span className="text-[#5A626A]">Showing 5 of 18</span>
        <div className="flex items-center gap-1">
          {['Prev', '1', '2', '3', '4', 'Next'].map((p, i) => (
            <button
              key={p}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                i === 1 ? 'bg-[#1E2328] text-[#00E599]' : 'text-[#98A0A8] hover:text-[#F5F5F2]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>

    <p className="text-[11px] font-mono text-[#5A626A] max-w-2xl leading-relaxed">
      Settlement Terms: Settlements automatically execute bi-weekly to verified payout accounts. Swimore retains an
      11% platform fee; all ledger entries are immutable and exportable.
    </p>
  </div>
)

export default PartnerEarnings
