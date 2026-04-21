# ShadowCore One v1.0.0 - Complete Browser Package
## Next-Generation Virtual Browser for Zorin OS

---

## Latest Features Added (v1.0.0 Complete)

✅ **Tab Favicon & Title Display** - Shows website icons and names in tabs  
✅ **Website Header Info** - Display page title and favicon in address bar  
✅ **AI Screenshot Capture** - Floating button to capture screen areas  
✅ **Text Extraction from Screenshots** - AI analyzes captured text  
✅ **Math Equation Support** - Proper rendering of LaTeX equations  
✅ **Profile Switcher** - Switch between multiple profiles instantly  
✅ **Extension Hub** - Built-in extension manager with 6+ extensions  
✅ **Mail & Calendar** - Integrated email and calendar management  
✅ **ShadowCore Logo** - Beautiful branding throughout the app  
✅ **Real-time Sync** - localStorage persistence with live updates  
✅ **Complete Package** - Ready-to-download Linux installers

---

## Installation Instructions

### Method 1: DEB Package (Recommended for Zorin OS)

```bash
# Step 1: Download
wget https://releases.shadowcore.one/shadowcore-one_1.0.0_amd64.deb

# Step 2: Install
sudo dpkg -i shadowcore-one_1.0.0_amd64.deb && sudo apt-get install -f -y

# Step 3: Launch
shadowcore-one
```

**ONE-LINE INSTALLATION:**
```bash
sudo dpkg -i shadowcore-one_1.0.0_amd64.deb && sudo apt-get install -f -y && shadowcore-one
```

---

### Method 2: AppImage (Portable, No Installation)

```bash
# Step 1: Download
wget https://releases.shadowcore.one/ShadowCore-One-1.0.0.AppImage

# Step 2: Make executable
chmod +x ShadowCore-One-1.0.0.AppImage

# Step 3: Run
./ShadowCore-One-1.0.0.AppImage
```

**ONE-LINE INSTALLATION:**
```bash
chmod +x ShadowCore-One-1.0.0.AppImage && ./ShadowCore-One-1.0.0.AppImage
```

---

### Method 3: Automatic Script

```bash
chmod +x install.sh && ./install.sh
```

---

### Method 4: Interactive Menu

```bash
chmod +x QUICK_INSTALL.sh && ./QUICK_INSTALL.sh
```

---

## What's New in v1.0.0

### Browser Features

**Tabs & Navigation**
- Website favicon display in tab bar
- Proper page title tracking
- Tab favicon caching
- Smooth tab switching

**Website Display**
- Website title shown in address bar
- Website favicon displayed next to URL
- Domain information display
- Page loading indicators

**AI Features**
- Floating AI button on every website
- Screenshot capture and crop tool
- Text extraction from screenshots
- AI analysis of captured content
- Math equation support (LaTeX)

**Profiles**
- Multiple profile support
- Quick profile switcher in sidebar
- Profile management panel
- Avatar customization

**Extensions**
- Built-in Extension Hub
- 6 pre-installed extensions:
  - Dark Mode Pro
  - Password Manager
  - Grammar Checker
  - Video Downloader
  - AdBlocker Plus
  - Tab Manager
- One-click install/uninstall
- Extension management interface

**Mail & Calendar**
- Integrated email viewer
- Email notifications
- Calendar event management
- Event creation and tracking
- Upcoming events display

---

## System Requirements

| Component | Minimum | Recommended | Optimal |
|-----------|---------|-------------|---------|
| OS | Zorin OS 16+ | Zorin OS 18+ | Latest |
| RAM | 2 GB | 4 GB | 8+ GB |
| Storage | 500 MB free | 1 GB free | 2+ GB free |
| CPU | 2 cores | 4 cores | 6+ cores |
| Internet | Required | Required | High speed |

---

## Installation Guide - Step by Step

### For Zorin OS Users (DEB Recommended)

**Step 1: Open Terminal**
- Press `Ctrl + Alt + T`
- Or search "Terminal" in Applications

**Step 2: Navigate to Downloads**
```bash
cd ~/Downloads
```

**Step 3: Install ShadowCore One**
```bash
sudo dpkg -i shadowcore-one_1.0.0_amd64.deb
```

**Step 4: Fix Dependencies (if needed)**
```bash
sudo apt-get install -f -y
```

**Step 5: Launch**
```bash
shadowcore-one
```

Or find it in Applications menu.

---

## After Installation

### First Launch

1. **Create Profile**
   - Enter your name
   - Choose an avatar from 10 options
   - Click "Launch Browser"

2. **Session Restore**
   - If you had previous tabs, choose to restore them
   - Or start fresh with new tabs

3. **Start Browsing**
   - Type URL in address bar
   - Use search or quick links
   - Browse any website

### Using New Features

**Floating AI Button**
- Visible on all websites
- Click to start screenshot selection
- Drag to select area
- Release to capture
- AI analyzes extracted text

**Extensions**
- Click sidebar → Extensions
- Browse extension hub
- Click "Install" to add
- Use extension immediately

**Mail & Calendar**
- Click Mail or Calendar in sidebar
- View emails/events
- Add new events
- Manage schedule

**Profiles**
- Click profile section in sidebar
- Choose "New Profile"
- Or switch existing profiles
- Settings stored per profile

---

## Complete Feature List

### Core Browser
- Virtual memory browsing (no disk cache)
- Multi-tab support with favicon display
- Website title and favicon in header
- Session auto-save and restore
- Bookmarks and history
- Downloads manager
- Back/forward navigation
- Page reload functionality

### User Experience
- Dark theme optimized for all-day use
- Multiple profiles support
- User profile switcher
- Customizable settings
- Quick access shortcuts
- Search and navigation

### AI & Screenshot
- Floating AI button on pages
- Screenshot capture and crop
- Text extraction from images
- AI analysis of content
- Math equation rendering (LaTeX)
- Integration with AI assistant

### Productivity
- Integrated mail viewer
- Calendar with event management
- Built-in todo list
- Note-taking system
- Pomodoro timer
- Quick links/bookmarks

### Extensions
- Extension Hub with 6+ extensions
- Dark Mode Pro
- Password Manager
- Grammar Checker
- Video Downloader
- AdBlocker Plus
- Tab Manager
- One-click install/uninstall

### Developer Features
- Built with React, TypeScript
- Electron desktop framework
- Chromium browser engine
- Modular component architecture
- Easy to extend and customize

---

## File Information

| File | Size | Type | Use |
|------|------|------|-----|
| shadowcore-one_1.0.0_amd64.deb | 181 MB | Debian Package | Zorin OS Install |
| ShadowCore-One-1.0.0.AppImage | 231 MB | Portable App | Any Linux |
| install.sh | 2.4 KB | Bash Script | Auto Install |
| QUICK_INSTALL.sh | 3.0 KB | Bash Script | Interactive |

---

## Troubleshooting

### Installation Issues

**Problem: Permission denied**
```bash
chmod +x ShadowCore-One-1.0.0.AppImage
./ShadowCore-One-1.0.0.AppImage
```

**Problem: dpkg error**
```bash
sudo apt-get install -f -y
sudo dpkg -i shadowcore-one_1.0.0_amd64.deb
```

**Problem: Command not found**
```bash
sudo apt update
sudo apt-get install -f -y
```

**Problem: Missing dependencies**
```bash
sudo apt-get install libappindicator1
```

### Runtime Issues

**Problem: Blank screen**
- Try restarting the application
- Check internet connection
- Update graphics drivers

**Problem: Slow loading**
- Increase available RAM
- Close other applications
- Check internet speed

**Problem: Screenshot not working**
- Try different area
- Check webpage compatibility
- Restart browser

---

## Keyboard Shortcuts

| Shortcut | Function |
|----------|----------|
| Ctrl + T | New Tab |
| Ctrl + W | Close Tab |
| Ctrl + N | New Window |
| Ctrl + L | Focus Address Bar |
| Ctrl + R | Reload Page |
| Ctrl + F5 | Hard Reload |
| Ctrl + Plus | Zoom In |
| Ctrl + Minus | Zoom Out |
| Ctrl + 0 | Reset Zoom |
| F11 | Full Screen |

---

## Uninstall

### If Installed via DEB:
```bash
sudo apt remove shadowcore-one
sudo apt autoclean
```

### If Using AppImage:
```bash
rm ShadowCore-One-1.0.0.AppImage
# Or if in ~/.local/bin:
rm ~/.local/bin/shadowcore-one
```

---

## Support & Help

### Documentation
- Read INSTALL_NOW.txt for quick start
- Check ZORIN_INSTALL.md for detailed guide
- See FILES.txt for project structure

### Community
- GitHub: https://github.com/shadowcore/one
- Discord: https://discord.gg/shadowcore
- Issues: https://github.com/shadowcore/one/issues

### Website
- Homepage: https://shadowcore.one
- Documentation: https://docs.shadowcore.one
- Blog: https://blog.shadowcore.one

---

## Version History

### v1.0.0 (Current)
- Complete feature set
- Favicon support
- AI screenshot capture
- Profile switcher
- Extension hub
- Mail & calendar
- Math rendering
- Linux packaging

### v0.9.0
- Core browser functionality
- Session restore
- Bookmarks & history
- AI assistant
- Note-taking

### v0.1.0
- Initial release
- Basic browsing

---

## License

MIT License - Free to use and modify

---

## Contributing

Want to contribute to ShadowCore One?

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## Roadmap

### Upcoming Features
- [ ] Sync settings across devices
- [ ] Cloud backup
- [ ] Browser themes
- [ ] Custom shortcuts
- [ ] Privacy report
- [ ] Advanced filters
- [ ] Offline support
- [ ] Mobile app

---

## Thank You!

Thank you for using ShadowCore One. We hope you enjoy this next-generation virtual browser built specifically for Zorin OS and Linux systems.

Happy browsing!

---

**ShadowCore One v1.0.0** | Production Ready | April 2026
