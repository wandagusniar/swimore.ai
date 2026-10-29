import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Zap, ArrowUpRight } from 'lucide-react'
import { useSessionStore, PlanTier } from '@/store/session-store'

type Role = 'user' | 'partner' | 'admin'

const roleMeta: Record<Role, { label: string; plan: PlanTier; name: string; email: string; home: string; hint: string }> = {
  user: {
    label: 'User',
    plan: 'Swimore Plus',
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
    home: '/chat',
    hint: 'Chat playground, saved history, API keys',
  },
  partner: {
    label: 'Partner',
    plan: 'Swimore Plus',
    name: 'Nova Compute',
    email: 'ops@novacompute.ai',
    home: '/partner',
    hint: 'Channels, quota pools, settlements',
  },
  admin: {
    label: 'Admin',
    plan: 'VIP+',
    name: 'Alex Doe',
    email: 'admin@swimore.ai',
    home: '/admin',
    hint: 'Control center, users, routing, audit',
  },
}

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-3.27 3.36-7.27 7.18-7.27 3.12 0 4.88 1.9 4.88 1.9l2.1-2.22S14.06 2 12.18 2C6.42 2 2.03 6.8 2.03 12s4.39 10 10.15 10c9.15 0 9.9-8.7 9.17-10.9z" />
  </svg>
)

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M20.32 4.37a19.8 19.8 0 0 0-4.93-1.51 13.8 13.8 0 0 0-.64 1.28 18.3 18.3 0 0 0-5.5 0 13.8 13.8 0 0 0-.64-1.28c-1.71.29-3.37.8-4.93 1.51A20.3 20.3 0 0 0 .1 18.06a19.9 19.9 0 0 0 6.07 2.99c.49-.66.93-1.37 1.3-2.11a12.9 12.9 0 0 1-2.05-.98c.17-.12.34-.25.5-.38a14.2 14.2 0 0 0 12.3 0c.16.13.33.26.5.38-.65.38-1.34.71-2.05.98.37.74.81 1.45 1.3 2.11a19.9 19.9 0 0 0 6.07-2.99A20.3 20.3 0 0 0 20.32 4.37zM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42s.95-2.42 2.16-2.42 2.18 1.09 2.16 2.42c0 1.33-.95 2.42-2.16 2.42zm7.96 0c-1.18 0-2.16-1.09-2.16-2.42s.95-2.42 2.16-2.42 2.18 1.09 2.16 2.42c0 1.33-.95 2.42-2.16 2.42z" />
  </svg>
)

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { setUser } = useSessionStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<Role>('user')

  // ponytail: mock auth — no real credential check; role gates are cosmetic without backend JWT verification
  const signIn = (r: Role) => {
    const meta = roleMeta[r]
    setUser({
      id: `usr_${r}_demo`,
      name: meta.name,
      email: email.trim() || meta.email,
      plan: meta.plan,
      isPartner: r === 'partner',
      isAdmin: r === 'admin',
    })
    const next = params.get('next')
    navigate(next && next.startsWith('/') ? next : meta.home)
  }

  return (
    <div className="min-h-screen w-full bg-[#060808] text-[#F5F5F2] flex items-center justify-center px-6 font-sans ocean-bg">
      <div className="w-full max-w-[880px] grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden border border-[#22272B] bg-[#0A0C0E] shadow-2xl">
        {/* Left brand panel */}
        <div className="hidden md:flex flex-col justify-between p-8 border-r border-[#22272B] bg-[#080A0C]">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-[#38BDF8] flex items-center justify-center">
              <Zap className="w-4 h-4 fill-[#060808] text-[#060808]" />
            </div>
            <span className="font-mono text-xs tracking-widest font-semibold uppercase">SWIMORE AI</span>
          </Link>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#00E599] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E599]" /> GATEWAY ACCESS
            </span>
            <h1 className="text-3xl lg:text-4xl font-serif font-normal leading-[1.1] tracking-tight">
              One key.
              <br />
              <span className="italic">Every model.</span>
            </h1>
            <p className="text-sm text-[#98A0A8] leading-relaxed max-w-xs">
              Sign in to route 200+ models, manage partner channels, or run the control center.
            </p>
          </div>

          <span className="font-mono text-[10px] text-[#5A626A]">
            Zero-log by default · SOC2 routing mesh
          </span>
        </div>

        {/* Right form panel */}
        <div className="p-6 sm:p-8 flex flex-col gap-5">
          <div className="md:hidden flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-[#38BDF8] flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 fill-[#060808] text-[#060808]" />
            </div>
            <span className="font-mono text-xs tracking-widest font-semibold uppercase">SWIMORE AI</span>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">Sign in</h2>
            <p className="text-xs text-[#98A0A8]">Demo environment — any credentials work.</p>
          </div>

          {/* OAuth buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => signIn(role)}
              className="py-2.5 rounded-xl bg-[#F5F5F2] hover:bg-white text-[#060808] text-xs font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <GoogleIcon /> Google
            </button>
            <button
              onClick={() => signIn(role)}
              className="py-2.5 rounded-xl bg-[#5865F2] hover:bg-[#5865F2]/90 text-white text-xs font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <DiscordIcon /> Discord
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#22272B]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#5A626A]">or continue with email</span>
            <div className="flex-1 h-px bg-[#22272B]" />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              signIn(role)
            }}
            className="flex flex-col gap-3.5"
          >
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.ai"
                className="w-full rounded-lg bg-[#0E1215] border border-[#22272B] px-3 py-2.5 text-sm text-[#F5F5F2] placeholder-[#5A626A] focus:outline-none focus:border-[#38BDF8]/50"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">Password</span>
                <button type="button" className="text-[11px] text-[#38BDF8] hover:underline">
                  Forgot?
                </button>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg bg-[#0E1215] border border-[#22272B] px-3 py-2.5 text-sm text-[#F5F5F2] placeholder-[#5A626A] focus:outline-none focus:border-[#38BDF8]/50"
              />
            </div>

            {/* Role picker (demo) */}
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#98A0A8]">
                Sign in as (demo role)
              </span>
              <div className="grid grid-cols-3 gap-1 rounded-xl bg-[#0E1215] border border-[#22272B] p-1">
                {(Object.keys(roleMeta) as Role[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      role === r ? 'bg-[#00E599]/15 text-[#00E599] border border-[#00E599]/40' : 'text-[#98A0A8] hover:text-[#F5F5F2] border border-transparent'
                    }`}
                  >
                    {roleMeta[r].label}
                  </button>
                ))}
              </div>
              <span className="text-[11px] text-[#5A626A]">{roleMeta[role].hint} → redirects to {roleMeta[role].home}</span>
            </div>

            <button
              type="submit"
              className="mt-1 w-full py-2.5 rounded-full bg-[#F5F5F2] hover:bg-white text-[#060808] text-sm font-medium flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
            >
              Sign in <ArrowUpRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-xs text-[#98A0A8]">
            New to Swimore?{' '}
            <Link to="/pricing" className="text-[#38BDF8] hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
