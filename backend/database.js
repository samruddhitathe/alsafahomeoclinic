import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  host: process.env.HOST || 'localhost',
  database: process.env.DATABASE || 'alsafa_clinic',
  user: process.env.USER || 'root',
  password: process.env.PASSWORD || '',
  port: parseInt(process.env.MYSQL_PORT) || 3306
};

let pool = null;

async function createDatabaseIfNotExists() {
  // First connect without specifying a database
  const connectionConfig = {
    host: config.host,
    user: config.user,
    password: config.password,
    port: config.port
  };
  
  const tempPool = await mysql.createPool(connectionConfig);
  
  try {
    // Create database if not exists - use backticks for database name
    await tempPool.query(`CREATE DATABASE IF NOT EXISTS \`${config.database}\``);
    console.log(`Database '${config.database}' created or already exists`);
  } finally {
    await tempPool.end();
  }
}

export async function getPool() {
  if (pool) {
    return pool;
  }
  try {
    // First create the database if it doesn't exist
    await createDatabaseIfNotExists();
    
    // Now connect to the database
    pool = await mysql.createPool(config);
    console.log('Connected to MySQL');
    return pool;
  } catch (err) {
    console.error('Database connection failed:', err);
    throw err;
  }
}

export async function getContent() {
  const pool = await getPool();
  
  // Get hero image
  const [heroRows] = await pool.query(`
    SELECT heroImage, lastUpdated FROM WebsiteContent ORDER BY lastUpdated DESC LIMIT 1
  `);
  
  // Get healing stories
  const [storiesRows] = await pool.query(`
    SELECT * FROM HealingStories
  `);
  
  // Get gallery images
  const [galleryRows] = await pool.query(`
    SELECT * FROM GalleryImages ORDER BY id
  `);
  
  return {
    heroImage: heroRows[0]?.heroImage || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200',
    healingStories: storiesRows.map(row => ({
      id: row.id,
      image: row.image,
      condition: row.condition,
      historyDuration: row.historyDuration,
      treatmentDuration: row.treatmentDuration,
      outcome: row.outcome,
      patientInfo: row.patientInfo,
      improvementLevel: row.improvementLevel,
      doctorsInsight: row.doctorsInsight
    })),
    galleryImages: galleryRows.map(row => ({
      url: row.url,
      alt: row.alt
    }))
  };
}

export async function updateHeroImage(imageUrl) {
  const pool = await getPool();
  
  // Check if record exists
  const [rows] = await pool.query(`
    SELECT id FROM WebsiteContent LIMIT 1
  `);
  
  if (rows.length > 0) {
    // Update existing record
    await pool.query(`
      UPDATE WebsiteContent 
      SET heroImage = ?, lastUpdated = ?
    `, [imageUrl, new Date()]);
  } else {
    // Insert new record
    await pool.query(`
      INSERT INTO WebsiteContent (heroImage, lastUpdated) 
      VALUES (?, ?)
    `, [imageUrl, new Date()]);
  }
  
  return { success: true };
}

export async function updateHealingStory(id, imageUrl) {
  const pool = await getPool();
  
  await pool.query(`
    UPDATE HealingStories 
    SET image = ? 
    WHERE id = ?
  `, [imageUrl, id]);
  
  return { success: true };
}

export async function addGalleryImage(url, alt) {
  const pool = await getPool();
  
  // Get max id
  const [maxResult] = await pool.query(`
    SELECT MAX(id) as maxId FROM GalleryImages
  `);
  const nextId = (maxResult[0].maxId || 0) + 1;
  
  await pool.query(`
    INSERT INTO GalleryImages (id, url, alt) 
    VALUES (?, ?, ?)
  `, [nextId, url, alt]);
  
  return { success: true, id: nextId };
}

export async function removeGalleryImage(id) {
  const pool = await getPool();
  
  await pool.query(`
    DELETE FROM GalleryImages WHERE id = ?
  `, [id + 1]);
  
  return { success: true };
}

export async function initializeDatabase() {
  const pool = await getPool();
  
  try {
    // Create WebsiteContent table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS WebsiteContent (
        id INT AUTO_INCREMENT PRIMARY KEY,
        heroImage TEXT,
        lastUpdated DATETIME
      )
    `);
    
    // Create HealingStories table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS HealingStories (
        id VARCHAR(50) PRIMARY KEY,
        image TEXT,
        \`condition\` TEXT,
        historyDuration VARCHAR(100),
        treatmentDuration VARCHAR(100),
        outcome TEXT,
        patientInfo TEXT,
        improvementLevel INT,
        doctorsInsight TEXT
      )
    `);
    
    // Create GalleryImages table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS GalleryImages (
        id INT PRIMARY KEY,
        url TEXT,
        alt TEXT
      )
    `);
    
    // Check if we need to seed default data
    const [contentCount] = await pool.query(`
      SELECT COUNT(*) as count FROM WebsiteContent
    `);
    
    if (contentCount[0].count === 0) {
      // Insert default hero image
      await pool.query(`
        INSERT INTO WebsiteContent (heroImage, lastUpdated) VALUES (?, ?)
      `, ['https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200', new Date()]);
      
      // Insert default healing stories
      const stories = [
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
      ];
      
      for (const story of stories) {
        await pool.query(`
          INSERT INTO HealingStories (id, image, condition, historyDuration, treatmentDuration, outcome, patientInfo, improvementLevel, doctorsInsight)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [story.id, story.image, story.condition, story.historyDuration, story.treatmentDuration, story.outcome, story.patientInfo, story.improvementLevel, story.doctorsInsight]);
      }
      
      // Insert default gallery images
      const galleryImages = [
        { id: 1, url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800', alt: 'Clinic Interior' },
        { id: 2, url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800', alt: 'Consultation Room' },
        { id: 3, url: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&q=80&w=800', alt: 'Medicine Preparation' },
        { id: 4, url: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=800', alt: 'Reception Area' },
        { id: 5, url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800', alt: 'Waiting Area' },
        { id: 6, url: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&q=80&w=800', alt: 'Treatment Room' },
        { id: 7, url: 'https://images.unsplash.com/photo-1629909615957-be38b9e8e4c4?auto=format&fit=crop&q=80&w=800', alt: 'Pharmacy Section' },
        { id: 8, url: 'https://images.unsplash.com/photo-1631815588091-d3a8f4c8e8c4?auto=format&fit=crop&q=80&w=800', alt: 'Doctor Consultation' }
      ];
      
      for (const img of galleryImages) {
        await pool.query(`
          INSERT INTO GalleryImages (id, url, alt) VALUES (?, ?, ?)
        `, [img.id, img.url, img.alt]);
      }
      
      console.log('Default data seeded successfully');
    }
    
    console.log('Database initialized successfully');
  } catch (err) {
    console.error('Error initializing database:', err);
    throw err;
  }
}
