import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar } from '@/components/navigation/Navbar'
import { ArrowUp, Play, Plus, ChevronDown, TrendingUp } from 'lucide-react'

export const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const [prompt, setPrompt] = useState('')
  const [selectedModel, setSelectedModel] = useState('swimore/auto-fast')
  const [saveChat, setSaveChat] = useState(true)
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false)
  const [demoModalOpen, setDemoModalOpen] = useState(false)
  const [faqOpenIndex, setFaqOpenIndex] = useState(0)
  const [apiTab, setApiTab] = useState<'structured' | 'streaming'>('streaming')

  const availableModels = [
    { id: 'swimore/auto-fast', name: 'swimore/auto-fast (Sub-second fallback)' },
    { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet (Anthropic)' },
    { id: 'llama-3-3-70b', name: 'Llama 3.3 70B (@novacompute)' },
    { id: 'deepseek-r1', name: 'DeepSeek R1 (@tokenforge)' },
    { id: 'gpt-4o', name: 'GPT-4o (Direct Provider)' },
  ]

  const faqs = [
    {
      q: 'What is Swimore AI?',
      a: 'Swimore is a multi-provider AI chat, API gateway and API marketplace in one place. Users reach 200+ models through one OpenAI-compatible endpoint with routing and fallback, and partners bring AI services or sell API access to them.',
    },
    {
      q: 'How do I migrate an existing app?',
      a: 'To migrate, you simply update your API endpoint to the unified Swimore URL and the routing layer handles the rest; no code changes required.',
    },
    {
      q: 'How does automatic fallback work?',
      a: 'Automatic fallback monitors each provider\'s health and instantly routes to the next available model if a timeout or error occurs.',
    },
    {
      q: 'Do you add a markup to token prices?',
      a: 'No, token prices are fixed per plan; we do not apply any markup.',
    },
    {
      q: 'Are my prompts logged?',
      a: 'Prompts are not logged by default; you can enable chat history per session if desired.',
    },
    {
      q: 'Can I choose whether my chats are saved?',
      a: 'Chat history is saved per user by default; you can disable it in settings.',
    },
    {
      q: 'How do I join as a partner?',
      a: 'Partners join via the marketplace, where they can list their APIs or provide direct integration.',
    },
    {
      q: 'Which models can I use?',
      a: 'All models accessible through the OpenAI-compatible API, including 200+ models from various providers.',
    },
  ]

  const handleSendPrompt = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!prompt.trim()) return
    navigate('/chat', {
      state: {
        initialPrompt: prompt,
        model: selectedModel,
        privateMode: !saveChat,
      },
    })
  }

  const promptSuggestions = [
    'Compare latency across models',
    'Migrate from OpenAI in one line',
    'Estimate my savings',
  ]

  return (
    <div className="min-h-screen w-full bg-[#060808] text-[#F5F5F2] flex flex-col font-sans ocean-bg selection:bg-[#00E599]/20 selection:text-[#00E599]">
      {/* Exact Floating Navbar */}
      <Navbar />

      <main className="w-full flex-1 flex flex-col items-center px-6">
        {/* UPPER SECTION: Playground Hero */}
        <section className="w-full max-w-[820px] flex flex-col items-center pt-8 pb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00E599]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#98A0A8]">
              PLAYGROUND · ASK ANYTHING
            </span>
          </div>

          {/* Interactive Prompt Card */}
          <form
            onSubmit={handleSendPrompt}
            className="w-full rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-5 flex flex-col justify-between shadow-2xl relative transition-all focus-within:border-[#333A40]"
          >
            {/* Card Top Row */}
            <div className="flex items-center justify-between pb-3">
              <button
                type="button"
                onClick={() => setPrompt('')}
                className="w-7 h-7 rounded-full bg-[#121619] border border-[#22272B] hover:border-[#333A40] flex items-center justify-center text-[#98A0A8] hover:text-[#F5F5F2] transition-colors"
                title="Clear input"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-3 text-xs">
                <span className="text-[#98A0A8]">Save chat history</span>
                <button
                  type="button"
                  onClick={() => setSaveChat(!saveChat)}
                  className={`w-9 h-5 rounded-full transition-colors p-0.5 flex items-center ${
                    saveChat ? 'bg-[#00E599]' : 'bg-[#22272B]'
                  }`}
                  aria-label="Toggle chat history"
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      saveChat ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
                <Link
                  to="/chat"
                  className="text-[#98A0A8] hover:text-[#F5F5F2] transition-colors ml-1"
                >
                  Sign in to chat
                </Link>
              </div>
            </div>

            {/* Input Textarea */}
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendPrompt()
                }
              }}
              placeholder="Try Swimore — ask anything..."
              rows={3}
              className="w-full bg-transparent border-0 resize-none text-[#F5F5F2] placeholder-[#5A626A] text-sm leading-relaxed focus:outline-none py-2"
            />

            {/* Card Bottom Row */}
            <div className="flex items-center justify-between pt-2 border-t border-[#161B1E]">
              {/* Model Selector Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
                  className="py-1.5 px-3 rounded-full bg-[#121619] border border-[#22272B] hover:border-[#333A40] text-xs font-mono text-[#F5F5F2] flex items-center gap-1.5 transition-all"
                >
                  <span>{selectedModel}</span>
                  <ChevronDown className="w-3 h-3 text-[#98A0A8]" />
                </button>

                {modelDropdownOpen && (
                  <div className="absolute left-0 bottom-full mb-2 w-64 rounded-xl bg-[#0E1215] border border-[#22272B] p-1.5 shadow-2xl z-30 flex flex-col gap-1">
                    {availableModels.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          setSelectedModel(m.id)
                          setModelDropdownOpen(false)
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                          selectedModel === m.id
                            ? 'bg-[#1E2328] text-[#00E599] font-medium'
                            : 'text-[#98A0A8] hover:text-[#F5F5F2] hover:bg-[#161B1E]'
                        }`}
                      >
                        <span className="truncate">{m.name}</span>
                        {selectedModel === m.id && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00E599] flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!prompt.trim()}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                  prompt.trim()
                    ? 'bg-[#F5F5F2] text-[#060808] hover:scale-105 active:scale-95 shadow-md'
                    : 'bg-[#1A1F24] text-[#5A626A] border border-[#22272B]'
                }`}
                aria-label="Send prompt to chat"
              >
                <ArrowUp className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </form>

          {/* Suggestion Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            {promptSuggestions.map((text) => (
              <button
                key={text}
                type="button"
                onClick={() => {
                  setPrompt(text)
                }}
                className="py-1.5 px-4 rounded-full bg-[#0A0C0E] border border-[#22272B] hover:border-[#333A40] text-xs text-[#98A0A8] hover:text-[#F5F5F2] transition-all hover:bg-[#121619]"
              >
                {text}
              </button>
            ))}
          </div>
        </section>

        {/* LOWER SECTION: Headline + Live Routing Diagram */}
        <section className="w-full max-w-[1240px] pt-12 pb-24 border-t border-[#22272B]/40">
          {/* Top Right Mini Tags */}
          <div className="flex justify-end mb-6 font-mono text-[11px] text-[#98A0A8] tracking-widest leading-loose text-right">
            <div>
              LOW LATENCY<br />
              SMART FALLBACKS<br />
              ZERO-LOG PRIVACY
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Heading & Subtitle */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00E599]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#98A0A8]">
                  INTRODUCING AI · API GATEWAY · API MARKETPLACE
                </span>
              </div>

              <h1 className="text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight">
                Intelligence,<br />
                <span className="font-serif italic font-normal text-[#F5F5F2]">
                  Routed Seamlessly.
                </span>
              </h1>

              <p className="text-base text-[#98A0A8] max-w-lg leading-relaxed">
                Access 200+ LLMs through a single unified API. Intelligent fallback, cost-optimized routing, zero-downtime execution.
              </p>

              <div className="flex items-center gap-4 pt-3">
                <Link
                  to="/models"
                  className="px-6 py-3 rounded-full bg-[#F5F5F2] hover:bg-white text-[#060808] font-medium text-xs tracking-wide flex items-center gap-2 transition-all shadow-md active:scale-95"
                >
                  Explore Models →
                </Link>
                <button
                  type="button"
                  onClick={() => setDemoModalOpen(true)}
                  className="px-6 py-3 rounded-full border border-[#22272B] hover:border-[#333A40] text-[#F5F5F2] font-medium text-xs tracking-wide flex items-center gap-2 transition-all hover:bg-[#0A0C0E] active:scale-95"
                >
                  <Play className="w-3 h-3 fill-[#F5F5F2]" /> Watch Demo
                </button>
              </div>
            </div>

            {/* Right Column: API Example Panel */}
            <div className="lg:col-span-6 rounded-2xl border border-[#22272B] bg-[#0A0C0E] p-5 flex flex-col gap-4 shadow-xl">
              {/* Structured / Streaming Tabs */}
              <div className="flex items-center gap-1 p-1 rounded-full bg-[#121619] border border-[#22272B] w-fit">
                {(['structured', 'streaming'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setApiTab(tab)}
                    className={`px-4 py-1.5 rounded-full text-xs font-mono capitalize transition-colors ${
                      apiTab === tab
                        ? 'bg-[#1E2328] text-[#00E599]'
                        : 'text-[#98A0A8] hover:text-[#F5F5F2]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* API Example Card */}
              <div className="rounded-xl border border-[#22272B] bg-[#0E1215] overflow-hidden">
                <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-[#22272B]">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full border border-[#22272B] text-[10px] font-mono text-[#5A626A]">
                        GET
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#00E599]/15 border border-[#00E599]/40 text-[10px] font-mono text-[#00E599]">
                        POST
                      </span>
                    </div>
                    <span className="font-mono text-xs text-[#F5F5F2]">/chat/completions</span>
                  </div>
                  <span className="py-1 px-3 rounded-full bg-[#121619] border border-[#22272B] text-[11px] font-mono text-[#F5F5F2] flex items-center gap-1.5 whitespace-nowrap">
                    swimore/auto-fast
                    <ChevronDown className="w-3 h-3 text-[#98A0A8]" />
                  </span>
                </div>
                <pre className="px-4 py-4 font-mono text-xs leading-relaxed text-[#98A0A8] overflow-x-auto">
{`{
  "model": "swimore/auto-fast",
  "messages": [{ "role": "user", "content": "Hello" }]
}`}
                </pre>
              </div>

              {/* Mini Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  to="/chat"
                  className="rounded-xl border border-[#22272B] bg-[#0E1215] p-4 flex flex-col gap-1.5 hover:border-[#333A40] transition-colors"
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#00E599]">EXPLORE AI API</span>
                  <span className="text-sm text-[#F5F5F2]">One key, 200+ models through a single gateway.</span>
                </Link>
                <Link
                  to="/marketplace"
                  className="rounded-xl border border-[#22272B] bg-[#0E1215] p-4 flex flex-col gap-1.5 hover:border-[#333A40] transition-colors"
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#E5A93C]">EXPLORE AI PROVIDER</span>
                  <span className="text-sm text-[#F5F5F2]">Sell API access and unique pricing on the marketplace.</span>
                </Link>
              </div>

              {/* Create API Key */}
              <Link
                to="/dashboard/keys"
                className="self-start px-5 py-2 rounded-full bg-[#00E599] hover:bg-[#00E599]/90 text-[#060808] text-xs font-mono uppercase tracking-widest transition-colors"
              >
                Create API Key
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Band */}
        <section className="w-full max-w-[1240px] py-12 mb-12">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex flex-col gap-2 rounded-2xl border border-[#22272B] bg-[#0A0C0E] p-6">
              <div className="text-5xl font-semibold text-[#F5F5F2]">12ms</div>
              <div className="text-sm text-[#98A0A8] font-mono uppercase tracking-widest">Avg latency</div>
              <div className="text-[9px] text-[#98A0A8] uppercase tracking-widest">ILLUSTRATIVE</div>
            </div>
            <div className="flex flex-col gap-2 rounded-2xl border border-[#22272B] bg-[#0A0C0E] p-6">
              <div className="text-5xl font-semibold text-[#F5F5F2]">99.99%</div>
              <div className="text-sm text-[#98A0A8] font-mono uppercase tracking-widest">Gateway uptime</div>
              <div className="text-[9px] text-[#98A0A8] uppercase tracking-widest">SLA BACKED</div>
            </div>
            <div className="flex flex-col gap-2 rounded-2xl border border-[#22272B] bg-[#0A0C0E] p-6">
              <div className="text-5xl font-semibold text-[#F5F5F2]">250+</div>
              <div className="text-sm text-[#98A0A8] font-mono uppercase tracking-widest">Connected models</div>
              <div className="text-[9px] text-[#98A0A8] uppercase tracking-widest">OPENAI / OSS / BEDROCK</div>
            </div>
            <div className="flex flex-col gap-2 rounded-2xl border border-[#22272B] bg-[#0A0C0E] p-6">
              <div className="text-5xl font-semibold text-[#00E599]">{'\u003C'}50ms</div>
              <div className="text-sm text-[#98A0A8] font-mono uppercase tracking-widest">SLA Auto-failover</div>
              <div className="text-[9px] text-[#98A0A8] uppercase tracking-widest">ZERO-DROP BUFFER</div>
            </div>
          </div>
        </section>

        {/* 01 · TWO WAYS TO JOIN */}
        <section className="w-full max-w-[1240px] py-12 mb-12">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#00E599]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#00E599]">
              01 · TWO WAYS TO JOIN
            </span>
          </div>
          <h2 className="text-3xl font-serif leading-tight">Users consume APIs.</h2>
          <h2 className="text-3xl font-serif leading-tight">Partners supply them.</h2>
          <p className="text-3xl font-serif italic leading-tight text-[#98A0A8]">
            Swimore connects them.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            <div className="rounded-2xl border border-[#22272B] bg-[#0A0C0E] p-6">
              <div className="text-xs font-mono text-[#00E599] uppercase tracking-widest">
                FOR USERS
              </div>
              <h3 className="text-2xl font-serif mt-2">Join as a User</h3>
              <p className="text-base text-[#98A0A8] mt-3">
                Use AI APIs. Access multiple providers and models through one unified gateway.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <div className="rounded-full border border-[#22272B] px-3 py-1.5 text-xs text-[#98A0A8]">
                  API keys
                </div>
                <div className="rounded-full border border-[#22272B] px-3 py-1.5 text-xs text-[#98A0A8]">
                  Model discovery
                </div>
                <div className="rounded-full border border-[#22272B] px-3 py-1.5 text-xs text-[#98A0A8]">
                  Usage tracking
                </div>
                <div className="rounded-full border border-[#22272B] px-3 py-1.5 text-xs text-[#98A0A8]">
                  Routing and fallback
                </div>
              </div>
              <Link
                to="/chat"
                className="mt-4 inline-block bg-[#F5F5F2] text-[#060808] rounded-full px-4 py-2 hover:bg-white"
              >
                Get Started →
              </Link>
            </div>
            <div className="rounded-2xl border border-[#22272B] bg-[#0A0C0E] p-6">
              <div className="text-xs font-mono text-[#E5A93C] uppercase tracking-widest">
                FOR PARTNERS
              </div>
              <h3 className="text-2xl font-serif mt-2">Join as a Partner</h3>
              <p className="text-base text-[#98A0A8] mt-3">
                Bring AI services to Swimore. Connect API providers or sell API access through the marketplace.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <div className="rounded-full border border-[#22272B] px-3 py-1.5 text-xs text-[#98A0A8]">
                  Provider integration
                </div>
                <div className="rounded-full border border-[#22272B] px-3 py-1.5 text-xs text-[#98A0A8]">
                  API listings
                </div>
                <div className="rounded-full border border-[#22272B] px-3 py-1.5 text-xs text-[#98A0A8]">
                  Sales
                </div>
                <div className="rounded-full border border-[#22272B] px-3 py-1.5 text-xs text-[#98A0A8]">
                  Usage analytics
                </div>
              </div>
              <Link
                to="/marketplace"
                className="mt-4 inline-block border border-[#F5F5F2] text-[#F5F5F2] rounded-full px-4 py-2 hover:bg-[#0A0C0E]"
              >
                Become a Partner →
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Row */}
        <section className="w-full max-w-[1240px] py-12 mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex flex-col items-start gap-4 rounded-2xl border border-[#22272B] bg-[#0A0C0E] p-6">
              <div className="text-xs font-mono text-[#98A0A8] uppercase tracking-widest">
                FEATURED PIPELINE · 01/05
              </div>
              <h3 className="text-2xl font-serif">DeepSeek V3 + Llama 3.3 Hybrid</h3>
              <p className="text-base text-[#98A0A8]">
                Dynamic fallback with an illustrative 45% cost reduction.
              </p>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <div className="rounded-full border border-[#22272B] px-2 py-1 text-xs text-[#98A0A8]">
                    01
                  </div>
                  <div className="rounded-full border border-[#22272B] px-2 py-1 text-xs text-[#98A0A8]">
                    02
                  </div>
                  <div className="rounded-full border border-[#22272B] px-2 py-1 text-xs text-[#98A0A8]">
                    03
                  </div>
                </div>
                <div className="text-xs font-mono">← →</div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-4 rounded-2xl border border-[#22272B] bg-[#0A0C0E] p-6">
              <div className="text-xs font-mono text-[#98A0A8] uppercase tracking-widest">
                ROUTE HEALTH · 24H SAMPLE
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between border-b border-[#22272B]/50 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-mono text-[#F5F5F2]">18ms</div>
                    <div className="text-[#98A0A8]">P50 latency</div>
                  </div>
                  <span className="text-[#98A0A8]"><TrendingUp className="w-4 h-4" /></span>
                </div>
                <div className="flex items-center justify-between border-b border-[#22272B]/50 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-mono text-[#F5F5F2]">0.2%</div>
                    <div className="text-[#98A0A8]">Fallback rate</div>
                  </div>
                  <span className="text-[#98A0A8]"><TrendingUp className="w-4 h-4" /></span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-mono text-[#F5F5F2]">96.4%</div>
                    <div className="text-[#98A0A8]">Policy match</div>
                  </div>
                  <span className="text-[#98A0A8]"><TrendingUp className="w-4 h-4" /></span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-4 rounded-2xl border border-[#22272B] bg-[#0A0C0E] p-6 relative">
              <div className="text-xs font-mono text-[#98A0A8] uppercase tracking-widest">
                DEPLOY · 02 MIN
              </div>
              <h3 className="text-2xl font-serif">Bring Your Models To Life</h3>
              <p className="text-base text-[#98A0A8]">
                Start building with unified API keys in under 2 minutes.
              </p>
              <Link
                to="/docs"
                className="absolute top-2 right-2 text-[#00E599]"
              >
                <span className="w-2 h-2 rounded-full bg-[#00E599]">
                  ↗
                </span>
              </Link>
              <Link to="/docs" className="text-[#00E599]">
                Read quickstart →
              </Link>
            </div>
          </div>
        </section>

        {/* 02 · FEATURES */}
        <section className="w-full max-w-[1240px] py-12 mb-12">
          <div className="flex justify-between items-start mb-6">
            <div className="flex flex-col gap-1">
              <div className="font-mono text-xs uppercase tracking-widest text-[#00E599]">
                02 · FEATURES
              </div>
              <h2 className="text-3xl font-serif leading-tight">
                Everything the gateway
              </h2>
              <p className="text-2xl font-serif italic leading-tight text-[#98A0A8]">
                handles for you.
              </p>
            </div>
            <p className="text-base text-[#98A0A8] max-w-lg leading-relaxed">
              One endpoint, one key, and a routing layer that keeps your app fast, cheap and online while the model landscape changes underneath.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-start gap-2 rounded-xl border border-[#22272B] bg-[#0A0C0E] p-5">
              <div className="text-xs font-mono text-[#00E599] uppercase tracking-widest">
                01
              </div>
              <div className="font-bold text-[#F5F5F2]">One unified API</div>
              <div className="text-sm text-[#98A0A8]">
                Keep the OpenAI request shape and reach 200+ models with a single key. Change one base URL and you are routed.
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 rounded-xl border border-[#22272B] bg-[#0A0C0E] p-5">
              <div className="text-xs font-mono text-[#00E599] uppercase tracking-widest">
                02
              </div>
              <div className="font-bold text-[#F5F5F2]">Latency-first routing</div>
              <div className="text-sm text-[#98A0A8]">
                A policy-driven router sends each request to the fastest healthy model, with a live trace of every decision.
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 rounded-xl border border-[#22272B] bg-[#0A0C0E] p-5">
              <div className="text-xs font-mono text-[#00E599] uppercase tracking-widest">
                03
              </div>
              <div className="font-bold text-[#F5F5F2]">Automatic fallback</div>
              <div className="text-sm text-[#98A0A8]">
                Timeouts and provider errors hop to the next model in your chain, so a bad minute upstream is not your outage.
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 rounded-xl border border-[#22272B] bg-[#0A0C0E] p-5">
              <div className="text-xs font-mono text-[#00E599] uppercase tracking-widest">
                04
              </div>
              <div className="font-bold text-[#F5F5F2]">Cost-optimized blends</div>
              <div className="text-sm text-[#98A0A8]">
                Mix models by task and price. Compare a fixed provider against a dynamic route and see the estimated savings.
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 rounded-xl border border-[#22272B] bg-[#0A0C0E] p-5">
              <div className="text-xs font-mono text-[#00E599] uppercase tracking-widest">
                05
              </div>
              <div className="font-bold text-[#F5F5F2]">Private by choice</div>
              <div className="text-sm text-[#98A0A8]">
                Chat with history saved or switched off, your call. Enterprise Gateway adds zero-log compliance and SOC 2 Type II.
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 rounded-xl border border-[#22272B] bg-[#0A0C0E] p-5">
              <div className="text-xs font-mono text-[#00E599] uppercase tracking-widest">
                06
              </div>
              <div className="font-bold text-[#F5F5F2]">Live benchmarks</div>
              <div className="text-sm text-[#98A0A8]">
                Track TTFT, throughput, quality and uptime by region and timeframe, then pin the model that fits your budget.
              </div>
            </div>
          </div>
        </section>

        {/* 03 · FAQ */}
        <section className="w-full max-w-[1240px] py-12 mb-12">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#00E599]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#00E599]">
                  03 · FAQ
                </span>
              </div>
              <h2 className="text-3xl font-serif leading-tight">Questions,</h2>
              <p className="text-3xl font-serif italic leading-tight text-[#98A0A8]">
                answered.
              </p>
              <p className="text-base text-[#98A0A8] max-w-lg leading-relaxed mt-4">
                Can't find what you need? The docs cover every endpoint, or talk to us about a dedicated gateway.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <Link
                  to="/docs"
                  className="text-xs text-[#98A0A8] hover:text-[#F5F5F2]"
                >
                  Read the docs →
                </Link>
                <a
                  href="mailto:contact@swimore.ai"
                  className="text-xs text-[#98A0A8] hover:text-[#F5F5F2]"
                >
                  Contact sales →
                </a>
              </div>
            </div>
            <div className="flex-1 min-w-0 space-y-2">
              {faqs.map((item, i) => {
                const isOpen = faqOpenIndex === i
                return (
                  <div key={i} className="space-y-1">
                    <div
                      onClick={() => setFaqOpenIndex(isOpen ? -1 : i)}
                      className="flex items-center justify-between border-t border-[#22272B] pt-3 pb-2 cursor-pointer hover:bg-[#0A0C0E]/50"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full border border-[#22272B] text-[#98A0A8] flex items-center justify-center text-xs">
                          {isOpen ? '−' : '+'}
                        </div>
                        <div className="font-medium text-[#F5F5F2]">{item.q}</div>
                      </div>
                    </div>
                    {isOpen && (
                      <div className="pt-2 text-sm text-[#98A0A8]">{item.a}</div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Panel */}
        <section className="w-full max-w-[1240px] py-12 mb-12">
          <div className="rounded-2xl border border-[#22272B] bg-[#0A0C0E] p-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col gap-2">
              <div className="font-mono text-xs uppercase tracking-widest text-[#00E599]">
                GET STARTED · 02 MIN
              </div>
              <h2 className="text-3xl font-serif leading-tight">
                Route your first request
              </h2>
              <p className="text-xl font-serif italic leading-tight text-[#98A0A8]">
                in under two minutes.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/chat"
                className="bg-[#F5F5F2] text-[#060808] rounded-full px-6 py-3 hover:bg-white"
              >
                Get Started →
              </Link>
              <Link
                to="/marketplace"
                className="border border-[#F5F5F2] text-[#F5F5F2] rounded-full px-6 py-3 hover:bg-[#0A0C0E]"
              >
                Become a Partner →
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full border-t border-[#22272B]/40 py-6">
          <div className="max-w-[1240px] w-full flex flex-col md:flex-row md:items-center justify-between gap-3 text-[11px] font-mono">
            <span className="text-[#5A626A]">SWIMORE AI © 2026 Swimore Labs Inc. All rights reserved.</span>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-4">
                <Link to="/docs" className="text-[#98A0A8] hover:text-[#F5F5F2]">
                  Documentation
                </Link>
                <a href="#" className="text-[#98A0A8] hover:text-[#F5F5F2]">Privacy</a>
                <a href="#" className="text-[#98A0A8] hover:text-[#F5F5F2]">Terms of Service</a>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E599]" />
                <span className="text-[#00E599] font-medium">All systems operational</span>
              </div>
            </div>
          </div>
        </footer>

      </main>

      {/* Demo Modal */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-lg w-full rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6 flex flex-col gap-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#22272B]">
              <span className="font-mono text-sm font-semibold text-[#F5F5F2]">
                SWIMORE AI · ARCHITECTURE OVERVIEW
              </span>
              <button
                onClick={() => setDemoModalOpen(false)}
                className="text-[#98A0A8] hover:text-[#F5F5F2] text-sm"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-[#98A0A8] leading-relaxed">
              Swimore routes incoming AI inference requests dynamically across direct upstream LLMs (Path A) and verified partner endpoints (Path B) with automatic failover, SeaBank settlement, and strict zero-log metadata audit logging.
            </p>
            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => setDemoModalOpen(false)}
                className="px-4 py-2 rounded-full border border-[#22272B] text-xs text-[#98A0A8] hover:text-[#F5F5F2]"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setDemoModalOpen(false)
                  navigate('/chat')
                }}
                className="px-4 py-2 rounded-full bg-[#F5F5F2] text-[#060808] text-xs font-medium hover:bg-white"
              >
                Launch Chat Workspace →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
