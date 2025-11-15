# Running GreenTech Solutions in VS Code

Complete guide to opening, editing, and running your project in Visual Studio Code.

---

## 📋 Table of Contents

1. [Opening the Project](#opening-the-project)
2. [First-Time Setup](#first-time-setup)
3. [Running the Server](#running-the-server)
4. [Testing the Application](#testing-the-application)
5. [Making Changes](#making-changes)
6. [Troubleshooting](#troubleshooting)
7. [Recommended Extensions](#recommended-extensions)
8. [Tips & Tricks](#tips--tricks)

---

## 🚀 Opening the Project

### Method 1: From VS Code

1. **Open VS Code**
2. Click **File → Open Folder** (or press `Cmd + O`)
3. Navigate to your `GreenTech-Solutions` folder
4. Click **Open**

### Method 2: From Terminal

```bash
cd ~/Desktop/GreenTech-Solutions
code .
```

The `.` means "current directory"

### Method 3: From Finder (Mac)

1. Navigate to your project folder in Finder
2. Right-click the folder
3. Select **Open with Code**
   (If you don't see this option, open VS Code first, then use Method 1)

---

## 🛠️ First-Time Setup

Run these commands **ONCE** when you first set up the project.

### Step 1: Open VS Code Terminal

Press **`` Ctrl + ` ``** (backtick key, usually below Esc)

Or go to: **Terminal → New Terminal** from the menu

You should see a terminal panel at the bottom of VS Code.

---

### Step 2: Install PostgreSQL

**Check if already installed:**
```bash
psql --version
```

**If not installed:**
```bash
# Install using Homebrew
brew install postgresql@14

# Start PostgreSQL service
brew services start postgresql@14

# Verify it's running
brew services list | grep postgresql
```

You should see: `postgresql@14 started`

---

### Step 3: Add PostgreSQL to PATH (if needed)

If you get `command not found: psql`:

```bash
# Add to PATH
echo 'export PATH="/opt/homebrew/opt/postgresql@14/bin:$PATH"' >> ~/.zshrc

# Reload terminal configuration
source ~/.zshrc

# Verify
psql --version
```

**Important:** After running this, close and reopen VS Code terminal.

---

### Step 4: Create Database

```bash
# Create the database
createdb greentech

# Verify it was created
psql -l | grep greentech
```

You should see `greentech` in the list.

---

### Step 5: Load Database Schema and Data

```bash
# Make sure you're in the project directory
pwd
# Should show: /Users/your-name/Desktop/GreenTech-Solutions

# Load the SQL file
psql greentech < db/init.sql
```

**Expected output:**
```
CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE
INSERT 0 1
INSERT 0 1
INSERT 0 1
...
```

---

### Step 6: Verify Database

```bash
# Connect to database
psql greentech
```

**Run these verification commands:**
```sql
-- Show all tables
\dt

-- Count products (should be 15)
SELECT COUNT(*) FROM products;

-- Count awards (should be 8)
SELECT COUNT(*) FROM awards;

-- View some products
SELECT name, price, category FROM products LIMIT 5;

-- Exit
\q
```

---

### Step 7: Install Node.js Dependencies

In VS Code terminal:

```bash
npm install
```

**Expected output:**
```
added 60 packages in 3s
```

---

## 🚀 Running the Server

### Basic Method

In VS Code terminal:

```bash
node server.js
```

**Expected output:**
```
Server running on http://localhost:5000
```

---

### With Environment Variable (Recommended)

```bash
export DATABASE_URL=postgresql://localhost/greentech
node server.js
```

---

### Using npm Script (if you updated package.json)

```bash
npm run dev
```

---

## 🌐 Testing the Application

### Step 1: Access Website

Once the server is running, you have two options:

#### Option A: Click URL in Terminal
1. Look for: `Server running on http://localhost:5000`
2. **Cmd + Click** on the URL
3. Opens in your default browser

#### Option B: Manual
1. Open your browser
2. Go to: `http://localhost:5000`

---

### Step 2: Test All Pages

Click through the emoticon navigation:
- 🏠 **Home** - Main page
- 🛒 **Products** - Should show 15 products
- 🏆 **Awards** - Should show 8 awards
- 👥 **Team** - Should show 4 team members
- 📅 **Timeline** - Should show company history
- 📞 **Contact** - Contact form

---

### Step 3: Test Product Filtering

On Products page:
1. Try filtering by category
2. Click different categories
3. Products should update

---

### Step 4: Test Contact Form

1. Go to Contact page
2. Fill out all fields
3. Click "Send Message"
4. Should see success message

**Verify in database:**
```bash
# In a new terminal (don't stop the server)
psql greentech -c "SELECT name, email, message FROM contact_submissions ORDER BY created_at DESC LIMIT 1;"
```

You should see your submission!

---

## ✏️ Making Changes

### Editing HTML

1. Open any `.html` file in `public/` folder
2. Make your changes
3. Save: `Cmd + S`
4. Refresh browser: `Cmd + R`

**No server restart needed for HTML changes!**

---

### Editing CSS

1. Open `public/css/style.css`
2. Make your changes
3. Save: `Cmd + S`
4. Refresh browser: `Cmd + R`

**No server restart needed for CSS changes!**

---

### Editing JavaScript (Frontend)

1. Open `public/js/app.js`
2. Make your changes
3. Save: `Cmd + S`
4. Refresh browser: `Cmd + R`

**No server restart needed for frontend JS!**

---

### Editing Server Code

1. Open `server.js`
2. Make your changes
3. Save: `Cmd + S`
4. **Stop server:** Press `Ctrl + C` in terminal
5. **Restart server:** `node server.js`
6. Refresh browser: `Cmd + R`

**Server restart IS needed for backend changes!**

---

### Editing Database

1. Open `db/init.sql`
2. Make your changes
3. Save: `Cmd + S`
4. **Reload database:**
   ```bash
   # Drop old database
   dropdb greentech
   
   # Create new one
   createdb greentech
   
   # Load updated SQL
   psql greentech < db/init.sql
   ```
5. Restart server if it was running

---

## 🔄 Typical Workflow

### Starting Your Work Session

```bash
# 1. Open VS Code terminal (Ctrl + `)

# 2. Start PostgreSQL (if not running)
brew services start postgresql@14

# 3. Start server
node server.js

# 4. Open browser to http://localhost:5000
```

---

### During Development

1. **Edit files** in VS Code
2. **Save** with `Cmd + S`
3. **Refresh browser** if HTML/CSS/JS changed
4. **Restart server** if server.js changed

---

### Ending Your Work Session

1. **Stop server:** Press `Ctrl + C` in terminal
2. **Optional:** Stop PostgreSQL
   ```bash
   brew services stop postgresql@14
   ```
3. Close VS Code

---

## 🛠️ Troubleshooting

### Issue: "command not found: psql"

**Cause:** PostgreSQL not installed or not in PATH

**Solution:**
```bash
# Add to PATH
echo 'export PATH="/opt/homebrew/opt/postgresql@14/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Close and reopen VS Code terminal
```

---

### Issue: "Cannot connect to database"

**Cause:** PostgreSQL service not running

**Solution:**
```bash
# Start PostgreSQL
brew services start postgresql@14

# Verify it's running
brew services list | grep postgresql
```

---

### Issue: "Database greentech does not exist"

**Cause:** Database not created yet

**Solution:**
```bash
# Create database
createdb greentech

# Load data
psql greentech < db/init.sql
```

---

### Issue: "Port 5000 already in use"

**Cause:** Another server is using port 5000

**Solution A: Use different port**
```bash
PORT=3000 node server.js
```
Then access at: `http://localhost:3000`

**Solution B: Kill the process**
```bash
# Find and kill process on port 5000
kill -9 $(lsof -ti:5000)

# Run server again
node server.js
```

---

### Issue: "Module not found: express" or "Module not found: pg"

**Cause:** Dependencies not installed

**Solution:**
```bash
# Install dependencies
npm install

# Or remove and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

### Issue: Server starts but pages don't load

**Cause:** Browser cache or wrong URL

**Solution:**
1. Try opening in **Incognito/Private** window
2. Clear browser cache: `Cmd + Shift + R`
3. Verify URL is exactly: `http://localhost:5000`
4. Check VS Code terminal for errors

---

### Issue: Changes not showing in browser

**Cause:** Browser cache

**Solution:**
1. **Hard refresh:** `Cmd + Shift + R`
2. Or open **Incognito window**
3. Or clear browser cache completely

---

## 🎨 Recommended VS Code Extensions

Install these for better development experience:

### Essential Extensions

1. **HTML CSS Support**
   - Better HTML/CSS autocomplete
   - Install: Search "HTML CSS Support" in Extensions

2. **JavaScript (ES6) code snippets**
   - Quick JS shortcuts
   - Install: Search "JavaScript ES6"

3. **PostgreSQL**
   - SQL syntax highlighting
   - Install: Search "PostgreSQL" by Chris Kolkman

### Optional but Helpful

4. **Live Server**
   - Quick preview for static HTML (optional)
   - Install: Search "Live Server"

5. **Path Intellisense**
   - Autocomplete file paths
   - Install: Search "Path Intellisense"

6. **Prettier**
   - Code formatter
   - Install: Search "Prettier"

### How to Install Extensions

1. Click **Extensions** icon in left sidebar (or press `Cmd + Shift + X`)
2. Search for extension name
3. Click **Install**
4. Reload VS Code if prompted

---

## 💡 VS Code Tips & Tricks

### Multiple Terminals

**Open multiple terminals:**
1. Click **+** icon in terminal panel
2. Or: **Terminal → New Terminal**

**Switch between terminals:**
- Use dropdown menu in terminal panel
- Or click the split icon

**Use case:**
- Terminal 1: Run server (`node server.js`)
- Terminal 2: Run database commands (`psql greentech`)

---

### Split Terminal

**Split terminal horizontally:**
1. Click the **split** icon (top right of terminal)
2. Now you have two terminal panes side by side

**Use case:**
- Left: Run server
- Right: Run database queries

---

### Integrated Terminal Shortcuts

```
Ctrl + `          Open/close terminal
Cmd + \           Split terminal
Cmd + K           Clear terminal
Ctrl + C          Stop running process
Cmd + T           New terminal tab
```

---

### File Navigation Shortcuts

```
Cmd + P           Quick open file
Cmd + Shift + F   Search in all files
Cmd + B           Toggle sidebar
Cmd + ,           Settings
Cmd + /           Comment/uncomment line
```

---

### Editing Shortcuts

```
Cmd + S           Save file
Cmd + Z           Undo
Cmd + Shift + Z   Redo
Option + Up/Down  Move line up/down
Cmd + D           Select next occurrence
```

---

### Multi-Cursor Editing

1. Hold `Option` and click to add cursors
2. Or: `Cmd + D` to select next occurrence
3. Type to edit all at once

**Example:** Change "Product" to "Item" in multiple places

---

### Zen Mode (Distraction-Free)

Press `Cmd + K`, then `Z`

Full-screen, no distractions. Perfect for coding!

Press `Esc` twice to exit.

---

## 📁 Project Structure in VS Code

Your file tree should look like this:

```
GreenTech-Solutions/
├── 📁 public/
│   ├── 📄 index.html
│   ├── 📄 products.html
│   ├── 📄 awards.html
│   ├── 📄 team.html
│   ├── 📄 timeline.html
│   ├── 📄 contact.html
│   ├── 📁 css/
│   │   └── 📄 style.css
│   └── 📁 js/
│       └── 📄 app.js
├── 📁 db/
│   └── 📄 init.sql
├── 📁 attached_assets/
│   └── 📁 generated_images/
│       └── 🖼️ (9 images)
├── 📄 server.js
├── 📄 package.json
└── 📄 README.md
```

---

## ⚡ Quick Command Reference

### Start Everything

```bash
# 1. Start PostgreSQL
brew services start postgresql@14

# 2. Run server
node server.js

# 3. Open browser
# http://localhost:5000
```

---

### Stop Everything

```bash
# 1. Stop server
Ctrl + C

# 2. Stop PostgreSQL (optional)
brew services stop postgresql@14
```

---

### Database Commands

```bash
# Create database
createdb greentech

# Load data
psql greentech < db/init.sql

# Connect to database
psql greentech

# Inside psql:
\dt                    # List tables
\d products           # Show table structure
SELECT * FROM products;
\q                    # Exit
```

---

### Development Commands

```bash
# Install packages
npm install

# Run server
node server.js

# Run with environment variable
export DATABASE_URL=postgresql://localhost/greentech
node server.js

# Use different port
PORT=3000 node server.js
```

---

## 🎯 Complete Setup Checklist

Before you start developing, verify:

- [ ] VS Code is installed and project is open
- [ ] Terminal is working (Ctrl + `)
- [ ] PostgreSQL is installed (`psql --version`)
- [ ] PostgreSQL is running (`brew services list`)
- [ ] Database `greentech` exists (`psql -l | grep greentech`)
- [ ] Tables are created (6 tables in database)
- [ ] Node modules installed (`node_modules/` folder exists)
- [ ] Server starts without errors (`node server.js`)
- [ ] Website loads in browser (`http://localhost:5000`)
- [ ] All 6 pages are accessible
- [ ] Products page shows 15 items

---

## 🚀 You're Ready to Code!

Your VS Code environment is now set up for GreenTech Solutions development!

**Quick start every time:**
1. Open VS Code
2. Open terminal: `Ctrl + \``
3. Run: `node server.js`
4. Open browser: `http://localhost:5000`
5. Start coding! 🎉

---

## 📞 Need Help?

- Check [Troubleshooting](#troubleshooting) section above
- See main `README.md` for detailed setup
- Verify PostgreSQL is running: `brew services list`
- Check for errors in VS Code terminal

---

**Happy coding! 🌟**
