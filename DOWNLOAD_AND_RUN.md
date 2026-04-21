# ShadowCore One v1.0.0 - Complete Download & Installation Guide

## Download Links

You have 2 ways to get ShadowCore One:

### Option A: DEB Package (Recommended for Zorin OS) - 181 MB
```
File: shadowcore-one_1.0.0_amd64.deb
Location: dist/shadowcore-one_1.0.0_amd64.deb
Direct Link: https://releases.shadowcore.one/shadowcore-one_1.0.0_amd64.deb
```

### Option B: AppImage (Portable, Works Anywhere) - 231 MB  
```
File: ShadowCore-One-1.0.0.AppImage
Location: dist/ShadowCore-One-1.0.0.AppImage
Direct Link: https://releases.shadowcore.one/ShadowCore-One-1.0.0.AppImage
```

---

## Installation Commands

### FASTEST WAY - Copy & Paste ONE of These:

#### For DEB (Zorin OS - Recommended):
```bash
cd ~/Downloads && sudo dpkg -i shadowcore-one_1.0.0_amd64.deb && sudo apt-get install -f -y && shadowcore-one
```

#### For AppImage (Any Linux):
```bash
cd ~/Downloads && chmod +x ShadowCore-One-1.0.0.AppImage && ./ShadowCore-One-1.0.0.AppImage
```

---

## Step-by-Step Installation

### DEB Method (Zorin OS)

**1. Download the DEB file**
```bash
# Open Terminal: Ctrl + Alt + T
cd ~/Downloads
wget https://releases.shadowcore.one/shadowcore-one_1.0.0_amd64.deb
```

**2. Install**
```bash
sudo dpkg -i shadowcore-one_1.0.0_amd64.deb
```

**3. Fix Dependencies**
```bash
sudo apt-get install -f -y
```

**4. Launch**
```bash
shadowcore-one
```

### AppImage Method (Any Linux)

**1. Download**
```bash
cd ~/Downloads
wget https://releases.shadowcore.one/ShadowCore-One-1.0.0.AppImage
```

**2. Make Executable**
```bash
chmod +x ShadowCore-One-1.0.0.AppImage
```

**3. Run**
```bash
./ShadowCore-One-1.0.0.AppImage
```

---

## All Available Commands

### Download Commands
```bash
# DEB Package
wget https://releases.shadowcore.one/shadowcore-one_1.0.0_amd64.deb

# AppImage
wget https://releases.shadowcore.one/ShadowCore-One-1.0.0.AppImage

# Both
wget https://releases.shadowcore.one/shadowcore-one_1.0.0_amd64.deb
wget https://releases.shadowcore.one/ShadowCore-One-1.0.0.AppImage
```

### Installation Commands
```bash
# DEB Installation (Zorin OS)
sudo dpkg -i shadowcore-one_1.0.0_amd64.deb
sudo apt-get install -f -y

# AppImage Installation (Any Linux)
chmod +x ShadowCore-One-1.0.0.AppImage
./ShadowCore-One-1.0.0.AppImage

# Automatic Script (DEB)
chmod +x install.sh && ./install.sh

# Interactive Menu
chmod +x QUICK_INSTALL.sh && ./QUICK_INSTALL.sh
```

### Launch Commands
```bash
# After DEB install:
shadowcore-one

# Via Terminal:
shadowcore-one

# Via Applications Menu:
Activities → Search "ShadowCore One" → Click

# AppImage Direct:
./ShadowCore-One-1.0.0.AppImage

# From ~/.local/bin:
~/.local/bin/shadowcore-one
```

### Uninstall Commands
```bash
# DEB Uninstall:
sudo apt remove shadowcore-one
sudo apt autoclean

# AppImage Remove:
rm ShadowCore-One-1.0.0.AppImage
rm ~/.local/bin/shadowcore-one
```

### Troubleshooting Commands
```bash
# Check if installed
dpkg -l | grep shadowcore

# Fix broken dependencies
sudo apt-get install -f -y

# Reinstall
sudo apt-get install --reinstall shadowcore-one

# View version
shadowcore-one --version

# Check permissions
ls -la ShadowCore-One-1.0.0.AppImage

# Make executable
chmod +x ShadowCore-One-1.0.0.AppImage
```

---

## Complete Installation Walkthrough

### 1. Open Terminal
Press `Ctrl + Alt + T` in Zorin OS

### 2. Paste This Command (Choose One):

**For Zorin OS (DEB - Recommended):**
```bash
cd ~/Downloads && wget https://releases.shadowcore.one/shadowcore-one_1.0.0_amd64.deb && sudo dpkg -i shadowcore-one_1.0.0_amd64.deb && sudo apt-get install -f -y && shadowcore-one
```

**For Any Linux (AppImage):**
```bash
cd ~/Downloads && wget https://releases.shadowcore.one/ShadowCore-One-1.0.0.AppImage && chmod +x ShadowCore-One-1.0.0.AppImage && ./ShadowCore-One-1.0.0.AppImage
```

### 3. Press Enter

### 4. Enter Password (if prompted)
Type your Zorin OS password (won't show as dots)

### 5. Wait 1-2 Minutes
Installation will complete automatically

### 6. Browser Launches!
- Create your profile (name + avatar)
- Choose to restore previous tabs (if any)
- Start browsing!

---

## What You Get After Installation

✓ Full-featured virtual browser  
✓ Website title & favicon display  
✓ AI screenshot capture tool  
✓ 6+ built-in extensions  
✓ Email & calendar integration  
✓ Profile switcher  
✓ Session restore  
✓ Bookmark manager  
✓ History tracking  
✓ Note-taking system  
✓ Todo list with Pomodoro  
✓ Dark theme  
✓ No disk cache (RAM only)  

---

## File Locations

After installation (DEB):
```
Binary: /opt/shadowcore-one/shadowcore-one
Config: ~/.config/ShadowCore One/
Cache: None (RAM only)
Desktop Entry: /usr/share/applications/shadowcore-one.desktop
```

---

## Quick Reference Card

| Task | Command |
|------|---------|
| Install (DEB) | `sudo dpkg -i shadowcore-one_1.0.0_amd64.deb && sudo apt-get install -f -y` |
| Install (AppImage) | `chmod +x ShadowCore-One-1.0.0.AppImage && ./ShadowCore-One-1.0.0.AppImage` |
| Launch | `shadowcore-one` |
| Uninstall | `sudo apt remove shadowcore-one` |
| Check Status | `dpkg -l \| grep shadowcore` |
| Fix Issues | `sudo apt-get install -f -y` |
| View Help | `shadowcore-one --help` |
| Check Version | `shadowcore-one --version` |

---

## FAQ

**Q: Which version should I use?**  
A: DEB for Zorin OS (recommended), AppImage for other Linux distros.

**Q: Do I need sudo?**  
A: Yes for DEB (to install system-wide), no for AppImage.

**Q: How much space does it take?**  
A: ~500 MB total (includes Chromium browser engine).

**Q: Does it use disk cache?**  
A: No, everything runs in RAM and is cleared on exit.

**Q: Can I switch profiles?**  
A: Yes, click profile in sidebar → "New Profile" or switch existing ones.

**Q: Where are my bookmarks saved?**  
A: In browser's localStorage (synced with local files).

**Q: Can I use extensions?**  
A: Yes, open Extensions in sidebar → Extension Hub → Install.

**Q: How do I use AI screenshot?**  
A: Click floating button → drag to select area → release to capture.

**Q: Can I uninstall easily?**  
A: Yes, run `sudo apt remove shadowcore-one` (DEB) or delete file (AppImage).

---

## Minimum System Check

Before installing, verify your system:

```bash
# Check Zorin OS version
lsb_release -a

# Check RAM
free -h

# Check disk space
df -h ~

# Check internet
ping google.com
```

Requirements:
- **OS**: Zorin OS 16+
- **RAM**: 2 GB minimum
- **Disk**: 500 MB free
- **Internet**: Yes

---

## Support

If you have issues:

1. **Read Documentation**
   - FINAL_SETUP.md (this file)
   - ZORIN_INSTALL.md
   - INSTALL.md

2. **Check Logs**
   ```bash
   journalctl -xe
   ```

3. **Try Fixes**
   ```bash
   sudo apt-get install -f -y
   sudo apt update && sudo apt upgrade
   ```

4. **Get Help**
   - GitHub Issues: https://github.com/shadowcore/one/issues
   - Discord: https://discord.gg/shadowcore
   - Website: https://shadowcore.one

---

## Ready to Install?

**Choose your method above and paste ONE command into your terminal.**

The browser will be installed and running in minutes!

---

## What's Included

- Full virtual browser
- 6+ extensions
- Email & calendar
- AI assistant
- Screenshot tool
- Profile manager
- Bookmark system
- History tracking
- Note-taking
- Todo lists
- Pomodoro timer
- Dark theme
- Session restore

---

**ShadowCore One v1.0.0** | Ready to Download | April 2026
