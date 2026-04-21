#!/bin/bash

# ShadowCore One - Quick Installation for Zorin OS
# This script guides you through installation with options

clear

echo "╔════════════════════════════════════════════════════════════╗"
echo "║         ShadowCore One - Quick Install Script              ║"
echo "║              For Zorin OS (and other Linux)                ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "This script will help you install ShadowCore One."
echo ""
echo "Choose installation method:"
echo ""
echo "1) DEB Package (Recommended for Zorin OS) - 181 MB"
echo "2) AppImage (Portable, no installation) - 231 MB"
echo "3) Exit"
echo ""
read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo ""
        echo "Installing ShadowCore One via DEB package..."
        echo ""

        if [ ! -f "dist/shadowcore-one_1.0.0_amd64.deb" ]; then
            echo "Error: DEB file not found in dist/"
            echo "Make sure you're in the project directory."
            exit 1
        fi

        echo "Step 1: Installing package..."
        sudo dpkg -i dist/shadowcore-one_1.0.0_amd64.deb

        echo ""
        echo "Step 2: Fixing dependencies..."
        sudo apt-get install -f -y

        echo ""
        echo "╔════════════════════════════════════════════════════════════╗"
        echo "║              Installation Complete!                        ║"
        echo "╚════════════════════════════════════════════════════════════╝"
        echo ""
        echo "To launch ShadowCore One, run:"
        echo "  shadowcore-one"
        echo ""
        echo "Or find it in your Applications menu."
        echo ""
        ;;
    2)
        echo ""
        echo "Setting up ShadowCore One AppImage..."
        echo ""

        if [ ! -f "dist/ShadowCore-One-1.0.0.AppImage" ]; then
            echo "Error: AppImage file not found in dist/"
            echo "Make sure you're in the project directory."
            exit 1
        fi

        echo "Step 1: Making AppImage executable..."
        chmod +x dist/ShadowCore-One-1.0.0.AppImage

        echo "Step 2: Launching ShadowCore One..."
        ./dist/ShadowCore-One-1.0.0.AppImage
        ;;
    3)
        echo "Exiting. You can install later by running:"
        echo ""
        echo "  DEB:      sudo dpkg -i dist/shadowcore-one_1.0.0_amd64.deb"
        echo "  AppImage: ./dist/ShadowCore-One-1.0.0.AppImage"
        exit 0
        ;;
    *)
        echo "Invalid choice. Exiting."
        exit 1
        ;;
esac

echo ""
read -p "Press Enter to exit..."
