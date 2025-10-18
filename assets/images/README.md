# VerusFi Logo & Favicon

This directory contains the logo and favicon files for the VerusFi website.

## Design Concept

The VerusFi logo represents the core mission of the organization:

- **V Checkmark**: Symbolizes "Verus" (Truth in Latin) and verification
- **Three Interconnected Nodes**: Represents decentralization and distributed networks
- **Green to Blue Gradient**: Symbolizes growth (#26A17B) to trust (#3B82F6)
- **Dark Background**: Represents the freedom from traditional financial opacity
- **Shield Shape**: Protection and security of financial sovereignty

## Files

### Source Files (SVG)
- `logo.svg` - Full logo (200x200px) for use on the website
- `favicon.svg` - Simplified favicon optimized for small sizes

### Generated Files (PNG)
To generate PNG files from the SVG sources, run:

```bash
./scripts/generate_favicons.sh
```

This will create:
- `favicon-16x16.png` - Small favicon
- `favicon-32x32.png` - Standard favicon
- `favicon-192x192.png` - Android Chrome icon
- `favicon-512x512.png` - High-res icon for PWA
- `favicon.ico` - Multi-size ICO file
- `logo.png` - 400x400px logo in PNG format

### Requirements

The generation script requires either:
- **Inkscape** (recommended): `brew install inkscape` (macOS) or `apt install inkscape` (Linux)
- **ImageMagick**: `brew install imagemagick` (macOS) or `apt install imagemagick` (Linux)

## Usage in HTML

The favicons are automatically included in the site's `<head>` section via `_layouts/default.html`:

```html
<!-- Favicons -->
<link rel="icon" type="image/svg+xml" href="/assets/images/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/images/favicon-192x192.png">
```

## Customization

To modify the logo or favicon:

1. Edit the SVG files (`logo.svg` or `favicon.svg`) in any vector editor
2. Maintain the gradient colors for brand consistency
3. Re-generate PNG files using the generation script
4. Test across different browsers and devices

## Color Palette

```css
Primary Green: #26A17B
Secondary Blue: #3B82F6
Dark Background: #0A0E27
Lighter Background: #1A1F3A
```

## License

Copyright © 2025 VerusFi. All rights reserved.
