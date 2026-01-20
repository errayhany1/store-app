"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, Calculator, Wallet, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Inventory", href: "/inventory", icon: Package },
    { name: "Orders", href: "/orders", icon: ShoppingCart },
    { name: "Expenses", href: "/expenses", icon: Wallet },
    { name: "Profit Calc", href: "/calculator", icon: Calculator },
    // { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-16 flex-col items-center border-r bg-white py-4 shadow-sm sm:w-64 sm:items-stretch sm:px-4">
            <div className="mb-8 flex items-center justify-center sm:justify-start sm:px-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
                    S
                </div>
                <span className="ml-2 hidden text-lg font-bold text-gray-900 sm:block">Store Manager</span>
            </div>

            <nav className="flex flex-1 flex-col gap-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center justify-center rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 sm:justify-start sm:px-3",
                                isActive && "bg-blue-50 text-blue-600 font-medium"
                            )}
                        >
                            <Icon className="h-5 w-5 sm:mr-3" />
                            <span className="hidden sm:block">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto border-t pt-4">
                <div className="flex items-center justify-center sm:justify-start sm:px-2 p-2">
                    <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                    <div className="ml-3 hidden sm:block">
                        <p className="text-sm font-medium text-gray-700">User</p>
                        <p className="text-xs text-gray-500">Admin</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
