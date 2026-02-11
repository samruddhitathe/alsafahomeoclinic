
import React from 'react';
import { PHILOSOPHY_PILLARS, DOCTOR_1_NAME } from '../constants';
import { Quote } from 'lucide-react';

const Philosophy: React.FC = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: First Person Message */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900">My Approach to Healing</h2>
            <div className="w-16 h-1 bg-emerald-700 rounded-full"></div>
          </div>

          <div className="relative pt-4">
            <Quote className="absolute -top-2 -left-4 w-10 h-10 text-emerald-50" />
            <p className="relative z-10 text-xl text-stone-700 font-serif italic leading-snug">
              "True healing comes from understanding the individual, not just the disease."
            </p>
          </div>

          <p className="text-base text-stone-600 font-light leading-relaxed">
            I believe in treating each patient as a unique individual. My practice is rooted in classical homeopathy, where I take time to understand not just your symptoms, but your complete health picture—physical, mental, and emotional.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <img 
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=150" 
              alt={DOCTOR_1_NAME} 
              className="w-12 h-12 rounded-full object-cover border border-emerald-100"
            />
            <div>
              <p className="font-bold text-stone-900 text-sm">{DOCTOR_1_NAME}</p>
              <p className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">Chief Consultant</p>
            </div>
          </div>
        </div>

        {/* Right Column: Philosophy Pillars */}
        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
          {PHILOSOPHY_PILLARS.map((pillar, index) => (
            <div 
              key={index} 
              className="bg-stone-50/50 p-6 rounded-[1.5rem] border border-stone-100 hover:shadow-md hover:bg-white transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-700 mb-4 group-hover:bg-emerald-700 group-hover:text-white transition-colors duration-300">
                {React.cloneElement(pillar.icon as React.ReactElement, { size: 20 })}
              </div>
              <h4 className="text-lg font-bold text-stone-900 mb-2">{pillar.title}</h4>
              <p className="text-stone-500 font-light leading-relaxed text-xs">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Philosophy;
