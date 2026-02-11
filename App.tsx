
import React, { useState, useEffect } from 'react';
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
import AdminDashboard from './components/AdminDashboard';
import { AdminProvider, useAdmin } from './contexts/AdminContext';

const AppContent: React.FC = () => {
  const { isAdmin } = useAdmin();
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    // Check URL hash for admin dashboard
    const hash = window.location.hash;
    if (hash === '#admin-dashboard' && isAdmin) {
      setShowDashboard(true);
    } else {
      setShowDashboard(false);
    }

    // Listen for hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash;
      if (newHash === '#admin-dashboard' && isAdmin) {
        setShowDashboard(true);
      } else {
        setShowDashboard(false);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isAdmin]);

  // Show admin dashboard if logged in and hash is #admin-dashboard
  if (showDashboard && isAdmin) {
    return <AdminDashboard />;
  }

  // Show main website
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

const App: React.FC = () => {
  return (
    <AdminProvider>
      <AppContent />
    </AdminProvider>
  );
};

export default App;
