// GreenTech Solutions - Node.js Express Server
// PostgreSQL Version

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import pkg from 'pg';
const { Pool } = pkg;

// ES module replacement for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://localhost/greentech',
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// API Routes

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get all team members
app.get('/api/team', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM team_members ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching team:', error);
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
});

// Get timeline events
app.get('/api/timeline', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM timeline_events ORDER BY year');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching timeline:', error);
    res.status(500).json({ error: 'Failed to fetch timeline' });
  }
});

// Get all awards
app.get('/api/awards', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM awards ORDER BY year DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching awards:', error);
    res.status(500).json({ error: 'Failed to fetch awards' });
  }
});

// Get all testimonials
app.get('/api/testimonials', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM testimonials ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

// Submit contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Insert into database
    const result = await pool.query(
      'INSERT INTO contact_submissions (name, email, subject, message) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, email, subject, message]
    );
    
    res.status(201).json({ 
      success: true, 
      message: 'Contact form submitted successfully',
      data: { id: result.rows[0].id, name, email, subject, message }
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

// Serve images
app.get('/api/images/hero.png', (req, res) => {
  res.sendFile(path.join(__dirname, 'attached_assets/generated_images/Renewable_energy_hero_background_3bfad6d3.png'));
});

app.get('/api/images/map.png', (req, res) => {
  res.sendFile(path.join(__dirname, 'attached_assets/generated_images/Office_locations_map_97ffbc53.png'));
});

app.get('/api/images/solar.png', (req, res) => {
  res.sendFile(path.join(__dirname, 'attached_assets/generated_images/Solar_panel_product_0b32cb69.png'));
});

app.get('/api/images/wind.png', (req, res) => {
  res.sendFile(path.join(__dirname, 'attached_assets/generated_images/Wind_turbine_product_c170008d.png'));
});

app.get('/api/images/battery.png', (req, res) => {
  res.sendFile(path.join(__dirname, 'attached_assets/generated_images/Energy_storage_system_b7ef2d18.png'));
});

app.get('/api/images/ceo.png', (req, res) => {
  res.sendFile(path.join(__dirname, 'attached_assets/generated_images/Female_CEO_portrait_6411669e.png'));
});

app.get('/api/images/cto.png', (req, res) => {
  res.sendFile(path.join(__dirname, 'attached_assets/generated_images/Male_CTO_portrait_9c3feaf6.png'));
});

app.get('/api/images/engineer.png', (req, res) => {
  res.sendFile(path.join(__dirname, 'attached_assets/generated_images/Female_engineer_portrait_15451bff.png'));
});

app.get('/api/images/ops.png', (req, res) => {
  res.sendFile(path.join(__dirname, 'attached_assets/generated_images/Male_operations_manager_portrait_d6d72b0f.png'));
});

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/products.html'));
});

app.get('/awards', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/awards.html'));
});

app.get('/team', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/team.html'));
});

app.get('/timeline', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/timeline.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/contact.html'));
});

// Test database connection
async function testDatabaseConnection() {
  try {
    const result = await pool.query('SELECT 1 AS test');
    console.log('✓ Database connected successfully');
  } catch (error) {
    console.error('✗ Database connection failed:', error.message);
    console.error('Make sure PostgreSQL is running and the greentech database exists.');
    console.error('Run: psql -U postgres < db/init.sql');
  }
}

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await testDatabaseConnection();
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  pool.end();
  process.exit(0);
});
