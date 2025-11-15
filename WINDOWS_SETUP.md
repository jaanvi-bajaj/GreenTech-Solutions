# GreenTech Solutions - Windows & Linux Setup Guide

Complete installation and setup guide for Windows and Linux users.

---

## 📋 Table of Contents

1. [Windows Setup](#windows-setup)
2. [Linux Setup](#linux-setup)
3. [Running the Application](#running-the-application)
4. [Troubleshooting](#troubleshooting)

---

# Windows Setup

## 📦 Prerequisites for Windows

### 1. Install Node.js

**Download and Install:**
1. Go to: https://nodejs.org/
2. Download the **LTS version** (recommended)
3. Run the installer
4. **Important:** Check the box "Automatically install necessary tools"
5. Click through the installation

**Verify Installation:**
Open **Command Prompt** (search for "cmd" in Start menu):
```cmd
node --version
npm --version
```

You should see version numbers like `v18.x.x` and `9.x.x`

---

### 2. Install PostgreSQL

**Download and Install:**
1. Go to: https://www.postgresql.org/download/windows/
2. Download the **PostgreSQL installer** (latest version)
3. Run the installer
4. During installation:
   - **Password:** Set a password for postgres user (remember this!)
   - **Port:** Keep default `5432`
   - **Locale:** Keep default
5. Complete the installation

**Add PostgreSQL to PATH:**
1. Search for **"Environment Variables"** in Start menu
2. Click **"Edit the system environment variables"**
3. Click **"Environment Variables"** button
4. Under **"System variables"**, find and select **"Path"**
5. Click **"Edit"**
6. Click **"New"**
7. Add: `C:\Program Files\PostgreSQL\15\bin` (adjust version number if different)
8. Click **"OK"** on all windows
9. **Restart Command Prompt**

**Verify Installation:**
```cmd
psql --version
```

You should see: `psql (PostgreSQL) 15.x`

---

### 3. Install Git (Optional but Recommended)

**Download and Install:**
1. Go to: https://git-scm.com/download/win
2. Download and run the installer
3. Use default settings
4. Complete installation

**Verify:**
```cmd
git --version
```

---

## 📥 Download the Project (Windows)

### Method 1: Download ZIP from GitHub

1. Go to the GitHub repository
2. Click the green **"Code"** button
3. Click **"Download ZIP"**
4. Extract the ZIP file to your desired location (e.g., `C:\Users\YourName\Desktop\`)
5. You should have a folder: `C:\Users\YourName\Desktop\GreenTech-Solutions`

### Method 2: Using Git Clone

Open **Command Prompt**:
```cmd
cd C:\Users\YourName\Desktop
git clone https://github.com/YOUR-USERNAME/GreenTech-Solutions.git
cd GreenTech-Solutions
```

---

## 🗄️ Database Setup (Windows)

### Step 1: Start PostgreSQL Service

**Check if PostgreSQL is running:**
1. Press `Win + R`
2. Type `services.msc` and press Enter
3. Look for **"postgresql-x64-15"** (or similar)
4. If status is not "Running", right-click → **Start**

**Or use Command Prompt (as Administrator):**
```cmd
net start postgresql-x64-15
```

---

### Step 2: Create Database

Open **Command Prompt**:

```cmd
cd C:\Users\YourName\Desktop\GreenTech-Solutions

REM Create database
createdb -U postgres greentech
```

**You'll be prompted for password** - enter the password you set during PostgreSQL installation.

**Alternative method using psql:**
```cmd
psql -U postgres

CREATE DATABASE greentech;
\q
```

---

### Step 3: Load Database Schema and Data

```cmd
cd C:\Users\YourName\Desktop\GreenTech-Solutions

psql -U postgres -d greentech -f db\init.sql
```

**Enter password when prompted.**

**Expected output:**
```
CREATE TABLE
CREATE TABLE
CREATE TABLE
...
INSERT 0 1
INSERT 0 1
...
```

---

### Step 4: Verify Database

```cmd
psql -U postgres -d greentech

SELECT COUNT(*) FROM products;
SELECT COUNT(*) FROM awards;

\q
```

Should show:
- Products: 15
- Awards: 8

---

## 🚀 Install Dependencies and Run (Windows)

### Step 1: Install Node.js Dependencies

Open **Command Prompt**:
```cmd
cd C:\Users\YourName\Desktop\GreenTech-Solutions

npm install
```

**Expected output:**
```
added 60 packages in 5s
```

---

### Step 2: Set Environment Variable

**Option A: Temporary (for current session only)**
```cmd
set DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/greentech
```

Replace `YOUR_PASSWORD` with your PostgreSQL password.

**Option B: Create .env file (recommended)**

Create a file named `.env` in the project root folder:
```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/greentech
```

Replace `YOUR_PASSWORD` with your actual PostgreSQL password.

---

### Step 3: Run the Server

```cmd
node server.js
```

**Expected output:**
```
Server running on http://localhost:5000
```

---

### Step 4: Access the Website

Open your browser and go to:
```
http://localhost:5000
```

**You should see the GreenTech Solutions homepage! 🎉**

---

## 🎯 Running in VS Code (Windows)

### Step 1: Install VS Code

1. Download from: https://code.visualstudio.com/
2. Install with default settings

### Step 2: Open Project

1. Open **VS Code**
2. **File → Open Folder**
3. Select your `GreenTech-Solutions` folder
4. Click **Select Folder**

### Step 3: Open Terminal in VS Code

Press **`` Ctrl + ` ``** (backtick key)

Or: **Terminal → New Terminal**

### Step 4: Run Commands

In VS Code terminal:
```cmd
REM Set environment variable
set DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/greentech

REM Run server
node server.js
```

### Step 5: Access Website

Open browser: `http://localhost:5000`

---

# Linux Setup

## 📦 Prerequisites for Linux

### 1. Update System Packages

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt upgrade -y
```

**Fedora/RHEL/CentOS:**
```bash
sudo dnf update -y
```

**Arch Linux:**
```bash
sudo pacman -Syu
```

---

### 2. Install Node.js

**Ubuntu/Debian:**
```bash
# Install Node.js 18.x LTS
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify
node --version
npm --version
```

**Fedora/RHEL/CentOS:**
```bash
# Install Node.js 18.x LTS
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo dnf install -y nodejs

# Verify
node --version
npm --version
```

**Arch Linux:**
```bash
sudo pacman -S nodejs npm

# Verify
node --version
npm --version
```

**Alternative: Using NVM (Node Version Manager)**
```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reload shell
source ~/.bashrc

# Install Node.js
nvm install 18
nvm use 18

# Verify
node --version
```

---

### 3. Install PostgreSQL

**Ubuntu/Debian:**
```bash
# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Start service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Verify
psql --version
```

**Fedora/RHEL/CentOS:**
```bash
# Install PostgreSQL
sudo dnf install -y postgresql-server postgresql-contrib

# Initialize database
sudo postgresql-setup --initdb

# Start service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Verify
psql --version
```

**Arch Linux:**
```bash
# Install PostgreSQL
sudo pacman -S postgresql

# Initialize database cluster
sudo -u postgres initdb -D /var/lib/postgres/data

# Start service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Verify
psql --version
```

---

### 4. Install Git

**Ubuntu/Debian:**
```bash
sudo apt install -y git
```

**Fedora/RHEL/CentOS:**
```bash
sudo dnf install -y git
```

**Arch Linux:**
```bash
sudo pacman -S git
```

**Verify:**
```bash
git --version
```

---

## 📥 Download the Project (Linux)

### Method 1: Download ZIP

1. Download ZIP from GitHub
2. Extract:
   ```bash
   unzip GreenTech-Solutions-main.zip
   cd GreenTech-Solutions-main
   ```

### Method 2: Git Clone

```bash
cd ~/Desktop
git clone https://github.com/YOUR-USERNAME/GreenTech-Solutions.git
cd GreenTech-Solutions
```

---

## 🗄️ Database Setup (Linux)

### Step 1: Configure PostgreSQL

**Switch to postgres user:**
```bash
sudo -i -u postgres
```

**Create your user as PostgreSQL superuser (optional but recommended):**
```bash
createuser --interactive --pwprompt your_username
```

Answer:
- Enter password: [your password]
- Shall the new role be a superuser? (y/n): y

**Exit postgres user:**
```bash
exit
```

---

### Step 2: Create Database

**As your regular user:**
```bash
createdb greentech
```

**Or as postgres user:**
```bash
sudo -u postgres createdb greentech
```

**Verify:**
```bash
psql -l | grep greentech
```

---

### Step 3: Load Database Schema and Data

```bash
cd ~/Desktop/GreenTech-Solutions

# Load the SQL file
psql greentech < db/init.sql
```

**Or if you need to use postgres user:**
```bash
sudo -u postgres psql greentech < db/init.sql
```

**Expected output:**
```
CREATE TABLE
CREATE TABLE
...
INSERT 0 1
INSERT 0 1
...
```

---

### Step 4: Verify Database

```bash
psql greentech

SELECT COUNT(*) FROM products;
SELECT COUNT(*) FROM awards;

\q
```

Should show:
- Products: 15
- Awards: 8

---

## 🚀 Install Dependencies and Run (Linux)

### Step 1: Install Node.js Dependencies

```bash
cd ~/Desktop/GreenTech-Solutions

npm install
```

**Expected output:**
```
added 60 packages in 3s
```

---

### Step 2: Set Environment Variable

**Option A: Temporary (current session only)**
```bash
export DATABASE_URL=postgresql://localhost/greentech
```

**Option B: Create .env file (recommended)**
```bash
echo 'DATABASE_URL=postgresql://localhost/greentech' > .env
```

---

### Step 3: Run the Server

```bash
node server.js
```

**Expected output:**
```
Server running on http://localhost:5000
```

---

### Step 4: Access the Website

Open your browser and go to:
```
http://localhost:5000
```

**You should see the GreenTech Solutions homepage! 🎉**

---

## 🎯 Running in VS Code (Linux)

### Step 1: Install VS Code

**Ubuntu/Debian:**
```bash
# Download .deb file
wget https://code.visualstudio.com/sha/download?build=stable&os=linux-deb-x64 -O vscode.deb

# Install
sudo dpkg -i vscode.deb
sudo apt install -f
```

**Fedora/RHEL/CentOS:**
```bash
# Import Microsoft GPG key
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc

# Add VS Code repository
sudo sh -c 'echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/vscode.repo'

# Install
sudo dnf install code
```

**Arch Linux:**
```bash
yay -S visual-studio-code-bin
```

**Or download from:** https://code.visualstudio.com/

---

### Step 2: Open Project

```bash
cd ~/Desktop/GreenTech-Solutions
code .
```

Or open VS Code → **File → Open Folder** → Select `GreenTech-Solutions`

---

### Step 3: Open Terminal in VS Code

Press **`` Ctrl + ` ``**

Or: **Terminal → New Terminal**

---

### Step 4: Run Server

In VS Code terminal:
```bash
export DATABASE_URL=postgresql://localhost/greentech
node server.js
```

---

### Step 5: Access Website

Open browser: `http://localhost:5000`

---

# Running the Application

## 🌐 Accessing the Website

Once the server is running, open your browser:

```
http://localhost:5000
```

---

## 📱 Testing All Features

### 1. Navigation
Test all 6 pages using emoticon menu:
- 🏠 Home
- 🛒 Products (15 products)
- 🏆 Awards (8 awards)
- 👥 Team (4 members)
- 📅 Timeline
- 📞 Contact

### 2. Products Page
- View all 15 products
- Test category filtering
- Check AED pricing displays

### 3. Contact Form
- Fill out all fields
- Submit form
- Should see success message

### 4. Verify Database Integration

**Windows:**
```cmd
psql -U postgres -d greentech -c "SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 1;"
```

**Linux:**
```bash
psql greentech -c "SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 1;"
```

Your submission should appear!

---

## 🔄 Starting and Stopping

### Start PostgreSQL Service

**Windows:**
```cmd
net start postgresql-x64-15
```

**Linux (Ubuntu/Debian):**
```bash
sudo systemctl start postgresql
```

**Linux (Fedora/RHEL/CentOS):**
```bash
sudo systemctl start postgresql
```

**Linux (Arch):**
```bash
sudo systemctl start postgresql
```

---

### Stop PostgreSQL Service

**Windows:**
```cmd
net stop postgresql-x64-15
```

**Linux:**
```bash
sudo systemctl stop postgresql
```

---

### Run Server

**Windows:**
```cmd
node server.js
```

**Linux:**
```bash
node server.js
```

---

### Stop Server

Press **`Ctrl + C`** in the terminal (both Windows and Linux)

---

# Troubleshooting

## Windows Troubleshooting

### Issue: "psql is not recognized"

**Solution:**
1. Verify PostgreSQL is in PATH
2. Restart Command Prompt
3. Check installation path: `C:\Program Files\PostgreSQL\15\bin`

---

### Issue: "Permission denied" when creating database

**Solution:**
Make sure you're using the postgres user:
```cmd
psql -U postgres
CREATE DATABASE greentech;
\q
```

---

### Issue: "Port 5000 is already in use"

**Solution:**
```cmd
REM Find process using port 5000
netstat -ano | findstr :5000

REM Kill the process (replace PID with actual process ID)
taskkill /PID [PID] /F

REM Or use different port
set PORT=3000
node server.js
```

---

### Issue: "Cannot connect to database"

**Solution:**
1. Check PostgreSQL service is running in `services.msc`
2. Verify password in DATABASE_URL is correct
3. Try connecting directly:
   ```cmd
   psql -U postgres -d greentech
   ```

---

## Linux Troubleshooting

### Issue: "psql: command not found"

**Solution:**
PostgreSQL not installed properly:
```bash
# Ubuntu/Debian
sudo apt install postgresql postgresql-client

# Verify
which psql
```

---

### Issue: "Peer authentication failed"

**Solution:**
Edit PostgreSQL config:
```bash
sudo nano /etc/postgresql/15/main/pg_hba.conf
```

Change this line:
```
local   all             all                                     peer
```

To:
```
local   all             all                                     md5
```

Restart PostgreSQL:
```bash
sudo systemctl restart postgresql
```

---

### Issue: "Port 5000 already in use"

**Solution:**
```bash
# Find process using port 5000
sudo lsof -ti:5000

# Kill the process
sudo kill -9 $(sudo lsof -ti:5000)

# Or use different port
PORT=3000 node server.js
```

---

### Issue: "Cannot connect to database"

**Solution:**
1. Check PostgreSQL is running:
   ```bash
   sudo systemctl status postgresql
   ```
2. Start if stopped:
   ```bash
   sudo systemctl start postgresql
   ```
3. Test connection:
   ```bash
   psql greentech -c "SELECT 1;"
   ```

---

### Issue: "npm: command not found"

**Solution:**
Node.js not installed or not in PATH:
```bash
# Verify installation
which node
which npm

# Reinstall if needed
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

---

## Common Issues (Both Platforms)

### Issue: "Module not found: express"

**Solution:**
```bash
npm install
```

---

### Issue: "Database greentech does not exist"

**Solution:**
```bash
# Windows
createdb -U postgres greentech

# Linux
createdb greentech
```

---

### Issue: Images not loading

**Solution:**
1. Verify `attached_assets/generated_images/` folder exists
2. Check images are in the folder
3. Restart server
4. Clear browser cache (Ctrl + Shift + R)

---

## 📊 Database Connection Strings

### Windows Format:
```
DATABASE_URL=postgresql://postgres:PASSWORD@localhost:5432/greentech
```

### Linux Format (no password needed usually):
```
DATABASE_URL=postgresql://localhost/greentech
```

### With Custom User:
```
DATABASE_URL=postgresql://username:password@localhost:5432/greentech
```

---

## ✅ Installation Checklist

Before running the project, verify:

- [ ] Node.js installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] PostgreSQL installed (`psql --version`)
- [ ] PostgreSQL service running
- [ ] Database `greentech` created
- [ ] Tables loaded from `db/init.sql`
- [ ] Node modules installed (`npm install`)
- [ ] Environment variable set (DATABASE_URL)
- [ ] Server starts without errors

---

## 🎉 Success!

If you see the GreenTech Solutions homepage at `http://localhost:5000`, you're all set!

**Your project is now running on Windows/Linux! 🚀**

---

## 📞 Need More Help?

- Check main **README.md** for detailed documentation
- See **VSCODE_SETUP.md** for VS Code-specific instructions
- Verify PostgreSQL is running
- Check DATABASE_URL is set correctly
- Look for errors in terminal output

---

**Happy coding! 🌟**
