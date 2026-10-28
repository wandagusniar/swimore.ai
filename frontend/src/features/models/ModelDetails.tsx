import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Navbar } from '@/components/navigation/Navbar'
import { Copy, Check, Play, Info } from 'lucide-react'
import { modelService, BackendModelCard } from '@/services/model-service'

const codeSnippets: Record<'cURL' | 'Python' | 'TypeScript' | 'JavaScript', string> = {
  cURL: `curl https://api.swimore.ai/v1/chat/completions \\
  -H "Authorization: Bearer $SWIMORE_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-3-5-sonnet",
    "messages": [
      {
        "role": "user",
        "content": "Explain routing in one line."
      }
    ],
    "temperature": 0.7
  }'`,
  Python: `from openai import OpenAI

client = OpenAI(
    base_url="https://api.swimore.ai/v1",
    api_key="$SWIMORE_API_KEY",
)

response = client.chat.completions.create(
    model="claude-3-5-sonnet",
    messages=[{"role": "user", "content": "Explain routing in one line."}],
    temperature=0.7,
)
print(response.choices[0].message.content)`,
  TypeScript: `import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.SWIMORE_API_KEY,
  baseURL: "https://api.swimore.ai/v1",
});

const response = await client.chat.completions.create({
  model: "claude-3-5-sonnet",
  messages: [{ role: "user", content: "Explain routing in one line." }],
  temperature: 0.7,
});`,
  JavaScript: `const resp = await fetch("https://api.swimore.ai/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": "Bearer " + process.env.SWIMORE_API_KEY,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "claude-3-5-sonnet",
    messages: [{ role: "user", content: "Explain routing in one line." }],
    temperature: 0.7,
  }),
});
const data = await resp.json();`,
}

const supportedParameters = [
  {
    name: 'temperature',
    type: 'number',
    defaultRange: '1 · 0 - 2',
    desc: 'Sampling temperature; lower values are more deterministic.',
  },
  {
    name: 'top_p',
    type: 'number',
    defaultRange: '1 · 0 - 1',
    desc: 'Nucleus sampling probability mass calculation.',
  },
  {
    name: 'max_tokens',
    type: 'integer',
    defaultRange: '≥ 1 (Up to 8,192)',
    desc: 'Maximum number of generation tokens in completed response.',
  },
  {
    name: 'stream',
    type: 'boolean',
    defaultRange: 'false',
    desc: 'Stream partial progress tokens via Server-Sent Events (SSE).',
  },
  {
    name: 'tools',
    type: 'array',
    defaultRange: '-',
    desc: 'Anthropic tool/function declarations for structured routing & execution.',
  },
]

export const ModelDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const modelId = id || 'claude-3-5-sonnet'
  const [liveModel, setLiveModel] = useState<BackendModelCard | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'api' | 'playground'>('overview')
  const [copied, setCopied] = useState(false)
  const [apiLang, setApiLang] = useState<'cURL' | 'Python' | 'TypeScript' | 'JavaScript'>('cURL')
  const [snippetCopied, setSnippetCopied] = useState(false)
  const [traceRunning, setTraceRunning] = useState(false)
  const [traceLatency, setTraceLatency] = useState(410)

  useEffect(() => {
    modelService
      .getModel(modelId)
      .then((m) => setLiveModel(m))
      .catch(() => setLiveModel(null))
  }, [modelId])

  const handleCopyId = () => {
    navigator.clipboard.writeText(liveModel?.id || modelId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(codeSnippets[apiLang])
    setSnippetCopied(true)
    setTimeout(() => setSnippetCopied(false), 2000)
  }

  const handleTabScroll = (tab: 'overview' | 'performance' | 'api' | 'playground') => {
    setActiveTab(tab)
    const el = document.getElementById(`section-${tab}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleRunTrace = () => {
    setTraceRunning(true)
    setTimeout(() => {
      setTraceLatency(Math.floor(395 + Math.random() * 25))
      setTraceRunning(false)
    }, 650)
  }

  const displayName = liveModel?.name || modelId
  const providerName = liveModel?.provider || 'Anthropic'
  const tpsVal = liveModel ? liveModel.throughput_tps.toFixed(1) : '112.0'
  const latencyVal = liveModel ? liveModel.latency_ms : 410
  const uptimeVal = liveModel ? `${liveModel.uptime_percent}%` : '98.4%'

  return (
    <div className="min-h-screen w-full bg-[#060808] text-[#F5F5F2] flex flex-col font-sans ocean-bg">
      <Navbar />

      <main className="max-w-[1240px] w-full mx-auto px-6 py-8 flex flex-col gap-10">
        {/* Top Breadcrumb + Model Identity Header */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2 font-mono text-xs text-[#98A0A8]">
            <Link to="/models" className="hover:text-[#F5F5F2] transition-colors">
              ← ALL MODELS
            </Link>
            <span className="text-[#5A626A]">/</span>
            <span className="text-[#F5F5F2]">{providerName}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#0E1215] border border-[#22272B] flex items-center justify-center font-mono text-xs font-bold text-[#F5F5F2]">
                {providerName.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F5F5F2]">
                    {displayName}
                  </h1>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#E5A93C]/15 text-[#E5A93C] border border-[#E5A93C]/30 font-mono text-[10px] uppercase tracking-wider">
                      {liveModel?.tier_badge || 'SWIMORE PLUS+'}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-[#00E599]/15 text-[#00E599] border border-[#00E599]/30 font-mono text-[10px] uppercase tracking-wider">
                      {liveModel?.partner_badge || 'PARTNER · NOVA COMPUTE'}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-[#98A0A8]">
                  Anthropic&apos;s state-of-the-art intelligent reasoning &amp; code model
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start lg:self-auto">
              <button
                onClick={handleCopyId}
                className="px-4 py-2 rounded-full bg-[#0A0C0E] border border-[#22272B] hover:border-[#333A40] text-xs font-mono text-[#F5F5F2] flex items-center gap-2 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#00E599]" /> : <Copy className="w-3.5 h-3.5 text-[#98A0A8]" />}
                <span>{copied ? 'Copied ID' : 'Copy ID'}</span>
              </button>
              <Link
                to="/chat"
                state={{ model: displayName }}
                className="px-5 py-2 rounded-full bg-[#F5F5F2] hover:bg-white text-[#060808] text-xs font-medium flex items-center gap-1.5 transition-all shadow-sm"
              >
                <span>Playground</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Sub-navigation Tabs */}
          <div className="inline-flex w-full sm:w-fit items-center rounded-xl bg-[#0A0C0E] border border-[#22272B] p-1 text-xs font-mono">
            {(
              [
                ['overview', 'Overview'],
                ['performance', 'Performance'],
                ['api', 'API'],
                ['playground', 'Playground'],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => handleTabScroll(key)}
                className={`flex-1 sm:flex-initial px-5 py-2 rounded-lg transition-all ${
                  activeTab === key
                    ? 'bg-[#161B1E] text-[#F5F5F2] font-semibold border border-[#22272B]'
                    : 'text-[#98A0A8] hover:text-[#F5F5F2]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 01 · OVERVIEW                                            */}
        {/* ======================================================== */}
        <section id="section-overview" className="flex flex-col gap-5">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#98A0A8]">
            01 · OVERVIEW
          </span>

          {/* 3 Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6 flex flex-col gap-2 shadow-xl">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">
                TPS (TOKENS / SEC)
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl font-mono font-bold text-[#F5F5F2]">{tpsVal}</span>
                <span className="text-xs font-mono text-[#38BDF8]">T/s</span>
              </div>
              <span className="text-xs text-[#98A0A8]">
                Sustained throughput across all active routes
              </span>
            </div>

            <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6 flex flex-col gap-2 shadow-xl">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">
                AVERAGE LATENCY
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl font-mono font-bold text-[#F5F5F2]">{latencyVal}</span>
                <span className="text-xs font-mono text-[#98A0A8]">ms</span>
              </div>
              <span className="text-xs text-[#98A0A8]">
                Time to first token generation (TTFT) avg: 320ms
              </span>
            </div>

            <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6 flex flex-col gap-2 shadow-xl">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">
                SUCCESS RATE
              </span>
              <div className="flex items-center gap-2">
                <span className="text-4xl font-mono font-bold text-[#00E599]">{uptimeVal}</span>
                <span className="w-2 h-2 rounded-full bg-[#00E599]" />
              </div>
              <span className="text-xs text-[#98A0A8]">
                1 failover auto-recovered in last 24h
              </span>
            </div>
          </div>

          {/* Pricing Structure Card */}
          <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6 flex flex-col gap-5 shadow-xl">
            <div className="flex flex-col gap-2 pb-4 border-b border-[#161B1E]">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#F5F5F2]">
                PRICING STRUCTURE
              </span>
              <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-[#98A0A8]">
                <span>
                  BASE PRICE INPUT (1M Tokens):{' '}
                  <strong className="text-[#F5F5F2]">
                    ${liveModel ? liveModel.price_input.toFixed(2) : '3.00'}
                  </strong>
                </span>
                <span>
                  BASE PRICE OUTPUT (1M Tokens):{' '}
                  <strong className="text-[#F5F5F2]">
                    ${liveModel ? liveModel.price_output.toFixed(2) : '15.00'}
                  </strong>
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="text-[10px] uppercase tracking-wider text-[#5A626A] border-b border-[#161B1E]">
                    <th className="pb-3 font-normal">PRICING BY GROUP</th>
                    <th className="pb-3 font-normal">ROUTING RATIO</th>
                    <th className="pb-3 font-normal">INPUT / 1M</th>
                    <th className="pb-3 font-normal text-right">OUTPUT / 1M</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#161B1E]">
                  <tr>
                    <td className="py-3.5 text-[#F5F5F2] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                      Swimore Plus+
                    </td>
                    <td className="py-3.5 text-[#98A0A8]">1x (Standard)</td>
                    <td className="py-3.5 text-[#F5F5F2] font-semibold">$3.00</td>
                    <td className="py-3.5 text-right text-[#F5F5F2] font-semibold">$15.00</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 text-[#F5F5F2] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00E599]" />
                      Partner - Nova Compute
                    </td>
                    <td className="py-3.5 text-[#98A0A8]">0.9x (-10% off-peak)</td>
                    <td className="py-3.5 text-[#00E599] font-semibold">$2.70</td>
                    <td className="py-3.5 text-right text-[#00E599] font-semibold">$13.50</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Provider / Tier / Allowed Groups / Endpoints Strip */}
          <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-5 grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs shadow-xl">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-wider text-[#5A626A]">PROVIDER</span>
              <span className="text-[#F5F5F2] font-medium">{providerName}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-wider text-[#5A626A]">TIER TYPE</span>
              <span className="text-[#E5A93C] font-medium">Swimore Plus+</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] uppercase tracking-wider text-[#5A626A]">ALLOWED GROUPS</span>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="px-2 py-0.5 rounded bg-[#121619] border border-[#22272B] text-[10px] text-[#98A0A8]">
                  plus
                </span>
                <span className="px-2 py-0.5 rounded bg-[#121619] border border-[#22272B] text-[10px] text-[#98A0A8]">
                  partner-nova
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] uppercase tracking-wider text-[#5A626A]">ENDPOINTS API</span>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="px-2 py-0.5 rounded bg-[#121619] border border-[#22272B] text-[10px] text-[#98A0A8]">
                  anthropic
                </span>
                <span className="px-2 py-0.5 rounded bg-[#121619] border border-[#22272B] text-[10px] text-[#98A0A8]">
                  openai
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 02 · PERFORMANCE & TELEMETRY                             */}
        {/* ======================================================== */}
        <section id="section-performance" className="flex flex-col gap-5">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#98A0A8]">
            02 · PERFORMANCE &amp; TELEMETRY
          </span>

          {/* Per-Group Performance Breakdown */}
          <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6 flex flex-col gap-4 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#161B1E]">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#F5F5F2]">
                PER-GROUP PERFORMANCE BREAKDOWN
              </span>
              <span className="font-mono text-[10px] text-[#5A626A]">
                Telemetry updated real-time (last 30m)
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="text-[10px] uppercase tracking-wider text-[#5A626A] border-b border-[#161B1E]">
                    <th className="pb-3 font-normal">ROUTE TARGET GROUP</th>
                    <th className="pb-3 font-normal">TPS THROUGHPUT</th>
                    <th className="pb-3 font-normal">AVG TTFT</th>
                    <th className="pb-3 font-normal">AVG LATENCY</th>
                    <th className="pb-3 font-normal text-right">SUCCESS RATE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#161B1E]">
                  <tr>
                    <td className="py-3.5 text-[#38BDF8] font-medium">Swimore Plus+ Cluster</td>
                    <td className="py-3.5 text-[#F5F5F2]">112.0 t/s</td>
                    <td className="py-3.5 text-[#98A0A8]">320 ms</td>
                    <td className="py-3.5 text-[#98A0A8]">410 ms</td>
                    <td className="py-3.5 text-right text-[#00E599] font-semibold">98.4%</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 text-[#F5F5F2]">Partner - Nova Compute Direct</td>
                    <td className="py-3.5 text-[#F5F5F2]">104.2 t/s</td>
                    <td className="py-3.5 text-[#98A0A8]">350 ms</td>
                    <td className="py-3.5 text-[#98A0A8]">445 ms</td>
                    <td className="py-3.5 text-right text-[#00E599] font-semibold">99.1%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Latency Trend (Last 24h) */}
          <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6 flex flex-col gap-4 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#F5F5F2]">
                  LATENCY TREND (LAST 24H)
                </span>
                <span className="text-[11px] text-[#98A0A8]">
                  Average Time To First Token (TTFT in milliseconds)
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-[#38BDF8]/10 border border-[#38BDF8]/30 font-mono text-[10px] text-[#38BDF8]">
                P95: 460ms
              </span>
            </div>

            <svg viewBox="0 0 600 120" preserveAspectRatio="none" className="w-full h-36">
              <defs>
                <linearGradient id="latencyArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <line x1="0" y1="30" x2="600" y2="30" stroke="#161B1E" strokeWidth="1" />
              <line x1="0" y1="65" x2="600" y2="65" stroke="#161B1E" strokeWidth="1" />
              <line x1="0" y1="100" x2="600" y2="100" stroke="#161B1E" strokeWidth="1" />
              <polygon
                fill="url(#latencyArea)"
                points="0,60 85,82 170,74 255,80 340,56 425,60 510,28 600,66 600,115 0,115"
              />
              <polyline
                fill="none"
                stroke="#38BDF8"
                strokeWidth="2"
                strokeLinejoin="round"
                points="0,60 85,82 170,74 255,80 340,56 425,60 510,28 600,66"
              />
            </svg>

            <div className="flex justify-between font-mono text-[10px] text-[#5A626A] pt-1 border-t border-[#161B1E]">
              <span>17:00</span>
              <span>20:00</span>
              <span>23:00</span>
              <span>02:00</span>
              <span>05:00</span>
              <span>08:00</span>
              <span>11:00</span>
              <span>14:00 (NOW)</span>
            </div>
          </div>

          {/* Availability & Uptime (Last 24h) */}
          <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6 flex flex-col gap-4 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#F5F5F2]">
                  AVAILABILITY &amp; UPTIME (LAST 24H)
                </span>
                <span className="text-[11px] text-[#98A0A8]">
                  Success rate excludes business client validations and includes current rolling hour
                </span>
              </div>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E5A93C]/10 border border-[#E5A93C]/30 font-mono text-[10px] text-[#E5A93C]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C]" /> 1 incident (02:14 UTC)
              </span>
            </div>

            <svg viewBox="0 0 600 90" preserveAspectRatio="none" className="w-full h-24">
              <line x1="0" y1="25" x2="600" y2="25" stroke="#161B1E" strokeWidth="1" />
              <line x1="0" y1="60" x2="600" y2="60" stroke="#161B1E" strokeWidth="1" />
              <polyline
                fill="none"
                stroke="#00E599"
                strokeWidth="2"
                strokeLinejoin="round"
                points="0,25 85,25 170,25 255,48 340,25 425,25 510,25 600,26"
              />
              <circle cx="255" cy="48" r="4" fill="#E5A93C" />
            </svg>

            <div className="flex flex-wrap justify-between gap-2 font-mono text-[10px] text-[#5A626A] pt-1 border-t border-[#161B1E]">
              <span>17:00 · 100%</span>
              <span>20:00 · 100%</span>
              <span>23:00 · 100%</span>
              <span className="text-[#E5A93C]">02:00 · 96.1%</span>
              <span>05:00 · 100%</span>
              <span>08:00 · 100%</span>
              <span>11:00 · 100%</span>
              <span>14:00 · 99.9%</span>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 03 · API & CODE EXAMPLES                                 */}
        {/* ======================================================== */}
        <section id="section-api" className="flex flex-col gap-5">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#98A0A8]">
            03 · API &amp; CODE EXAMPLES
          </span>

          {/* Code Examples Card */}
          <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] overflow-hidden shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3.5 border-b border-[#161B1E]">
              <span className="font-mono text-xs text-[#F5F5F2]">Code Examples</span>
              <div className="flex items-center gap-1 rounded-lg bg-[#0E1215] border border-[#22272B] p-1 text-xs font-mono">
                {(['cURL', 'Python', 'TypeScript', 'JavaScript'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setApiLang(lang)}
                    className={`px-3 py-1 rounded-md transition-all ${
                      apiLang === lang
                        ? 'bg-[#F5F5F2] text-[#060808] font-semibold'
                        : 'text-[#98A0A8] hover:text-[#F5F5F2]'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <pre className="px-6 py-5 font-mono text-xs leading-relaxed text-[#F5F5F2] bg-[#080A0C] overflow-x-auto">
              {codeSnippets[apiLang]}
            </pre>

            <div className="flex flex-wrap items-center justify-between gap-2 px-6 py-3 border-t border-[#161B1E] bg-[#0A0C0E]">
              <span className="text-[11px] font-mono text-[#5A626A]">
                Replace <span className="text-[#98A0A8]">$SWIMORE_API_KEY</span> with your project secret from the Swimore console.
              </span>
              <button
                onClick={handleCopySnippet}
                className="flex items-center gap-1.5 text-xs font-mono text-[#98A0A8] hover:text-[#F5F5F2] transition-colors"
              >
                {snippetCopied ? <Check className="w-3.5 h-3.5 text-[#00E599]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{snippetCopied ? 'Copied' : 'Copy Snippet'}</span>
              </button>
            </div>
          </div>

          {/* Cyan Authentication Protocol Banner */}
          <div className="rounded-xl bg-[#0A1318] border border-[#38BDF8]/30 px-5 py-3.5 flex items-start sm:items-center gap-3 text-xs">
            <Info className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-[#98A0A8] leading-relaxed">
              <strong className="text-[#F5F5F2]">Authentication Protocol:</strong> All requests must include an{' '}
              <code className="font-mono text-[#38BDF8]">Authorization: Bearer</code> header. API keys can be scoped strictly to specific models, cluster groups, client IP whitelists, and TPM thresholds.
            </p>
          </div>

          {/* Supported Parameters Card */}
          <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6 flex flex-col gap-4 shadow-xl">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#F5F5F2]">
              SUPPORTED PARAMETERS
            </span>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="text-[10px] uppercase tracking-wider text-[#5A626A] border-b border-[#161B1E]">
                    <th className="pb-3 font-normal">PARAMETER</th>
                    <th className="pb-3 font-normal">TYPE</th>
                    <th className="pb-3 font-normal">DEFAULT / RANGE</th>
                    <th className="pb-3 font-normal">DESCRIPTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#161B1E]">
                  {supportedParameters.map((p) => (
                    <tr key={p.name}>
                      <td className="py-3.5 text-[#38BDF8] font-medium pr-4">{p.name}</td>
                      <td className="py-3.5 text-[#98A0A8] pr-4">{p.type}</td>
                      <td className="py-3.5 text-[#F5F5F2] pr-4">{p.defaultRange}</td>
                      <td className="py-3.5 text-[#98A0A8] font-sans text-xs">{p.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Rate Limits By Group Card */}
          <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6 flex flex-col gap-4 shadow-xl">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#F5F5F2]">
              RATE LIMITS BY GROUP
            </span>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="text-[10px] uppercase tracking-wider text-[#5A626A] border-b border-[#161B1E]">
                    <th className="pb-3 font-normal">GROUP IDENTITY</th>
                    <th className="pb-3 font-normal">RPM (REQ / MIN)</th>
                    <th className="pb-3 font-normal">TPM (TOKENS / MIN)</th>
                    <th className="pb-3 font-normal text-right">RPD (REQ / DAY)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#161B1E]">
                  <tr>
                    <td className="py-3.5 text-[#F5F5F2] font-medium">Swimore Plus+ Dedicated</td>
                    <td className="py-3.5 text-[#38BDF8]">600</td>
                    <td className="py-3.5 text-[#38BDF8]">400,000</td>
                    <td className="py-3.5 text-right text-[#F5F5F2]">20,000</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 text-[#F5F5F2] font-medium">Partner - Nova Compute Secondary</td>
                    <td className="py-3.5 text-[#00E599]">300</td>
                    <td className="py-3.5 text-[#00E599]">200,000</td>
                    <td className="py-3.5 text-right text-[#F5F5F2]">10,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 04 · PLAYGROUND & INTELLIGENT ROUTING SIMULATOR          */}
        {/* ======================================================== */}
        <section id="section-playground" className="flex flex-col gap-5">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#98A0A8]">
            04 · PLAYGROUND &amp; INTELLIGENT ROUTING SIMULATOR
          </span>

          <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6 flex flex-col gap-6 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-lg font-bold text-[#F5F5F2]">Trace Routing Simulator</h3>
                  <span className="px-2 py-0.5 rounded bg-[#38BDF8]/15 border border-[#38BDF8]/30 font-mono text-[10px] uppercase tracking-wider text-[#38BDF8]">
                    INTERACTIVE
                  </span>
                </div>
                <p className="text-xs text-[#98A0A8]">
                  Trigger simulated multi-hop mesh failover and observe trace telemetry in real-time.
                </p>
              </div>

              <button
                onClick={handleRunTrace}
                disabled={traceRunning}
                className="px-5 py-2 rounded-full bg-[#38BDF8] hover:bg-[#38BDF8]/90 text-[#060808] font-mono text-xs font-semibold flex items-center gap-2 transition-all shadow-md active:scale-95"
              >
                <Play className="w-3 h-3 fill-[#060808]" />
                <span>{traceRunning ? 'Running Trace...' : 'Run Trace Test'}</span>
              </button>
            </div>

            {/* Client Command Preview */}
            <div className="rounded-xl bg-[#080A0C] border border-[#161B1E] p-4 flex flex-col gap-2 font-mono text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 text-[10px]">
                <span className="text-[#5A626A]">Client Command Preview</span>
                <span className="text-[#38BDF8]">
                  Target: {displayName} (High-Availability Pool)
                </span>
              </div>
              <div className="text-[#98A0A8] overflow-x-auto whitespace-pre">
                {`curl https://api.swimore.ai/v1/chat/completions -H "Authorization: Bearer $KEY" -d '{"model":"${displayName}","messages":[{"role":"user","content":"Hi"}]}'`}
              </div>
            </div>

            {/* Routing Trace Execution Graph */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#5A626A]">
                ROUTING TRACE EXECUTION GRAPH
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono">
                <div className="rounded-xl bg-[#0E1215] border border-[#22272B] p-4 flex flex-col gap-1.5">
                  <span className="text-[10px] text-[#5A626A]">STEP 01</span>
                  <span className="text-xs font-semibold text-[#F5F5F2]">Incoming Request</span>
                  <span className="text-[11px] text-[#38BDF8] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" /> Swimore Gateway
                  </span>
                </div>

                <div className="rounded-xl bg-[#19120A] border border-[#E5A93C]/50 p-4 flex flex-col gap-1.5">
                  <span className="text-[10px] text-[#E5A93C]">STEP 02</span>
                  <span className="text-xs font-semibold text-[#F5F5F2]">Primary: Claude 3.5</span>
                  <span className="text-[11px] text-[#E5A93C] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C]" /> Timeout · 3s
                  </span>
                </div>

                <div className="rounded-xl bg-[#0E1215] border border-[#22272B] p-4 flex flex-col gap-1.5">
                  <span className="text-[10px] text-[#5A626A]">STEP 03</span>
                  <span className="text-xs font-semibold text-[#F5F5F2]">Mesh Auto-Fallback</span>
                  <span className="text-[11px] text-[#38BDF8] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" /> Partner Nova Route
                  </span>
                </div>

                <div className="rounded-xl bg-[#091914] border border-[#00E599]/50 p-4 flex flex-col gap-1.5">
                  <span className="text-[10px] text-[#00E599]">STEP 04</span>
                  <span className="text-xs font-semibold text-[#F5F5F2]">Claude 3.5 (Nova Tier)</span>
                  <span className="text-[11px] text-[#00E599] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E599]" /> 200 OK · {traceLatency}ms
                  </span>
                </div>
              </div>
            </div>

            {/* Summary Footer Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#161B1E] font-mono text-[11px]">
              <div className="flex flex-wrap items-center gap-5">
                <span className="text-[#98A0A8]">
                  TOTAL LATENCY: <strong className="text-[#F5F5F2]">{traceLatency} ms</strong>
                </span>
                <span className="text-[#98A0A8]">
                  EST. COST: <strong className="text-[#00E599]">$0.000045</strong>
                </span>
                <span className="text-[#98A0A8]">
                  ZERO LOGGING: <strong className="text-[#38BDF8]">Verified Active</strong>
                </span>
              </div>
              <span className="text-[#5A626A]">Sample Data · Illustrative Trace</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#22272B]/40 py-6 px-6 mt-auto">
        <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-[11px] font-mono">
          <span className="text-[#5A626A]">SWIMORE AI © 2026 Swimore Labs Inc. All rights reserved.</span>
          <div className="flex flex-wrap items-center gap-5">
            <Link to="/docs" className="text-[#98A0A8] hover:text-[#F5F5F2]">
              Documentation
            </Link>
            <a href="#" className="text-[#98A0A8] hover:text-[#F5F5F2]">
              Privacy
            </a>
            <a href="#" className="text-[#98A0A8] hover:text-[#F5F5F2]">
              Terms of Service
            </a>
            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E599]/10 border border-[#00E599]/30 text-[#00E599]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E599]" />
              <span>All routing clusters operational</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ModelDetails
