#!/bin/bash

# ShadowCore One - Installation Script for Zorin OS
# Usage: ./install.sh

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║                 ShadowCore One Installer                   ║"
echo "║            Next-Gen Virtual Browser for Linux              ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check if running on Linux
if [[ ! "$OSTYPE" == "linux-gnu"* ]]; then
    echo "Error: ShadowCore One is only supported on Linux"
    exit 1
fi

# Check for required tools
if ! command -v dpkg &> /dev/null; then
    echo "Error: dpkg not found. This script requires Debian/Ubuntu-based Linux"
    exit 1
fi

# Find DEB file
DEB_FILE=$(find . -name "shadowcore-one_*.deb" -type f | head -1)

if [ -z "$DEB_FILE" ]; then
    echo "Error: No DEB file found in current directory"
    echo "Please download shadowcore-one_1.0.0_amd64.deb first"
    exit 1
fi

echo "Found installer: $DEB_FILE"
echo ""
echo "Installing ShadowCore One..."
echo ""

# Install the package
sudo dpkg -i "$DEB_FILE"

# Check for dependency errors and fix them
if [ $? -ne 0 ]; then
    echo ""
    echo "Detected missing dependencies. Installing..."
    sudo apt-get install -f -y
fi

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║           Installation Complete!                           ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "To launch ShadowCore One, run:"
echo "  $ shadowcore-one"
echo ""
echo "Or find it in your applications menu."
echo ""
echo "Features:"
echo "  ✓ Virtual browsing - no disk cache"
echo "  ✓ Session restore - recover your tabs"
echo "  ✓ Built-in profiles - no account needed"
echo "  ✓ AI assistant chatbot"
echo "  ✓ Bookmarks, history, notes"
echo ""
echo "Enjoy!"
