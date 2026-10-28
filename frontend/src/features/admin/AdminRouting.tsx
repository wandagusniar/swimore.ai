import React from 'react';
import { Check, AlertTriangle } from 'lucide-react';

const decisionPolicyEngine = (
  <div className="border-4 border-[#00E599]/40 bg-[#091813]/70 rounded-2xl p-6">
    <div className="text-mono text-[#F5F5F2] font-normal">
      Swimore Gateway Router
    </div>
    <div className="text-[#F5F5F2] font-normal">
      Dynamic Latency · Token Price · Real-time SLA
    </div>
  </div>
);

const tier1Nodes = [
  { name: 'OpenAI', latency: 32, success: 99 },
  { name: 'Anthropic', latency: 31, success: 98 },
  { name: 'DeepSeek', latency: 28, success: 99, active: true },
  { name: 'ZAI', latency: 34, success: 97 },
  { name: 'GLM', latency: 36, success: 95 },
];

const tier2Clusters = [
  {
    name: 'Alpha Llama 3.3 70B',
    price: 0.30,
  },
  {
    name: 'Beta Qwen 2.5 72B',
    price: 0.32,
  },
];

const failoverPolicies = [
  { name: 'latency-first', selected: true, description: '— fastest healthy model wins' },
  { name: 'price-first', selected: false, description: '— cheapest model above the quality floor' },
  { name: 'private', selected: false, description: '— contractually enabled providers only' },
];

const recentFailoverEvents = [
  {
    time: '12:02 UTC',
    source: 'ZAI',
    target: 'DeepSeek',
    event: 'TIMEOUT 3s',
    status: 'green',
  },
  {
    time: '09:47',
    source: 'OpenAI',
    target: 'Anthropic',
    event: 'HTTP 503',
    status: 'green',
  },
  {
    time: 'yesterday 22:15',
    source: 'GLM',
    event: 'MANUAL',
    status: 'amber',
  },
];

const AdminRouting: React.FC = () => {
  return (
    <div className="p-6 lg:p-8 flex flex-col gap-6 max-w-[1400px] mx-auto w-full">
      {/* Heading */}
      <h1 className="text-2xl lg:text-3xl font-serif font-normal tracking-tight">
        Routing & Failover
      </h1>
      <p className="text-[10px] uppercase tracking-widest text-[#98A0A8]">
        Live policy engine and failover mesh
      </p>

      {/* Decision Policy Engine card */}
      <div className="overflow-x-auto rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6">
        {decisionPolicyEngine}
      </div>

      {/* Tier 1 & Tier 2 cards row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tier 1 */}
        <div className="bg-[#0A0C0E] border border-[#22272B] rounded-2xl p-6">
          <h2 className="text-xl font-serif font-normal tracking-tight">
            TIER 1 · DIRECT FOUNDATION ENDPOINTS
          </h2>
          <div className="grid grid-cols-1 gap-4 mt-4">
            {tier1Nodes.map((node, i) => (
              <div key={i} className="flex items-center space-x-2">
                <span className="text-mono text-[#38BDF8">{node.name}</span>
                <span className="text-[#38BDF8] ml-2">
                  Latency: {node.latency}ms
                </span>
                <span className="text-[#00E599] ml-2">
                  Success: {node.success}%
                </span>
                {node.active && (
                  <input
                    type="checkbox"
                    readOnly
                    className="w-4 h-4 text-white bg-[#00E599] rounded focus:outline-none"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tier 2 */}
        <div className="bg-[#0A0C0E] border border-[#22272B] rounded-2xl p-6">
          <h2 className="text-xl font-serif font-normal tracking-tight">
            TIER 2 · MARKETPLACE NODE FALLBACK
          </h2>
          <div className="grid grid-cols-1 gap-4 mt-4">
            {tier2Clusters.map((c, i) => (
              <div key={i} className="flex items-center space-x-2">
                <span className="text-mono text-[#38BDF8">{c.name}</span>
                <span className="text-[#38BDF8] ml-2">
                  ${c.price}/1M
                </span>
                <input
                  type="checkbox"
                  readOnly
                  className="w-4 h-4 text-white bg-[#38BDF8] rounded focus:outline-none"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Failover Policies card */}
      <div className="overflow-x-auto rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6">
        <h2 className="text-xl font-serif font-normal tracking-tight">
          FAILOVER POLICIES
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          {failoverPolicies.map((p, i) => (
            <div key={i} className="flex items-center space-x-2">
              <input
                type="radio"
                name="policy"
                value={p.name}
                className="w-4 h-4 text-white bg-[#00E599] rounded focus:outline-none"
                checked={p.selected}
              />
              <span className="text-[#F5F5F2]">
                {p.name === 'latency-first' ? 'Latency‑first' : p.name === 'price-first' ? 'Price‑first' : 'Private'}
                <span className="text-[#98A0A8] ml-1">
                  {p.description || ''}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Failover Events table */}
      <div className="overflow-x-auto rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6">
        <h2 className="text-xl font-serif font-normal tracking-tight">
          RECENT FAILOVER EVENTS
        </h2>
        <table className="w-full text-xs font-mono">
          <thead className="bg-[#121619] text-[#98A0A8]">
            <tr>
              <th className="text-left py-2">Time</th>
              <th className="text-left py-2">Source → Target</th>
              <th className="text-left py-2">Event</th>
              <th className="text-left py-2">Status</th>
            </tr>
          </thead>
          <tbody className="bg-[#0E1215]">
            {recentFailoverEvents.map((e, i) => (
              <tr key={i} className="hover:bg-[#161B1E]">
                <td className="py-2">{e.time}</td>
                <td className="py-2">{e.source} → {e.target}</td>
                <td className="py-2">{e.event}</td>
                <td className="py-2">
                  {e.status === 'green' ? (
                    <Check className="w-3.5 h-3.5 inline text-[#00E599] mr-1" />
                  ) : (
                    <AlertTriangle className="w-3.5 h-3.5 inline text-[#EF4444] mr-1" />
                  )}
                  <span className="text-[#5A626A]">{e.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRouting;