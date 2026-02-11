import React, { useEffect, useState } from 'react';
import { Languages } from 'lucide-react';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const GoogleTranslate: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<'en' | 'mr'>('mr');

  useEffect(() => {
    // Set Google Translate cookie to Marathi by default
    const setGoogleTranslateCookie = (lang: string) => {
      document.cookie = `googtrans=/en/${lang}; path=/; max-age=31536000`;
      document.cookie = `googtrans=/en/${lang}; path=/; domain=${window.location.hostname}; max-age=31536000`;
    };

    // Check current language from cookie
    const getCurrentLanguage = (): 'en' | 'mr' => {
      const cookies = document.cookie.split(';');
      const googleTransCookie = cookies.find(cookie =>
        cookie.trim().startsWith('googtrans=')
      );
      
      if (googleTransCookie && googleTransCookie.includes('/en/en')) {
        return 'en';
      }
      return 'mr';
    };

    // Set initial language to Marathi if no cookie exists
    const initialLang = getCurrentLanguage();
    setCurrentLang(initialLang);
    
    if (!document.cookie.includes('googtrans=')) {
      setGoogleTranslateCookie('mr');
    }

    // Add Google Translate script
    const addScript = () => {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

    // Initialize Google Translate (hidden)
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'mr,en',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };

    // Load the script
    if (!document.querySelector('script[src*="translate.google.com"]')) {
      addScript();
    }

    return () => {
      delete window.googleTranslateElementInit;
    };
  }, []);

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'mr' : 'en';
    
    // Update cookie
    document.cookie = `googtrans=/en/${newLang}; path=/; max-age=31536000`;
    document.cookie = `googtrans=/en/${newLang}; path=/; domain=${window.location.hostname}; max-age=31536000`;
    
    // Reload page to apply translation
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-2">
      {/* Custom Language Toggle Button - Only Icon */}
      <button
        onClick={toggleLanguage}
        className="flex items-center justify-center bg-emerald-50 border-2 border-emerald-200 rounded-full p-2.5 hover:bg-emerald-100 transition-all hover:scale-110 active:scale-95"
        title={currentLang === 'mr' ? 'Switch to English' : 'Switch to Marathi'}
      >
        <Languages size={20} className="text-emerald-700" />
      </button>
      
      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" className="hidden"></div>
      <style>{`
        /* Hide Google Translate banner and top bar */
        .goog-te-banner-frame {
          display: none !important;
        }
        
        .goog-te-banner-frame.skiptranslate {
          display: none !important;
        }
        
        body {
          top: 0 !important;
          position: static !important;
        }
        
        /* Hide the Google Translate widget completely */
        #google_translate_element {
          display: none !important;
        }
        
        .skiptranslate {
          display: none !important;
        }
        
        /* Ensure no top spacing from Google Translate */
        body > .skiptranslate {
          display: none !important;
        }
        
        iframe.skiptranslate {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default GoogleTranslate;