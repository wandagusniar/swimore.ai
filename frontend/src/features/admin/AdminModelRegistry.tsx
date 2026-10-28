import React from 'react';
import { LucideIcon } from 'lucide-react';

const mockModels = [
  {
    name: 'claude-3-5-sonnet',
    provider: 'anthropic',
    tier: 'MESH',
    context: 'us-east-1',
    priceIn: 0.12,
    priceOut: 0.08,
    latency: 45,
    status: 'Active',
    actions: ['Edit', 'Disable'],
  },
  {
    name: 'gpt-4o',
    provider: 'openai',
    tier: 'SWIMORE PLUS+',
    context: 'global',
    priceIn: 0.15,
    priceOut: 0.10,
    latency: 38,
    status: 'Active',
    actions: ['Edit', 'Disable'],
  },
  {
    name: 'deepseek-r1',
    provider: 'deepseek',
    tier: 'CYAN',
    context: 'asia',
    priceIn: 0.10,
    priceOut: 0.07,
    latency: 30,
    status: 'Active',
    actions: ['Edit', 'Disable'],
  },
  {
    name: 'llama-3.3-70b',
    provider: 'novacompute',
    tier: 'GREEN',
    context: 'mesh',
    priceIn: 0.18,
    priceOut: 0.12,
    latency: 55,
    status: 'Active',
    actions: ['Edit', 'Disable'],
  },
  {
    name: 'qwen-2.5-72b',
    provider: 'tokenforge',
    tier: 'GREEN',
    context: 'mesh',
    priceIn: 0.16,
    priceOut: 0.11,
    latency: 50,
    status: 'Active',
    actions: ['Edit', 'Disable'],
  },
  {
    name: 'glm-4-plus',
    provider: 'google',
    tier: 'CYAN',
    context: 'global',
    priceIn: 0.13,
    priceOut: 0.09,
    latency: 42,
    status: 'Active',
    actions: ['Edit', 'Disable'],
  },
  {
    name: 'gemini-1.5-pro',
    provider: 'google',
    tier: 'AMBER',
    context: 'us-west',
    priceIn: 0.14,
    priceOut: 0.09,
    latency: 48,
    status: 'Deprecated',
    actions: ['Edit', 'Disable'],
  },
  {
    name: 'swimore/auto-fast',
    provider: 'swimore',
    tier: 'CYAN',
    context: 'alias',
    priceIn: 0.09,
    priceOut: 0.06,
    latency: 35,
    status: 'Active',
    actions: ['Edit', 'Disable'],
  },
];

const AdminModelRegistry: React.FC = () => {
  return (
    <div className="p-6 lg:p-8 flex flex-col gap-6 max-w-[1400px] mx-auto w-full">
      <h1 className="text-2xl lg:text-3xl font-serif font-normal tracking-tight">
        Model Registry
      </h1>
      <p className="text-[10px] uppercase tracking-widest text-[#98A0A8]">
        214 models across 6 provider channels
      </p>

      {/* Toolbar */}
      <div className="flex flex-col gap-4">
        {/* Search pill */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search models"
            className="flex-1 border rounded p-2 bg-[#0A0C0E] text-[#F5F5F2]"
          />
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2">
          <button
            className="inline-flex items-center px-3 py-1 bg-[#0A0C0E] text-[#98A0A8] border border-[#22272B] rounded-full hover:bg-[#161B1E]"
          >
            All
          </button>
          <button
            className="inline-flex items-center px-3 py-1 bg-[#0A0C0E] text-[#98A0A8] border border-[#22272B] rounded-full hover:bg-[#161B1E]"
          >
            Foundation
          </button>
          <button
            className="inline-flex items-center px-3 py-1 bg-[#0A0C0E] text-[#98A0A8] border border-[#22272B] rounded-full hover:bg-[#161B1E]"
          >
            Partner Mesh
          </button>
          <button
            className="inline-flex items-center px-3 py-1 bg-[#0A0C0E] text-[#98A0A8] border border-[#22272B] rounded-full hover:bg-[#161B1E]"
          >
            Deprecated
          </button>
        </div>

        {/* Register Model button */}
        <button
          className="mt-4 inline-flex items-center px-6 py-2 bg-white text-[#0A0C0E] border border-[#22272B] rounded-full hover:bg-[#F5F5F2]"
        >
          + Register Model
        </button>
      </div>

      {/* Registry table card */}
      <div className="overflow-x-auto rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6">
        <table className="w-full text-xs font-mono">
          <thead className="bg-[#121619] text-[#98A0A8]">
            <tr>
              <th className="text-left py-2">MODEL</th>
              <th className="text-left py-2">TIER</th>
              <th className="text-left py-2">CONTEXT</th>
              <th className="text-left py-2">PRICE IN/OUT (per 1M)</th>
              <th className="text-left py-2">LATENCY</th>
              <th className="text-left py-2">STATUS</th>
              <th className="text-left py-2">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="bg-[#0E1215]">
            {mockModels.map((m) => (
              <tr key={m.name} className="hover:bg-[#161B1E]">
                <td className="py-2">
                  {m.name}
                  <span className="text-[#5A626A]">({m.provider})</span>
                </td>
                <td className="py-2">
                  <span
                    className={`px-1 rounded text-xs font-medium ${
                      m.tier === 'SWIMORE PLUS+'
                        ? 'bg-[#E5A93C]/15 text-[#E5A93C]'
                        : m.tier === 'MESH'
                          ? 'bg-[#00E599]/15 text-[#00E599]'
                          : m.tier === 'CYAN'
                            ? 'bg-[#38BDF8]/15 text-[#38BDF8]'
                            : 'bg-[#5A626A]/15 text-[#5A626A]'
                    }`}
                  >
                    {m.tier}
                  </span>
                </td>
                <td className="py-2 text-[#5A626A]">{m.context}</td>
                <td className="py-2 text-[#F5F5F2]">
                  In: ${m.priceIn} • Out: ${m.priceOut}
                </td>
                <td className="py-2 text-[#38BDF8]">{m.latency}ms</td>
                <td className="py-2">
                  <span className={m.status === 'Active' ? 'text-[#00E599]' : 'text-[#E5A93C]'}>
                    {m.status === 'Active' ? '●' : '▲'}
                  </span>
                  <span className="text-[#5A626A] ml-1">{m.status}</span>
                </td>
                <td className="py-2 text-[#F5F5F2]">
                  {m.actions.map((a) => (
                    <span key={a} className="mr-2 text-[#98A0A8]">
                      {a}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer: count + pagination pills */}
      <div className="flex justify-between items-center">
        <p className="text-[#5A626A]">
          Showing 8 of 214 models
        </p>
        <div className="flex gap-2">
          <button
            className="inline-flex items-center px-3 py-1 bg-[#0A0C0E] text-[#98A0A8] border border-[#22272B] rounded-full hover:bg-[#161B1E]"
          >
            1
          </button>
          <button
            className="inline-flex items-center px-3 py-1 bg-[#0A0C0E] text-[#98A0A8] border border-[#22272B] rounded-full hover:bg-[#161B1E]"
          >
            2
          </button>
          <button
            className="inline-flex items-center px-3 py-1 bg-[#0A0C0E] text-[#98A0A8] border border-[#22272B] rounded-full hover:bg-[#161B1E]"
          >
            3
          </button>
          <button
            className="inline-flex items-center px-3 py-1 bg-[#0A0C0E] text-[#98A0A8] border border-[#22272B] rounded-full hover:bg-[#161B1E]"
          >
            4
          </button>
          <button
            className="inline-flex items-center px-3 py-1 bg-[#0A0C0E] text-[#98A0A8] border border-[#22272B] rounded-full hover:bg-[#161B1E]"
          >
            5
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminModelRegistry;