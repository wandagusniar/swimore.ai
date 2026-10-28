import React, { useState } from 'react'
import { Search, Download } from 'lucide-react'

type Severity = 'INFO' | 'WARN' | 'ERROR' | 'CRITICAL' | 'SUCCESS'

const severityStyles: Record<Severity, string> = {
  INFO: 'bg-[#38BDF8]/10 border-[#38BDF8]/40 text-[#38BDF8]',
  SUCCESS: 'bg-[#00E599]/10 border-[#00E599]/40 text-[#00E599]',
  WARN: 'bg-[#E5A93C]/10 border-[#E5A93C]/40 text-[#E5A93C]',
  ERROR: 'bg-[#EF4444]/10 border-[#EF4444]/40 text-[#EF4444]',
  CRITICAL: 'bg-[#EF4444] border-[#EF4444] text-[#060808] font-semibold',
}

const logRows: Array<{ time: string; severity: Severity; service: string; message: string }> = [
  { time: '12:04:18.422', severity: 'INFO', service: '[router]', message: 'Routed cmpl_9x4f2a → deepseek-direct (28ms)' },
  { time: '12:02:55.018', severity: 'SUCCESS', service: '[mesh]', message: 'Failover ZAI → DeepSeek auto-recovered, zero drop' },
  { time: '11:58:02.104', severity: 'ERROR', service: '[mesh]', message: 'Partner node @halomesh-2 heartbeat missed (3/3)' },
  { time: '11:47:39.881', severity: 'INFO', service: '[auth]', message: 'API key sk-sw-…9f21 rotated for usr_1182' },
  { time: '11:31:44.910', severity: 'CRITICAL', service: '[billing]', message: 'QRIS webhook signature mismatch — rejected' },
  { time: '11:20:12.009', severity: 'WARN', service: '[quota]', message: 'Free pool at 86% capacity' },
  { time: '11:12:03.552', severity: 'INFO', service: '[router]', message: 'Policy latency-first applied to 1,402 requests/min' },
  { time: '10:58:47.233', severity: 'SUCCESS', service: '[billing]', message: 'Partner payout cycle settled: 38 partners, $48,210' },
  { time: '10:41:29.107', severity: 'WARN', service: '[mesh]', message: 'Node @tokenforge-1 latency p99 drift 44ms → 61ms' },
  { time: '10:22:51.640', severity: 'ERROR', service: '[auth]', message: 'Login denied: revoked key presented from 203.0.113.45' },
  { time: '10:05:11.314', severity: 'INFO', service: '[quota]', message: 'Nightly quota reset completed at 00:00 WIB' },
  { time: '09:47:08.902', severity: 'INFO', service: '[router]', message: 'Model glm-4-plus marked deprecated, drained from pool' },
]

const filters = ['All', 'INFO', 'WARN', 'ERROR', 'CRITICAL'] as const

export const AdminLogs: React.FC = () => {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')

  const visible = logRows.filter(
    (r) =>
      (filter === 'All' || r.severity === filter) &&
      (!query || `${r.service} ${r.message}`.toLowerCase().includes(query.toLowerCase()))
  )

  return (
    <div className="p-6 lg:p-8 flex flex-col gap-6 max-w-[1400px] mx-auto w-full">
      <div className="flex flex-col gap-1.5">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">08 · LIVE STREAM</span>
        <h1 className="text-2xl lg:text-3xl font-serif font-normal tracking-tight text-[#F5F5F2]">
          Monitoring &amp; <span className="italic">Logs</span>
        </h1>
        <p className="text-sm text-[#98A0A8]">Gateway event stream</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#5A626A]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search logs..."
            className="w-full pl-9 pr-3 py-2 rounded-full bg-[#0A0C0E] border border-[#22272B] text-xs text-[#F5F5F2] placeholder-[#5A626A] focus:outline-none focus:border-[#38BDF8]/50"
          />
        </div>

        <div className="flex items-center gap-1 rounded-full bg-[#0A0C0E] border border-[#22272B] p-1 font-mono text-[11px]">
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

        <button className="ml-auto px-4 py-2 rounded-full bg-[#F5F5F2] hover:bg-white text-[#060808] text-xs font-medium flex items-center gap-1.5 transition-colors">
          <Download className="w-3.5 h-3.5" /> Download CSV
        </button>
      </div>

      {/* Log stream */}
      <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] overflow-hidden">
        <div className="divide-y divide-[#161B1E] font-mono text-xs">
          {visible.map((r, i) => (
            <div key={i} className="flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2.5 hover:bg-[#0E1215] transition-colors">
              <span className="text-[#5A626A] shrink-0">{r.time}</span>
              <span
                className={`px-2 py-0.5 rounded border text-[10px] uppercase tracking-wider shrink-0 ${severityStyles[r.severity]}`}
              >
                {r.severity}
              </span>
              <span className="text-[#38BDF8] shrink-0">{r.service}</span>
              <span className="text-[#98A0A8] min-w-0">{r.message}</span>
            </div>
          ))}
          {visible.length === 0 && (
            <div className="px-4 py-10 text-center text-[#5A626A]">No events match this filter.</div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 font-mono text-[11px] text-[#98A0A8]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00E599] animate-pulse" />
        <span>Streaming live · 1,204 events/min</span>
      </div>
    </div>
  )
}

export default AdminLogs
