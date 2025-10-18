#!/usr/bin/env python3
"""
Creates basic placeholder PNG favicons from the SVG files.
This allows the site to work immediately without requiring ImageMagick/Inkscape.
For production use, run generate_favicons.sh for higher quality images.
"""

import os
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont
    from cairosvg import svg2png
except ImportError:
    print("Missing dependencies. Installing required packages...")
    print("Run: pip install pillow cairosvg")
    exit(1)

# Paths
SCRIPT_DIR = Path(__file__).parent
ROOT_DIR = SCRIPT_DIR.parent
IMAGES_DIR = ROOT_DIR / 'assets' / 'images'
FAVICON_SVG = IMAGES_DIR / 'favicon.svg'
LOGO_SVG = IMAGES_DIR / 'logo.svg'

def create_favicons():
    """Generate PNG favicons from SVG source."""

    print("Generating favicon PNG files from SVG...")

    # Read SVG content
    with open(FAVICON_SVG, 'r') as f:
        favicon_svg = f.read()

    # Generate different sizes
    sizes = [
        (16, 'favicon-16x16.png'),
        (32, 'favicon-32x32.png'),
        (192, 'favicon-192x192.png'),
        (512, 'favicon-512x512.png'),
    ]

    for size, filename in sizes:
        output_path = IMAGES_DIR / filename
        svg2png(bytestring=favicon_svg.encode('utf-8'),
                write_to=str(output_path),
                output_width=size,
                output_height=size)
        print(f"✓ Created {filename}")

    # Generate logo.png
    print("\nGenerating logo PNG file from SVG...")
    with open(LOGO_SVG, 'r') as f:
        logo_svg = f.read()

    logo_output = IMAGES_DIR / 'logo.png'
    svg2png(bytestring=logo_svg.encode('utf-8'),
            write_to=str(logo_output),
            output_width=400,
            output_height=400)
    print(f"✓ Created logo.png")

    print("\nAll PNG files generated successfully!")

if __name__ == '__main__':
    create_favicons()
