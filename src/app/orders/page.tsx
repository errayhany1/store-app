import { noco } from "@/lib/nocodb";
import { Order } from "@/lib/types";
import { Badge } from "lucide-react"; // Using Lucide icon as placeholder or similar UI element

async function getOrders(): Promise<Order[]> {
    try {
        const list = await noco.dbTableRow.list(
            "noco",
            process.env.NOCODB_PROJECT_ID!,
            process.env.NOCODB_TABLE_ORDERS!,
            { limit: 100 }
        );
        return list.list as any[];
    } catch (error) {
        console.error("Error fetching orders:", error);
        return [];
    }
}

export default async function OrdersPage() {
    const orders = await getOrders();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
                <a href="/orders/new" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    + Start New Order
                </a>
            </div>

            <div className="rounded-md border bg-white shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-700 uppercase border-b">
                        <tr>
                            <th className="px-6 py-3">Customer</th>
                            <th className="px-6 py-3">Product SKU</th>
                            <th className="px-6 py-3 text-right">Sale Price</th>
                            <th className="px-6 py-3 text-center">Status</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                    No active orders. Start selling!
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.Id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{order.CustomerName}</div>
                                        <div className="text-xs text-gray-500">{order.CustomerPhone}</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{order.ProductSKU || "N/A"}</td>
                                    <td className="px-6 py-4 text-right font-medium">{order.SalePrice} MAD</td>
                                    <td className="px-6 py-4 text-center">
                                        <StatusBadge status={order.Status} />
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <a href={`/orders/${order.Id}`} className="text-blue-600 hover:underline">View</a>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles = {
        pending: "bg-yellow-100 text-yellow-800",
        shipped: "bg-blue-100 text-blue-800",
        delivered: "bg-green-100 text-green-800",
        returned: "bg-red-100 text-red-800",
    };
    const style = styles[status as keyof typeof styles] || "bg-gray-100 text-gray-800";

    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${style}`}>
            {status}
        </span>
    )
}
