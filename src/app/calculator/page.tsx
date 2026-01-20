"use client";

import { useState } from "react";
import { calculateProfitSplit } from "@/lib/calculator";
import { Calculator } from "lucide-react";

export default function CalculatorPage() {
    const [values, setValues] = useState({
        salePrice: 200,
        costPrice: 100,
        shippingCost: 30,
        expenses: 0
    });

    const result = calculateProfitSplit(
        values.salePrice,
        values.costPrice,
        values.shippingCost,
        values.expenses
    );

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Calculator className="h-6 w-6" /> Profit Simulator
                </h1>
                <p className="text-gray-500">Estimate your split before selling.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                {/* Inputs */}
                <div className="space-y-4 bg-white p-6 rounded-xl border shadow-sm">
                    <h3 className="font-semibold text-gray-900">Transaction Details</h3>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Sale Price (Thaman Lbay3)</label>
                        <input
                            type="number"
                            value={values.salePrice}
                            onChange={(e) => setValues({ ...values, salePrice: Number(e.target.value) })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Cost Price (Ras lmal / Abdul Karim)</label>
                        <input
                            type="number"
                            value={values.costPrice}
                            onChange={(e) => setValues({ ...values, costPrice: Number(e.target.value) })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Shipping Cost (Paid by Us)</label>
                        <input
                            type="number"
                            value={values.shippingCost}
                            onChange={(e) => setValues({ ...values, shippingCost: Number(e.target.value) })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Extra Expenses (Ads/etc)</label>
                        <input
                            type="number"
                            value={values.expenses}
                            onChange={(e) => setValues({ ...values, expenses: Number(e.target.value) })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                        />
                    </div>
                </div>

                {/* Results */}
                <div className="space-y-4">
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                        <h3 className="text-blue-900 font-semibold mb-2">Net Profit</h3>
                        <div className="text-4xl font-bold text-blue-700">{result.netProfit} MAD</div>
                        <p className="text-xs text-blue-600 mt-1">
                            (Sale - Cost - Shipping - Exp)
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-xl border">
                            <h4 className="text-gray-500 text-sm font-medium">You Get</h4>
                            <div className="text-2xl font-bold text-gray-900">{result.userShare} MAD</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl border">
                            <h4 className="text-gray-500 text-sm font-medium">Partner Gets</h4>
                            <div className="text-2xl font-bold text-gray-900">{result.partnerShare} MAD</div>
                            <p className="text-xs text-gray-400">Includes {result.totalCost} cost</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
