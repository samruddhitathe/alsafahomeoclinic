
import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { PHONE_NUMBER, WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '../constants';

const StickyCTA: React.FC = () => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md md:hidden animate-in fade-in slide-in-from-bottom duration-500">
      <div className="bg-white/80 backdrop-blur-2xl border border-white/40 p-2.5 rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] flex gap-2.5">
        <a 
          href={`tel:${PHONE_NUMBER}`}
          className="flex-1 flex items-center justify-center gap-2 bg-stone-900 text-white py-4.5 rounded-[1.5rem] font-bold shadow-lg active:scale-95 transition-all"
        >
          <Phone size={18} className="fill-white" />
          <span className="text-sm">Call for appointment</span>
        </a>
        <a 
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 text-white py-4.5 rounded-[1.5rem] font-bold shadow-lg active:scale-95 transition-all"
        >
          <MessageCircle size={18} className="fill-white" />
          <span className="text-sm">Inquiry on WhatsApp</span>
        </a>
      </div>
    </div>
  );
};

export default StickyCTA;
