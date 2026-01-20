import { noco } from "@/lib/nocodb";
import { Product } from "@/lib/types";

async function getProducts(): Promise<Product[]> {
    try {
        const list = await noco.dbTableRow.list(
            "noco",
            process.env.NOCODB_PROJECT_ID!,
            process.env.NOCODB_TABLE_PRODUCTS!,
            { limit: 100 }
        );
        return list.list as any[];
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

export default async function InventoryPage() {
    const products = await getProducts();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Inventory</h1>
                <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    Sync / Add Stock
                </button>
            </div>

            <div className="rounded-md border bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-700 uppercase">
                            <tr>
                                <th className="px-6 py-3">Product Name</th>
                                <th className="px-6 py-3">Reference</th>
                                <th className="px-6 py-3">Cost Price</th>
                                <th className="px-6 py-3">Stock Status</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                        No products found or connection error.
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product.Id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {product["Product Name"] || "Unnamed"}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {product.Reference || "-"}
                                        </td>
                                        <td className="px-6 py-4 font-mono text-gray-600">
                                            {product["Cost Price"] ? `${product["Cost Price"]} MAD` : "-"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                {product["Stock Status"] || "In Stock"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-blue-600 hover:text-blue-900 font-medium">
                                                Sell
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
