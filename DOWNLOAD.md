# ShadowCore One v1.3.0 - Download & Install

## Your Browser Package is Ready!

### What's New in v1.3.0:
✓ **Ad Blocker Plus** - Full features enabled  
✓ **All Extensions** - Pre-installed and activated  
✓ **Google OAuth** - Optional login for Mail & Calendar sync  
✓ **Gmail Integration** - Access your emails in-browser  
✓ **Google Calendar** - View and manage events  
✓ **Session Restore** - Automatic tab recovery on restart  
✓ **Tab Sync** - Seamless browser state persistence  

---

## Download Your Package

### Package File
**ShadowCore-One-linux-x64-v1.3.0.tar.gz**
- Size: 410 MB
- Format: Compressed archive (includes AppImage + DEB + docs)
- Created: 2026-04-22

### Download Link
Visit your home directory or use:
```bash
# Navigate to downloads
cd ~/Downloads

# Download the package
wget http://shadowcore.local:8888/ShadowCore-One-linux-x64-v1.3.0.tar.gz
```

---

## Installation for Zorin OS

### Quick Install (Recommended)
```bash
# 1. Extract the package
tar -xzf ShadowCore-One-linux-x64-v1.3.0.tar.gz

# 2. Install via DEB
sudo dpkg -i dist/shadowcore-one_1.0.0_amd64.deb
sudo apt-get install -f -y

# 3. Launch
shadowcore-one
```

### Alternative: AppImage (No Installation)
```bash
# Extract and run
tar -xzf ShadowCore-One-linux-x64-v1.3.0.tar.gz
chmod +x dist/ShadowCore-One-1.0.0.AppImage
./dist/ShadowCore-One-1.0.0.AppImage
```

---

## Features Included

### Core Browser Features
- Multi-tab browsing
- URL bar with search
- Bookmarks system
- History tracking
- Downloads manager
- Session restore on restart

### Built-in Extensions (All Enabled)
1. **Dark Mode Pro** - Advanced dark mode
2. **Password Manager** - Secure credentials
3. **Grammar Checker** - Real-time corrections
4. **Video Downloader** - Download media
5. **AdBlocker Plus** - Block ads & trackers
6. **Tab Manager** - Organize tabs
7. **Google Drive Integration** - File sync
8. **Translator Pro** - Instant translation

### Google Services
- **Gmail** - Read and manage emails
- **Google Calendar** - View events
- **Optional OAuth** - For profile sync
- **Auto-sync** - Keep data synchronized

### Privacy & Security
- No disk cache
- Memory-only browsing
- Session encryption
- Local storage only
- RLS database protection

---

## First Launch Setup

1. **Create Profile**
   - Enter your name
   - Choose an avatar
   
2. **Optional: Connect Google**
   - Click "Connect Google"
   - Authorize Gmail & Calendar access
   - Enable automatic sync

3. **Start Browsing**
   - Click "Launch Browser"
   - Tabs restore automatically

---

## System Requirements

- **OS**: Zorin OS 16+ or any Linux x64
- **RAM**: 2 GB minimum, 4 GB recommended
- **Storage**: 500 MB free space
- **Internet**: Required for browsing

---

## File Contents

```
ShadowCore-One-linux-x64-v1.3.0.tar.gz
├── dist/
│   ├── ShadowCore-One-1.0.0.AppImage (231 MB)
│   └── shadowcore-one_1.0.0_amd64.deb (181 MB)
├── ZORIN_INSTALL.md
├── INSTALL.md
└── [build files]
```

---

## Support

For help or issues:
1. Check ZORIN_INSTALL.md in the package
2. Review INSTALL.md for detailed setup
3. Ensure all dependencies are installed:
   ```bash
   sudo apt-get install libappindicator1
   ```

---

## Uninstall

### Via DEB:
```bash
sudo apt remove shadowcore-one
```

### Via AppImage:
```bash
rm ShadowCore-One-1.0.0.AppImage
```

---

**Version**: 1.3.0  
**Release Date**: 2026-04-22  
**License**: MIT  
**Platform**: Linux x64

Happy Browsing!
