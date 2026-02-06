
import React from 'react';
import { MapPin, Phone, MessageCircle, Clock, Navigation, CalendarCheck } from 'lucide-react';
import { CLINIC_ADDRESS, PHONE_NUMBER, WHATSAPP_NUMBER, CLINIC_TIMINGS, WHATSAPP_MESSAGE } from '../constants';

const ContactLocation: React.FC = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900">Get in Touch</h2>
          <p className="text-xl text-stone-600 font-light max-w-2xl mx-auto">
            We are here to help you on your healing journey. Book your appointment directly via Phone or WhatsApp for the fastest response.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Location Card */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center space-y-4">
            <div className="p-4 bg-stone-50 rounded-2xl text-stone-600">
              <MapPin size={32} />
            </div>
            <h4 className="font-bold text-stone-900 text-xl">Visit Us</h4>
            <p className="text-stone-600 font-light leading-relaxed flex-grow">
              {CLINIC_ADDRESS}
            </p>
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CLINIC_ADDRESS)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-emerald-800 font-bold hover:underline pt-2 group"
            >
              <Navigation size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              Open in Maps
            </a>
          </div>

          {/* Booking Card - Focused CTA */}
          <div className="relative group bg-stone-900 p-10 rounded-[2.5rem] shadow-2xl flex flex-col items-center text-center text-white space-y-8 overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -ml-10 -mb-10"></div>

            <div className="relative z-10 space-y-4">
              <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg shadow-emerald-500/20">
                <CalendarCheck size={32} />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-2xl">Book Now</h4>
                <p className="text-stone-400 text-sm font-light">Fastest way to get a slot</p>
              </div>
            </div>

            <div className="w-full space-y-4 relative z-10">
              <a 
                href={`tel:${PHONE_NUMBER}`}
                className="flex items-center justify-center gap-3 bg-white text-stone-900 w-full py-5 rounded-[1.25rem] font-bold shadow-xl hover:bg-stone-100 transition-all active:scale-[0.98] group/btn"
              >
                <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center text-stone-900 group-hover/btn:bg-stone-200 transition-colors">
                  <Phone size={20} />
                </div>
                <span className="text-lg">Call for appointment</span>
              </a>
              
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-emerald-600 text-white w-full py-5 rounded-[1.25rem] font-bold shadow-xl hover:bg-emerald-500 transition-all active:scale-[0.98] group/btn"
              >
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white group-hover/btn:bg-emerald-400 transition-colors">
                  <MessageCircle size={20} />
                </div>
                <span className="text-lg">Inquiry on WhatsApp</span>
              </a>
            </div>

            <div className="relative z-10 flex items-center gap-2 text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
              <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Doctors Online
            </div>
          </div>

          {/* Timings Card */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center space-y-4">
            <div className="p-4 bg-stone-100 rounded-2xl text-stone-700">
              <Clock size={32} />
            </div>
            <h4 className="font-bold text-stone-900 text-xl">Clinic Hours</h4>
            <div className="w-full space-y-3 text-stone-600 text-sm">
              {CLINIC_TIMINGS.map((time, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-stone-50 pb-2">
                  <span className="font-semibold text-stone-800">{time.days.split(' ')[0]}</span>
                  <div className="text-right text-stone-500">
                    {time.morning !== "Closed" ? time.morning : time.evening}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-stone-400 pt-2 font-medium">Closed on Sundays</p>
          </div>
        </div>

        {/* Map Section */}
        <div className="rounded-[3rem] overflow-hidden shadow-2xl h-[450px] border-8 border-white">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.953735315322!3d-37.816279742021234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d1a0ad292d!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sin!4v1634567890123!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy"
            title="Clinic Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactLocation;
