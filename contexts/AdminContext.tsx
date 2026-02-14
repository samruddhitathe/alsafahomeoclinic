import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContent {
  heroImage: string;
  healingStories: Array<{
    id: string;
    image: string;
    condition: string;
    historyDuration: string;
    treatmentDuration: string;
    outcome: string;
    patientInfo: string;
    improvementLevel: number;
    doctorsInsight: string;
  }>;
  galleryImages: Array<{
    url: string;
    alt: string;
  }>;
}

interface AdminContextType {
  isAdmin: boolean;
  isLoading: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  content: AdminContent;
  updateHeroImage: (url: string) => Promise<void>;
  updateHealingStory: (id: string, updates: Partial<AdminContent['healingStories'][0]>) => Promise<void>;
  addHealingStory: (story: AdminContent['healingStories'][0]) => void;
  removeHealingStory: (id: string) => void;
  addGalleryImage: (url: string, alt: string) => Promise<void>;
  removeGalleryImage: (index: number) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_PASSWORD = 'admin123'; // In production, use proper authentication
const API_BASE_URL = 'http://localhost:3001/api';

const defaultContent: AdminContent = {
  heroImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200',
  healingStories: [
    {
      id: 'cs1',
      image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&q=80&w=800',
      condition: 'Chronic Psoriasis',
      historyDuration: '10 Years',
      treatmentDuration: '14 Months',
      outcome: 'Complete clearance of plaques. Skin texture restored without dependence on steroids. No relapse in 2 years of follow-up.',
      patientInfo: 'A.R., 34 Male',
      improvementLevel: 95,
      doctorsInsight: 'Skin conditions often mirror internal stress and digestive health. Healing requires patience as the body resets its inflammatory response at a cellular level.'
    },
    {
      id: 'cs2',
      image: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=800',
      condition: 'Migraine & Sinusitis',
      historyDuration: '6 Years',
      treatmentDuration: '9 Months',
      outcome: 'Intensity and frequency of attacks reduced by 90%. Patient has successfully stopped daily use of analgesics and anti-inflammatory drugs.',
      patientInfo: 'V.S., 28 Female',
      improvementLevel: 92,
      doctorsInsight: 'Chronic headaches are often tied to constitutional sensitivities. We focus on desensitizing the patient to triggers while improving the vascular stability of the cranial nerves.'
    },
    {
      id: 'cs3',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
      condition: 'PCOS & Irregularity',
      historyDuration: '2 Years',
      treatmentDuration: '12 Months',
      outcome: 'Cycles regularized within 4 months. Follow-up ultrasound confirmed a significant reduction in cystic volume. Improved overall energy and skin health.',
      patientInfo: 'R.M., 24 Female',
      improvementLevel: 88,
      doctorsInsight: 'Homeopathy addresses hormonal disruption at its source—the pituitary-ovarian axis. It stimulates the body\'s own corrective mechanisms rather than providing synthetic hormones.'
    }
  ],
  galleryImages: [
    { url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800', alt: 'Clinic Interior' },
    { url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800', alt: 'Consultation Room' },
    { url: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&q=80&w=800', alt: 'Medicine Preparation' },
    { url: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=800', alt: 'Reception Area' },
    { url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800', alt: 'Waiting Area' },
    { url: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&q=80&w=800', alt: 'Treatment Room' },
    { url: 'https://images.unsplash.com/photo-1629909615957-be38b9e8e4c4?auto=format&fit=crop&q=80&w=800', alt: 'Pharmacy Section' },
    { url: 'https://images.unsplash.com/photo-1631815588091-d3a8f4c8e8c4?auto=format&fit=crop&q=80&w=800', alt: 'Doctor Consultation' }
  ]
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState<AdminContent>(defaultContent);

  // Fetch content from API on mount
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/content`);
        if (response.ok) {
          const data = await response.json();
          setContent(data);
        }
      } catch (error) {
        console.log('Using default content - backend not available');
        // Fall back to localStorage if API is not available
        const savedContent = localStorage.getItem('adminContent');
        if (savedContent) {
          try {
            setContent(JSON.parse(savedContent));
          } catch (e) {
            console.error('Failed to parse saved content');
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();

    const adminStatus = sessionStorage.getItem('isAdmin');
    if (adminStatus === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const login = async (password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      
      if (response.ok) {
        setIsAdmin(true);
        sessionStorage.setItem('isAdmin', 'true');
        return true;
      }
      return false;
    } catch (error) {
      // Fall back to local check if API is not available
      if (password === ADMIN_PASSWORD) {
        setIsAdmin(true);
        sessionStorage.setItem('isAdmin', 'true');
        return true;
      }
      return false;
    }
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('isAdmin');
  };

  const updateHeroImage = async (url: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/hero`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: url, password: ADMIN_PASSWORD })
      });
      
      if (response.ok) {
        const newContent = { ...content, heroImage: url };
        setContent(newContent);
      }
    } catch (error) {
      console.error('Failed to update hero image on server:', error);
      // Update locally anyway
      const newContent = { ...content, heroImage: url };
      setContent(newContent);
      localStorage.setItem('adminContent', JSON.stringify(newContent));
    }
  };

  const updateHealingStory = async (id: string, updates: Partial<AdminContent['healingStories'][0]>) => {
    const imageUrl = updates.image;
    if (!imageUrl) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/story/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl, password: ADMIN_PASSWORD })
      });
      
      if (response.ok) {
        const newStories = content.healingStories.map(story =>
          story.id === id ? { ...story, ...updates } : story
        );
        const newContent = { ...content, healingStories: newStories };
        setContent(newContent);
      }
    } catch (error) {
      console.error('Failed to update story on server:', error);
      // Update locally anyway
      const newStories = content.healingStories.map(story =>
        story.id === id ? { ...story, ...updates } : story
      );
      const newContent = { ...content, healingStories: newStories };
      setContent(newContent);
      localStorage.setItem('adminContent', JSON.stringify(newContent));
    }
  };

  const addHealingStory = (story: AdminContent['healingStories'][0]) => {
    const newContent = {
      ...content,
      healingStories: [...content.healingStories, story]
    };
    setContent(newContent);
    localStorage.setItem('adminContent', JSON.stringify(newContent));
  };

  const removeHealingStory = (id: string) => {
    const newStories = content.healingStories.filter(story => story.id !== id);
    const newContent = { ...content, healingStories: newStories };
    setContent(newContent);
    localStorage.setItem('adminContent', JSON.stringify(newContent));
  };

  const addGalleryImage = async (url: string, alt: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/gallery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, alt, password: ADMIN_PASSWORD })
      });
      
      if (response.ok) {
        const newContent = {
          ...content,
          galleryImages: [...content.galleryImages, { url, alt }]
        };
        setContent(newContent);
      }
    } catch (error) {
      console.error('Failed to add gallery image on server:', error);
      // Update locally anyway
      const newContent = {
        ...content,
        galleryImages: [...content.galleryImages, { url, alt }]
      };
      setContent(newContent);
      localStorage.setItem('adminContent', JSON.stringify(newContent));
    }
  };

  const removeGalleryImage = async (index: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/gallery/${index}?password=${ADMIN_PASSWORD}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        const newImages = content.galleryImages.filter((_, i) => i !== index);
        const newContent = { ...content, galleryImages: newImages };
        setContent(newContent);
      }
    } catch (error) {
      console.error('Failed to remove gallery image on server:', error);
      // Update locally anyway
      const newImages = content.galleryImages.filter((_, i) => i !== index);
      const newContent = { ...content, galleryImages: newImages };
      setContent(newContent);
      localStorage.setItem('adminContent', JSON.stringify(newContent));
    }
  };

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        isLoading,
        login,
        logout,
        content,
        updateHeroImage,
        updateHealingStory,
        addHealingStory,
        removeHealingStory,
        addGalleryImage,
        removeGalleryImage
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
