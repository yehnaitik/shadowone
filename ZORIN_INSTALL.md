# ShadowCore One - Complete Installation Guide for Zorin OS

Your ShadowCore One browser is ready! Here's exactly how to install and run it on Zorin OS.

---

## What You Have

Two installer files are ready:

1. **ShadowCore-One-1.0.0.AppImage** (231 MB) - Portable, no installation
2. **shadowcore-one_1.0.0_amd64.deb** (181 MB) - Standard Debian package (recommended)

---

## Installation Method 1: DEB Package (Recommended for Zorin OS)

This is the standard way to install applications on Zorin OS.

### One-Line Installation:
```bash
sudo dpkg -i shadowcore-one_1.0.0_amd64.deb && sudo apt-get install -f -y
```

Or step-by-step:

### Step 1: Download the DEB file
```bash
# If not already downloaded
wget https://releases.shadowcore.one/shadowcore-one_1.0.0_amd64.deb
```

### Step 2: Install using dpkg
```bash
sudo dpkg -i shadowcore-one_1.0.0_amd64.deb
```

### Step 3: Fix dependencies (if needed)
```bash
sudo apt-get install -f -y
```

### Step 4: Launch ShadowCore One
```bash
shadowcore-one
```

Or use the applications menu: Open Activities → Search "ShadowCore One" → Click

---

## Installation Method 2: AppImage (No sudo required)

AppImage doesn't need installation and runs anywhere.

### One-Line Installation:
```bash
chmod +x ShadowCore-One-1.0.0.AppImage && ./ShadowCore-One-1.0.0.AppImage
```

Or step-by-step:

### Step 1: Download the AppImage
```bash
wget https://releases.shadowcore.one/ShadowCore-One-1.0.0.AppImage
```

### Step 2: Make it executable
```bash
chmod +x ShadowCore-One-1.0.0.AppImage
```

### Step 3: Run it
```bash
./ShadowCore-One-1.0.0.AppImage
```

### (Optional) Move to bin for easy access
```bash
mkdir -p ~/.local/bin
mv ShadowCore-One-1.0.0.AppImage ~/.local/bin/shadowcore-one
chmod +x ~/.local/bin/shadowcore-one

# Now just run:
shadowcore-one
```

---

## Quick Installation Commands

Pick one of these and paste into your terminal:

### Option A: DEB (Recommended)
```bash
sudo dpkg -i shadowcore-one_1.0.0_amd64.deb && sudo apt-get install -f -y && shadowcore-one
```

### Option B: AppImage (No sudo)
```bash
chmod +x ShadowCore-One-1.0.0.AppImage && ./ShadowCore-One-1.0.0.AppImage
```

### Option C: Automated DEB Install Script
```bash
chmod +x install.sh && ./install.sh
```

---

## What to Do After Installation

1. **Open ShadowCore One** - Click the icon or run `shadowcore-one`
2. **Create Your Profile** - Enter your name and choose an avatar (no account needed)
3. **Set Session Restore** - When asked, choose to restore previous tabs
4. **Start Browsing** - Type URLs or search in the address bar
5. **Explore Features**:
   - Bookmark pages (⭐ icon)
   - Open Downloads from sidebar
   - View History
   - Save Notes
   - Use the AI Assistant (click in sidebar)

---

## File Sizes and Specs

- **AppImage**: 231 MB (includes Electron runtime)
- **DEB Package**: 181 MB (depends on system libraries)
- **Installed Size**: ~400-500 MB total
- **Memory Usage**: ~150-250 MB when running
- **Downloads**: Takes actual disk space (by design)
- **Browsing Cache**: None (everything in memory)

---

## Uninstall ShadowCore One

### If installed via DEB:
```bash
sudo apt remove shadowcore-one
sudo apt autoclean  # Free up space
```

### If using AppImage:
```bash
rm ShadowCore-One-1.0.0.AppImage
# Or if copied to ~/.local/bin:
rm ~/.local/bin/shadowcore-one
```

---

## Troubleshooting

### Problem: "Command not found: shadowcore-one"
```bash
# Check if installed correctly
dpkg -l | grep shadowcore

# If not listed, reinstall:
sudo dpkg -i shadowcore-one_1.0.0_amd64.deb
```

### Problem: "dpkg: error processing package"
```bash
# Fix broken dependencies
sudo apt-get install -f -y

# Then retry install
sudo dpkg -i shadowcore-one_1.0.0_amd64.deb
```

### Problem: AppImage won't run
```bash
# Make sure it's executable
chmod +x ShadowCore-One-1.0.0.AppImage

# Try running with verbose output
./ShadowCore-One-1.0.0.AppImage --verbose
```

### Problem: Missing dependencies (libappindicator1)
```bash
# Install the missing library
sudo apt-get install libappindicator1

# Then reinstall
sudo apt-get install -f -y
```

---

## System Requirements

- **OS**: Zorin OS 16 or later (any Linux x64)
- **RAM**: 2 GB minimum, 4 GB recommended
- **Storage**: 500 MB free (for app + cache)
- **Internet**: Yes (for web browsing)

---

## Features

✓ **Virtual Browsing** - No disk cache, pure privacy  
✓ **Session Restore** - Recover tabs after closing  
✓ **Profiles** - Multiple user profiles, no signup  
✓ **AI Assistant** - Built-in chatbot helper  
✓ **Bookmarks & History** - Full bookmark system  
✓ **Notes & Todo** - Built-in note-taking  
✓ **Pomodoro Timer** - Focus mode  
✓ **Downloads Manager** - Track all downloads  
✓ **Dark Theme** - Eye-friendly for all-day use  
✓ **Lightweight** - ~250 MB, low resource usage  

---

## Terminal Commands Reference

```bash
# Install via DEB (recommended)
sudo dpkg -i shadowcore-one_1.0.0_amd64.deb
sudo apt-get install -f -y
shadowcore-one

# Install via AppImage
chmod +x ShadowCore-One-1.0.0.AppImage
./ShadowCore-One-1.0.0.AppImage

# Launch
shadowcore-one

# Uninstall
sudo apt remove shadowcore-one

# Check version
shadowcore-one --version

# View help
shadowcore-one --help
```

---

## Need Help?

- Read the full INSTALL.md file
- Check the GitHub issues: https://github.com/shadowcore/one/issues
- Join our community: https://discord.gg/shadowcore

---

## Welcome to ShadowCore One!

You now have a modern, privacy-focused virtual browser built specifically for Linux. Enjoy fast, clean, and secure browsing without disk cache interference.

Happy browsing!
