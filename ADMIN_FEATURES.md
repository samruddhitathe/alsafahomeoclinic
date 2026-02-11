# Admin Features & Language Translation Guide

## Overview
This document explains the new admin panel and language translation features added to the Alsafa Homeopathic Clinic website.

## Features Implemented

### 1. Language Translation (Marathi ↔ English)
- **Default Language**: Marathi (मराठी)
- **Toggle Button**: Located in the navbar (desktop and mobile)
- **Icon**: Globe/Languages icon
- **Functionality**: Click to switch between Marathi and English
- **Persistence**: Language preference is saved in browser localStorage

#### Translated Sections:
- Navigation menu items
- Hero section (main banner)
- Healing Stories section
- Gallery section
- Call-to-action buttons

### 2. Admin Login System
- **Access**: Click the shield icon in the navbar
- **Default Password**: `admin123`
- **Session**: Admin status persists during browser session
- **Security**: Password-protected access to content management

### 3. Admin Panel Features

#### A. Hero Section Management
- **Update Hero Image**: Change the main hero section image
- **Live Preview**: See image preview before saving
- **URL-based**: Enter image URL to update

#### B. Healing Stories Management
- **Update Story Images**: Add/change images for each case study
- **Multiple Stories**: Manage images for all healing story cards
- **Individual Control**: Each story has its own image field

#### C. Gallery Management
- **Add New Images**: Add unlimited gallery images
- **Image Details**: Provide URL and description for each image
- **Remove Images**: Delete unwanted gallery images
- **View More Feature**: First 4 images shown by default, expandable to show all

## How to Use

### For Users (Language Toggle)

1. **Desktop View**:
   - Look for the language button in the top navigation bar
   - Shows "EN" when in Marathi mode, "मर" when in English mode
   - Click to toggle between languages

2. **Mobile View**:
   - Open the mobile menu (hamburger icon)
   - Language toggle button appears at the bottom
   - Shows full language names: "English" or "मराठी"

### For Admins

#### Step 1: Login
1. Click the shield icon (🛡️) in the navbar
2. Enter password: `admin123`
3. Click "Login"

#### Step 2: Access Admin Panel
- After login, the shield icon changes to "Admin" button
- Click "Admin" button to open the admin panel

#### Step 3: Manage Content

**Hero Section:**
1. Click "Hero Section" tab
2. Paste new image URL in the input field
3. Preview the image below
4. Click "Save" to update

**Healing Stories:**
1. Click "Healing Stories" tab
2. Each story card shows current image
3. Update image URL in the input field
4. Image updates automatically on blur (when you click outside)

**Gallery:**
1. Click "Gallery" tab
2. To add new image:
   - Enter image URL
   - Enter image description
   - Click "Add Image"
3. To remove image:
   - Hover over image
   - Click red trash icon

#### Step 4: Logout
- Click "Logout" button in admin panel header
- Or close the admin panel

## Technical Details

### Storage
- **Admin Content**: Stored in browser localStorage
- **Language Preference**: Stored in browser localStorage
- **Admin Session**: Stored in browser sessionStorage (cleared on browser close)

### File Structure
```
contexts/
  ├── LanguageContext.tsx    # Language translation logic
  └── AdminContext.tsx        # Admin authentication & content management

components/
  ├── AdminLogin.tsx          # Login modal
  ├── AdminPanel.tsx          # Admin dashboard
  ├── Header.tsx              # Updated with language toggle & admin access
  ├── Hero.tsx                # Updated to use admin-managed image
  ├── HealingStories.tsx      # Updated with images & translations
  └── Gallery.tsx             # Updated with view more & admin images
```

### Translation Keys
All translations are defined in `contexts/LanguageContext.tsx`:
- Navigation: `nav.*`
- Hero: `hero.*`
- Stories: `stories.*`
- Gallery: `gallery.*`

## Gallery View More Feature

### Default Behavior
- Shows first 4 images only
- "View More" button appears if more than 4 images exist
- Shows count of additional images (e.g., "+4 more images")

### Expanded View
- Click "View More" to show all images
- Button changes to "View Less"
- Click "View Less" to collapse back to 4 images

## Image Requirements

### Recommended Image Specifications
- **Hero Image**: 1200x1500px (portrait orientation)
- **Story Images**: 800x600px (landscape orientation)
- **Gallery Images**: 800x800px (square format)
- **Format**: JPG, PNG, WebP
- **Hosting**: Use reliable image hosting (Unsplash, Cloudinary, etc.)

## Security Notes

⚠️ **Important for Production:**
1. Change the default admin password in `contexts/AdminContext.tsx`
2. Implement proper backend authentication
3. Use environment variables for sensitive data
4. Add rate limiting for login attempts
5. Implement proper image upload system instead of URL-based

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive
- Touch-friendly interface
- localStorage and sessionStorage required

## Troubleshooting

### Language not switching?
- Clear browser cache
- Check browser console for errors
- Ensure localStorage is enabled

### Admin panel not opening?
- Verify you're logged in (shield icon should show "Admin")
- Check browser console for errors
- Try logging out and back in

### Images not loading?
- Verify image URLs are valid and accessible
- Check CORS policy of image host
- Use HTTPS URLs for security

### Content not persisting?
- Check if localStorage is enabled in browser
- Verify browser isn't in private/incognito mode
- Check browser storage quota

## Future Enhancements

Potential improvements for production:
1. Backend API for content management
2. Image upload functionality
3. Multi-language support (add more languages)
4. Role-based access control
5. Content versioning and history
6. Bulk image upload
7. Image optimization and CDN integration
8. Advanced text editor for content
9. Analytics dashboard
10. Backup and restore functionality

## Support

For issues or questions:
1. Check browser console for error messages
2. Verify all files are properly imported
3. Ensure npm dependencies are installed
4. Check that development server is running

## Demo Credentials

**Admin Login:**
- Password: `admin123`

**Test Image URLs:**
You can use these Unsplash URLs for testing:
- `https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200`
- `https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800`
- `https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800`

---

**Version**: 1.0.0  
**Last Updated**: February 11, 2026  
**Author**: Lyzo AI Assistant