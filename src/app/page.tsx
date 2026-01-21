"use client";

import { Wallet, Package, ShoppingCart, TrendingUp, Users, ArrowUpRight, ArrowDownRight, MoreHorizontal, Filter } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const data = [
  { name: 'Oct', value: 2400 },
  { name: 'Nov', value: 1398 },
  { name: 'Dec', value: 9800 },
  { name: 'Jan', value: 3908 },
  { name: 'Feb', value: 4800 },
  { name: 'Mar', value: 3800 },
];

const barData = [
  { name: 'Sun', value: 400 },
  { name: 'Mon', value: 300 },
  { name: 'Tue', value: 900 }, // Highlighted in design
  { name: 'Wed', value: 200 },
  { name: 'Thu', value: 500 },
  { name: 'Fri', value: 600 },
  { name: 'Sat', value: 700 },
];

export default function Home() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 bg-white px-3 py-1.5 rounded-lg border shadow-sm">
            Oct 18 - Nov 18
          </span>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 bg-white rounded-lg border shadow-sm hover:bg-gray-50">
            <Filter className="h-4 w-4" /> Filter
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card title="Total Revenue" value="$ 12,345" trend="+12% from last month" trendUp={true} bg="bg-white" />
        <Card title="Total Orders" value="1,245" trend="+5% from last month" trendUp={true} bg="bg-white" />
        <Card title="Active Inventory" value="865" trend="-2.5% bounce rate" trendUp={false} bg="bg-white" />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Chart */}
        <div className="col-span-2 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-lg text-gray-900">Sales Overview</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-emerald-500 text-sm font-medium">+15.8%</span>
                <span className="text-gray-400 text-sm">+ $143.50 increased</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg border hover:bg-gray-50"><Filter className="h-4 w-4" /></button>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side Chart (Bar) */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-lg text-gray-900">Weekly Sales</h3>
            <button className="text-xs font-medium text-gray-500 border rounded px-2 py-1">Weekly</button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <Bar dataKey="value" fill="#e2e8f0" radius={[4, 4, 4, 4]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div>
  );
}

function Card({ title, value, trend, trendUp, bg }: any) {
  return (
    <div className={`rounded-2xl border border-gray-100 p-6 shadow-sm ${bg} transition-all hover:shadow-md`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-gray-500">
          {/* Icon placeholder could go here */}
          <span className="text-sm font-medium">{title}</span>
        </div>
        <button className="text-gray-300 hover:text-gray-500"><MoreHorizontal className="h-5 w-5" /></button>
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
      </div>

      <div className="flex items-center gap-2">
        <span className={`flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {trendUp ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
          {trend.split(' ')[0]}
        </span>
        <span className="text-xs text-gray-400">from last month</span>
      </div>
    </div>
  );
}
