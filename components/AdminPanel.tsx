import React, { useState } from 'react';
import { X, Upload, Trash2, Save, Image as ImageIcon } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

interface AdminPanelProps {
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const { content, updateHeroImage, updateHealingStory, addGalleryImage, removeGalleryImage, logout } = useAdmin();
  const [activeTab, setActiveTab] = useState<'hero' | 'stories' | 'gallery'>('hero');
  const [heroImageUrl, setHeroImageUrl] = useState(content.heroImage);
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [newGalleryAlt, setNewGalleryAlt] = useState('');
  const [savedMessage, setSavedMessage] = useState('');

  const handleSaveHeroImage = () => {
    updateHeroImage(heroImageUrl);
    setSavedMessage('Hero image updated successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleUpdateStoryImage = (id: string, url: string) => {
    updateHealingStory(id, url);
    setSavedMessage('Story image updated successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleAddGalleryImage = () => {
    if (newGalleryUrl && newGalleryAlt) {
      addGalleryImage(newGalleryUrl, newGalleryAlt);
      setNewGalleryUrl('');
      setNewGalleryAlt('');
      setSavedMessage('Gallery image added successfully!');
      setTimeout(() => setSavedMessage(''), 3000);
    }
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full my-8 relative animate-in fade-in zoom-in duration-300">
        <div className="sticky top-0 bg-white border-b border-stone-200 rounded-t-3xl p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold text-stone-900">Admin Panel</h2>
            <p className="text-stone-600 text-sm mt-1">Manage website content</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-xl font-bold hover:bg-red-200 transition-colors text-sm"
            >
              Logout
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-stone-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {savedMessage && (
          <div className="mx-6 mt-4 p-4 bg-emerald-100 text-emerald-800 rounded-xl font-medium text-sm">
            {savedMessage}
          </div>
        )}

        <div className="p-6">
          <div className="flex gap-2 mb-6 border-b border-stone-200">
            <button
              onClick={() => setActiveTab('hero')}
              className={`px-6 py-3 font-bold transition-colors ${
                activeTab === 'hero'
                  ? 'text-emerald-800 border-b-2 border-emerald-800'
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              Hero Section
            </button>
            <button
              onClick={() => setActiveTab('stories')}
              className={`px-6 py-3 font-bold transition-colors ${
                activeTab === 'stories'
                  ? 'text-emerald-800 border-b-2 border-emerald-800'
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              Healing Stories
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-6 py-3 font-bold transition-colors ${
                activeTab === 'gallery'
                  ? 'text-emerald-800 border-b-2 border-emerald-800'
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              Gallery
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto">
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">
                    Hero Image URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={heroImageUrl}
                      onChange={(e) => setHeroImageUrl(e.target.value)}
                      className="flex-1 px-4 py-3 border-2 border-stone-200 rounded-xl focus:border-emerald-600 focus:outline-none"
                      placeholder="Enter image URL"
                    />
                    <button
                      onClick={handleSaveHeroImage}
                      className="px-6 py-3 bg-emerald-800 text-white rounded-xl font-bold hover:bg-emerald-900 transition-colors flex items-center gap-2"
                    >
                      <Save size={18} />
                      Save
                    </button>
                  </div>
                </div>
                <div className="border-2 border-stone-200 rounded-2xl p-4">
                  <p className="text-sm font-bold text-stone-700 mb-3">Preview:</p>
                  <img
                    src={heroImageUrl}
                    alt="Hero preview"
                    className="w-full h-64 object-cover rounded-xl"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=Invalid+URL';
                    }}
                  />
                </div>
              </div>
            )}

            {activeTab === 'stories' && (
              <div className="space-y-6">
                {content.healingStories.map((story) => (
                  <div key={story.id} className="border-2 border-stone-200 rounded-2xl p-6">
                    <h3 className="font-bold text-lg text-stone-900 mb-4">{story.condition}</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-stone-700 mb-2">
                          Story Image URL
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            defaultValue={story.image}
                            onBlur={(e) => {
                              if (e.target.value !== story.image) {
                                handleUpdateStoryImage(story.id, e.target.value);
                              }
                            }}
                            className="flex-1 px-4 py-2 border-2 border-stone-200 rounded-xl focus:border-emerald-600 focus:outline-none"
                            placeholder="Enter image URL"
                          />
                        </div>
                      </div>
                      <img
                        src={story.image}
                        alt={story.condition}
                        className="w-full h-48 object-cover rounded-xl"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Invalid+URL';
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <div className="border-2 border-emerald-200 bg-emerald-50 rounded-2xl p-6">
                  <h3 className="font-bold text-lg text-stone-900 mb-4 flex items-center gap-2">
                    <Upload size={20} />
                    Add New Gallery Image
                  </h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={newGalleryUrl}
                      onChange={(e) => setNewGalleryUrl(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl focus:border-emerald-600 focus:outline-none"
                      placeholder="Image URL"
                    />
                    <input
                      type="text"
                      value={newGalleryAlt}
                      onChange={(e) => setNewGalleryAlt(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl focus:border-emerald-600 focus:outline-none"
                      placeholder="Image description"
                    />
                    <button
                      onClick={handleAddGalleryImage}
                      className="w-full px-6 py-3 bg-emerald-800 text-white rounded-xl font-bold hover:bg-emerald-900 transition-colors flex items-center justify-center gap-2"
                    >
                      <ImageIcon size={18} />
                      Add Image
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {content.galleryImages.map((img, index) => (
                    <div key={index} className="relative group border-2 border-stone-200 rounded-2xl p-3">
                      <img
                        src={img.url}
                        alt={img.alt}
                        className="w-full h-40 object-cover rounded-xl"
                      />
                      <p className="text-sm text-stone-600 mt-2 font-medium">{img.alt}</p>
                      <button
                        onClick={() => removeGalleryImage(index)}
                        className="absolute top-5 right-5 p-2 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;