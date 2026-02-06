
import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { SERVICES, WHATSAPP_NUMBER, WHATSAPP_INQUIRY_MESSAGE } from '../constants';

const Services: React.FC = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold text-stone-900">Conditions Treated</h2>
        <p className="text-xl text-stone-600 font-light leading-relaxed">
          We offer comprehensive homeopathic care for a wide range of acute and chronic health concerns using safe, natural medicines.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {SERVICES.map((service) => (
          <div 
            key={service.id} 
            className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all duration-300 group hover:-translate-y-1"
          >
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              {service.icon}
            </div>
            <h3 className="text-2xl font-bold text-stone-900 mb-3">{service.title}</h3>
            <p className="text-stone-600 leading-relaxed font-light">
              {service.description}
            </p>
          </div>
        ))}

        <div className="bg-emerald-800 p-8 rounded-3xl shadow-xl flex flex-col justify-center items-center text-center text-white space-y-6 border border-emerald-700">
          <h3 className="text-2xl font-bold">Many More...</h3>
          <p className="opacity-90 font-light leading-relaxed">
            Don't see your condition listed? We treat many other health issues holistically.
          </p>
          <div className="flex flex-col w-full gap-3">
            <a 
              href="#appointment"
              className="w-full bg-white text-emerald-800 px-6 py-4 rounded-2xl font-bold hover:bg-stone-50 transition-all shadow-lg flex items-center justify-center gap-2 group/btn active:scale-95"
            >
              <span>Inquire Now</span>
              <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
            </a>
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_INQUIRY_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-100 text-sm font-medium hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle size={16} />
              Chat about your condition
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
