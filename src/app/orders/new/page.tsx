import { createOrder } from "../../actions";
import cities from "@/lib/cities.json";

export default function NewOrderPage() {
    return (
        <div className="max-w-2xl mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Create New Order</h1>

            <form action={createOrder} className="space-y-6 bg-white p-6 rounded-lg border shadow-sm">

                {/* Customer Details */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 border-b pb-2">Customer Info</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input type="text" name="customerName" required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input type="tel" name="customerPhone" required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">City (Ozon Express)</label>
                        <select name="cityId" required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white">
                            <option value="">Select City...</option>
                            {cities.sort((a, b) => a.name.localeCompare(b.name)).map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.name} - {city.price} MAD
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <textarea name="address" required rows={2} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"></textarea>
                    </div>
                </div>

                {/* Product Details */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 border-b pb-2">Order Details</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Product SKU / Name</label>
                        <input type="text" name="productSku" required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Sale Price (MAD)</label>
                            <input type="number" name="salePrice" required min="0" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Shipping Cost (Paid by Merchant)</label>
                            <input type="number" name="shippingCost" required min="0" defaultValue="35" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
                        <textarea name="notes" rows={2} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"></textarea>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <a href="/orders" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                        Cancel
                    </a>
                    <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                        Create Order
                    </button>
                </div>
            </form>
        </div>
    );
}
