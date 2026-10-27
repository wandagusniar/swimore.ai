import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Navbar } from '@/components/navigation/Navbar';
import { Copy, Check } from 'lucide-react';

const codeSnippets: Record<string, string> = {
  cURL: `curl https://api.swimore.ai/v1/chat/completions \\
  -H "Authorization: Bearer $SWIMORE_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-3.5-sonnet",
    "messages": [
      { "role": "user", "content": "Explain routing in one line." }
    ]
  }'`,
  Python: `from openai import OpenAI

client = OpenAI(
    base_url="https://api.swimore.ai/v1",
    api_key="$SWIMORE_API_KEY",
)

response = client.chat.completions.create(
    model="claude-3.5-sonnet",
    messages=[{"role": "user", "content": "Explain routing in one line."}],
)
print(response.choices[0].message.content)`,
  TypeScript: `const resp = await fetch("https://api.swimore.ai/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": "Bearer " + process.env.SWIMORE_API_KEY,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "claude-3.5-sonnet",
    messages: [{ role: "user", content: "Explain routing in one line." }],
  }),
});
const data = await resp.json();`,
  JavaScript: `const resp = await fetch("https://api.swimore.ai/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": "Bearer " + process.env.SWIMORE_API_KEY,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "claude-3.5-sonnet",
    messages: [{ role: "user", content: "Explain routing in one line." }],
  }),
});
const data = await resp.json();`,
};

const pricingRows: { label: string; value?: string; badge?: string; teal?: boolean }[] = [
  { label: 'INPUT', value: '$0.05' },
  { label: 'OUTPUT', value: '$0.09' },
  { label: '~ 10% cheaper (Swimore Plus)', teal: true },
  { label: 'PARTNER ROUTE', badge: '(20% OFF)', value: '$0.10' },
  { label: 'PROSA CODE CONNECT', value: '$0.35' },
  { label: 'PROVIDER', value: 'Anthropic' },
];

const perfRoutes = [
  { name: 'Swimore Route (Optimal)', tps: '112.0 t/s', p50: '322 ms', p95: '428 ms', success: '98.4%', amber: true },
  { name: 'Partner: Nova Compute Direct', tps: '104.2 t/s', p50: '358 ms', p95: '461 ms', success: '97.6%', amber: false },
];

const rateLimits = [
  { group: 'Swimore Plus', rpm: '10K', tpm: '100K', rpd: '200K' },
  { group: 'Partner: Nova Compute Direct', rpm: '30K', tpm: '30K', rpd: '200K' },
];

export const ModelDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const modelId = id || 'claude-3-5-sonnet';

  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'api' | 'playground'>('overview');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(modelId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [perfMetric, setPerfMetric] = useState('P50 latency');
  const [apiLang, setApiLang] = useState<'cURL' | 'Python' | 'TypeScript' | 'JavaScript'>('cURL');
  const [traceTab, setTraceTab] = useState('Trace Routing');
  const [snippetCopied, setSnippetCopied] = useState(false);

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(codeSnippets[apiLang]);
    setSnippetCopied(true);
    setTimeout(() => setSnippetCopied(false), 2000);
  };

  return (
    <div className="min-h-screen w-full bg-[#060808] text-[#F5F5F2] flex flex-col font-sans ocean-bg">
      <Navbar />

      <header className="flex items-center justify-between py-6 px-8 bg-surface border-b border-[#22272B]">
        <div className="flex items-center space-x-4">
          <Link
            to="/models"
            className="text-xs font-mono text-[#98A0A8] hover:text-[#F5F5F2] transition-colors"
          >
            ← ALL MODELS
          </Link>

          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 rounded-xl bg-[#121619] border border-[#22272B] flex items-center justify-center font-mono text-sm font-bold text-[#F5F5F2]">
              AN
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-mono text-[#98A0A8]">Models / Anthropic</span>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl lg:text-4xl font-normal tracking-tight">
                  claude-3.5-<span className="font-serif italic">sonnet</span>
                </h1>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 rounded bg-[#00E599] text-[#060808] border border-[#00E599]/20 text-xs font-medium">
                  SWIMORE PLUS+
                </span>
                <span className="px-2 py-0.5 rounded bg-[#161B1E] text-[#98A0A8] border border-[#22272B] text-xs font-mono">
                  PARTNER · NOVA COMPUTE
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-white text-[#060808] border border-[#22272B] rounded-full text-sm font-medium flex items-center gap-2 transition-all active:scale-95"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#00E599]" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied ID' : 'Copy ID'}
            </button>

            <button
              onClick={() => window.open('https://api.swimore.ai', '_blank')}
              className="px-4 py-2 bg-white text-[#060808] border border-[#22272B] rounded-full text-sm font-medium flex items-center gap-2 transition-all active:scale-95"
            >
              Get API
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1240px] w-full mx-auto px-6 py-8 flex flex-col gap-8">
        {/* Tab Switcher */}
        <div className="w-full p-1 rounded-2xl bg-[#0A0C0E] border border-[#22272B] flex items-center justify-between text-xs font-mono">
          {(['overview', 'performance', 'api', 'playground'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-xl capitalize transition-all ${activeTab === tab ? 'bg-[#F5F5F2] text-[#060808] font-semibold shadow-sm' : 'text-[#98A0A8] hover:text-[#F5F5F2]'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Section — one long page per design */}
        {activeTab === 'overview' && (
          <section className="flex flex-col gap-10">
            {/* 01 · Overview: stats + pricing */}
            <div className="flex flex-col gap-5">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#5A626A]">01 · OVERVIEW</span>

              {/* Stat Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'TPS (TOKENS / SEC)', value: '112.0 t/s', desc: 'Comprehensive throughput across all active routes' },
                  { label: 'AVERAGE LATENCY', value: '410 ms', desc: 'Time to first token measured (TTFT) 99%' },
                  { label: 'SUCCESS RATE', value: '98.4%', desc: 'All upstream requests across last 30 days' },
                ].map((s) => (
                  <div key={s.label} className="bg-[#0A0C0E] rounded-2xl p-6 border border-[#22272B] flex flex-col gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">{s.label}</span>
                    <span className="text-4xl font-mono text-[#E5A93C]">{s.value}</span>
                    <span className="text-xs text-[#98A0A8]">{s.desc}</span>
                  </div>
                ))}
              </div>

              {/* Pricing Structure */}
              <div className="bg-[#0A0C0E] rounded-2xl p-6 border border-[#22272B]">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#161B1E]">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#5A626A]">PRICING STRUCTURE</span>
                  <div className="flex items-center gap-3 font-mono text-[11px]">
                    <span className="text-[#5A626A]">BASE PRICE (OPT)</span>
                    {['$0.05', '$0.09', '$0.10', '$0.35'].map((v) => (
                      <span key={v} className="text-[#E5A93C]">{v}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col font-mono text-xs">
                  {pricingRows.map((row) => (
                    <div key={row.label} className="flex items-center justify-between py-3 border-b border-[#161B1E] last:border-b-0">
                      {row.teal ? (
                        <span className="text-[#00E599]">~ 10% cheaper (Swimore Plus)</span>
                      ) : (
                        <>
                          <span className="text-[#98A0A8] tracking-wider">
                            {row.label} {row.badge && <span className="text-[#5A626A]">{row.badge}</span>}
                          </span>
                          <span className="text-[#F5F5F2]">{row.value}</span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 02 · Performance & Reliability */}
            <div className="flex flex-col gap-5">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#5A626A]">02 · PERFORMANCE & RELIABILITY</span>

              <div className="inline-flex w-fit items-center rounded-full border border-[#22272B] bg-[#0A0C0E] p-1 text-[11px] font-mono">
                {['P50 latency', 'P95 latency', 'All upstream', 'Roundtrip time'].map((m) => (
                  <button
                    key={m}
                    onClick={() => setPerfMetric(m)}
                    className={`px-4 py-1.5 rounded-full transition-all ${perfMetric === m ? 'bg-[#121619] text-[#F5F5F2]' : 'text-[#98A0A8] hover:text-[#F5F5F2]'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              {/* P50/P95 Performance by Model */}
              <div className="bg-[#0A0C0E] rounded-2xl p-6 border border-[#22272B]">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#5A626A]">P50/P95 PERFORMANCE BY MODEL</span>
                  <span className="font-mono text-[10px] text-[#5A626A]">TELEMETRY UPDATED REAL-TIME (LAST 30D)</span>
                </div>
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-wider text-[#5A626A]">
                      <th className="pb-3 font-normal">ROUTE / MODEL GROUP</th>
                      <th className="pb-3 font-normal">TPS</th>
                      <th className="pb-3 font-normal">P50 (TTFT)</th>
                      <th className="pb-3 font-normal">P95 LATENCY</th>
                      <th className="pb-3 font-normal text-right">SUCCESS RATE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#161B1E]">
                    {perfRoutes.map((r) => (
                      <tr key={r.name}>
                        <td className="py-3 text-[#F5F5F2]">{r.name}</td>
                        <td className={`py-3 ${r.amber ? 'text-[#E5A93C]' : 'text-[#98A0A8]'}`}>{r.tps}</td>
                        <td className={`py-3 ${r.amber ? 'text-[#E5A93C]' : 'text-[#98A0A8]'}`}>{r.p50}</td>
                        <td className={`py-3 ${r.amber ? 'text-[#E5A93C]' : 'text-[#98A0A8]'}`}>{r.p95}</td>
                        <td className={`py-3 text-right ${r.amber ? 'text-[#E5A93C]' : 'text-[#98A0A8]'}`}>{r.success}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Latency (P50) last 24h */}
              <div className="bg-[#0A0C0E] rounded-2xl p-6 border border-[#22272B]">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#5A626A]">LATENCY (P50) (LAST 24H)</span>
                <table className="w-full text-left font-mono text-xs mt-4">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-wider text-[#5A626A]">
                      <th className="pb-3 font-normal">ROUTE</th>
                      <th className="pb-3 font-normal">P50</th>
                      <th className="pb-3 font-normal text-right">SUCCESS RATE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#161B1E]">
                    <tr>
                      <td className="py-3 text-[#F5F5F2]">Swimore Route (Optimal)</td>
                      <td className="py-3 text-[#E5A93C]">322 ms</td>
                      <td className="py-3 text-right text-[#E5A93C]">98.4%</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-[#F5F5F2]">Partner: Nova Compute Direct</td>
                      <td className="py-3 text-[#98A0A8]">409 ms</td>
                      <td className="py-3 text-right text-[#98A0A8]">97.6%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Availability & Uptime */}
              <div className="bg-[#0A0C0E] rounded-2xl p-6 border border-[#22272B] flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#5A626A]">AVAILABILITY & UPTIME (LAST 30D)</span>
                    <span className="text-[11px] text-[#98A0A8]">Success rate includes current rolling hour</span>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full border border-[#E5A93C]/30 bg-[#E5A93C]/10 px-2.5 py-1 text-[10px] font-mono text-[#E5A93C]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C]" /> INCIDENT (04:12:07)
                  </span>
                </div>
                <svg viewBox="0 0 500 80" preserveAspectRatio="none" className="w-full h-28">
                  <line x1="0" y1="20" x2="500" y2="20" stroke="#161B1E" strokeWidth="1" />
                  <line x1="0" y1="45" x2="500" y2="45" stroke="#161B1E" strokeWidth="1" />
                  <polyline
                    fill="none"
                    stroke="#E5A93C"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    points="0,24 45,22 90,23 135,21 180,23 222,58 260,23 305,21 350,23 395,22 440,24 500,23"
                  />
                  <circle cx="222" cy="58" r="4" fill="#E5A93C" />
                </svg>
                <div className="flex justify-between font-mono text-[10px] text-[#5A626A]">
                  <span>SEP 25</span>
                  <span>OCT 02</span>
                  <span>OCT 09</span>
                  <span>OCT 16</span>
                  <span>OCT 23</span>
                </div>
              </div>
            </div>

            {/* 03 · API & Code Examples */}
            <div className="flex flex-col gap-5">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#5A626A]">03 · API & CODE EXAMPLES</span>
              <div className="bg-[#0A0C0E] rounded-2xl border border-[#22272B] overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-[#161B1E]">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#5A626A]">CODE EXAMPLES</span>
                  <div className="flex items-center gap-1 rounded-full border border-[#22272B] bg-[#0E1215] p-1 text-[11px] font-mono">
                    {(['cURL', 'Python', 'TypeScript', 'JavaScript'] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setApiLang(lang)}
                        className={`px-3 py-1 rounded-full transition-all ${apiLang === lang ? 'bg-[#F5F5F2] text-[#060808]' : 'text-[#98A0A8] hover:text-[#F5F5F2]'}`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
                <pre className="px-6 py-4 font-mono text-[11px] leading-relaxed text-[#98A0A8] overflow-x-auto">
                  {codeSnippets[apiLang]}
                </pre>
                <div className="flex flex-wrap items-center justify-between gap-2 px-6 py-3 border-t border-[#161B1E]">
                  <span className="text-[11px] text-[#5A626A]">Replace $SWIMORE_API_KEY with your project secret from the Swimore console.</span>
                  <button
                    onClick={handleCopySnippet}
                    className="flex items-center gap-1.5 rounded-full border border-[#22272B] px-3 py-1.5 text-[10px] font-mono tracking-widest text-[#98A0A8] hover:text-[#F5F5F2] transition-colors"
                  >
                    {snippetCopied ? <Check className="w-3 h-3 text-[#00E599]" /> : <Copy className="w-3 h-3" />}
                    {snippetCopied ? 'COPIED' : 'COPY SNIPPET'}
                  </button>
                </div>
              </div>
            </div>

            {/* 04 · Rate Limits */}
            <div className="flex flex-col gap-5">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#5A626A]">04 · RATE LIMITS BY GROUP</span>
              <div className="bg-[#0A0C0E] rounded-2xl p-6 border border-[#22272B]">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-wider text-[#5A626A]">
                      <th className="pb-3 font-normal">GROUP IDENTITY</th>
                      <th className="pb-3 font-normal">RPM (REQ / MIN)</th>
                      <th className="pb-3 font-normal">TPM (TOKENS / MIN)</th>
                      <th className="pb-3 font-normal text-right">RPD (REQ / DAY)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#161B1E]">
                    {rateLimits.map((r) => (
                      <tr key={r.group}>
                        <td className="py-3 text-[#F5F5F2]">{r.group}</td>
                        <td className={`py-3 ${r.group === 'Swimore Plus' ? 'text-[#E5A93C]' : 'text-[#98A0A8]'}`}>{r.rpm}</td>
                        <td className={`py-3 ${r.group === 'Swimore Plus' ? 'text-[#E5A93C]' : 'text-[#98A0A8]'}`}>{r.tpm}</td>
                        <td className={`py-3 text-right ${r.group === 'Swimore Plus' ? 'text-[#E5A93C]' : 'text-[#98A0A8]'}`}>{r.rpd}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 05 · Trace Routing Simulator */}
            <div className="flex flex-col gap-5">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#5A626A]">05 · TRACE ROUTING SIMULATOR</span>
              <div className="bg-[#0A0C0E] rounded-2xl border border-[#22272B] overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-[#161B1E]">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#5A626A]">TRACE ROUTING EXAMPLE</span>
                  <div className="flex items-center gap-1 rounded-full border border-[#22272B] bg-[#0E1215] p-1 text-[11px] font-mono">
                    {['Trace Routing', 'Model Performance', 'Output'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setTraceTab(t)}
                        className={`px-3 py-1 rounded-full transition-all ${traceTab === t ? 'bg-[#F5F5F2] text-[#060808]' : 'text-[#98A0A8] hover:text-[#F5F5F2]'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="px-6 py-5 flex flex-col gap-3 font-mono text-xs">
                  <span className="text-[10px] uppercase tracking-widest text-[#5A626A]">TRACE ROUTING 1</span>
                  {[
                    { role: 'PRIMARY', target: 'Claude 3.5 Sonnet' },
                    { role: 'PLAN B', target: 'Meta Auto-Fallback' },
                    { role: 'PLAN C', target: 'Claude 3.5 Sonnet' },
                  ].map((step) => (
                    <div key={step.role} className="flex items-center justify-between rounded-lg border border-[#161B1E] bg-[#0E1215] px-4 py-2.5">
                      <span className="text-[#5A626A]">{step.role}</span>
                      <span className="text-[#F5F5F2]">{step.target}</span>
                    </div>
                  ))}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="rounded-full border border-[#22272B] px-3 py-1 text-[10px] text-[#98A0A8]">TOTAL LATENCY 408 ms</span>
                    <span className="rounded-full border border-[#22272B] px-3 py-1 text-[10px] text-[#98A0A8]">EST COST $0.0001</span>
                    <span className="rounded-full border border-[#22272B] px-3 py-1 text-[10px] text-[#98A0A8]">ZERO LOGGING</span>
                    <span className="rounded-full border border-[#00E599]/30 bg-[#00E599]/10 px-3 py-1 text-[10px] text-[#00E599]">VERIFIED PARTNER</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Performance Section */}
        {activeTab === 'performance' && (
          <section>
            {/* P50 Snapshot */}
            <div className="bg-[#0A0C0E] rounded-lg p-6 border border-[#22272B] mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-serif text-[#E5A93C]">P50-GROUP PERFORMANCE SNAPSHOT</h3>
                <p className="text-sm text-[#E5A93C]">Swimore Plus Group P50 latency vs upstream: +30ms latency</p>
              </div>

              <table className="w-full text-sm text-[#E5A93C]">
                <thead>
                  <tr>
                    <th className="text-center">Swimore Plus</th>
                    <th className="text-center">110.8 t/s</th>
                    <th className="text-center">308 ms</th>
                    <th className="text-center">4.19 s</th>
                    <th className="text-center">99.3%</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">Swimore Plus</td>
                    <td className="text-center">110.8 t/s</td>
                    <td className="text-center">308 ms</td>
                    <td className="text-center">4.19 s</td>
                    <td className="text-center">99.3%</td>
                  </tr>
                  <tr>
                    <td className="text-center">Partner: Prosa Code Connect</td>
                    <td className="text-center">104.2 t/s</td>
                    <td className="text-center">508 ms</td>
                    <td className="text-center">4.6 s</td>
                    <td className="text-center">98.5%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Latency Chart */}
            <div className="bg-[#0A0C0E] rounded-lg p-6 border border-[#22272B] mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-serif text-[#E5A93C]">LATENCY (P95, LAST 24H)</h3>
                <p className="text-sm text-[#E5A93C]">Significant spikes show no plateau pressure</p>
              </div>
              <svg
                width="100%"
                height="120"
                viewBox="0 0 500 80"
                className="text-[#E5A93C]"
              >
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#00E599" />
                    <stop offset="100%" stopColor="#00E599" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 70 L50 65 L100 60 L150 65 L200 62 L250 68 L300 64 L350 66 L400 62 L450 65 L500 70"
                  fill="none"
                  stroke="url(#grad)"
                  className="text-[#E5A93C]"
                />
              </svg>
            </div>

            {/* Availability & Uptime */}
            <div className="bg-[#0A0C0E] rounded-lg p-6 border border-[#22272B]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-serif text-[#E5A93C]">AVAILABILITY & UPTIME (LAST 24H)</h3>
                <p className="text-sm text-[#E5A93C]">99.99% (LAST 24H)</p>
              </div>
              <svg
                width="100%"
                height="60"
                viewBox="0 0 500 60"
                className="text-[#E5A93C]"
              >
                <rect width="500" height="60" fill="#00E599" />
                <text x="250" y="35" textAnchor="middle" className="text-sm text-[#060808] font-medium">
                  99.99%
                </text>
              </svg>
            </div>
          </section>
        )}

        {/* API Section */}
        {activeTab === 'api' && (
          <section>
            <div className="bg-[#0A0C0E] rounded-lg p-6 border border-[#22272B]">
              <pre className="bg-[#0A0C0E] p-4 rounded text-sm text-[#E5A93C] overflow-x-auto">
                <code className="text-[#E5A93C]">{`curl -X POST 'https://api.swimore.ai/v1/chat/completions' \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer sk-sw-prod-882910' \\
  -d '{
    "model": "claude-3.5-sonnet",
    "messages": [
      { "role": "user", "content": "Explain how Swimore multi-pool failover routing works." }
    ],
    "stream": false
  }'`}</code>
              </pre>
    </div>
  </section>
)}

        {/* Playground Section */}
        {activeTab === 'playground' && (
          <section>
            {/* Simulator Inputs */}
            <div className="bg-[#0A0C0E] rounded-lg p-6 border border-[#22272B] mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-serif text-[#E5A93C]">Trace Routing Simulator</h3>
                <span className="text-sm text-[#E5A93C] bg-[#00E599] px-2 py-1 rounded">SAMPLE</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-[#E5A93C] mb-1">
                    base URL
                  </label>
                  <input
                    type="text"
                    defaultValue="api.swimore.ai/v1"
                    className="w-full p-2 border border-[#22272B] rounded bg-surface text-[#E5A93C]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#E5A93C] mb-1">
                    API key
                  </label>
                  <input
                    type="text"
                    defaultValue="your-api-key"
                    className="w-full p-2 border border-[#22272B] rounded bg-surface text-[#E5A93C]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#E5A93C] mb-1">
                    model
                  </label>
                  <select
                    defaultValue="claude-3-5-sonnet"
                    className="w-full p-2 border border-[#22272B] rounded bg-surface text-[#E5A93C]"
                  >
                    <option value="claude-3-5-sonnet">claude-3-5-sonnet</option>
                    <option value="other-model">Other Model</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#E5A93C] mb-1">
                    temperature
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="2.0"
                    step="0.1"
                    defaultValue="0.7"
                    className="w-full p-2 border border-[#22272B] rounded bg-surface text-[#E5A93C]"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  // placeholder for actual trace logic
                  alert('Sample trace executed');
                }}
                className="px-6 py-2 bg-[#00E599] text-[#060808] rounded-full text-sm font-medium"
              >
                Run Trace Test
              </button>
            </div>

            {/* Trace Routing Graph */}
            <div className="mt-8 bg-[#0A0C0E] rounded-lg p-6 border border-[#22272B]">
              <h4 className="text-lg font-serif text-[#E5A93C] mb-2">TRACE ROUTING EXECUTION GRAPH</h4>
              <div className="flex justify-between items-center mb-4">
                <div className="text-center">
                  <div className="w-20 h-12 bg-card rounded"></div>
                  <div className="text-sm text-[#E5A93C]">Simple Request</div>
                </div>
                <div className="text-center">
                  <div className="w-20 h-12 bg-card rounded"></div>
                  <div className="text-sm text-[#E5A93C]">Policy: Claude 3.5</div>
                </div>
                <div className="text-center">
                  <div className="w-20 h-12 bg-card rounded"></div>
                  <div className="text-sm text-[#E5A93C]">Route Auto-Failover</div>
                </div>
                <div className="text-center">
                  <div className="w-20 h-12 bg-card rounded"></div>
                  <div className="text-sm text-[#E5A93C]">Upstream Node Claude 3.5 Sonnet</div>
                </div>
                <div className="flex items-center space-x-4 mt-4">
                  <div className="text-sm text-[#E5A93C]">TOTAL LATENCY 448 ms</div>
                  <div className="text-sm text-[#E5A93C]">EST. COST $0.0068</div>
                  <div className="text-sm text-[#E5A93C]">ZERO LOGGED</div>
                  <div className="text-sm text-[#E5A93C]">VERIFIED NODE</div>
                </div>
              </div>
            </div>

            <p className="text-sm text-[#98A0A8] opacity-50 mt-2">
              SAMPLE DATA · ILLUSTRATIVE FIGURES
            </p>
          </section>
        )}
      </main>

      <footer className="py-8 px-8 text-center text-sm text-[#E5A93C]">
        <p>SWIMORE AI © 2026 Swimore Labs Inc. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="/documentation" className="text-[#E5A93C] underline">
            Documentation
          </a>
          <a href="/privacy" className="text-[#E5A93C] underline">
            Privacy
          </a>
          <a href="/terms" className="text-[#E5A93C] underline">
            Terms of Service
          </a>
        </div>
        <div className="flex items-center justify-center space-x-2 mt-4">
          <span className="text-[#E5A93C]">●</span>
          <span className="text-[#E5A93C]">All systems operational</span>
        </div>
      </footer>
    </div>
  );
};

export default ModelDetails;