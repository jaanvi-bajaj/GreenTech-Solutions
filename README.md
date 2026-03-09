GreenTech Solutions - Company Profile Website

A full-stack renewable energy company profile website built with traditional HTML, CSS, and JavaScript, powered by Node.js/Express backend and PostgreSQL database.

📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Prerequisites](#prerequisites)
5. [Installation Guide](#installation-guide)
6. [Database Setup](#database-setup)
7. [Running the Application](#running-the-application)
8. [Project Structure](#project-structure)
9. [API Endpoints](#api-endpoints)
10. [Troubleshooting](#troubleshooting)
11. [Assignment Requirements](#assignment-requirements)

---
🌟 Project Overview

GreenTech Solutions is a comprehensive company profile website showcasing renewable energy products and services. The website features:
6 interlinked pages with emoticon navigation (🏠🛒🏆👥📅📞)
15 renewable energy products with AED pricing and installation details
8 awards** with emoticon decorations
4 team member profiles**
Company timeline** with milestones
Interactive contact form** with database integration
Dubai headquarters** contact information

✨ Features
 Frontend Features
 ✅ Separate HTML files (6 pages)
 ✅ External CSS stylesheet
 ✅ External JavaScript file
 ✅ Responsive design
 ✅ Emoticon-based navigation
 ✅ Product filtering by category
 ✅ Form validation
 ✅ Dynamic content loading via API
 Backend Features
 ✅ Node.js Express server
 ✅ RESTful API endpoints
 ✅ PostgreSQL database integration
 ✅ Real-time data persistence
 ✅ Image serving
 ✅ CORS enabled

Database Features
✅ 6 PostgreSQL tables
✅ Complete schema with relationships
✅ Sample data included
✅ Contact form submissions storage
✅ Transaction support
---
 🛠️ Technologies Used
Frontend
- HTML5
- CSS3
- Vanilla JavaScript
- Responsive Design
Backend
- Node.js (v18+)
- Express.js (v4.18+)
- PostgreSQL (v14+)
Dependencies
- `express` - Web server framework
- `pg` - PostgreSQL client for Node.js
  
 📦 Prerequisites
Before you begin, ensure you have the following installed on your Mac:
1. Node.js (v18 or higher)

**Check if installed:**
```bash
node --version
```

If not installed, download from:
Official website: https://nodejs.org/
Or install via Homebrew:
```bash
brew install node
```

2. PostgreSQL (v14 or higher)

Check if installed:
```bash
psql --version
```

If not installed, choose one method:

Method A: Homebrew (Recommended)
```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install PostgreSQL
brew install postgresql@14

# Add to PATH (add this to your ~/.zshrc or ~/.bash_profile)
echo 'export PATH="/opt/homebrew/opt/postgresql@14/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

Method B: Postgres.app (GUI Version)
1. Download from: https://postgresapp.com/
2. Install and open the app
3. Click "Initialize" to create a new server
4. PostgreSQL is now running!

3. Git (for version control)

Check if installed:
```bash
git --version
```

Git usually comes pre-installed on Mac. If not:
```bash
brew install git
```
---
📥 Installation Guide

Step 1: Download or Clone the Project

Option A: Download ZIP
1. Download the project ZIP file
2. Extract it to your desired location (e.g., Desktop)
3. Open Terminal and navigate to the folder:
```bash
cd ~/Desktop/GreenTech-Solutions
```

Option B: Clone from GitHub
```bash
cd ~/Desktop
git clone https://github.com/YOUR-USERNAME/GreenTech-Solutions.git
cd GreenTech-Solutions
```

Step 2: Install Node.js Dependencies

```bash
npm install
```

This will install:
- `express` - Web server
- `pg` - PostgreSQL client

Expected output:
```
added 60 packages in 3s
```

🗄️ Database Setup

 Step 1: Start PostgreSQL Service

If using Homebrew:
```bash
# Start PostgreSQL
brew services start postgresql@14

# Verify it's running
brew services list | grep postgresql
```

You should see: `postgresql@14 started`

If using Postgres.app:
- Simply open the Postgres.app
- Ensure the server is running (green light)

Step 2: Create the Database

```bash
# Create a new database named 'greentech'
createdb greentech
```

Expected output:
- No output means success!

To verify:
```bash
psql -l | grep greentech
```

You should see `greentech` in the list.

Step 3: Initialize Database Schema and Data

```bash
# Make sure you're in the project directory
cd ~/Desktop/GreenTech-Solutions

# Run the SQL initialization file
psql greentech < db/init.sql
```

Expected output:
```
CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE
INSERT 0 1
INSERT 0 1
...
```

This creates 6 tables and inserts all sample data.

Step 4: Verify Database Setup

```bash
# Connect to the database
psql greentech
```

Run these commands to verify:

```sql
-- List all tables (should show 6 tables)
\dt

-- Check products count (should show 15)
SELECT COUNT(*) FROM products;

-- Check awards count (should show 8)
SELECT COUNT(*) FROM awards;

-- Check team members count (should show 4)
SELECT COUNT(*) FROM team_members;

-- View some sample data
SELECT name, price, category FROM products LIMIT 5;

-- Exit PostgreSQL
\q
```

Expected tables:
- `products`
- `team_members`
- `timeline_events`
- `awards`
- `testimonials`
- `contact_submissions`

🚀 Running the Application

Method 1: Using npm (if you updated package.json)

```bash
npm run dev
```

Method 2: Direct Node.js execution

```bash
node server.js
```

Expected output:
```
Server running on http://localhost:5000
```

If you see an error about database connection:**
```bash
# Set the database URL environment variable
export DATABASE_URL=postgresql://localhost/greentech

# Then run again
node server.js
```

Access the Website

Open your web browser and navigate to:
```
http://localhost:5000
```

You should see the GreenTech Solutions homepage!


📁 Project Structure

```
GreenTech-Solutions/
├── public/                      # Frontend files (HTML/CSS/JS)
│   ├── index.html              # Home page (🏠)
│   ├── products.html           # Products listing (🛒)
│   ├── awards.html             # Awards & achievements (🏆)
│   ├── team.html               # Team members (👥)
│   ├── timeline.html           # Company timeline (📅)
│   ├── contact.html            # Contact form (📞)
│   ├── css/
│   │   └── style.css          # External stylesheet
│   └── js/
│       └── app.js             # External JavaScript
│
├── db/
│   └── init.sql               # Database schema & seed data
│
├── attached_assets/
│   └── generated_images/      # Product & team images
│       ├── solar_panel.png
│       ├── wind_turbine.png
│       ├── battery_storage.png
│       ├── smart_home.png
│       ├── ceo.png
│       ├── cto.png
│       ├── vp_operations.png
│       ├── head_engineering.png
│       └── hero_renewable.png
│
├── server.js                   # Node.js Express server
├── package.json               # Node.js dependencies
└── README.md                  # This file
```

🔌 API Endpoints

The server provides RESTful API endpoints for dynamic content:

Products
```
GET /api/products
```
Returns all 15 products with details (name, category, price, installation info, etc.)

Team Members
```
GET /api/team
```
Returns all 4 team member profiles

Timeline Events
```
GET /api/timeline
```
Returns company timeline events ordered by year

Awards
```
GET /api/awards
```
Returns all 8 awards ordered by year (newest first)

Testimonials
```
GET /api/testimonials
```
Returns customer testimonials

Contact Form Submission
```
POST /api/contact
```
Saves contact form submission to database

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+971501234567",
  "company": "Tech Corp",
  "message": "Interested in solar panels"
}
```

Images
```
GET /api/images/:filename
```
Serves product and team images

🎯 Testing the Application

1. Test Navigation
- Click through all 6 pages using the emoticon menu
- Verify all pages load correctly

2. Test Products Page
- Should display 15 products
- Test category filtering (Solar Panels, Wind Energy, etc.)
- Verify prices are in AED

3. Test Awards Page
- Should display 8 awards
- Verify emoticons appear in award names

4. Test Team Page
- Should display 4 team members
- Verify photos load

 5. Test Contact Form
- Fill out all required fields
- Submit the form
- Should see success message

 6. Verify Database Integration

Check contact submission in database:
```bash
psql greentech -c "SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 1;"
```

You should see your submitted contact form data!

 🔍 Database Verification Tools

Option 1: Command Line (psql)

```bash
# Connect to database
psql greentech

# View all products
SELECT name, price FROM products;

# View all awards
SELECT name, year FROM awards;

# View contact submissions
SELECT name, email, message FROM contact_submissions;

# Exit
\q
```

Option 2: Postico 2 (GUI - Recommended)

Download: https://eggerapps.at/postico2/

Setup:
1. Open Postico 2
2. Click "New Favorite"
3. Enter connection details:
   - Host: localhost
   - Port: 5432
   - User: (your Mac username)
   - Database: greentech
   - Password: (leave blank)
4. Click "Connect"

Now you can:
- Browse all tables visually
- View and edit data
- Run SQL queries
- Monitor contact form submissions in real-time
  
🛠️ Troubleshooting

Issue 1: "Cannot connect to database"

Symptoms:
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

Solution:
```bash
# Check if PostgreSQL is running
brew services list | grep postgresql

# If not running, start it
brew services start postgresql@14

# Verify connection
psql postgres -c "SELECT 1;"
```

---

Issue 2: "Database 'greentech' does not exist"

Solution:
```bash
# Create the database
createdb greentech

# Initialize it
psql greentech < db/init.sql
```

Issue 3: "Port 5000 already in use"

Solution A: Use different port
```bash
PORT=3000 node server.js
```
Then access at: `http://localhost:3000`

Solution B: Kill process using port 5000
```bash
# Find process on port 5000
lsof -ti:5000

# Kill the process
kill -9 $(lsof -ti:5000)

# Run server again
node server.js
```

Issue 4: "Module not found: express" or "Module not found: pg"

Solution:
```bash
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

Issue 5: "command not found: psql"

Solution:
```bash
# PostgreSQL not in PATH, add it
echo 'export PATH="/opt/homebrew/opt/postgresql@14/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Verify
psql --version
```

---

Issue 6: Tables not created or empty

Solution:
```bash
# Drop and recreate database
psql postgres

# In psql:
DROP DATABASE greentech;
CREATE DATABASE greentech;
\q

# Re-initialize
psql greentech < db/init.sql
```

---

Issue 7: Images not loading

Check that:
1. `attached_assets/generated_images/` folder exists
2. Images are in the folder
3. Server is running
4. Check browser console for errors (F12)

Fix permissions:
```bash
chmod -R 755 attached_assets/
```

---

📊 Database Schema

Products Table
```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    description TEXT,
    price DECIMAL(10,2),
    installation_time VARCHAR(100),
    installation_details TEXT,
    warranty VARCHAR(100),
    efficiency VARCHAR(100),
    image_url VARCHAR(255)
);
```

Contains: 15 products with AED pricing

---

Team Members Table
```sql
CREATE TABLE team_members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    bio TEXT,
    photo_url VARCHAR(255)
);
```

Contains: 4 team member profiles

---

### Timeline Events Table
```sql
CREATE TABLE timeline_events (
    id SERIAL PRIMARY KEY,
    year INTEGER,
    title VARCHAR(255),
    description TEXT
);
```

Contains: 8 company milestones

---

Awards Table
```sql
CREATE TABLE awards (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    year VARCHAR(10),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Contains: 8 awards with emoticons

---

Testimonials Table
```sql
CREATE TABLE testimonials (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255),
    company VARCHAR(255),
    message TEXT
);
```
Contains: 6 customer testimonials

---

Contact Submissions Table
```sql
CREATE TABLE contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Stores: Form submissions with timestamp

---
✅ HTML Files 
- 6 separate HTML pages
- Semantic HTML structure
- No inline CSS or JavaScript
- Proper linking between pages

✅ JavaScript Files 
- External `app.js` file
- API integration for dynamic content
- Form validation
- Event handling
- No inline JavaScript

 ✅ Form Validation 
- Contact form with validation
- Required field checks
- Email format validation
- Phone number validation
- Real-time error messages
- Database integration

 ✅ CSS Files 
- External `style.css` file
- Responsive design
- Professional styling
- Consistent layout
- No inline styles

✅ Images/Logos 
- 9 professional images
- Product images (4)
- Team member photos (4)
- Hero/banner image (1)

✅ UI Design 
- Clean, modern interface
- Emoticon-based navigation
- Responsive layout
- Professional color scheme
- User-friendly design

✅ Dynamic Content 
- All data loaded from database
- Products dynamically rendered
- Awards dynamically rendered
- Team members dynamically rendered
- Timeline dynamically rendered
- Testimonials dynamically rendered

✅ Database 
- PostgreSQL database
- 6 tables with proper schema
- Relationships between tables
- Sample data included
- Contact form saves to database
- `db/init.sql` provided

✅ Node.js Files 
- `server.js` with Express
- RESTful API endpoints
- Database connection handling
- Error handling
- Professional code structure

🌐 Company Information
Dubai Headquarters
- Company Name: GreenTech Solutions
- Phone:+971 4 123 4567
- Email:info@greentech.ae
- Address:Dubai Silicon Oasis, Dubai, UAE
- Business Hours: Sunday - Thursday: 9:00 AM - 6:00 PM

Specialization
Renewable energy solutions including:
- Solar panels and systems
- Wind turbines
- Energy storage solutions
- Smart home automation
- Hybrid energy systems

---

📝 Development Notes

Code Structure
- Separation of Concerns:** HTML (structure), CSS (presentation), JS (behavior)
- RESTful API:Following REST principles for all endpoints
- ES6 Modules:Using modern JavaScript import/export
- Async/Await:For database operations
- Error Handling: Try/catch blocks for all database queries

Best Practices Followed
- ✅ Semantic HTML5
- ✅ External CSS and JavaScript
- ✅ Responsive design principles
- ✅ RESTful API design
- ✅ Database normalization
- ✅ Prepared statements for SQL
- ✅ Environment variable configuration
- ✅ Proper error handling

---
- Topic: GreenTech Solutions (Renewable Energy)

GreenTech Solutions website is ready to run. Follow the installation and setup instructions above, and you'll have a fully functional renewable energy company website with database integration!

--Test update for SonarCloud Scan--
