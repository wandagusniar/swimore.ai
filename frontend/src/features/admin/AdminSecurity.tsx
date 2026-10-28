import React from 'react'
import { Check, AlertTriangle, Download } from 'lucide-react'

const compliance = [
  { label: 'Encryption at rest (AES-256)', status: 'PASSED', ok: true },
  { label: 'TLS 1.3 everywhere', status: 'PASSED', ok: true },
  { label: 'Zero-log private mode verified', status: 'PASSED', ok: true },
  { label: 'Quarterly pen-test', status: 'SCHEDULED · due Nov 12', ok: false },
  { label: 'SOC2 Type II', status: 'IN PROGRESS', ok: false },
]

const auditRows = [
  { time: '12:04:02 UTC', actor: 'admin.alex', action: 'PARTNER_APPROVED', target: '@halomesh', ip: '103.14.22.8', ok: true },
  { time: '11:52:47 UTC', actor: 'admin.alex', action: 'QUOTA_OVERRIDE', target: 'usr_1182 +50 req/day', ip: '103.14.22.8', ok: true },
  { time: '11:31:20 UTC', actor: 'admin.maria', action: 'PROVIDER_SUSPENDED', target: 'ZAI channel-2', ip: '103.14.22.14', ok: true },
  { time: '11:20:05 UTC', actor: 'system', action: 'API_KEY_REVOKE', target: 'sk-sw-…41aa', ip: '—', ok: true },
  { time: '11:04:58 UTC', actor: 'unknown', action: 'LOGIN_DENIED', target: 'admin console', ip: '203.0.113.45', ok: false },
  { time: '10:47:33 UTC', actor: 'admin.alex', action: 'CONFIG_CHANGE', target: 'router.failover_timeout', ip: '103.14.22.8', ok: true },
  { time: '10:12:41 UTC', actor: 'system', action: 'BUNDLE_PUBLISHED', target: 'Pro Reasoning Pack', ip: '—', ok: true },
  { time: '09:58:19 UTC', actor: 'unknown', action: 'LOGIN_DENIED', target: 'admin console', ip: '198.51.100.23', ok: false },
]

export const AdminSecurity: React.FC = () => {
  return (
    <div className="p-6 lg:p-8 flex flex-col gap-6 max-w-[1400px] mx-auto w-full">
      <div className="flex flex-col gap-1.5">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">09 · TRUST</span>
        <h1 className="text-2xl lg:text-3xl font-serif font-normal tracking-tight text-[#F5F5F2]">
          Security &amp; <span className="italic">Audit</span>
        </h1>
        <p className="text-sm text-[#98A0A8]">SOC2 posture and audit trail</p>
      </div>

      {/* Top stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-5 flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">SECURITY SCORE</span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-mono font-bold text-[#00E599]">94</span>
            <span className="text-sm font-mono text-[#5A626A]">/100</span>
          </div>
          <div className="h-1.5 rounded-full bg-[#161B1E] overflow-hidden">
            <div className="h-full rounded-full bg-[#00E599]" style={{ width: '94%' }} />
          </div>
        </div>

        <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-5 flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">FAILED LOGINS (24H)</span>
          <span className="text-4xl font-mono font-bold text-[#E5A93C]">17</span>
          <span className="font-mono text-[11px] text-[#00E599]">-38% vs yesterday</span>
        </div>

        <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-5 flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">ACTIVE SESSIONS</span>
          <span className="text-4xl font-mono font-bold text-[#38BDF8]">1,204</span>
          <span className="font-mono text-[11px] text-[#98A0A8]">across 3 regions</span>
        </div>
      </div>

      {/* Compliance checklist */}
      <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6 flex flex-col gap-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">COMPLIANCE CHECKLIST</span>
        <div className="flex flex-col divide-y divide-[#161B1E]">
          {compliance.map((c) => (
            <div key={c.label} className="flex items-center justify-between gap-3 py-3">
              <span className="flex items-center gap-2.5 text-sm text-[#F5F5F2]">
                {c.ok ? (
                  <Check className="w-4 h-4 text-[#00E599] shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-[#E5A93C] shrink-0" />
                )}
                {c.label}
              </span>
              <span
                className={`font-mono text-[10px] uppercase tracking-wider ${
                  c.ok ? 'text-[#00E599]' : 'text-[#E5A93C]'
                }`}
              >
                {c.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Audit trail */}
      <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">AUDIT TRAIL</span>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#22272B] text-xs font-mono text-[#98A0A8] hover:text-[#F5F5F2] hover:border-[#333A40] transition-colors">
            <Download className="w-3 h-3" /> Export audit log
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-[#5A626A] border-b border-[#161B1E]">
                <th className="pb-3 font-normal">TIMESTAMP</th>
                <th className="pb-3 font-normal">ACTOR</th>
                <th className="pb-3 font-normal">ACTION</th>
                <th className="pb-3 font-normal">TARGET</th>
                <th className="pb-3 font-normal">IP</th>
                <th className="pb-3 font-normal text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#161B1E]">
              {auditRows.map((r, i) => (
                <tr key={i}>
                  <td className="py-3 text-[#5A626A] whitespace-nowrap">{r.time}</td>
                  <td className="py-3 text-[#F5F5F2]">{r.actor}</td>
                  <td className="py-3 text-[#38BDF8]">{r.action}</td>
                  <td className="py-3 text-[#98A0A8]">{r.target}</td>
                  <td className="py-3 text-[#5A626A]">{r.ip}</td>
                  <td className="py-3 text-right">
                    <span
                      className={`px-2 py-0.5 rounded border text-[10px] uppercase ${
                        r.ok
                          ? 'bg-[#00E599]/10 border-[#00E599]/40 text-[#00E599]'
                          : 'bg-[#EF4444]/10 border-[#EF4444]/40 text-[#EF4444]'
                      }`}
                    >
                      {r.ok ? 'SUCCESS' : 'DENIED'}
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

export default AdminSecurity
