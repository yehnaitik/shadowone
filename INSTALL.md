# ShadowCore One - Installation Guide for Zorin OS

ShadowCore One is a next-generation virtual browser built for Linux. It runs websites in memory with no disk cache, perfect for private browsing.

**System Requirements:**
- Zorin OS 16 or later (Linux x64)
- 2GB RAM minimum
- 500MB free disk space
- Internet connection

---

## Option 1: Install via DEB Package (Recommended)

The easiest way to install on Zorin OS is using the `.deb` installer.

### Step 1: Download the DEB file
Download `shadowcore-one_1.0.0_amd64.deb` from the release page.

Or download via terminal:
```bash
wget https://releases.shadowcore.one/shadowcore-one_1.0.0_amd64.deb
```

### Step 2: Install ShadowCore One
```bash
sudo dpkg -i shadowcore-one_1.0.0_amd64.deb
```

If you get dependency errors, run:
```bash
sudo apt-get install -f
```

### Step 3: Launch the Browser
Open your applications menu and search for "ShadowCore One", or run:
```bash
shadowcore-one
```

---

## Option 2: Install via AppImage

AppImage doesn't require installation and can run from anywhere.

### Step 1: Download the AppImage
Download `ShadowCore-One-1.0.0.AppImage`

Or via terminal:
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

### Step 4 (Optional): Create a desktop shortcut
```bash
# Copy to Applications folder
cp ShadowCore-One-1.0.0.AppImage ~/.local/bin/shadowcore-one
chmod +x ~/.local/bin/shadowcore-one

# Now run: shadowcore-one
```

---

## Quick Start After Installation

1. **Create a Profile** - Enter your name and pick an avatar
2. **Start Browsing** - Type a URL or search in the address bar
3. **Virtual Sandbox** - All websites run in memory, no cache stored on disk
4. **Session Restore** - Close and reopen the browser to restore your tabs
5. **AI Assistant** - Click "AI Assistant" in the sidebar for help

---

## Terminal Commands Reference

### Install via DEB:
```bash
sudo dpkg -i shadowcore-one_1.0.0_amd64.deb
sudo apt-get install -f  # If dependencies missing
shadowcore-one  # Launch
```

### Install via AppImage:
```bash
chmod +x ShadowCore-One-1.0.0.AppImage
./ShadowCore-One-1.0.0.AppImage  # Run
```

### Uninstall:
```bash
# If installed via DEB:
sudo apt remove shadowcore-one

# If using AppImage:
rm ShadowCore-One-1.0.0.AppImage
```

---

## Features

✓ No disk cache - browse privately  
✓ Session restore - recover closed tabs  
✓ Built-in profiles - no account needed  
✓ AI chatbot assistant  
✓ Bookmarks, history, notes  
✓ Pomodoro timer  
✓ Dark theme optimized for Zorin OS  
✓ Lightweight - under 250MB

---

## Troubleshooting

**Browser won't start:**
```bash
# Check if dependencies are installed
dpkg -l | grep shadowcore

# Reinstall dependencies
sudo apt-get install -f
```

**Can't make AppImage executable:**
```bash
chmod +x ShadowCore-One-1.0.0.AppImage
./ShadowCore-One-1.0.0.AppImage
```

**Missing libraries:**
```bash
sudo apt update && sudo apt upgrade
```

---

## Support

For issues or feature requests, visit: https://github.com/shadowcore/one

Enjoy your next-generation browsing experience!
