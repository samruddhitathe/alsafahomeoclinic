
import React from 'react';
import { DOCTOR_1_NAME, DOCTOR_2_NAME, DOCTOR_QUAL } from '../constants';
import { Stethoscope, Award, Heart, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
            <img
              src="dist\assets\Dr.Sayyad.jpeg"
              alt={`${DOCTOR_1_NAME} & ${DOCTOR_2_NAME}`}
              className="w-full h-full object-contain object-center"
            />
          </div>
          {/* Decorative Elements */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-50 rounded-full -z-0"></div>
          <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-stone-100 rounded-full -z-0"></div>
          
          <div className="absolute bottom-12 -left-8 bg-white p-6 rounded-3xl shadow-xl z-20 hidden lg:block border border-emerald-50 max-w-[200px]">
            <div className="flex items-center gap-3 text-emerald-700 mb-2">
              <Award className="w-8 h-8" />
              <span className="font-bold text-3xl">15+</span>
            </div>
            <p className="text-stone-600 font-medium">Combined years of clinical excellence</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900">Compassionate Care by <span className="text-emerald-800">{DOCTOR_1_NAME}</span> & <span className="text-emerald-800">{DOCTOR_2_NAME}</span></h2>
            <p className="text-lg text-emerald-700 font-medium">{DOCTOR_QUAL} - Senior Homeopathic Consultants</p>
          </div>

          <p className="text-xl text-stone-600 leading-relaxed font-light">
            With years of dedicated practice, we believe in treating the whole person, not just the disease. Our team, led by Dr. Shakir and Dr. Shabnam Sayyad, views homeopathy as a science that looks deep into the root cause—be it emotional, mental, or physical—to bring about lasting health.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-50 rounded-xl text-emerald-700">
                <Heart size={24} />
              </div>
              <div>
                <h4 className="font-bold text-stone-900">Patient Centric</h4>
                <p className="text-sm text-stone-500">We listen carefully to understand your unique story.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-stone-100 rounded-xl text-stone-700">
                <Stethoscope size={24} />
              </div>
              <div>
                <h4 className="font-bold text-stone-900">Holistic Analysis</h4>
                <p className="text-sm text-stone-500">Identifying the root triggers of your ailments.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-stone-100 rounded-xl text-stone-700">
                <Users size={24} />
              </div>
              <div>
                <h4 className="font-bold text-stone-900">Family Health</h4>
                <p className="text-sm text-stone-500">Treatments safe for children and seniors alike.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-50 rounded-xl text-emerald-700">
                <Award size={24} />
              </div>
              <div>
                <h4 className="font-bold text-stone-900">Certified Care</h4>
                <p className="text-sm text-stone-500">Expertise in complex chronic pathology.</p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <p className="text-stone-700 italic font-serif text-lg border-l-4 border-emerald-200 pl-6 py-2 mb-8">
              "Healing is a journey we take together. Our goal is to empower your body's vital force to restore balance naturally."
            </p>
            <a 
              href="#appointment" 
              className="inline-block bg-stone-900 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-stone-800 transition-all shadow-lg active:scale-95"
            >
              Learn More About Our Approach
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
