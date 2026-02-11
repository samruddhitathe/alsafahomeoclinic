
import React from 'react';
import { Phone, MessageCircle, ShieldCheck, Star } from 'lucide-react';
import { DOCTOR_1_NAME, DOCTOR_2_NAME, DOCTOR_QUAL, PHONE_NUMBER, WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '../constants';
import { useAdmin } from '../contexts/AdminContext';

const Hero: React.FC = () => {
  const { content } = useAdmin();
  return (
    <div className="relative min-h-[90vh] md:min-h-screen flex items-center pt-24 pb-12 md:pb-24 overflow-hidden bg-[#faf9f6]">
      {/* Organic Background Elements */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-emerald-50 rounded-full blur-[80px] md:blur-[120px] opacity-60 animate-pulse transition-all duration-[10s]"></div>
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-stone-200/40 rounded-full blur-[80px] md:blur-[100px] opacity-40"></div>
      
      {/* Subtle Leaf Pattern Overlay (SVG) */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5c-5 10-15 15-15 25s10 15 15 25c5-10 15-15 15-25S35 15 30 5z' fill='%23065f46' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`, backgroundSize: '120px' }}></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Clinic Information */}
          <div className="space-y-6 md:space-y-8 text-center md:text-left animate-in fade-in slide-in-from-left duration-700">
          <div className="inline-flex items-center gap-2 bg-emerald-50/80 backdrop-blur-sm text-emerald-900 px-4 py-2 rounded-full text-[11px] md:text-xs font-black tracking-widest uppercase border border-emerald-200/50 shadow-sm mx-auto md:mx-0">
            <ShieldCheck size={14} className="text-emerald-700" />
            <span>100% Natural & Holistic Care</span>
            </div>

            <div className="space-y-4 md:space-y-6">
              <h1 className="text-5xl sm:text-6xl md:text-5xl lg:text-[5.5rem] font-bold text-stone-900 leading-[1] md:leading-[1.05] tracking-tight">
                Alsafa <br className="hidden md:block" />
                <span className="text-emerald-900 italic font-serif relative inline-block">
                  Homoeo Clinic
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-emerald-200/40 -z-10" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 5C50 2 150 8 200 5" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
                  </svg>
                </span>
              </h1>
              
              <div className="space-y-3 flex flex-col items-center md:items-start">
                <p className="text-xl md:text-2xl text-stone-600 font-light leading-relaxed max-w-lg">
                  Personalized constitutional care by <span className="font-semibold text-stone-900">{DOCTOR_1_NAME}</span> & <span className="font-semibold text-stone-900">{DOCTOR_2_NAME}</span>.
                </p>
                <div className="flex items-center gap-2 text-emerald-800 font-bold italic text-lg">
                  <span className="w-8 h-0.5 bg-emerald-200"></span>
                  {DOCTOR_QUAL}
                </div>
              </div>
            </div>

            {/* Core CTAs - Single Row on Mobile, Centered on Mobile */}
            <div className="flex flex-row justify-center md:justify-start gap-2.5 sm:gap-5 pt-6 md:pt-4">
              <a 
                href={`tel:${PHONE_NUMBER}`}
                aria-label="Call clinic to book appointment"
                className="flex-1 group relative flex items-center justify-center gap-2 sm:gap-4 bg-emerald-900 text-white px-2 py-5 sm:px-8 sm:py-5.5 rounded-[1.25rem] sm:rounded-[1.5rem] text-sm sm:text-lg lg:text-xl font-bold shadow-[0_20px_40px_-12px_rgba(6,78,59,0.4)] hover:bg-black transition-all active:scale-[0.97] overflow-hidden"
              >
                <div className="p-1.5 sm:p-2 bg-emerald-800 rounded-lg group-hover:bg-emerald-700 transition-colors hidden xs:flex">
                  <Phone className="group-hover:rotate-12 transition-transform" size={18} />
                </div>
                <span className="whitespace-nowrap">Call for appointment</span>
              </a>
              
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message clinic on WhatsApp for appointment"
                className="flex-1 flex items-center justify-center gap-2 sm:gap-4 bg-white border-2 border-stone-200 text-emerald-900 px-2 py-5 sm:px-8 sm:py-5.5 rounded-[1.25rem] sm:rounded-[1.5rem] text-sm sm:text-lg lg:text-xl font-bold shadow-sm hover:border-emerald-600 hover:bg-emerald-50 transition-all active:scale-[0.97] group"
              >
                <div className="p-1.5 sm:p-2 bg-emerald-50 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-all hidden xs:flex">
                  <MessageCircle size={18} />
                </div>
                <span className="whitespace-nowrap">Inquiry on WhatsApp</span>
              </a>
            </div>

            {/* Social Proof - Centered on Mobile */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 md:gap-10 pt-10 border-t border-stone-200">
              <div className="flex items-center gap-4">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-xs font-black text-stone-800 uppercase tracking-[0.2em]">30,000+ Cases Treated</p>
              </div>
              
              <div className="h-10 w-px bg-stone-200 hidden sm:block"></div>

              <div>
                <p className="text-lg md:text-xl font-black text-stone-900 tracking-tight">20+ Years Legacy</p>
              </div>
            </div>
          </div>

          {/* Right Side: The Image */}
          <div className="relative flex justify-center md:justify-end mt-12 md:mt-0 animate-in fade-in slide-in-from-right duration-1000">
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[500px]">
              <div className="relative z-10 aspect-[4/5] rounded-[4rem] lg:rounded-[6rem] overflow-hidden shadow-2xl border-[10px] md:border-[16px] border-white group">
                <img
                  src={content.heroImage}
                  alt="Professional Homeopathic Consultation"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-transparent to-transparent flex items-end p-10 lg:p-14">
                  <div className="text-white space-y-2">
                    <p className="text-2xl md:text-3xl font-bold leading-tight font-serif italic">Treating the Person,</p>
                    <p className="text-lg md:text-xl font-light leading-tight opacity-90 tracking-wide">Not Just the Symptoms.</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Info Card */}
              <div className="absolute -bottom-10 -left-6 md:-left-12 bg-white py-6 px-8 rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] z-20 border border-emerald-50 flex items-center gap-5 animate-bounce-subtle">
                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-800">
                  <ShieldCheck size={32} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-black">Expert Care</p>
                  <p className="text-xl font-black text-stone-900 leading-none mt-1">Top Rated</p>
                </div>
              </div>

              <div className="absolute -z-10 -bottom-12 -right-12 w-full h-full bg-emerald-900/5 rounded-[6rem] rotate-3 blur-3xl"></div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 text-stone-300 animate-bounce">
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-stone-400 to-transparent"></div>
      </div>
    </div>
  );
};

export default Hero;
