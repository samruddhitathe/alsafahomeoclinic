
import React from 'react';

const Gallery: React.FC = () => {
  const images = [
    { url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800', alt: 'Clinic Interior' },
    { url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800', alt: 'Consultation Room' },
    { url: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&q=80&w=800', alt: 'Medicine Preparation' },
    { url: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=800', alt: 'Reception Area' }
  ];

  return (
    <div className="container mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold text-stone-900">Clinic Gallery</h2>
        <p className="text-xl text-stone-600 font-light">
          A clean, warm, and professional environment designed for your comfort and healing.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {images.map((img, index) => (
          <div 
            key={index} 
            className="group relative aspect-square overflow-hidden rounded-2xl md:rounded-[2rem] shadow-md"
          >
            <img 
              src={img.url} 
              alt={img.alt} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-emerald-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white font-medium bg-black/20 px-4 py-2 rounded-full backdrop-blur-md">{img.alt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
