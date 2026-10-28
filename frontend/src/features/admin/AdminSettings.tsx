import React, { useState } from 'react'
import { Check } from 'lucide-react'

const inputCls =
  'w-full rounded-lg bg-[#0E1215] border border-[#22272B] px-3 py-2 text-sm text-[#F5F5F2] focus:outline-none focus:border-[#38BDF8]/50'
const labelCls = 'font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]'

const Toggle: React.FC<{ on: boolean; onToggle: () => void }> = ({ on, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    className={`w-9 h-5 rounded-full transition-colors p-0.5 flex items-center shrink-0 ${
      on ? 'bg-[#00E599]' : 'bg-[#22272B]'
    }`}
  >
    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${on ? 'translate-x-4' : 'translate-x-0'}`} />
  </button>
)

const SectionCard: React.FC<{ label: string; children: React.ReactNode; danger?: boolean }> = ({
  label,
  children,
}) => (
  <div
    className={`rounded-2xl bg-[#0A0C0E] border p-6 flex flex-col gap-4 max-w-3xl ${
      label === 'DANGER ZONE' ? 'border-[#EF4444]/40' : 'border-[#22272B]'
    }`}
  >
    <span
      className={`font-mono text-[10px] uppercase tracking-widest ${
        label === 'DANGER ZONE' ? 'text-[#EF4444]' : 'text-[#98A0A8]'
      }`}
    >
      {label}
    </span>
    {children}
  </div>
)

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <span className={labelCls}>{label}</span>
    {children}
  </div>
)

const policies = ['latency-first', 'price-first', 'private'] as const
const cycles = ['Weekly', 'Monthly'] as const

export const AdminSettings: React.FC = () => {
  const [platformName, setPlatformName] = useState('Swimore AI')
  const [supportEmail, setSupportEmail] = useState('support@swimore.ai')
  const [region, setRegion] = useState('ap-southeast-1')
  const [maintenance, setMaintenance] = useState(false)
  const [policy, setPolicy] = useState<(typeof policies)[number]>('latency-first')
  const [failoverTimeout, setFailoverTimeout] = useState('3000')
  const [maxRetries, setMaxRetries] = useState('2')
  const [zeroLog, setZeroLog] = useState(true)
  const [fee, setFee] = useState('11')
  const [cycle, setCycle] = useState<(typeof cycles)[number]>('Weekly')
  const [webhookUrl, setWebhookUrl] = useState('https://api.swimore.ai/v1/webhooks/qris')
  const [seaBank, setSeaBank] = useState(true)
  const [confirmPurge, setConfirmPurge] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-6 lg:p-8 flex flex-col gap-6 max-w-[1400px] mx-auto w-full pb-24 relative">
      <div className="flex flex-col gap-1.5">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">10 · CONFIG</span>
        <h1 className="text-2xl lg:text-3xl font-serif font-normal tracking-tight text-[#F5F5F2]">
          Platform <span className="italic">Settings</span>
        </h1>
        <p className="text-sm text-[#98A0A8]">Gateway configuration and defaults</p>
      </div>

      {/* GENERAL */}
      <SectionCard label="GENERAL">
        <Field label="Platform name">
          <input className={inputCls} value={platformName} onChange={(e) => setPlatformName(e.target.value)} />
        </Field>
        <Field label="Support email">
          <input className={inputCls} value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} />
        </Field>
        <Field label="Default region">
          <select
            className={`${inputCls} appearance-none cursor-pointer`}
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="ap-southeast-1">ap-southeast-1</option>
            <option value="us-east-1">us-east-1</option>
            <option value="eu-central-1">eu-central-1</option>
          </select>
        </Field>
        <div className="flex items-center justify-between">
          <span className={labelCls}>Maintenance mode</span>
          <Toggle on={maintenance} onToggle={() => setMaintenance(!maintenance)} />
        </div>
      </SectionCard>

      {/* ROUTING DEFAULTS */}
      <SectionCard label="ROUTING DEFAULTS">
        <Field label="Default policy">
          <div className="flex flex-wrap gap-2">
            {policies.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPolicy(p)}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs border transition-colors ${
                  policy === p
                    ? 'bg-[#00E599]/10 border-[#00E599]/40 text-[#00E599]'
                    : 'bg-[#0E1215] border-[#22272B] text-[#98A0A8] hover:text-[#F5F5F2]'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Failover timeout (ms)">
            <input className={inputCls} value={failoverTimeout} onChange={(e) => setFailoverTimeout(e.target.value)} />
          </Field>
          <Field label="Max retries">
            <input className={inputCls} value={maxRetries} onChange={(e) => setMaxRetries(e.target.value)} />
          </Field>
        </div>
        <div className="flex items-center justify-between">
          <span className={labelCls}>Zero-log private mode by default</span>
          <Toggle on={zeroLog} onToggle={() => setZeroLog(!zeroLog)} />
        </div>
      </SectionCard>

      {/* BILLING */}
      <SectionCard label="BILLING">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Platform fee (%)">
            <input className={inputCls} value={fee} onChange={(e) => setFee(e.target.value)} />
          </Field>
          <Field label="Payout cycle">
            <div className="flex gap-2">
              {cycles.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCycle(c)}
                  className={`px-3.5 py-1.5 rounded-full font-mono text-xs border transition-colors ${
                    cycle === c
                      ? 'bg-[#00E599]/10 border-[#00E599]/40 text-[#00E599]'
                      : 'bg-[#0E1215] border-[#22272B] text-[#98A0A8] hover:text-[#F5F5F2]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </Field>
        </div>
        <Field label="QRIS webhook URL">
          <input className={`${inputCls} font-mono text-xs`} value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} />
        </Field>
        <div className="flex items-center justify-between">
          <span className={labelCls}>SeaBank settlement enabled</span>
          <Toggle on={seaBank} onToggle={() => setSeaBank(!seaBank)} />
        </div>
      </SectionCard>

      {/* DANGER ZONE */}
      <SectionCard label="DANGER ZONE" danger>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm text-[#F5F5F2]">Purge all ephemeral chat data</span>
            <span className="text-xs text-[#98A0A8]">Destroys every zero-log session. Cannot be undone.</span>
          </div>
          {confirmPurge ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setConfirmPurge(false)}
                className="px-4 py-2 rounded-full border border-[#22272B] text-xs text-[#98A0A8] hover:text-[#F5F5F2] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setConfirmPurge(false)}
                className="px-4 py-2 rounded-full bg-[#EF4444] text-white text-xs font-medium hover:bg-[#EF4444]/90 transition-colors"
              >
                Confirm purge
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmPurge(true)}
              className="px-4 py-2 rounded-full border border-[#EF4444]/40 text-[#EF4444] text-xs font-medium hover:bg-[#EF4444]/10 transition-colors"
            >
              Purge now
            </button>
          )}
        </div>
      </SectionCard>

      {/* Sticky save */}
      <div className="sticky bottom-6 flex justify-end pointer-events-none">
        <button
          onClick={handleSave}
          className={`pointer-events-auto px-6 py-2.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-xl transition-all ${
            saved ? 'bg-[#00E599] text-[#060808]' : 'bg-[#F5F5F2] hover:bg-white text-[#060808]'
          }`}
        >
          {saved && <Check className="w-3.5 h-3.5" />}
          {saved ? 'Saved' : 'Save changes'}
        </button>
      </div>
    </div>
  )
}

export default AdminSettings
