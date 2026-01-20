export interface ProfitShareResult {
    totalRevenue: number;
    totalCost: number;
    totalExpenses: number;
    grossProfit: number;
    shippingCost: number;
    netProfit: number;
    partnerShare: number; // Abdul Karim (Cost + 50% Profit)
    userShare: number;    // User (50% Profit)
}

/**
 * Calculates profit sharing based on the formula:
 * Net Profit = (SalePrice - CostPrice - ShippingCost - GeneralExpenses)
 * User = Net Profit / 2
 * Partner = CostPrice + (Net Profit / 2)
 */
export function calculateProfitSplit(
    salePrice: number,
    costPrice: number,
    shippingCost: number,
    generalExpensesAllocated: number = 0 // Optional: per-order share of hosting/ads
): ProfitShareResult {

    const grossProfit = salePrice - costPrice;
    const netProfit = grossProfit - shippingCost - generalExpensesAllocated;

    const splitAmount = netProfit / 2;

    return {
        totalRevenue: salePrice,
        totalCost: costPrice,
        totalExpenses: shippingCost + generalExpensesAllocated,
        grossProfit,
        shippingCost,
        netProfit,
        userShare: parseFloat(splitAmount.toFixed(2)),
        partnerShare: parseFloat((costPrice + splitAmount).toFixed(2))
    };
}
