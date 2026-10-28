import React from 'react';
import { LucideIcon } from 'lucide-react';

const poolCards = [
  {
    label: 'Free Pool (Basic)',
    users: 8412,
    requests: 412000,
    total: 600000,
    progress: 68.67,
  },
  {
    label: 'Swimore Plus Pool',
    users: 2204,
    requests: 1100000,
    total: 2000000,
    progress: 55,
  },
  {
    label: 'VIP / Pro Pool',
    users: 312,
    requests: 220000,
    total: 400000,
    progress: 55,
  },
];

const quotaOverrides = [
  { user: 'Alice', plan: 'Free', override: '+50 req/day', expires: 'Never', actions: ['Revoke'] },
  { user: 'Bob', plan: 'Plus', override: '+200 req/day', expires: '2026-12-31', actions: ['Revoke'] },
  { user: 'Carol', plan: 'Pro', override: '+1000 req/day', expires: '2025-06-30', actions: ['Revoke'] },
];

const consumptionChartSvg = `
<svg viewBox="0 0 600 140" className="w-full h-32">
  <path d="M0 140 L50 120 L100 130 L150 110 L200 130 L250 110 L300 130 L350 110 L400 130 L450 110 L500 130 L550 110 L600 140" stroke="#38BDF8" strokeWidth="2" fill="none"/>
</svg>
`;

const AdminPools: React.FC = () => {
  return (
    <div className="p-6 lg:p-8 flex flex-col gap-6 max-w-[1400px] mx-auto w-full">
      {/* Heading */}
      <h1 className="text-2xl lg:text-3xl font-serif font-normal tracking-tight">
        Pool & Quotas
      </h1>
      <p className="text-[10px] uppercase tracking-widest text-[#98A0A8]">
        Request pools, resets at 00:00 WIB
      </p>

      {/* Grid of pool cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {poolCards.map((p, i) => (
          <div key={i} className="bg-[#0A0C0E] border border-[#22272B] rounded-2xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-mono text-[#F5F5F2]">{p.label}</span>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-4xl font-serif text-[#F5F5F2]">{p.users}</span>
              <span className="text-[#98A0A8] ml-2">{p.users} users</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#161B1E]">
              <div
                className={`h-full ${p.progress > 85 ? 'bg-[#E5A93C' : 'bg-[#38BDF8]'}`}
              />
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-[#5A626A]">{p.progress.toFixed(0)}% consumed</span>
              <span className="text-[#5A626A]">reset at 00:00 WIB</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quota Overrides table card */}
      <div className="overflow-x-auto rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6">
        <h2 className="text-xl font-serif font-normal tracking-tight">
          QUOTA OVERRIDES
        </h2>
        <table className="w-full text-xs font-mono">
          <thead className="bg-[#121619] text-[#98A0A8]">
            <tr>
              <th className="text-left py-2">USER</th>
              <th className="text-left py-2">PLAN</th>
              <th className="text-left py-2">OVERRIDE</th>
              <th className="text-left py-2">EXPIRES</th>
              <th className="text-left py-2">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="bg-[#0E1215]">
            {quotaOverrides.map((o, i) => (
              <tr key={i} className="hover:bg-[#161B1E]">
                <td className="py-2">{o.user}</td>
                <td className="py-2">{o.plan}</td>
                <td className="py-2">{o.override}</td>
                <td className="py-2">{o.expires}</td>
                <td className="py-2 flex space-x-2">
                  {o.actions.map((a) => (
                    <button
                      key={a}
                      className="inline-flex items-center px-2 py-1 bg-[#0A0C0E] text-[#98A0A8] border border-[#22272B] rounded hover:bg-[#161B1E]"
                    >
                      {a}
                    </button>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Consumption (24H) card */}
      <div className="overflow-x-auto rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6">
        <h2 className="text-xl font-serif font-normal tracking-tight">
          CONSUMPTION (24H)
        </h2>
        <div className="w-full">{consumptionChartSvg}</div>
      </div>
    </div>
  );
};

export default AdminPools;