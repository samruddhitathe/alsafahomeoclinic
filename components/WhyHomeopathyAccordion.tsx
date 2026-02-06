
import React, { useState } from 'react';
import { Plus, Minus, ShieldCheck, MessageCircle, Sparkles, ClipboardCheck } from 'lucide-react';
import { FAQ_DATA } from '../constants';

const WhyHomeopathyAccordion: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - Minimal and Clean */}
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
            <Sparkles size={12} className="animate-pulse" />
            <span>Interactive Guide</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 leading-tight">
            Why Choose Homeopathy?
          </h2>
          <p className="text-stone-500 text-sm font-light max-w-2xl mx-auto italic">
            "Treating the person, not just the disease. Explore our approach through common patient inquiries."
          </p>
        </div>

        {/* Mobile View: Classic Accordion (Hidden on LG) */}
        <div className="lg:hidden space-y-3">
          {FAQ_DATA.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <div 
                key={index} 
                className={`group border transition-all duration-300 rounded-2xl overflow-hidden ${
                  isActive 
                    ? 'border-emerald-200 bg-white shadow-md' 
                    : 'border-stone-100 bg-stone-50/50'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className={`text-sm font-bold leading-tight ${isActive ? 'text-emerald-900' : 'text-stone-800'}`}>
                    {item.question}
                  </span>
                  <div className={`shrink-0 ml-4 p-1.5 rounded-full transition-all ${
                    isActive ? 'bg-emerald-800 text-white' : 'bg-stone-200/50 text-stone-400'
                  }`}>
                    {isActive ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${isActive ? 'max-h-60' : 'max-h-0'}`}>
                  <div className="px-5 pb-5 text-stone-600 text-sm leading-relaxed font-light italic border-t border-stone-50 pt-3">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop View: Horizontal Grid Navigator (Master-Detail) */}
        <div className="hidden lg:grid grid-cols-[1.2fr_1fr] gap-10 items-stretch min-h-[450px]">
          
          {/* Left: Compact Horizontal-ish Grid of Questions */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <ClipboardCheck size={18} className="text-emerald-700" />
              <span className="text-xs font-black uppercase tracking-widest text-stone-400">Select an Inquiry</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {FAQ_DATA.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`relative text-left p-5 rounded-[1.5rem] transition-all flex flex-col gap-3 group border ${
                    activeIndex === index 
                      ? 'bg-emerald-900 text-white border-emerald-900 shadow-xl ring-4 ring-emerald-50/50 scale-[1.02] z-10' 
                      : 'bg-white hover:bg-emerald-50 text-stone-700 border-stone-100 hover:border-emerald-200'
                  }`}
                >
                  <span className={`text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center shrink-0 border ${
                    activeIndex === index ? 'bg-emerald-800 border-emerald-700 text-emerald-200' : 'bg-stone-50 border-stone-200 text-stone-400 group-hover:bg-emerald-100 group-hover:text-emerald-600'
                  }`}>
                    {index + 1}
                  </span>
                  <span className="text-xs font-bold leading-relaxed">{item.question}</span>
                  
                  {/* Active Indicator Bar */}
                  {activeIndex === index && (
                    <div className="absolute right-3 bottom-3 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
            
            <p className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.2em] pt-2">
              Showing {activeIndex + 1} of {FAQ_DATA.length} patient perspectives
            </p>
          </div>

          {/* Right: Focused Detail Pane (Sticky) */}
          <div className="relative">
            <div className="sticky top-32 bg-stone-900 rounded-[3rem] p-10 shadow-2xl overflow-hidden group min-h-[400px] flex flex-col justify-center">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
              
              <div className="relative z-10 space-y-8 animate-in fade-in zoom-in duration-500" key={activeIndex}>
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 text-emerald-400 font-black text-[10px] uppercase tracking-widest">
                    <MessageCircle size={14} />
                    <span>The Clinical Answer</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white leading-tight">
                    {FAQ_DATA[activeIndex].question}
                  </h3>
                </div>

                <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <ShieldCheck size={20} className="text-emerald-400" />
                    <span className="font-bold text-emerald-100 text-xs uppercase tracking-widest">Safe & Effective Path</span>
                  </div>
                  <p className="text-lg text-stone-300 font-light leading-relaxed italic">
                    "{FAQ_DATA[activeIndex].answer}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4">
                   <div className="flex -space-x-2">
                      {[4, 5, 6].map((i) => (
                        <img key={i} src={`https://i.pravatar.cc/100?img=${i + 20}`} className="w-8 h-8 rounded-full border-2 border-stone-800" alt="Patient" />
                      ))}
                      <div className="w-8 h-8 rounded-full border-2 border-stone-800 bg-emerald-900 flex items-center justify-center text-[10px] font-bold text-emerald-200">
                        +12
                      </div>
                   </div>
                   <div className="text-[10px] text-emerald-500/60 font-black uppercase tracking-widest">
                      Alsafa Methodology
                   </div>
                </div>
              </div>
              
              {/* Watermark */}
              <ShieldCheck className="absolute -bottom-10 -left-10 w-40 h-40 text-white/5 rotate-12" />
            </div>
          </div>

        </div>

        {/* Footnote */}
        <div className="mt-12 text-center">
          <p className="text-stone-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] opacity-50">
            Consultation required for personalized treatment plans
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyHomeopathyAccordion;
