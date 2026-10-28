import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';

const pendingApplications = [
  {
    id: 0,
    avatar: 'N',
    name: '@novacompute',
    models: 'mono',
    date: '2026-09-20',
  },
  {
    id: 1,
    avatar: 'T',
    name: '@tokenforge',
    models: 'mono',
    date: '2026-09-18',
  },
  {
    id: 2,
    avatar: 'H',
    name: '@halomesh',
    models: 'mono',
    date: '2026-09-15',
  },
];

const activePartners = [
  {
    id: 0,
    name: 'Nova Compute',
    handle: 'novacompute',
    uptime: '99.8%',
    payout: '$12,400',
    status: 'Active',
  },
  {
    id: 1,
    name: 'Token Forge',
    handle: 'tokenforge',
    uptime: '99.5%',
    payout: '$9,800',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Halomesh',
    handle: 'halomesh',
    uptime: '99.3%',
    payout: '$7,600',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Quantum Labs',
    handle: 'quantum',
    uptime: '99.6%',
    payout: '$11,200',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Pixel Studios',
    handle: 'pixel',
    uptime: '99.4%',
    payout: '$10,500',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Nebula Tech',
    handle: 'nebulatech',
    uptime: '99.2%',
    payout: '$8,900',
    status: 'Active',
  },
];

const AdminPartners = () => {
  const [statuses, setStatuses] = useState(['pending', 'pending', 'pending']);

  const toggleStatus = (index: number) => {
    setStatuses(prev => {
      const newStatus = [...prev];
      newStatus[index] = newStatus[index] === 'pending' ? 'approved' : 'rejected';
      return newStatus;
    });
  };

  return (
    <div className="p-6 lg:p-8 flex flex-col gap-6 max-w-[1400px] mx-auto w-full">
      <h1 className="text-2xl lg:text-3xl font-serif font-normal tracking-tight text-[#F5F5F2]">
        Partners
      </h1>
      <p className="text-[#F5F5F2] text-sm">
        38 active supply-side partners
      </p>

      <div className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-6">
        <h2 className="text-2xl font-serif tracking-tight">
          PENDING APPLICATIONS
        </h2>
        <div className="mt-4 space-y-4">
          {pendingApplications.map((app, i) => (
            <div key={app.id} className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-[#5A626A] text-[#F5F5F2] flex items-center justify-center">
                {app.avatar}
              </div>
              <div className="flex-1">
                <div className="text-[#F5F5F2]">{app.name}</div>
                <div className="text-[#98A0A8] text-sm">
                  {app.models} (mono)
                </div>
                <div className="text-[#98A0A8] text-xs mt-1">
                  Applied: {app.date}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleStatus(i)}
                  className="bg-[#00E599] text-[#060808] rounded-full px-4 py-1.5 text-xs hover:bg-[#00C280]"
                >
                  Approve
                </button>
                <button
                  onClick={() => toggleStatus(i)}
                  className="border border-[#EF4444]/40 text-[#EF4444] rounded-full px-4 py-1.5 text-xs hover:border-[#E53935]"
                >
                  Reject
                </button>
              </div>
              {statuses[i] === 'approved' && (
                <span className="bg-[#00E599]/10 border-[#00E599]/30 text-[#00E599] px-2 py-0.5 rounded text-xs">
                  Approved
                </span>
              )}
              {statuses[i] === 'rejected' && (
                <span className="bg-[#EF4444]/10 border-[#EF4444]/30 text-[#EF4444] px-2 py-0.5 rounded text-xs">
                  Rejected
                </span>
              )}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-serif tracking-tight mt-8">
          ACTIVE PARTNERS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {activePartners.map((p, i) => (
            <div key={p.id} className="rounded-2xl bg-[#0A0C0E] border border-[#22272B] p-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#5A626A] text-[#F5F5F2] flex items-center justify-center">
                  {p.name.split(' ')[0][0].toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="text-[#F5F5F2]">{p.name}</div>
                  <div className="text-[#98A0A8] text-sm">{p.handle}</div>
                  <div className="text-[#98A0A8] text-xs mt-1">
                    Uptime: {p.uptime}
                  </div>
                  <div className="text-[#98A0A8] text-xs mt-1">
                    30d payout: {p.payout}
                  </div>
                </div>
                <div className="flex items-center">
                  <span className={`bg-[#00E599]/10 border-[#00E599]/30 text-[#00E599] px-2 py-0.5 rounded text-xs`}>
                    Active
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPartners;