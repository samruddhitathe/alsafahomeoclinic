
import React from 'react';
import { TIMELINE } from '../constants';
import { Users } from 'lucide-react';

const ExperienceTimeline: React.FC = () => {
  // Double the timeline items to create a seamless infinite loop
  const duplicatedTimeline = [...TIMELINE, ...TIMELINE];

  return (
    <div className="container mx-auto px-6 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 leading-tight">A Journey of Healing & Growth</h2>
          <p className="text-lg text-stone-600 font-light leading-relaxed">
            Decades of dedication to classical homeopathy and patient care
          </p>
        </div>
        
        {/* Compact Summary Header */}
        <div className="hidden lg:flex items-center gap-6 bg-stone-900 text-white px-6 py-4 rounded-3xl shadow-lg shrink-0">
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Experience</p>
            <p className="text-lg font-bold">30+ Years</p>
          </div>
          <div className="h-8 w-px bg-stone-700"></div>
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Impact</p>
            <p className="text-lg font-bold">30,000+ Lives</p>
          </div>
        </div>
      </div>

      {/* Automatic Flowing Wrapper */}
      <div className="relative -mx-6 px-6">
        {/* The animate-marquee class handles the flow and pause-on-hover logic */}
        <div className="animate-marquee gap-8 py-10">
          {duplicatedTimeline.map((event, index) => (
            <div 
              key={index} 
              className="relative group w-[280px] sm:w-[320px] lg:w-[350px] flex-shrink-0 z-10"
            >
              {/* Timeline Connector Line Fragment - Span beyond width to cover the gap-8 (32px) */}
              <div className="absolute top-0 left-[-16px] right-[-16px] h-0.5 bg-stone-200 -z-10"></div>
              
              {/* Timeline Marker - Placed exactly on the line at the top-center of the card group */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-4 border-emerald-700 rounded-full z-20 group-hover:scale-125 transition-all duration-300 shadow-sm"></div>

              {/* Content Card - Added margin-top to start below the marker/line */}
              <div className="mt-4 bg-white p-6 rounded-[1.5rem] border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-500 group-hover:border-emerald-100 h-full flex flex-col group-hover:-translate-y-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-emerald-800 font-serif italic">{event.year}</span>
                  <div className="flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                    <Users size={10} />
                    <span>{event.patients}</span>
                  </div>
                </div>
                
                <h4 className="text-lg font-bold text-stone-900 mb-1">{event.title}</h4>
                <p className="text-[10px] font-bold text-emerald-700/60 uppercase tracking-widest mb-3">{event.milestone}</p>
                
                <p className="text-stone-600 font-light leading-relaxed italic text-xs border-l-2 border-stone-100 pl-3 mt-auto">
                  "{event.story}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Gradient Overlays for smooth edges */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-stone-50 to-transparent pointer-events-none z-20"></div>
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-stone-50 to-transparent pointer-events-none z-20"></div>
      </div>
      
      {/* Mobile-only Summary and Scroll Indicator */}
      <div className="lg:hidden mt-8 flex flex-col items-center gap-4">
        <div className="flex items-center gap-6 bg-stone-900 text-white px-6 py-4 rounded-[2rem] shadow-xl">
          <p className="text-sm font-bold">30+ Years</p>
          <div className="h-6 w-px bg-stone-700"></div>
          <p className="text-sm font-bold">30,000+ Lives Touched</p>
       </div>
       <p className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.2em]">
         A flowing journey of healing
       </p>
      </div>
    </div>
  );
};

export default ExperienceTimeline;
