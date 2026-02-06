
import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { CLINIC_NAME, PHONE_NUMBER } from '../constants';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Doctors', href: '#doctors', id: 'doctors' },
    { name: 'Journey', href: '#journey', id: 'journey' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Stories', href: '#healing-stories', id: 'healing-stories' },
    { name: 'Why Us', href: '#why-homeopathy', id: 'why-homeopathy' },
    { name: 'Gallery', href: '#gallery', id: 'gallery' },
    { name: 'Contact', href: '#appointment', id: 'appointment' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Intersection Observer for Scroll Spy
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    navLinks.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex flex-col shrink-0">
          <a href="#home" className="group">
            <span className="text-xl md:text-2xl font-bold text-emerald-800 tracking-tight block leading-none">
              {CLINIC_NAME.split(' ')[0]}
            </span>
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold block group-hover:text-emerald-700 transition-colors">
              Homeopathic Clinic
            </span>
          </a>
        </div>

        {/* Desktop Nav - Using 2xl to fit more links comfortably */}
        <nav className="hidden 2xl:flex items-center space-x-1">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`px-3 py-2 rounded-full text-[13px] font-bold transition-all relative ${
                activeSection === link.id 
                  ? 'text-emerald-800' 
                  : 'text-stone-500 hover:text-emerald-700'
              }`}
            >
              {link.name}
              {activeSection === link.id && (
                <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-emerald-600 rounded-full animate-in fade-in zoom-in duration-300"></span>
              )}
            </a>
          ))}
          <div className="pl-2">
            <a 
              href={`tel:${PHONE_NUMBER}`}
              className="flex items-center gap-2 bg-emerald-800 text-white px-5 py-2.5 rounded-full hover:bg-emerald-900 transition-all shadow-[0_10px_20px_-5px_rgba(6,95,70,0.3)] active:scale-95 text-xs font-bold"
            >
              <Phone size={14} />
              <span>Call Now</span>
            </a>
          </div>
        </nav>

        {/* Mobile/Tablet Menu Toggle */}
        <button 
          className="2xl:hidden text-stone-700 p-2 hover:bg-stone-100 rounded-xl transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <div className={`2xl:hidden fixed inset-0 top-[64px] bg-white transition-all duration-300 ease-in-out overflow-y-auto ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="flex flex-col p-6 space-y-1 pb-24">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-lg py-3 px-6 rounded-2xl font-bold transition-all ${
                activeSection === link.id 
                  ? 'bg-emerald-50 text-emerald-800' 
                  : 'text-stone-600 active:bg-stone-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-6">
            <a 
              href={`tel:${PHONE_NUMBER}`}
              className="bg-emerald-800 text-white py-4 rounded-2xl font-bold shadow-xl text-lg flex justify-center items-center gap-3 active:scale-95 transition-transform"
              onClick={() => setIsMenuOpen(false)}
            >
              <Phone size={22} />
              Book Appointment
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
