
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

const Gallery: React.FC = () => {
  const { content } = useAdmin();
  const [showAll, setShowAll] = useState(false);
  
  // Show only first 4 images by default
  const displayedImages = showAll ? content.galleryImages : content.galleryImages.slice(0, 4);
  const hasMoreImages = content.galleryImages.length > 4;

  return (
    <div className="container mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold text-stone-900">Clinic Gallery</h2>
        <p className="text-xl text-stone-600 font-light">
          A clean, warm, and professional environment designed for your comfort and healing.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {displayedImages.map((img, index) => (
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

      {hasMoreImages && (
        <div className="text-center mt-12">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 bg-emerald-800 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-900 transition-all shadow-lg active:scale-95"
          >
            {showAll ? (
              <>
                <ChevronUp size={20} />
                <span>View Less</span>
              </>
            ) : (
              <>
                <ChevronDown size={20} />
                <span>View More</span>
              </>
            )}
          </button>
          {!showAll && (
            <p className="text-stone-500 text-sm mt-4">
              +{content.galleryImages.length - 4} more images
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Gallery;
