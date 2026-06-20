"use server";

import { noco } from "@/lib/nocodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createOzonParcel } from "@/lib/ozon";

export async function createOrder(formData: FormData) {
    const rawFormData = {
        CustomerName: formData.get("customerName") as string,
        CustomerPhone: formData.get("customerPhone") as string,
        CityID: formData.get("cityId") as string,
        Address: formData.get("address") as string,
        ProductSKU: formData.get("productSku") as string,
        SalePrice: Number(formData.get("salePrice")),
        ShippingCost: Number(formData.get("shippingCost")),
        Status: "pending",
        Notes: formData.get("notes") as string,
    };

    try {
        await noco.dbTableRow.create(
            "noco", // 'noco' is typically the type argument in v2 SDK for table operations
            process.env.NOCODB_PROJECT_ID!,
            process.env.NOCODB_TABLE_ORDERS!,
            rawFormData
        );
    } catch (error) {
        console.error("Failed to create order:", error);
        throw new Error("Failed to create order");
    }

    revalidatePath("/orders");
    revalidatePath("/");
    redirect("/orders");
}

export async function createExpense(formData: FormData) {
    const rawFormData = {
        Description: formData.get("description") as string,
        Amount: Number(formData.get("amount")),
        PaidBy: formData.get("paidBy") as string,
        Date: new Date().toISOString(),
    };

    try {
        await noco.dbTableRow.create(
            "noco",
            process.env.NOCODB_PROJECT_ID!,
            process.env.NOCODB_TABLE_EXPENSES!,
            rawFormData
        );
    } catch (error) {
        console.error("Failed to create expense:", error);
        throw new Error("Failed to create expense");
    }

    revalidatePath("/expenses");
    revalidatePath("/");
    redirect("/expenses");
}

export async function shipOrder(orderId: string, orderData: any) {
    // 1. Send to Ozon
    try {
        const parcel = await createOzonParcel({
            receiverName: orderData.CustomerName,
            receiverPhone: orderData.CustomerPhone,
            cityId: orderData.CityID,
            address: orderData.Address,
            price: Number(orderData.SalePrice),
            note: orderData.Notes,
            ref: orderId // Internal tracking ref
        });

        const trackingNumber = parcel["TRACKING-NUMBER"];

        // 2. Update NocoDB with Tracking Number & Status
        await noco.dbTableRow.update(
            "noco",
            process.env.NOCODB_PROJECT_ID!,
            process.env.NOCODB_TABLE_ORDERS!,
            orderId,
            {
                Status: "shipped",
                TrackingNumber: trackingNumber,
                ShippingLabelURL: `https://ozonexpress.ma/tracking/${trackingNumber}` // Hypothetical link
            }
        );

        revalidatePath(`/orders/${orderId}`);
        revalidatePath("/orders");
        return { success: true, trackingNumber };

    } catch (e: any) {
        console.error("Shipping Failed:", e);
        return { success: false, error: e.message };
    }
}

export async function cancelOrder(orderId: string) {
    try {
        await noco.dbTableRow.update(
            "noco",
            process.env.NOCODB_PROJECT_ID!,
            process.env.NOCODB_TABLE_ORDERS!,
            orderId,
            {
                Status: "returned" // Maps to Cancelled/Returned in NocoDB
            }
        );
        revalidatePath(`/orders/${orderId}`);
        revalidatePath("/orders");
        return { success: true };
    } catch (e: any) {
        console.error("Cancel Failed:", e);
        return { success: false, error: e.message };
    }
}
