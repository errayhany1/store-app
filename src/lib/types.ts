export interface Product {
    Id: string;
    'Product Name': string;
    'Cost Price': number;
    'Reference': string;
    'Stock Status': string;
    'Image': any; // Adjust based on NocoDB attachment format
}

export interface Order {
    Id: string;
    CustomerName: string;
    CustomerPhone: string;
    SalePrice: number;
    ShippingCost: number;
    ShippingPaidBy: 'merchant' | 'customer';
    Status: 'pending' | 'shipped' | 'delivered' | 'returned';
    ProductSKU: string;
    Notes: string;
    CreatedAt: string;
}

export interface Expense {
    Id: string;
    Description: string;
    Amount: number;
    PaidBy: 'user' | 'partner';
    Date: string;
}
