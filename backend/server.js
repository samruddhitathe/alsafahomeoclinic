import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getContent, updateHeroImage, updateHealingStory, addGalleryImage, removeGalleryImage, initializeDatabase } from './database.js';

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Admin password (in production, use environment variable)
const ADMIN_PASSWORD = 'admin123';

// API Routes

// GET /api/content - Fetch all content (for all users)
app.get('/api/content', async (req, res) => {
  try {
    const content = await getContent();
    res.json(content);
  } catch (err) {
    console.error('Error fetching content:', err);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

// PUT /api/hero - Update hero image (admin only)
app.put('/api/hero', async (req, res) => {
  try {
    const { imageUrl, password } = req.body;
    
    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    await updateHeroImage(imageUrl);
    res.json({ success: true, message: 'Hero image updated successfully' });
  } catch (err) {
    console.error('Error updating hero image:', err);
    res.status(500).json({ error: 'Failed to update hero image' });
  }
});

// PUT /api/story/:id - Update healing story image (admin only)
app.put('/api/story/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { imageUrl, password } = req.body;
    
    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    await updateHealingStory(id, imageUrl);
    res.json({ success: true, message: 'Story image updated successfully' });
  } catch (err) {
    console.error('Error updating story:', err);
    res.status(500).json({ error: 'Failed to update story' });
  }
});

// POST /api/gallery - Add gallery image (admin only)
app.post('/api/gallery', async (req, res) => {
  try {
    const { url, alt, password } = req.body;
    
    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const result = await addGalleryImage(url, alt);
    res.json({ success: true, message: 'Gallery image added successfully', id: result.id });
  } catch (err) {
    console.error('Error adding gallery image:', err);
    res.status(500).json({ error: 'Failed to add gallery image' });
  }
});

// DELETE /api/gallery/:index - Remove gallery image (admin only)
app.delete('/api/gallery/:index', async (req, res) => {
  try {
    const { index } = req.params;
    const { password } = req.query;
    
    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    await removeGalleryImage(parseInt(index));
    res.json({ success: true, message: 'Gallery image removed successfully' });
  } catch (err) {
    console.error('Error removing gallery image:', err);
    res.status(500).json({ error: 'Failed to remove gallery image' });
  }
});

// POST /api/login - Admin login verification
app.post('/api/login', (req, res) => {
  const { password } = req.body;
  
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ error: 'Invalid password' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Initialize database and start server
async function startServer() {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`API available at http://localhost:${PORT}/api`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
