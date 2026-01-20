"use client";

import { createOrder } from "@/app/actions";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
// import { useFormStatus } from "react-dom"; // React 19 / Next.js 14 canary feature usually, checking compatibility
// For regular Next 14, standard form action works.

export default function NewOrderPage() {
    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/orders" className="p-2 hover:bg-gray-100 rounded-full">
                    <ArrowLeft className="h-5 w-5 text-gray-500" />
                </Link>
                <h1 className="text-2xl font-bold tracking-tight">New Order</h1>
            </div>

            <form action={createOrder} className="bg-white p-6 rounded-xl border shadow-sm space-y-6">

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Customer Name</label>
                        <input required name="customerName" type="text" placeholder="e.g. Ahmed Benali" className="w-full p-2 border rounded-md" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Phone Number</label>
                        <input required name="customerPhone" type="tel" placeholder="06..." className="w-full p-2 border rounded-md" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Product (SKU/Name)</label>
                    <input required name="productSku" type="text" placeholder="Search product..." className="w-full p-2 border rounded-md" />
                    {/* Ideally this would be a dropdown linked to products, using simple text for now */}
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Sale Price (DH)</label>
                        <input required name="salePrice" type="number" defaultValue="0" className="w-full p-2 border rounded-md" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Shipping Cost</label>
                        <input required name="shippingCost" type="number" defaultValue="30" className="w-full p-2 border rounded-md" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Shipping Paid By</label>
                        <select name="shippingPaidBy" className="w-full p-2 border rounded-md bg-white">
                            <option value="merchant">Merchant (Us)</option>
                            <option value="customer">Customer</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Notes</label>
                    <textarea name="notes" rows={3} className="w-full p-2 border rounded-md"></textarea>
                </div>

                <div className="pt-4 flex justify-end">
                    <button type="submit" className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium">
                        <Save className="h-4 w-4" />
                        Create Order
                    </button>
                </div>

            </form>
        </div>
    );
}
