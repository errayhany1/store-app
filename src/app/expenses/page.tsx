import { noco } from "@/lib/nocodb";
import { Expense } from "@/lib/types";
import { PlusCircle } from "lucide-react";

async function getExpenses(): Promise<Expense[]> {
    try {
        const list = await noco.dbTableRow.list(
            "noco",
            process.env.NOCODB_PROJECT_ID!,
            process.env.NOCODB_TABLE_EXPENSES!,
            { limit: 50 }
        );
        return list.list as any[];
    } catch (error) {
        console.error("Error fetching expenses:", error);
        return [];
    }
}

export default async function ExpensesPage() {
    const expenses = await getExpenses();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Expenses</h1>
                <a href="/expenses/new" className="flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
                    <PlusCircle className="h-4 w-4" />
                    Add Expense
                </a>
            </div>

            <div className="rounded-md border bg-white shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-700 uppercase border-b">
                        <tr>
                            <th className="px-6 py-3">Description</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Paid By</th>
                            <th className="px-6 py-3 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {expenses.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                    No expenses recorded yet.
                                </td>
                            </tr>
                        ) : (
                            expenses.map((expense) => (
                                <tr key={expense.Id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {expense.Description}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {expense.Date ? new Date(expense.Date).toLocaleDateString() : "-"}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${expense.PaidBy === 'user' ? 'bg-purple-50 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {expense.PaidBy || "Unknown"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-mono text-gray-700">
                                        -{expense.Amount} MAD
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
