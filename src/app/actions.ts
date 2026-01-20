"use server";

import { noco } from "@/lib/nocodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createOrder(formData: FormData) {
    const rawFormData = {
        CustomerName: formData.get("customerName") as string,
        CustomerPhone: formData.get("customerPhone") as string,
        ProductSKU: formData.get("productSku") as string,
        SalePrice: Number(formData.get("salePrice")),
        ShippingCost: Number(formData.get("shippingCost")),
        ShippingPaidBy: formData.get("shippingPaidBy") as string,
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
