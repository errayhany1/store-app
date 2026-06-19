"use client";

import { useState } from "react";
import { shipOrder } from "@/app/actions";
import { Truck, Loader2 } from "lucide-react";

export function ShipOrderButton({ orderId, orderData }: { orderId: string, orderData: any }) {
    const [loading, setLoading] = useState(false);

    const handleShip = async () => {
        setLoading(true);
        const result = await shipOrder(orderId, orderData);
        setLoading(false);
        if (result.success) {
            alert(`Order shipped successfully! Tracking: ${result.trackingNumber}`);
        } else {
            alert(`Failed to ship order: ${result.error}`);
        }
    };

    return (
        <button
            onClick={handleShip}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-md bg-[#103A6E] px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-900 disabled:opacity-50"
        >
            {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Truck className="h-3 w-3" />}
            Ship with Ozon
        </button>
    );
}
