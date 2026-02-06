
import React from 'react';
import { CLINIC_NAME, PHONE_NUMBER, WHATSAPP_NUMBER, CLINIC_ADDRESS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6 col-span-1 lg:col-span-2">
            <h3 className="text-2xl font-bold text-white">
              {CLINIC_NAME.split(' ')[0]}<span className="font-normal opacity-70">{CLINIC_NAME.split(' ').slice(1).join(' ')}</span>
            </h3>
            <p className="max-w-md text-stone-400 leading-relaxed font-light">
              Providing personalized homeopathic healthcare that focuses on treating the root cause. Experience gentle healing with over 20 years of clinical expertise.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-bold text-lg">Contact Info</h4>
            <ul className="space-y-3 font-light">
              <li>{CLINIC_ADDRESS}</li>
              <li className="text-white font-medium">Phone: {PHONE_NUMBER}</li>
              <li className="text-emerald-400 font-medium">WhatsApp: {WHATSAPP_NUMBER}</li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-bold text-lg">Quick Access</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 font-light text-sm">
              <a href="#home" className="hover:text-emerald-400 transition-colors">Home</a>
              <a href="#doctors" className="hover:text-emerald-400 transition-colors">Doctors</a>
              <a href="#journey" className="hover:text-emerald-400 transition-colors">Journey</a>
              <a href="#services" className="hover:text-emerald-400 transition-colors">Services</a>
              <a href="#about" className="hover:text-emerald-400 transition-colors">About</a>
              <a href="#healing-stories" className="hover:text-emerald-400 transition-colors">Stories</a>
              <a href="#why-homeopathy" className="hover:text-emerald-400 transition-colors">Why Us</a>
              <a href="#gallery" className="hover:text-emerald-400 transition-colors">Gallery</a>
              <a href="#appointment" className="hover:text-emerald-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-stone-800 text-center space-y-4">
          <p className="text-xs text-stone-500 max-w-2xl mx-auto italic leading-loose">
            Medical Disclaimer: Homeopathy works on individual constitution. Results and healing time may vary from patient to patient. Information on this website is for educational purposes only and not a substitute for professional medical advice.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-stone-500">
            <p>&copy; {new Date().getFullYear()} {CLINIC_NAME}. All Rights Reserved.</p>
            <span className="hidden md:block opacity-20">|</span>
            <p>Designed &amp; Developed by miss. Samruddhi C. Tathe-Deshmukh</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
