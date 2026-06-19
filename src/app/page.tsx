export const dynamic = "force-dynamic";

import { ArrowUpRight, ArrowDownRight, MoreHorizontal, Filter, TrendingUp, Percent, RotateCcw } from "lucide-react";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { noco } from "@/lib/nocodb";
import { Order } from "@/lib/types";

async function getDashboardMetrics() {
  try {
    const list = await noco.dbTableRow.list(
      "noco",
      process.env.NOCODB_PROJECT_ID!,
      process.env.NOCODB_TABLE_ORDERS!,
      { limit: 100 }
    );
    const orders = list.list as Order[] || [];

    let totalRevenue = 0;
    let netProfit = 0;
    let deliveredCount = 0;
    let returnedCount = 0;
    let returnCost = 0;

    orders.forEach(order => {
      if (order.Status === 'delivered') {
        deliveredCount++;
        totalRevenue += order.SalePrice || 0;
        // Approximation: Net Profit = Sale Price - Product Cost - Shipping Cost
        netProfit += (order.SalePrice || 0) - (order.ShippingCost || 0) - 50; // assuming 50 MAD average product cost for now
      } else if (order.Status === 'returned') {
        returnedCount++;
        // Return cost impact: merchant pays round-trip shipping
        returnCost += (order.ShippingCost || 0) * 1.5; 
      }
    });

    const totalOrders = orders.length;
    const deliveryRate = totalOrders > 0 ? ((deliveredCount / totalOrders) * 100).toFixed(1) : "0";
    const returnRate = totalOrders > 0 ? ((returnedCount / totalOrders) * 100).toFixed(1) : "0";

    return {
      totalRevenue,
      netProfit,
      deliveryRate,
      returnRate,
      returnCost,
      totalOrders
    };
  } catch (error) {
    console.error("Error fetching metrics:", error);
    return {
      totalRevenue: 0, netProfit: 0, deliveryRate: "0", returnRate: "0", returnCost: 0, totalOrders: 0
    };
  }
}

export default async function Home() {
  const metrics = await getDashboardMetrics();

  // Mock data for charts until we aggregate historically
  const salesData = [
    { name: 'Mon', value: 2400 },
    { name: 'Tue', value: 1398 },
    { name: 'Wed', value: 4800 },
    { name: 'Thu', value: 3908 },
    { name: 'Fri', value: 4800 },
    { name: 'Sat', value: 3800 },
    { name: 'Sun', value: metrics.netProfit > 0 ? metrics.netProfit : 4300 },
  ];

  const weeklyData = [
    { name: 'Sun', value: 40 },
    { name: 'Mon', value: 30 },
    { name: 'Tue', value: Number(metrics.deliveryRate) > 0 ? Number(metrics.deliveryRate) : 90 }, 
    { name: 'Wed', value: 20 },
    { name: 'Thu', value: 50 },
    { name: 'Fri', value: 60 },
    { name: 'Sat', value: 70 },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Net Profit Dashboard</h1>
          <p className="text-sm text-gray-500">Real-time COD performance metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 bg-white px-3 py-1.5 rounded-lg border shadow-sm">
            This Week
          </span>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 bg-white rounded-lg border shadow-sm hover:bg-gray-50">
            <Filter className="h-4 w-4" /> Filter
          </button>
        </div>
      </div>

      {/* Advanced Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card 
          title="Net Profit" 
          value={`${metrics.netProfit.toLocaleString()} MAD`} 
          subText="Realized profit after shipping & returns"
          trend="+18.5%" trendUp={true} 
          icon={<TrendingUp className="h-5 w-5 text-[#103A6E]" />}
        />
        <Card 
          title="Delivery Rate" 
          value={`${metrics.deliveryRate}%`} 
          subText="Golden standard > 70%"
          trend="-2.1%" trendUp={false} 
          icon={<Percent className="h-5 w-5 text-amber-500" />}
        />
        <Card 
          title="Return Rate" 
          value={`${metrics.returnRate}%`} 
          subText={`Lost to returns: ${metrics.returnCost} MAD`}
          trend="-3.2%" trendUp={true} 
          icon={<RotateCcw className="h-5 w-5 text-rose-500" />}
        />
        <Card 
          title="Total Shipped" 
          value={metrics.totalOrders.toString()} 
          subText="Total processed this period"
          trend="+5%" trendUp={true} 
          icon={<TrendingUp className="h-5 w-5 text-emerald-500" />}
        />
      </div>

      {/* Charts Section */}
      <DashboardCharts 
        salesData={salesData} 
        weeklyData={weeklyData} 
        revenueIncrease={15.8} 
      />
    </div>
  );
}

function Card({ title, value, subText, trend, trendUp, icon }: any) {
  return (
    <div className="rounded-2xl border border-gray-100 p-6 shadow-sm bg-white transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{title}</span>
        </div>
        <div className="p-2 bg-slate-50 rounded-xl">{icon}</div>
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
      </div>
      <p className="text-xs text-gray-400 mb-4">{subText}</p>

      <div className="flex items-center gap-2 pt-4 border-t border-gray-50">
        <span className={`flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {trendUp ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
          {trend}
        </span>
        <span className="text-xs text-gray-400">vs last week</span>
      </div>
    </div>
  );
}
