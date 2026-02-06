
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold text-stone-900">Healing Stories</h2>
        <p className="text-xl text-stone-600 font-light">
          Real experiences from patients who found relief through our gentle homeopathic approach.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((testimonial) => (
          <div 
            key={testimonial.id} 
            className="bg-stone-50 p-10 rounded-[2.5rem] border border-stone-100 relative group hover:bg-white hover:shadow-xl hover:border-emerald-100 transition-all duration-500"
          >
            <Quote className="absolute top-8 right-10 text-emerald-100/50 w-12 h-12 z-0" />
            <div className="relative z-10 space-y-4">
              <div className="flex gap-1 text-amber-400">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="text-lg text-stone-700 leading-relaxed italic">
                "{testimonial.comment}"
              </p>
              <div className="pt-4 border-t border-stone-200/60">
                <p className="font-bold text-stone-900">{testimonial.name}</p>
                <p className="text-sm text-stone-500">{testimonial.condition}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
