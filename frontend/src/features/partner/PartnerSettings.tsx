import React, { useState } from 'react'
import { Check } from 'lucide-react'

const inputCls =
  'w-full rounded-lg bg-[#0E1215] border border-[#22272B] px-3 py-2 text-sm text-[#F5F5F2] focus:outline-none focus:border-[#38BDF8]/50'
const labelCls = 'font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]'

const Toggle: React.FC<{ on: boolean; onToggle: () => void; label: string }> = ({ on, onToggle, label }) => (
  <div className="flex items-center justify-between">
    <span className={labelCls}>{label}</span>
    <button
      type="button"
      onClick={onToggle}
      className={`w-9 h-5 rounded-full transition-colors p-0.5 flex items-center shrink-0 ${
        on ? 'bg-[#00E599]' : 'bg-[#22272B]'
      }`}
    >
      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${on ? 'translate-x-4' : 'translate-x-0'}`} />
    </button>
  </div>
)

const SectionCard: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6 flex flex-col gap-4 max-w-3xl">
    <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">{label}</span>
    {children}
  </div>
)

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <span className={labelCls}>{label}</span>
    {children}
  </div>
)

export const PartnerSettings: React.FC = () => {
  const [displayName, setDisplayName] = useState('Nova Compute Infrastructure')
  const [email, setEmail] = useState('ops@novacompute.ai')
  const [bio, setBio] = useState('High-density GPU mesh operator serving ap-southeast-1 and eu-central-sw1.')
  const [region, setRegion] = useState('eu-central-sw1')
  const [timeout, setTimeoutMs] = useState('4500')
  const [streams, setStreams] = useState('128')
  const [zeroDisk, setZeroDisk] = useState(true)
  const [autoFailover, setAutoFailover] = useState(true)
  const [webhook, setWebhook] = useState('https://discord.com/api/webhooks/8841/novacompute-ops')
  const [overQuotaAlert, setOverQuotaAlert] = useState(true)
  const [settlementNotice, setSettlementNotice] = useState(true)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-6 lg:p-8 flex flex-col gap-6 max-w-[1400px] mx-auto w-full pb-24">
      <div className="flex flex-col gap-1.5">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">
          05 · TENANT PREFERENCES &amp; CONFIGURATION
        </span>
        <h1 className="text-2xl lg:text-3xl font-serif font-normal tracking-tight text-[#F5F5F2]">
          Partner <span className="italic">Settings</span>
        </h1>
      </div>

      <SectionCard label="PARTNER PROFILE">
        <Field label="Partner display name">
          <input className={inputCls} value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </Field>
        <Field label="Contact email">
          <input className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field label="Partner bio / descriptor">
          <textarea
            rows={3}
            className={`${inputCls} resize-none`}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </Field>
      </SectionCard>

      <SectionCard label="ENDPOINT DEFAULTS & ROUTING">
        <Field label="Default deployment region">
          <select className={`${inputCls} appearance-none cursor-pointer`} value={region} onChange={(e) => setRegion(e.target.value)}>
            <option value="eu-central-sw1">eu-central-sw1</option>
            <option value="ap-southeast-1">ap-southeast-1</option>
            <option value="us-east-1">us-east-1</option>
          </select>
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Gateway timeout (ms)">
            <input className={inputCls} value={timeout} onChange={(e) => setTimeoutMs(e.target.value)} />
          </Field>
          <Field label="Max concurrent streams">
            <input className={inputCls} value={streams} onChange={(e) => setStreams(e.target.value)} />
          </Field>
        </div>
      </SectionCard>

      <SectionCard label="SECURITY & API PREFERENCES">
        <Toggle label="Zero-disk logging" on={zeroDisk} onToggle={() => setZeroDisk(!zeroDisk)} />
        <Toggle label="Automatic failover opt-in" on={autoFailover} onToggle={() => setAutoFailover(!autoFailover)} />
        <Field label="IP whitelisting rules">
          <div className="flex flex-wrap gap-1.5 font-mono text-xs">
            {['194.163.158.0/24', '159.69.80.0/22'].map((ip) => (
              <span key={ip} className="px-2 py-1 rounded bg-[#121619] border border-[#22272B] text-[#98A0A8]">
                {ip}
              </span>
            ))}
            <button className="px-2 py-1 rounded border border-dashed border-[#333A40] text-[#5A626A] hover:text-[#F5F5F2] transition-colors">
              + Add CIDR
            </button>
          </div>
        </Field>
      </SectionCard>

      <SectionCard label="NOTIFICATIONS & ALERTS">
        <Field label="Discord support bot webhook URL">
          <input className={`${inputCls} font-mono text-xs`} value={webhook} onChange={(e) => setWebhook(e.target.value)} />
        </Field>
        <Toggle label="Over-quota usage alert" on={overQuotaAlert} onToggle={() => setOverQuotaAlert(!overQuotaAlert)} />
        <Toggle label="Bi-weekly settlement notice" on={settlementNotice} onToggle={() => setSettlementNotice(!settlementNotice)} />
      </SectionCard>

      <div className="flex items-center justify-between max-w-3xl">
        <span className="font-mono text-[10px] text-[#5A626A]">
          Partner configuration active · {region}
        </span>
        <div className="flex items-center gap-2.5">
          <button className="px-4 py-2 rounded-full border border-[#22272B] text-xs text-[#98A0A8] hover:text-[#F5F5F2] transition-colors">
            Discard
          </button>
          <button
            onClick={handleSave}
            className={`px-5 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-xl transition-all ${
              saved ? 'bg-[#00E599] text-[#060808]' : 'bg-[#F5F5F2] hover:bg-white text-[#060808]'
            }`}
          >
            {saved && <Check className="w-3.5 h-3.5" />}
            {saved ? 'Saved' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PartnerSettings
