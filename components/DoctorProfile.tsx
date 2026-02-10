
import React from 'react';
import { DOCTORS } from '../constants';

const DoctorProfile: React.FC = () => {
  return (
    <div className="bg-white py-20 border-y border-stone-100">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Meet Our Expert Consultants</h2>
          <div className="w-20 h-1 bg-emerald-700 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {DOCTORS.map((doc, idx) => (
            <div key={idx} className="flex flex-col md:flex-row gap-8 items-center md:items-start group">
              <div className="w-full md:w-1/3 aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className={`w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105 ${doc.name === 'Dr. Shakir Sayyad' ? 'object-top' : 'object-center'}`}
                />
              </div>
              <div className="flex-1 space-y-4 text-center md:text-left">
                <div>
                  <h3 className="text-3xl font-bold text-stone-900">{doc.name}</h3>
                  <p className="text-emerald-700 font-semibold tracking-wide uppercase text-sm">{doc.qual}</p>
                </div>
                <div className="relative">
                  <p className="text-lg text-stone-600 leading-relaxed font-light italic border-l-2 border-emerald-100 pl-4 py-1">
                    "{doc.philosophy}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
