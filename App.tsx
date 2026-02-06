
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import DoctorProfile from './components/DoctorProfile';
import Services from './components/Services';
import About from './components/About';
import ExperienceTimeline from './components/ExperienceTimeline';
import WhyHomeopathyAccordion from './components/WhyHomeopathyAccordion';
import HealingStories from './components/HealingStories';
import Gallery from './components/Gallery';
import ContactLocation from './components/ContactLocation';
import Footer from './components/Footer';
import StickyCTA from './components/StickyCTA';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />

      <main className="flex-grow">
        <section id="home" className="scroll-mt-0">
          <Hero />
        </section>

        {/* Professional Profiles Section */}
        <section id="doctors" className="scroll-mt-24">
          <DoctorProfile />
        </section>

        {/* Grouped Professional Narrative */}
        <div className="bg-stone-50">
          <section id="journey" className="py-16 scroll-mt-24 overflow-hidden border-b border-stone-200/50">
            <ExperienceTimeline />
          </section>
        </div>

        <section id="services" className="py-20 bg-stone-50 scroll-mt-24">
          <Services />
        </section>

        <section id="about" className="py-20 bg-white scroll-mt-24">
          <About />
        </section>

        {/* Mobile Optimized Q&A Section */}
        <section id="why-homeopathy" className="py-20 bg-emerald-50/20 scroll-mt-24">
          <WhyHomeopathyAccordion />
        </section>

        <section id="healing-stories" className="py-20 bg-white scroll-mt-24">
          <HealingStories />
        </section>

        <section id="gallery" className="py-20 bg-stone-50 scroll-mt-24">
          <Gallery />
        </section>

        <section id="appointment" className="py-20 bg-white scroll-mt-24">
          <ContactLocation />
        </section>
      </main>

      <Footer />

      {/* Sticky Mobile/Desktop CTAs */}
      <StickyCTA />
    </div>
  );
};

export default App;
