import React from 'react';
import { LucideIcon } from 'lucide-react';

const providers = [
  {
    name: 'OpenAI',
    endpoint: 'api.openai.com',
    channels: 2,
    models: 14,
    latency: 32,
    successRate: '99.98%',
    status: 'Operational',
  },
  {
    name: 'Anthropic',
    endpoint: 'api.anthropic.com',
    channels: 3,
    models: 22,
    latency: 31,
    successRate: '99.99%',
    status: 'Operational',
  },
  {
    name: 'DeepSeek Direct',
    endpoint: 'api.deepsik.com',
    channels: 1,
    models: 10,
    latency: 28,
    successRate: '99.91%',
    status: 'Operational',
  },
  {
    name: 'ZAI',
    endpoint: 'api.zai.com',
    channels: 2,
    models: 18,
    latency: 34,
    successRate: '99.87%',
    status: 'Degraded',
  },
  {
    name: 'GLM',
    endpoint: 'api.glm.com',
    channels: 1,
    models: 16,
    latency: 36,
    successRate: '99.95%',
    status: 'Operational',
  },
  {
    name: 'Mesh Partner Pool',
    endpoint: 'partner.nodes',
    channels: 41,
    models: 'partner nodes',
    latency: 41,
    successRate: '99.72%',
    status: 'Degraded',
  },
];

const AdminProviders = () => {
  return (
    <div className="p-6 lg:p-8 flex flex-col gap-6 max-w-[1400px] mx-auto w-full">
      <h1 className="text-2xl lg:text-3xl font-serif font-normal tracking-tight text-[#F5F5F2]">
        Providers & Channels
      </h1>
      <p className="text-[#F5F5F2] text-sm">
        Providers & Channels
      </p>

      <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6">
        <table className="w-full text-[#F5F5F2] text-xs">
          <thead className="bg-[#0E1215]">
            <tr>
              <th className="px-4 py-2 text-left">PROVIDER</th>
              <th className="px-4 py-2 text-left">CHANNELS</th>
              <th className="px-4 py-2 text-left">MODELS</th>
              <th className="px-4 py-2 text-left">AVG LATENCY</th>
              <th className="px-4 py-2 text-left">SUCCESS RATE</th>
              <th className="px-4 py-2 text-left">STATUS</th>
              <th className="px-4 py-2 text-left">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((p, i) => (
              <tr key={i} className="bg-[#0E1215]">
                <td className="px-4 py-2 flex items-center">
                  <div className="font-mono text-[#98A0A8]">{p.name}</div>
                  <div className="text-[#98A0A8] text-sm">{p.endpoint}</div>
                </td>
                <td className="px-4 py-2">{p.channels}</td>
                <td className="px-4 py-2">{p.models}</td>
                <td className="px-4 py-2 text-[#38BDF8]">{p.latency}ms</td>
                <td className="px-4 py-2 text-[#00E599]">{p.successRate}</td>
                <td className="px-4 py-2">
                  {p.status === 'Operational' ? (
                    <span className="bg-[#00E599]/10 border-[#00E599]/30 text-[#00E599] px-2 py-0.5 rounded">
                      Operational
                    </span>
                  ) : (
                    <span className="bg-[#E5A93C]/10 border-[#E5A93C]/30 text-[#E5A93C] px-2 py-0.5 rounded">
                      Degraded
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 flex items-center">
                  <button className="px-3 py-1.5 bg-[#0E1215] text-[#F5F5F2] rounded-md hover:bg-[#0A0C0E]">
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6">
        <h2 className="text-2xl font-serif tracking-tight">
          CHANNEL HEALTH (24H)
        </h2>
        <svg className="w-full h-32" viewBox="0 0 600 100" aria-label="Channel health chart">
          <line x1="0" y1="50" x2="600" y2="50" stroke="#444" strokeWidth="1" />
          <text x="10" y="65" className="text-[#F5F5F2] text-xs" text-anchor="start">00:00</text>
          <text x="125" y="65" className="text-[#F5F5F2] text-xs" text-anchor="middle">06:00</text>
          <text x="250" y="65" className="text-[#F5F5F2] text-xs" text-anchor="middle">12:00</text>
          <text x="375" y="65" className="text-[#F5F5F2] text-xs" text-anchor="middle">18:00</text>
          <text x="500" y="65" className="text-[#F5F5F2] text-xs" text-anchor="end">24:00</text>
          <path d="M0,50 L600,50" fill="none" stroke="#38BDF8" strokeWidth="2" />
          <circle cx="175" cy="48" r="3" fill="#E5A93C" />
          <text x="175" y="45" className="text-[#F5F5F2] text-xs" text-anchor="middle">07:00</text>
          <text x="175" y="40" className="text-[#F5F5F2] text-xs" text-anchor="middle">· 98.2%</text>
        </svg>
      </div>
    </div>
  );
};

export default AdminProviders;