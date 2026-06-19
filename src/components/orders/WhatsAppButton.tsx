"use client";

import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
    customerName: string;
    customerPhone: string;
    salePrice: number;
    productSku: string;
}

export function WhatsAppButton({ customerName, customerPhone, salePrice, productSku }: WhatsAppButtonProps) {
    const handleWhatsAppClick = () => {
        // Format phone number for WhatsApp (Assuming Moroccan numbers starting with 0, replacing with 212)
        let formattedPhone = customerPhone.replace(/\s/g, '');
        if (formattedPhone.startsWith('0')) {
            formattedPhone = '212' + formattedPhone.substring(1);
        } else if (!formattedPhone.startsWith('212') && !formattedPhone.startsWith('+')) {
            formattedPhone = '212' + formattedPhone; // Fallback
        }

        // Remove any '+' sign for the wa.me link
        formattedPhone = formattedPhone.replace('+', '');

        // Pre-filled WhatsApp message in Moroccan Darija (Professional COD Confirmation)
        const message = `مرحباً ${customerName}، 👋\n\nمعك فريق تأكيد الطلبات من شركة *Errayhany Grossiste*.\n\nتلقينا طلبك بخصوص: *${productSku || 'منتج إلكتروني'}*\nالمبلغ الإجمالي للدفع عند الاستلام هو: *${salePrice} درهم* (التوصيل مجاني).\n\nهل نؤكد لك إرسال الطلبية مع شركة الشحن؟ 📦🚚`;

        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);
        
        // Open WhatsApp
        window.open(`https://wa.me/${formattedPhone}?text=${encodedMessage}`, '_blank');
    };

    return (
        <button
            onClick={handleWhatsAppClick}
            className="inline-flex items-center gap-1.5 rounded-md bg-[#25D366] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#128C7E] transition-colors"
            title="Confirm via WhatsApp"
        >
            <MessageCircle className="h-3.5 w-3.5" />
            تأكيد (WhatsApp)
        </button>
    );
}
