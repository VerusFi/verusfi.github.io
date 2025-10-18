#!/bin/bash

# Script to generate favicon files in various sizes
# Requires: ImageMagick or Inkscape

echo "Generating favicon files..."

# Check if we have inkscape or imagemagick
if command -v inkscape &> /dev/null; then
    CONVERTER="inkscape"
    echo "Using Inkscape for conversion"
elif command -v convert &> /dev/null; then
    CONVERTER="imagemagick"
    echo "Using ImageMagick for conversion"
else
    echo "Error: Neither Inkscape nor ImageMagick found."
    echo "Please install one of them:"
    echo "  - Ubuntu/Debian: sudo apt install inkscape"
    echo "  - macOS: brew install inkscape"
    echo "  - Or use ImageMagick: brew install imagemagick"
    exit 1
fi

# Create output directory
mkdir -p assets/images

# Generate different sizes
if [ "$CONVERTER" = "inkscape" ]; then
    # Using Inkscape
    inkscape assets/images/favicon.svg -o assets/images/favicon-16x16.png -w 16 -h 16
    inkscape assets/images/favicon.svg -o assets/images/favicon-32x32.png -w 32 -h 32
    inkscape assets/images/favicon.svg -o assets/images/favicon-192x192.png -w 192 -h 192
    inkscape assets/images/favicon.svg -o assets/images/favicon-512x512.png -w 512 -h 512
    inkscape assets/images/logo.svg -o assets/images/logo.png -w 400 -h 400
else
    # Using ImageMagick
    convert -background none -density 1200 assets/images/favicon.svg -resize 16x16 assets/images/favicon-16x16.png
    convert -background none -density 1200 assets/images/favicon.svg -resize 32x32 assets/images/favicon-32x32.png
    convert -background none -density 1200 assets/images/favicon.svg -resize 192x192 assets/images/favicon-192x192.png
    convert -background none -density 1200 assets/images/favicon.svg -resize 512x512 assets/images/favicon-512x512.png
    convert -background none -density 1200 assets/images/logo.svg -resize 400x400 assets/images/logo.png
fi

# Generate favicon.ico with multiple sizes
if [ "$CONVERTER" = "imagemagick" ]; then
    convert assets/images/favicon-16x16.png assets/images/favicon-32x32.png assets/images/favicon.ico
    echo "✓ Generated favicon.ico"
fi

echo "✓ Generated favicon-16x16.png"
echo "✓ Generated favicon-32x32.png"
echo "✓ Generated favicon-192x192.png"
echo "✓ Generated favicon-512x512.png"
echo "✓ Generated logo.png"
echo ""
echo "All favicon files generated successfully!"
echo ""
echo "Files created in assets/images/:"
ls -lh assets/images/ | grep -E "favicon|logo" | awk '{print "  " $9 " (" $5 ")"}'
