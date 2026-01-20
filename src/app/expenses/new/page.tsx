"use client";

import { createExpense } from "@/app/actions";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function NewExpensePage() {
    return (
        <div className="max-w-xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/expenses" className="p-2 hover:bg-gray-100 rounded-full">
                    <ArrowLeft className="h-5 w-5 text-gray-500" />
                </Link>
                <h1 className="text-2xl font-bold tracking-tight">New Expense</h1>
            </div>

            <form action={createExpense} className="bg-white p-6 rounded-xl border shadow-sm space-y-6">

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Description</label>
                    <input required name="description" type="text" placeholder="e.g. Hostinger Monthly" className="w-full p-2 border rounded-md" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Amount (DH)</label>
                        <input required name="amount" type="number" step="0.01" className="w-full p-2 border rounded-md" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Paid By</label>
                        <select name="paidBy" className="w-full p-2 border rounded-md bg-white">
                            <option value="user">User (You)</option>
                            <option value="partner">Partner</option>
                        </select>
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <button type="submit" className="flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 font-medium">
                        <Save className="h-4 w-4" />
                        Record Expense
                    </button>
                </div>

            </form>
        </div>
    );
}
