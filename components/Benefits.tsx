
import React from 'react';
import { BENEFITS } from '../constants';

const Benefits: React.FC = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold text-stone-900">Why Choose Homeopathy?</h2>
        <p className="text-xl text-stone-600 font-light">
          A time-tested, scientific system of medicine that works in harmony with your body.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {BENEFITS.map((benefit, index) => (
          <div 
            key={index} 
            className="bg-white/70 backdrop-blur-sm p-8 rounded-[2rem] border border-white/50 shadow-md flex flex-col items-center text-center space-y-6 hover:shadow-xl transition-all"
          >
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700">
              {benefit.icon}
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-stone-900">{benefit.title}</h3>
              <p className="text-stone-600 leading-relaxed font-light">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 bg-emerald-900 rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 text-white">
        <div className="flex-1 space-y-6">
          <h3 className="text-3xl md:text-4xl font-bold">Personalized Treatment Plans</h3>
          <p className="text-lg opacity-90 leading-relaxed font-light">
            In homeopathy, we don't treat the name of the disease; we treat the person suffering. Two patients with the same illness might receive different remedies based on their unique constitution and symptoms. This is true individualized care.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
              <span>Detailed Case History Analysis</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
              <span>Constitutional Remedies</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
              <span>Dietary & Lifestyle Guidance</span>
            </li>
          </ul>
        </div>
        <div className="flex-shrink-0 w-full md:w-1/3 aspect-square rounded-3xl overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800" 
            alt="Nature Inspired Healing" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Benefits;
