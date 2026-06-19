export async function createOzonParcel(data: {
    receiverName: string;
    receiverPhone: string;
    cityId: string;
    address: string;
    price: number;
    note?: string;
    ref?: string;
}) {
    const CUSTOMER_ID = process.env.OZON_CUSTOMER_ID;
    const API_KEY = process.env.OZON_API_KEY;

    if (!CUSTOMER_ID || !API_KEY) {
        throw new Error("Ozon Credentials missing in environment variables.");
    }

    const formData = new FormData();
    formData.append("parcel-receiver", data.receiverName);
    formData.append("parcel-phone", data.receiverPhone);
    formData.append("parcel-city", data.cityId);
    formData.append("parcel-address", data.address);
    formData.append("parcel-price", data.price.toString());
    formData.append("parcel-stock", "1"); // Default to stock (delivery)
    if (data.note) formData.append("parcel-note", data.note);
    if (data.ref) formData.append("tracking-number", data.ref);

    const response = await fetch(
        `https://api.ozonexpress.ma/customers/${CUSTOMER_ID}/${API_KEY}/add-parcel`,
        {
            method: "POST",
            body: formData,
        }
    );

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Ozon API Error: ${text}`);
    }

    const result = await response.json();
    return result;
}
