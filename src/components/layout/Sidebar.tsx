"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Calculator,
    Wallet,
    Settings,
    HelpCircle,
    LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuGroups = [
    {
        title: "GÉNÉRAL",
        items: [
            { name: "Tableau de bord", href: "/", icon: LayoutDashboard },
            { name: "Inventaire", href: "/inventory", icon: Package },
        ],
    },
    {
        title: "GESTION",
        items: [
            { name: "Commandes", href: "/orders", icon: ShoppingCart },
            { name: "Dépenses", href: "/expenses", icon: Wallet },
            { name: "Calculateur", href: "/calculator", icon: Calculator },
        ],
    },
    {
        title: "SUPPORT",
        items: [
            { name: "Paramètres", href: "/settings", icon: Settings },
            { name: "Aide", href: "/help", icon: HelpCircle },
        ],
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-64 flex-col border-r bg-white text-slate-600 font-sans">
            {/* Logo */}
            <div className="flex h-20 items-center justify-center px-4 border-b border-gray-100 bg-white">
                <Image
                    src="/logo.jpg"
                    alt="Errayhany Grossiste"
                    width={180}
                    height={60}
                    className="object-contain"
                    priority
                />
            </div>

            {/* Navigation */}
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
                                                    ? "bg-[#103A6E] text-white shadow-sm"
                                                    : "text-slate-500 hover:bg-blue-50 hover:text-[#103A6E]"
                                            )}
                                        >
                                            <item.icon
                                                className={cn(
                                                    "h-5 w-5",
                                                    isActive ? "text-white" : "text-slate-400"
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

            {/* Footer */}
            <div className="p-4 border-t border-gray-100">
                <div className="mb-3 px-3">
                    <p className="text-xs font-semibold text-slate-700">Errayhany Grossiste</p>
                    <p className="text-[11px] text-slate-400">Tableau de bord v2.0</p>
                </div>
                <button className="flex w-full items-center gap-3 rounded-xl p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                    <LogOut className="h-5 w-5" />
                    <span className="text-sm font-medium">Déconnexion</span>
                </button>
            </div>
        </div>
    );
}
