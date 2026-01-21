"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Calculator,
    Wallet,
    Settings,
    HelpCircle,
    LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuGroups = [
    {
        title: "GENERAL",
        items: [
            { name: "Dashboard", href: "/", icon: LayoutDashboard },
            { name: "Inventory", href: "/inventory", icon: Package },
        ],
    },
    {
        title: "MANAGEMENT",
        items: [
            { name: "Orders", href: "/orders", icon: ShoppingCart },
            { name: "Expenses", href: "/expenses", icon: Wallet },
            { name: "Calculator", href: "/calculator", icon: Calculator },
        ],
    },
    {
        title: "SUPPORT",
        items: [
            { name: "Settings", href: "/settings", icon: Settings },
            { name: "Help", href: "/help", icon: HelpCircle },
        ],
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-64 flex-col border-r bg-white text-slate-600 font-sans">
            <div className="flex h-20 items-center px-6 border-b border-gray-50">
                <div className="flex items-center gap-2 font-bold text-xl text-indigo-600 tracking-tight">
                    <div className="h-8 w-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                        <LayoutDashboard className="h-5 w-5" />
                    </div>
                    Nexus
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-6">
                <nav className="space-y-8 px-4">
                    {menuGroups.map((group) => (
                        <div key={group.title}>
                            <h3 className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                {group.title}
                            </h3>
                            <div className="space-y-1">
                                {group.items.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={cn(
                                                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                                isActive
                                                    ? "bg-indigo-50 text-indigo-600 shadow-sm"
                                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                            )}
                                        >
                                            <item.icon
                                                className={cn(
                                                    "h-5 w-5",
                                                    isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-500"
                                                )}
                                            />
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>
            </div>

            <div className="p-4 border-t border-gray-50">
                <button className="flex w-full items-center gap-3 rounded-xl p-2 hover:bg-slate-50 text-slate-500 transition-colors">
                    <LogOut className="h-5 w-5" />
                    <span className="text-sm font-medium">Log Out</span>
                </button>
            </div>
        </div>
    );
}
