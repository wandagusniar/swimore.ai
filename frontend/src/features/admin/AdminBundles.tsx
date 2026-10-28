import React from 'react';
import { LucideIcon } from 'lucide-react';

const bundleCards = [
  {
    tier: 'Starter Mesh',
    name: 'Starter Mesh',
    description: 'Basic mesh for entry-level projects',
    models: ['llama-3.3-70b', 'qwen-2.5-72b'],
    price: 49,
    status: 'Active',
    edit: true,
  },
  {
    tier: 'Pro Reasoning Pack',
    name: 'Pro Reasoning Pack',
    description: 'Enhanced reasoning capabilities',
    models: ['gpt-4o', 'deepseek-r1', 'glm-4-plus'],
    price: 199,
    status: 'Active',
    edit: true,
  },
  {
    tier: 'Enterprise Zero-Log',
    name: 'Enterprise Zero-Log',
    description: 'Enterprise‑grade bundle with zero‑log compliance',
    models: ['swimore/auto-fast', 'gemini-1.5-pro'],
    price: 499,
    status: 'Draft',
    edit: true,
  },
  {
    tier: 'Premium Insight',
    name: 'Premium Insight',
    description: 'Advanced analytics and monitoring',
    models: ['claude-3-5-sonnet', 'qwen-2.5-72b'],
    price: 299,
    status: 'Active',
    edit: true,
  },
  {
    tier: 'Custom Enterprise',
    name: 'Custom Enterprise',
    description: 'Tailored bundle for large deployments',
    models: ['gpt-4o', 'deepseek-r1', 'llama-3.3-70b', 'qwen-2.5-72b'],
    price: 799,
    status: 'Active',
    edit: true,
  },
];

const bundlePerformance = [
  { bundle: 'Starter Mesh', subscribers: 1240, requests: 5600, revenue: 61600, topModel: 'llama-3.3-70b' },
  { bundle: 'Pro Reasoning Pack', subscribers: 890, requests: 3200, revenue: 63800, topModel: 'gpt-4o' },
  { bundle: 'Enterprise Zero-Log', subscribers: 450, requests: 1800, revenue: 224750, topModel: 'swimore/auto-fast' },
  { bundle: 'Premium Insight', subscribers: 720, requests: 2500, revenue: 74850, topModel: 'claude-3-5-sonnet' },
  { bundle: 'Custom Enterprise', subscribers: 310, requests: 1200, revenue: 95940, topModel: 'gpt-4o' },
];

const AdminBundles: React.FC = () => {
  return (
    <div className="p-6 lg:p-8 flex flex-col gap-6 max-w-[1400px] mx-auto w-full">
      {/* Heading */}
      <h1 className="text-2xl lg:text-3xl font-serif font-normal tracking-tight">
        Bundle Management
      </h1>
      <p className="text-[10px] uppercase tracking-widest text-[#98A0A8]">
        Curated model bundles for plan tiers
      </p>

      {/* Create Bundle button */}
      <div className="flex justify-end mt-4">
        <button
          className="mt-4 inline-flex items-center px-6 py-2 bg-white text-[#0A0C0E] border border-[#22272B] rounded-full hover:bg-[#F5F5F2]"
        >
          + Create Bundle
        </button>
      </div>

      {/* Grid of bundle cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {bundleCards.map((b, i) => (
          <div key={i} className="bg-[#0A0C0E] border border-[#22272B] rounded-2xl p-6">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-mono text-[#98A0A8]">{b.tier}</span>
              <span className="text-[#F5F5F2] font-semibold">{b.name}</span>
            </div>
            <p className="text-[#5A626A] text-sm">{b.description}</p>

            {/* Included models pills */}
            <div className="flex flex-wrap space-x-2 mt-2">
              {b.models.map((m) => (
                <span key={m} className="inline-flex items-center px-2 py-1 bg-[#22272B] text-[#98A0A8] rounded-full text-xs">
                  {m}
                </span>
              ))}
            </div>

            {/* Price row */}
            <div className="mt-4 flex items-center space-x-2">
              <span className="text-3xl font-serif text-[#F5F5F2]">${b.price}</span>
              <span className="text-[#98A0A8] text-sm">{b.price} platform fee</span>
            </div>

            {/* Status badge */}
            <div className="mt-2">
              <span
                className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                  b.status === 'Active'
                    ? 'bg-[#00E599 text-[#0A0C0E]'
                    : 'bg-[#E5A93C text-[#0A0C0E]'}
                }`}
              >
                {b.status}
              </span>
            </div>

            {/* Footer actions */}
            <div className="mt-4 flex space-x-2">
              <button
                className="inline-flex items-center px-3 py-1 bg-[#0A0C0E] text-[#98A0A8] border border-[#22272B] rounded hover:bg-[#161B1E]"
              >
                Edit
              </button>
              <button
                className="inline-flex items-center px-3 py-1 bg-[#0A0C0E] text-[#98A0A8] border border-[#22272B] rounded hover:bg-[#161B1E]"
              >
                View stats
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bundle Performance table */}
      <div className="overflow-x-auto rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6">
        <h2 className="text-xl font-serif font-normal tracking-tight">
          BUNDLE PERFORMANCE (30D)
        </h2>
        <table className="w-full text-xs font-mono">
          <thead className="bg-[#121619] text-[#98A0A8]">
            <tr>
              <th className="text-left py-2">BUNDLE</th>
              <th className="text-left py-2">SUBSCRIBERS</th>
              <th className="text-left py-2">REQUESTS</th>
              <th className="text-left py-2">REVENUE</th>
              <th className="text-left py-2">TOP MODEL</th>
            </tr>
          </thead>
          <tbody className="bg-[#0E1215]">
            {bundlePerformance.map((p, i) => (
              <tr key={i} className="hover:bg-[#161B1E]">
                <td className="py-2">{p.bundle}</td>
                <td className="py-2">{p.subscribers}</td>
                <td className="py-2">{p.requests}</td>
                <td className="py-2 text-[#38BDF8]">{p.revenue}</td>
                <td className="py-2">{p.topModel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBundles;