"use client";

import { useState } from "react";
import { cancelOrder } from "@/app/actions";
import { XCircle, Loader2 } from "lucide-react";

export function CancelOrderButton({ orderId }: { orderId: string }) {
    const [loading, setLoading] = useState(false);

    const handleCancel = async () => {
        if (!confirm("Are you sure you want to cancel this order?")) return;
        
        setLoading(true);
        const result = await cancelOrder(orderId);
        setLoading(false);
        if (result.success) {
            alert("Order cancelled successfully!");
        } else {
            alert(`Failed to cancel order: ${result.error}`);
        }
    };

    return (
        <button
            onClick={handleCancel}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-md bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 disabled:opacity-50"
        >
            {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <XCircle className="h-3 w-3" />}
            Cancel
        </button>
    );
}
