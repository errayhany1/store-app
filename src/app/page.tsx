import { Wallet, Package, ShoppingCart, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-gray-500">
          Overview of your store performance.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card title="Total Revenue" value="12,345 MAD" icon={Wallet} trend="+12% from last month" />
        <Card title="Pending Orders" value="5" icon={ShoppingCart} trend="2 shipping today" />
        <Card title="Total Expenses" value="1,200 MAD" icon={TrendingUp} trend="Ads & Hosting" />
        <Card title="Active Inventory" value="142 Items" icon={Package} trend="Updated 2h ago" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-4">Recent Sales</h3>
          <div className="h-[200px] flex items-center justify-center text-gray-400 border border-dashed rounded">
            Chart Placeholder
          </div>
        </div>
        <div className="col-span-3 rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full rounded-lg bg-blue-600 px-4 py-3 text-white font-medium hover:bg-blue-700 transition">
              + New Order
            </button>
            <button className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 transition">
              Add Expense
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, icon: Icon, trend }: any) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between space-y-0 pb-2">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <Icon className="h-4 w-4 text-gray-400" />
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-gray-500 mt-1">{trend}</p>
    </div>
  );
}
