import React, { useState } from 'react';
import { Upload, Trash2, Save, Image as ImageIcon, LogOut, Home, LayoutDashboard, Edit, Plus, X } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import { CLINIC_NAME } from '../constants';

const AdminDashboard: React.FC = () => {
  const { content, updateHeroImage, updateHealingStory, addHealingStory, removeHealingStory, addGalleryImage, removeGalleryImage, logout } = useAdmin();
  const [activeTab, setActiveTab] = useState<'hero' | 'stories' | 'gallery'>('hero');
  const [savedMessage, setSavedMessage] = useState('');
  
  // Hero section state
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [heroImagePreview, setHeroImagePreview] = useState(content.heroImage);
  
  // Gallery state
  const [galleryImageFile, setGalleryImageFile] = useState<File | null>(null);
  const [galleryImageAlt, setGalleryImageAlt] = useState('');
  const [galleryImagePreview, setGalleryImagePreview] = useState('');
  
  // Healing story editing state
  const [editingStory, setEditingStory] = useState<string | null>(null);
  const [isAddingNewStory, setIsAddingNewStory] = useState(false);
  const [storyFormData, setStoryFormData] = useState<any>({});
  const [storyImageFile, setStoryImageFile] = useState<File | null>(null);
  const [storyImagePreview, setStoryImagePreview] = useState('');

  const showSuccessMessage = (message: string) => {
    setSavedMessage(message);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  // Convert file to base64 for storage
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  // Hero Image Handlers
  const handleHeroImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setHeroImageFile(file);
      const preview = URL.createObjectURL(file);
      setHeroImagePreview(preview);
    }
  };

  const handleSaveHeroImage = async () => {
    if (heroImageFile) {
      const base64 = await fileToBase64(heroImageFile);
      updateHeroImage(base64);
      showSuccessMessage('Hero image updated successfully!');
      setHeroImageFile(null);
    }
  };

  // Gallery Handlers
  const handleGalleryImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setGalleryImageFile(file);
      const preview = URL.createObjectURL(file);
      setGalleryImagePreview(preview);
    }
  };

  const handleAddGalleryImage = async () => {
    if (galleryImageFile && galleryImageAlt) {
      const base64 = await fileToBase64(galleryImageFile);
      addGalleryImage(base64, galleryImageAlt);
      showSuccessMessage('Gallery image added successfully!');
      setGalleryImageFile(null);
      setGalleryImageAlt('');
      setGalleryImagePreview('');
    }
  };

  // Healing Story Handlers
  const handleEditStory = (storyId: string) => {
    const story = content.healingStories.find(s => s.id === storyId);
    if (story) {
      setEditingStory(storyId);
      setStoryFormData(story);
      setStoryImagePreview(story.image);
    }
  };

  const handleStoryImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setStoryImageFile(file);
      const preview = URL.createObjectURL(file);
      setStoryImagePreview(preview);
    }
  };

  const handleAddNewStory = () => {
    setIsAddingNewStory(true);
    setStoryFormData({
      condition: '',
      patientInfo: '',
      historyDuration: '',
      treatmentDuration: '',
      improvementLevel: 0,
      outcome: '',
      doctorsInsight: ''
    });
    setStoryImagePreview('https://via.placeholder.com/400x300?text=Upload+Image');
  };

  const handleSaveStory = async () => {
    if (isAddingNewStory) {
      // Adding new story
      if (!storyImageFile) {
        alert('Please upload an image for the story');
        return;
      }

      const newStory = {
        id: `cs${Date.now()}`,
        ...storyFormData,
        image: await fileToBase64(storyImageFile)
      };

      addHealingStory(newStory);
      showSuccessMessage('New healing story added successfully!');
      setIsAddingNewStory(false);
      setStoryFormData({});
      setStoryImageFile(null);
      setStoryImagePreview('');
    } else if (editingStory) {
      // Updating existing story
      const updates: any = { ...storyFormData };
      
      if (storyImageFile) {
        updates.image = await fileToBase64(storyImageFile);
      }
      
      updateHealingStory(editingStory, updates);
      showSuccessMessage('Healing story updated successfully!');
      setEditingStory(null);
      setStoryFormData({});
      setStoryImageFile(null);
      setStoryImagePreview('');
    }
  };

  const handleCancelEdit = () => {
    setEditingStory(null);
    setIsAddingNewStory(false);
    setStoryFormData({});
    setStoryImageFile(null);
    setStoryImagePreview('');
  };

  const handleDeleteStory = (id: string) => {
    if (confirm('Are you sure you want to delete this healing story?')) {
      removeHealingStory(id);
      showSuccessMessage('Healing story deleted successfully!');
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hide Google Translate on Admin Dashboard */}
      <style>{`
        #google_translate_element,
        .goog-te-banner-frame,
        .skiptranslate {
          display: none !important;
        }
        body {
          top: 0 !important;
        }
      `}</style>

      {/* Dashboard Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <LayoutDashboard size={24} className="text-emerald-700 flex-shrink-0 sm:w-7 sm:h-7" />
              <div className="min-w-0">
                <h1 className="text-lg sm:text-2xl font-bold text-stone-900 truncate">Admin Dashboard</h1>
                <p className="text-xs sm:text-sm text-stone-600 truncate hidden sm:block">{CLINIC_NAME}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleBackToHome}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 bg-stone-100 text-stone-700 rounded-lg sm:rounded-xl font-bold hover:bg-stone-200 transition-colors text-xs sm:text-sm"
              >
                <Home size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="hidden md:inline">Back</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 bg-red-100 text-red-700 rounded-lg sm:rounded-xl font-bold hover:bg-red-200 transition-colors text-xs sm:text-sm"
              >
                <LogOut size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Success Message */}
      {savedMessage && (
        <div className="container mx-auto px-4 sm:px-6 mt-4 sm:mt-6">
          <div className="p-3 sm:p-4 bg-emerald-100 text-emerald-800 rounded-xl font-medium text-xs sm:text-sm animate-in fade-in slide-in-from-top duration-300">
            ✓ {savedMessage}
          </div>
        </div>
      )}

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="flex gap-1 sm:gap-2 p-3 sm:p-6 border-b border-stone-200 bg-stone-50 overflow-x-auto">
            <button
              onClick={() => setActiveTab('hero')}
              className={`flex-1 min-w-[90px] px-3 sm:px-6 py-3 sm:py-4 font-bold rounded-lg sm:rounded-xl transition-all text-xs sm:text-base whitespace-nowrap ${
                activeTab === 'hero'
                  ? 'bg-emerald-800 text-white shadow-lg'
                  : 'bg-white text-stone-600 hover:bg-stone-100'
              }`}
            >
              Hero
            </button>
            <button
              onClick={() => setActiveTab('stories')}
              className={`flex-1 min-w-[90px] px-3 sm:px-6 py-3 sm:py-4 font-bold rounded-lg sm:rounded-xl transition-all text-xs sm:text-base whitespace-nowrap ${
                activeTab === 'stories'
                  ? 'bg-emerald-800 text-white shadow-lg'
                  : 'bg-white text-stone-600 hover:bg-stone-100'
              }`}
            >
              Stories
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex-1 min-w-[90px] px-3 sm:px-6 py-3 sm:py-4 font-bold rounded-lg sm:rounded-xl transition-all text-xs sm:text-base whitespace-nowrap ${
                activeTab === 'gallery'
                  ? 'bg-emerald-800 text-white shadow-lg'
                  : 'bg-white text-stone-600 hover:bg-stone-100'
              }`}
            >
              Gallery
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-4 sm:p-8">
            {/* HERO SECTION TAB */}
            {activeTab === 'hero' && (
              <div className="space-y-4 sm:space-y-6 max-w-4xl">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mb-2">Hero Section Image</h2>
                  <p className="text-sm sm:text-base text-stone-600 mb-4 sm:mb-6">Upload the main hero image displayed on the homepage. Any dimension will fit automatically.</p>
                  
                  <div className="border-2 border-dashed border-stone-300 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center hover:border-emerald-500 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleHeroImageSelect}
                      className="hidden"
                      id="hero-image-upload"
                    />
                    <label
                      htmlFor="hero-image-upload"
                      className="cursor-pointer flex flex-col items-center gap-3 sm:gap-4"
                    >
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Upload size={24} className="text-emerald-700 sm:w-8 sm:h-8" />
                      </div>
                      <div>
                        <p className="text-base sm:text-lg font-bold text-stone-900">Click to upload hero image</p>
                        <p className="text-xs sm:text-sm text-stone-500 mt-1">PNG, JPG, WEBP up to 10MB</p>
                      </div>
                    </label>
                  </div>

                  {heroImageFile && (
                    <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:justify-between bg-emerald-50 p-3 sm:p-4 rounded-xl">
                      <span className="text-xs sm:text-sm font-medium text-emerald-900 break-all">
                        Selected: {heroImageFile.name}
                      </span>
                      <button
                        onClick={handleSaveHeroImage}
                        className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-emerald-800 text-white rounded-lg font-bold hover:bg-emerald-900 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                      >
                        <Save size={14} className="sm:w-4 sm:h-4" />
                        Save Image
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="border-2 border-stone-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 bg-stone-50">
                  <p className="text-xs sm:text-sm font-bold text-stone-700 mb-3 sm:mb-4">Current Hero Image:</p>
                  <div className="rounded-lg sm:rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={heroImagePreview}
                      alt="Hero preview"
                      className="w-full h-48 sm:h-96 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=No+Image';
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* HEALING STORIES TAB */}
            {activeTab === 'stories' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mb-1 sm:mb-2">Healing Stories</h2>
                    <p className="text-xs sm:text-base text-stone-600">Add new stories or edit existing case studies</p>
                  </div>
                  <button
                    onClick={handleAddNewStory}
                    className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-emerald-800 text-white rounded-lg sm:rounded-xl font-bold hover:bg-emerald-900 transition-colors shadow-lg text-sm sm:text-base whitespace-nowrap"
                  >
                    <Plus size={18} className="sm:w-5 sm:h-5" />
                    Add New Story
                  </button>
                </div>

                {/* Add New Story Form */}
                {isAddingNewStory && (
                  <div className="border-2 border-emerald-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 bg-emerald-50">
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                        <h3 className="text-lg sm:text-xl font-bold text-emerald-800">Adding New Story</h3>
                        <div className="flex gap-2">
                          <button
                            onClick={handleSaveStory}
                            className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-emerald-800 text-white rounded-lg font-bold hover:bg-emerald-900 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                          >
                            <Save size={14} className="sm:w-4 sm:h-4" />
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-stone-200 text-stone-700 rounded-lg font-bold hover:bg-stone-300 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                          >
                            <X size={14} className="sm:w-4 sm:h-4" />
                            Cancel
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        {/* Left Column - Form Fields */}
                        <div className="space-y-3 sm:space-y-4">
                          <div>
                            <label className="block text-xs sm:text-sm font-bold text-stone-700 mb-1.5 sm:mb-2">Condition *</label>
                            <input
                              type="text"
                              value={storyFormData.condition || ''}
                              onChange={(e) => setStoryFormData({...storyFormData, condition: e.target.value})}
                              className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-stone-200 rounded-lg sm:rounded-xl focus:border-emerald-600 focus:outline-none bg-white text-sm sm:text-base"
                              placeholder="e.g., Chronic Psoriasis"
                            />
                          </div>

                          <div>
                            <label className="block text-xs sm:text-sm font-bold text-stone-700 mb-1.5 sm:mb-2">Patient Info *</label>
                            <input
                              type="text"
                              value={storyFormData.patientInfo || ''}
                              onChange={(e) => setStoryFormData({...storyFormData, patientInfo: e.target.value})}
                              className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-stone-200 rounded-lg sm:rounded-xl focus:border-emerald-600 focus:outline-none bg-white text-sm sm:text-base"
                              placeholder="e.g., A.R., 34 Male"
                            />
                          </div>

                          <div>
                            <label className="block text-xs sm:text-sm font-bold text-stone-700 mb-1.5 sm:mb-2">History Duration *</label>
                            <input
                              type="text"
                              value={storyFormData.historyDuration || ''}
                              onChange={(e) => setStoryFormData({...storyFormData, historyDuration: e.target.value})}
                              className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-stone-200 rounded-lg sm:rounded-xl focus:border-emerald-600 focus:outline-none bg-white text-sm sm:text-base"
                              placeholder="e.g., 10 Years"
                            />
                          </div>

                          <div>
                            <label className="block text-xs sm:text-sm font-bold text-stone-700 mb-1.5 sm:mb-2">Treatment Duration *</label>
                            <input
                              type="text"
                              value={storyFormData.treatmentDuration || ''}
                              onChange={(e) => setStoryFormData({...storyFormData, treatmentDuration: e.target.value})}
                              className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-stone-200 rounded-lg sm:rounded-xl focus:border-emerald-600 focus:outline-none bg-white text-sm sm:text-base"
                              placeholder="e.g., 14 Months"
                            />
                          </div>

                          <div>
                            <label className="block text-xs sm:text-sm font-bold text-stone-700 mb-1.5 sm:mb-2">Improvement Level (%) *</label>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={storyFormData.improvementLevel || 0}
                              onChange={(e) => setStoryFormData({...storyFormData, improvementLevel: parseInt(e.target.value)})}
                              className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-stone-200 rounded-lg sm:rounded-xl focus:border-emerald-600 focus:outline-none bg-white text-sm sm:text-base"
                            />
                          </div>

                          <div>
                            <label className="block text-xs sm:text-sm font-bold text-stone-700 mb-1.5 sm:mb-2">Outcome *</label>
                            <textarea
                              value={storyFormData.outcome || ''}
                              onChange={(e) => setStoryFormData({...storyFormData, outcome: e.target.value})}
                              className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-stone-200 rounded-lg sm:rounded-xl focus:border-emerald-600 focus:outline-none bg-white text-sm sm:text-base"
                              rows={3}
                              placeholder="Describe the treatment outcome..."
                            />
                          </div>

                          <div>
                            <label className="block text-xs sm:text-sm font-bold text-stone-700 mb-1.5 sm:mb-2">Doctor's Insight *</label>
                            <textarea
                              value={storyFormData.doctorsInsight || ''}
                              onChange={(e) => setStoryFormData({...storyFormData, doctorsInsight: e.target.value})}
                              className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-stone-200 rounded-lg sm:rounded-xl focus:border-emerald-600 focus:outline-none bg-white text-sm sm:text-base"
                              rows={3}
                              placeholder="Professional observation..."
                            />
                          </div>
                        </div>

                        {/* Right Column - Image Upload */}
                        <div className="space-y-3 sm:space-y-4">
                          <div>
                            <label className="block text-xs sm:text-sm font-bold text-stone-700 mb-1.5 sm:mb-2">Story Image *</label>
                            <div className="border-2 border-dashed border-emerald-300 rounded-lg sm:rounded-xl p-4 sm:p-6 text-center hover:border-emerald-500 transition-colors bg-white">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleStoryImageSelect}
                                className="hidden"
                                id="new-story-image"
                              />
                              <label
                                htmlFor="new-story-image"
                                className="cursor-pointer flex flex-col items-center gap-2 sm:gap-3"
                              >
                                <Upload size={20} className="text-emerald-700 sm:w-6 sm:h-6" />
                                <p className="text-xs sm:text-sm font-bold text-stone-900">Upload Image</p>
                                <p className="text-[10px] sm:text-xs text-stone-500">Required for new story</p>
                              </label>
                            </div>
                          </div>

                          <div className="rounded-lg sm:rounded-xl overflow-hidden shadow-md">
                            <img
                              src={storyImagePreview}
                              alt="Story preview"
                              className="w-full h-48 sm:h-64 object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="grid gap-6">
                  {content.healingStories.map((story) => (
                    <div key={story.id} className="border-2 border-stone-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 bg-white hover:shadow-lg transition-shadow">
                      {editingStory === story.id ? (
                        // EDIT MODE
                        <div className="space-y-4 sm:space-y-6">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                            <h3 className="text-lg sm:text-xl font-bold text-emerald-800">Editing Story</h3>
                            <div className="flex gap-2">
                              <button
                                onClick={handleSaveStory}
                                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-emerald-800 text-white rounded-lg font-bold hover:bg-emerald-900 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                              >
                                <Save size={14} className="sm:w-4 sm:h-4" />
                                Save
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-stone-200 text-stone-700 rounded-lg font-bold hover:bg-stone-300 transition-colors text-sm sm:text-base"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            {/* Left Column - Form Fields */}
                            <div className="space-y-3 sm:space-y-4">
                              <div>
                                <label className="block text-xs sm:text-sm font-bold text-stone-700 mb-1.5 sm:mb-2">Condition</label>
                                <input
                                  type="text"
                                  value={storyFormData.condition || ''}
                                  onChange={(e) => setStoryFormData({...storyFormData, condition: e.target.value})}
                                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-stone-200 rounded-lg sm:rounded-xl focus:border-emerald-600 focus:outline-none text-sm sm:text-base"
                                />
                              </div>

                              <div>
                                <label className="block text-xs sm:text-sm font-bold text-stone-700 mb-1.5 sm:mb-2">Patient Info</label>
                                <input
                                  type="text"
                                  value={storyFormData.patientInfo || ''}
                                  onChange={(e) => setStoryFormData({...storyFormData, patientInfo: e.target.value})}
                                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-stone-200 rounded-lg sm:rounded-xl focus:border-emerald-600 focus:outline-none text-sm sm:text-base"
                                  placeholder="e.g., A.R., 34 Male"
                                />
                              </div>

                              <div>
                                <label className="block text-xs sm:text-sm font-bold text-stone-700 mb-1.5 sm:mb-2">History Duration</label>
                                <input
                                  type="text"
                                  value={storyFormData.historyDuration || ''}
                                  onChange={(e) => setStoryFormData({...storyFormData, historyDuration: e.target.value})}
                                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-stone-200 rounded-lg sm:rounded-xl focus:border-emerald-600 focus:outline-none text-sm sm:text-base"
                                  placeholder="e.g., 10 Years"
                                />
                              </div>

                              <div>
                                <label className="block text-xs sm:text-sm font-bold text-stone-700 mb-1.5 sm:mb-2">Treatment Duration</label>
                                <input
                                  type="text"
                                  value={storyFormData.treatmentDuration || ''}
                                  onChange={(e) => setStoryFormData({...storyFormData, treatmentDuration: e.target.value})}
                                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-stone-200 rounded-lg sm:rounded-xl focus:border-emerald-600 focus:outline-none text-sm sm:text-base"
                                  placeholder="e.g., 14 Months"
                                />
                              </div>

                              <div>
                                <label className="block text-xs sm:text-sm font-bold text-stone-700 mb-1.5 sm:mb-2">Improvement Level (%)</label>
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={storyFormData.improvementLevel || 0}
                                  onChange={(e) => setStoryFormData({...storyFormData, improvementLevel: parseInt(e.target.value)})}
                                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-stone-200 rounded-lg sm:rounded-xl focus:border-emerald-600 focus:outline-none text-sm sm:text-base"
                                />
                              </div>

                              <div>
                                <label className="block text-xs sm:text-sm font-bold text-stone-700 mb-1.5 sm:mb-2">Outcome</label>
                                <textarea
                                  value={storyFormData.outcome || ''}
                                  onChange={(e) => setStoryFormData({...storyFormData, outcome: e.target.value})}
                                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-stone-200 rounded-lg sm:rounded-xl focus:border-emerald-600 focus:outline-none text-sm sm:text-base"
                                  rows={3}
                                />
                              </div>

                              <div>
                                <label className="block text-xs sm:text-sm font-bold text-stone-700 mb-1.5 sm:mb-2">Doctor's Insight</label>
                                <textarea
                                  value={storyFormData.doctorsInsight || ''}
                                  onChange={(e) => setStoryFormData({...storyFormData, doctorsInsight: e.target.value})}
                                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-stone-200 rounded-lg sm:rounded-xl focus:border-emerald-600 focus:outline-none text-sm sm:text-base"
                                  rows={3}
                                />
                              </div>
                            </div>

                            {/* Right Column - Image Upload */}
                            <div className="space-y-3 sm:space-y-4">
                              <div>
                                <label className="block text-xs sm:text-sm font-bold text-stone-700 mb-1.5 sm:mb-2">Story Image</label>
                                <div className="border-2 border-dashed border-stone-300 rounded-lg sm:rounded-xl p-4 sm:p-6 text-center hover:border-emerald-500 transition-colors">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleStoryImageSelect}
                                    className="hidden"
                                    id={`story-image-${story.id}`}
                                  />
                                  <label
                                    htmlFor={`story-image-${story.id}`}
                                    className="cursor-pointer flex flex-col items-center gap-2 sm:gap-3"
                                  >
                                    <Upload size={20} className="text-emerald-700 sm:w-6 sm:h-6" />
                                    <p className="text-xs sm:text-sm font-bold text-stone-900">Upload Image</p>
                                  </label>
                                </div>
                              </div>

                              <div className="rounded-lg sm:rounded-xl overflow-hidden shadow-md">
                                <img
                                  src={storyImagePreview}
                                  alt="Story preview"
                                  className="w-full h-48 sm:h-64 object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image';
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        // VIEW MODE
                        <div>
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                            <div className="min-w-0 flex-1">
                              <h3 className="font-bold text-lg sm:text-xl text-stone-900 break-words">{story.condition}</h3>
                              <p className="text-xs sm:text-sm text-stone-600 mt-1">{story.patientInfo}</p>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                              <button
                                onClick={() => handleEditStory(story.id)}
                                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg font-bold hover:bg-emerald-200 transition-colors text-xs sm:text-sm"
                              >
                                <Edit size={14} className="sm:w-4 sm:h-4" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteStory(story.id)}
                                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors text-xs sm:text-sm"
                              >
                                <Trash2 size={14} className="sm:w-4 sm:h-4" />
                                Delete
                              </button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                            <div>
                              <span className="font-bold text-stone-700">History:</span> {story.historyDuration}
                            </div>
                            <div>
                              <span className="font-bold text-stone-700">Treatment:</span> {story.treatmentDuration}
                            </div>
                            <div>
                              <span className="font-bold text-stone-700">Improvement:</span> {story.improvementLevel}%
                            </div>
                          </div>

                          <div className="mt-2 sm:mt-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
                            {story.description}
                          </div>

                          <div className="mt-3 sm:mt-4">
                            <img
                              src={story.image}
                              alt={story.condition}
                              className="w-full h-40 sm:h-48 object-cover rounded-lg sm:rounded-xl"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* GALLERY TAB */}
            {activeTab === 'gallery' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-stone-900 mb-2">Gallery Management</h2>
                  <p className="text-stone-600">Upload images from your device to the clinic gallery</p>
                </div>

                {/* Add New Image */}
                <div className="border-2 border-emerald-200 bg-emerald-50 rounded-2xl p-6">
                  <h3 className="font-bold text-lg text-stone-900 mb-4 flex items-center gap-2">
                    <Upload size={20} className="text-emerald-700" />
                    Add New Gallery Image
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-emerald-300 rounded-xl p-8 text-center hover:border-emerald-500 transition-colors bg-white">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleGalleryImageSelect}
                        className="hidden"
                        id="gallery-image-upload"
                      />
                      <label
                        htmlFor="gallery-image-upload"
                        className="cursor-pointer flex flex-col items-center gap-3"
                      >
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                          <ImageIcon size={24} className="text-emerald-700" />
                        </div>
                        <div>
                          <p className="font-bold text-stone-900">Choose Image from Device</p>
                          <p className="text-sm text-stone-500 mt-1">PNG, JPG, WEBP up to 10MB</p>
                        </div>
                      </label>
                    </div>

                    {galleryImagePreview && (
                      <div className="rounded-xl overflow-hidden shadow-md">
                        <img
                          src={galleryImagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}

                    <input
                      type="text"
                      value={galleryImageAlt}
                      onChange={(e) => setGalleryImageAlt(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl focus:border-emerald-600 focus:outline-none"
                      placeholder="Image description (e.g., Clinic Interior)"
                    />
                    
                    <button
                      onClick={handleAddGalleryImage}
                      disabled={!galleryImageFile || !galleryImageAlt}
                      className="w-full px-8 py-3 bg-emerald-800 text-white rounded-xl font-bold hover:bg-emerald-900 transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ImageIcon size={18} />
                      Add to Gallery
                    </button>
                  </div>
                </div>

                {/* Gallery Images Grid */}
                <div>
                  <h3 className="font-bold text-lg text-stone-900 mb-4">Current Gallery Images ({content.galleryImages.length})</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {content.galleryImages.map((img, index) => (
                      <div key={index} className="relative group border-2 border-stone-200 rounded-2xl p-4 bg-white hover:shadow-lg transition-all">
                        <div className="rounded-xl overflow-hidden mb-3">
                          <img
                            src={img.url}
                            alt={img.alt}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <p className="text-sm text-stone-600 font-medium">{img.alt}</p>
                        <button
                          onClick={() => removeGalleryImage(index)}
                          className="absolute top-6 right-6 p-2.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 shadow-lg"
                          title="Delete image"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;