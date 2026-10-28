import React from 'react';
import { Search } from 'lucide-react';

const users = [
  {
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
    plan: 'Swimore Plus',
    requests30d: 15000,
    spend30d: 2500,
    status: 'Active',
  },
  {
    name: 'Maria Chen',
    email: 'maria.chen@example.com',
    plan: 'Free',
    requests30d: 5000,
    spend30d: 0,
    status: 'Active',
  },
  {
    name: 'Budi Santoso',
    email: 'budi.santoso@example.com',
    plan: 'VIP',
    requests30d: 8000,
    spend30d: 1200,
    status: 'Active',
  },
  {
    name: 'Lina Patel',
    email: 'lina.patel@example.com',
    plan: 'VIP+',
    requests30d: 12000,
    spend30d: 1800,
    status: 'Active',
  },
  {
    name: 'Jin Wu',
    email: 'jin.wu@example.com',
    plan: 'Free',
    requests30d: 3000,
    spend30d: 0,
    status: 'Suspended',
  },
  {
    name: 'Sofia Rossi',
    email: 'sofia.rossi@example.com',
    plan: 'Swimore Plus',
    requests30d: 7000,
    spend30d: 1000,
    status: 'Active',
  },
  {
    name: 'Kofi Mensah',
    email: 'kofi.mensah@example.com',
    plan: 'Free',
    requests30d: 4000,
    spend30d: 0,
    status: 'Active',
  },
  {
    name: 'Yara Al-Masri',
    email: 'yara.al-masri@example.com',
    plan: 'VIP',
    requests30d: 9000,
    spend30d: 1300,
    status: 'Suspended',
  },
];

const AdminUsers = () => {
  return (
    <div className="p-6 lg:p-8 flex flex-col gap-6 max-w-[1400px] mx-auto w-full">
      <h1 className="text-2xl lg:text-3xl font-serif font-normal tracking-tight text-[#F5F5F2]">
        Users
      </h1>
      <p className="text-[#F5F5F2] text-sm">
        12,482 registered accounts
      </p>

      <div className="flex items-center gap-2 mb-4">
        <Search className="w-4 h-4 text-[#5A626A]" />
        <input
          type="text"
          placeholder="Search users..."
          className="flex-1 px-3 py-1.5 rounded-full bg-[#0E1215]/80 text-[#F5F5F2] border border-[#22272B]"
        />
        <button className="px-4 py-1.5 bg-[#0E1215] text-[#F5F5F2] rounded-md hover:bg-[#0A0C0E]">
          Export CSV
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="text-[#F5F5F2] text-sm">All</span>
        <span className="inline-flex items-center px-2.5 py-0.5 border border-[#22272B] bg-[#0E1215]/80 text-[#F5F5F2] rounded-md mx-1">
          All
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 border border-[#22272B] bg-[#0E1215]/80 text-[#F5F5F2] rounded-md mx-1">
          Free
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 border border-[#22272B] bg-[#0E1215]/80 text-[#F5F5F2] rounded-md mx-1">
          Swimore Plus
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 border border-[#22272B] bg-[#0E1215]/80 text-[#F5F5F2] rounded-md mx-1">
          VIP
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 border border-[#22272B] bg-[#0E1215]/80 text-[#F5F5F2] rounded-md mx-1">
          VIP+
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[#F5F5F2] text-xs">
          <thead className="bg-[#0E1215]">
            <tr>
              <th className="px-4 py-2 text-left">USER</th>
              <th className="px-4 py-2 text-left">PLAN</th>
              <th className="px-4 py-2 text-left">REQUESTS 30D</th>
              <th className="px-4 py-2 text-left">SPEND 30D</th>
              <th className="px-4 py-2 text-left">STATUS</th>
              <th className="px-4 py-2 text-left">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i} className="bg-[#0E1215]">
                <td className="flex items-center gap-2 px-4 py-2">
                  <div className="w-6 h-6 rounded-full bg-[#5A626A] text-[#F5F5F2] flex items-center justify-center">
                    {u.name.split(' ')[0][0].toUpperCase()}
                  </div>
                  <span className="text-[#F5F5F2]">{u.name}</span>
                  <span className="text-[#98A0A8] text-sm">{u.email}</span>
                </td>
                <td className="px-4 py-2">
                  <span className={`bg-[#5A626A] border-[#5A626A]/30 text-[#5A626A] px-2 py-0.5 rounded text-xs`}>
                    Free
                  </span>
                </td>
                <td className="px-4 py-2 text-[#F5F5F2]">{u.requests30d}</td>
                <td className="px-4 py-2 text-[#F5F5F2]">{u.spend30d}</td>
                <td className="px-4 py-2">
                  {u.status === 'Active' ? (
                    <span className="bg-[#00E599]/10 border-[#00E599]/30 text-[#00E599] px-2 py-0.5 rounded">
                      Active
                    </span>
                  ) : (
                    <span className="bg-[#EF4444]/10 border-[#EF4444]/30 text-[#EF4444] px-2 py-0.5 rounded">
                      Suspended
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button className="px-3 py-1.5 bg-[#0E1215] text-[#F5F5F2] rounded-md hover:bg-[#0A0C0E]">Edit</button>
                  <button className="px-3 py-1.5 bg-[#EF4444] text-[#F5F5F2] rounded-md hover:bg-[#0A0C0E]">Suspend</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-[#F5F5F2] text-sm">
        Showing 8 of 12,482
      </div>
    </div>
  );
};

export default AdminUsers;