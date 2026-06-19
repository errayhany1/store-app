"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Filter } from "lucide-react";

interface DashboardChartsProps {
  salesData: { name: string; value: number }[];
  weeklyData: { name: string; value: number }[];
  revenueIncrease: number;
}

export function DashboardCharts({ salesData, weeklyData, revenueIncrease }: DashboardChartsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Main Chart */}
      <div className="col-span-2 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-lg text-gray-900">COD Net Profit Overview</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={revenueIncrease >= 0 ? "text-emerald-500 text-sm font-medium" : "text-rose-500 text-sm font-medium"}>
                {revenueIncrease >= 0 ? "+" : ""}{revenueIncrease}%
              </span>
              <span className="text-gray-400 text-sm">Realized Margin</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg border hover:bg-gray-50"><Filter className="h-4 w-4" /></button>
          </div>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#103A6E" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#103A6E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#103A6E" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Side Chart (Bar) */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-lg text-gray-900">Weekly Delivery Rate</h3>
          <button className="text-xs font-medium text-gray-500 border rounded px-2 py-1">Weekly</button>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <Bar dataKey="value" fill="#103A6E" radius={[4, 4, 4, 4]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
