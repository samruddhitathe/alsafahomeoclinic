
import React from 'react';
import { History, Timer, Stethoscope, User, ArrowDown } from 'lucide-react';
import { CASE_STUDIES } from '../constants';

const HealingStories: React.FC = () => {
  // Duplicate the case studies to create a seamless infinite scroll loop
  const duplicatedStudies = [...CASE_STUDIES, ...CASE_STUDIES, ...CASE_STUDIES];

  return (
    <div className="container mx-auto px-6 overflow-hidden">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold text-stone-900">Real Healing Stories</h2>
        <p className="text-xl text-stone-600 font-light leading-relaxed">
          A continuous look at authentic case studies illustrating the depth and methodology of professional homeopathic care.
        </p>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative -mx-6 px-6">
        <div className="animate-marquee flex gap-8 py-10">
          {duplicatedStudies.map((study, index) => (
            <div 
              key={`${study.id}-${index}`} 
              className="flex flex-col space-y-3 w-[320px] md:w-[400px] flex-shrink-0 group"
            >
              {/* Primary Card: Clinical Story */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm flex flex-col relative z-10 transition-all duration-500 group-hover:shadow-xl group-hover:border-emerald-100 group-hover:-translate-y-1">
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                    Case Study
                  </div>
                  <div className="flex items-center gap-1.5 text-stone-400 text-[11px] font-medium">
                    <User size={12} />
                    <span>{study.patientInfo}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <h3 className="text-2xl font-bold text-stone-900 leading-tight group-hover:text-emerald-900 transition-colors">
                    {study.condition}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-[13px]">
                    <div className="flex items-center gap-1.5 text-stone-500">
                      <History size={14} className="text-stone-300" />
                      <span>History: <span className="text-stone-700 font-bold">{study.historyDuration}</span></span>
                    </div>
                    <div className="flex items-center gap-1.5 text-stone-500">
                      <Timer size={14} className="text-stone-300" />
                      <span>Course: <span className="text-stone-700 font-bold">{study.treatmentDuration}</span></span>
                    </div>
                  </div>
                </div>

                <div className="bg-stone-50/50 p-5 rounded-2xl border border-stone-100/50 mb-4 flex-grow">
                  <p className="text-stone-600 leading-relaxed text-sm font-light italic">
                    "{study.outcome}"
                  </p>
                </div>
                
                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-tighter text-emerald-800/60 mt-2">
                  <span>Clinical Result</span>
                  <div className="flex items-center gap-2">
                     <span className="w-12 h-1 bg-stone-100 rounded-full overflow-hidden">
                        <span 
                          className="block h-full bg-emerald-500 transition-all duration-1000"
                          style={{ width: `${study.improvementLevel}%` }}
                        ></span>
                     </span>
                     <span>{study.improvementLevel}% Better</span>
                  </div>
                </div>
              </div>

              {/* Visual Connector */}
              <div className="flex justify-center -my-1 relative z-20">
                <div className="bg-stone-100 p-1.5 rounded-full border-2 border-white shadow-sm group-hover:scale-110 transition-transform">
                  <ArrowDown size={14} className="text-stone-400 group-hover:text-emerald-600 transition-colors" />
                </div>
              </div>

              {/* Secondary Card: Doctor's Insight */}
              <div className="bg-stone-900 text-stone-300 p-8 rounded-[2.5rem] shadow-sm flex flex-col transition-all duration-500 group-hover:bg-black">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 bg-emerald-900/50 rounded-lg text-emerald-400 group-hover:bg-emerald-800 transition-colors">
                    <Stethoscope size={16} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500/80">Doctor's Insight</span>
                </div>
                
                <p className="text-stone-400 text-sm leading-relaxed font-light">
                  {study.doctorsInsight}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Gradient Overlays for smooth edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-20"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-20"></div>
      </div>

      <div className="mt-12 text-center space-y-6">
        <p className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.3em] animate-pulse">
          Hover over any card to pause and read carefully
        </p>
        
        <div className="py-8 border-t border-stone-100">
          <p className="text-stone-400 text-[11px] font-medium tracking-wide uppercase max-w-xl mx-auto">
            These narratives are documented clinical outcomes. 
            Homeopathy addresses the individual blueprint, ensuring a unique path to recovery for every patient.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HealingStories;
