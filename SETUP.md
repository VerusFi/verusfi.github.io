# VerusFi Website - Setup Guide

## Quick Start (5 minutes)

### 1. Install Dependencies

```bash
# Install Jekyll dependencies
bundle install

# Install Python dependencies for translation scripts
pip install -r scripts/requirements.txt
```

### 2. Set up Claude AI API Key (for translation scripts)

```bash
export ANTHROPIC_API_KEY='your-api-key-here'
```

To make it permanent, add to your `~/.bashrc` or `~/.zshrc`:

```bash
echo 'export ANTHROPIC_API_KEY="your-api-key-here"' >> ~/.bashrc
source ~/.bashrc
```

### 3. Run the Development Server

```bash
make serve
```

Visit http://localhost:4000

## Testing the Site

### Test Language Switching

1. Go to http://localhost:4000
2. You should be redirected to your browser's language (or /en/ by default)
3. Click the language selector in the header
4. Switch between languages and verify:
   - Navigation stays on the same page type
   - Content is properly translated
   - RTL languages (Urdu, Arabic) display correctly

### Test Mobile Responsive Design

1. Open Chrome DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test different screen sizes:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1280px)

### Test All Pages

Visit each page in each language to verify content:

English:
- http://localhost:4000/en/
- http://localhost:4000/en/about/
- http://localhost:4000/en/products/
- http://localhost:4000/en/blog/

Portuguese:
- http://localhost:4000/pt-br/
- http://localhost:4000/pt-br/sobre/
- http://localhost:4000/pt-br/produtos/
- http://localhost:4000/pt-br/blog/

Spanish:
- http://localhost:4000/es/
- http://localhost:4000/es/acerca/
- http://localhost:4000/es/productos/
- http://localhost:4000/es/blog/

Urdu (RTL):
- http://localhost:4000/ur/
- http://localhost:4000/ur/about/
- http://localhost:4000/ur/products/
- http://localhost:4000/ur/blog/

Arabic (RTL):
- http://localhost:4000/ar/
- http://localhost:4000/ar/about/
- http://localhost:4000/ar/products/
- http://localhost:4000/ar/blog/

## Adding Content Examples

### Add a New Language (French)

```bash
make add-lang LANG=fr NAME="Français" FLAG="🇫🇷" DIR=ltr
```

### Add a New Blog Post

```bash
make add-post TITLE="Announcing VerusInvest 2.0" CONTENT="We are thrilled to announce the release of VerusInvest 2.0, featuring enhanced security, improved performance, and a completely redesigned user interface."
```

## Building for Production

```bash
# Build the site
make build

# The built site will be in _site/
ls _site/
```

## Deploying to GitHub Pages

### Option 1: Direct Push (Recommended)

1. Create a new repository on GitHub
2. Initialize git and push:

```bash
git init
git add .
git commit -m "Initial commit: VerusFi multilingual website"
git branch -M main
git remote add origin https://github.com/verusfi/website.git
git push -u origin main
```

3. Enable GitHub Pages:
   - Go to repository Settings
   - Navigate to Pages section
   - Set source to "main" branch
   - Save

Your site will be live at: https://verusfi.github.io/website/

### Option 2: Custom Domain

1. Add a CNAME file:

```bash
echo "verusfi.org" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

2. Configure DNS:
   - Add these A records to your domain:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153

3. Enable custom domain in GitHub Pages settings

## Troubleshooting

### Jekyll not found

```bash
gem install bundler jekyll
bundle install
```

### Python scripts not working

```bash
# Make sure Python 3.8+ is installed
python3 --version

# Install dependencies
pip3 install -r scripts/requirements.txt

# Set API key
export ANTHROPIC_API_KEY='your-key'
```

### Port 4000 already in use

```bash
# Use a different port
bundle exec jekyll serve --port 4001
```

### Live reload not working

```bash
# Try clearing cache
make clean
make serve
```

## File Structure Overview

```
VerusFi Website
├── _config.yml           # Site configuration & translations
├── _layouts/
│   └── default.html      # Main template
├── assets/
│   ├── css/style.css     # Styling
│   └── js/main.js        # Interactivity
├── content/
│   ├── en/               # English (source language)
│   ├── pt-br/            # Portuguese
│   ├── es/               # Spanish
│   ├── ur/               # Urdu (RTL)
│   └── ar/               # Arabic (RTL)
├── scripts/
│   ├── add_language.py   # Add new language
│   ├── add_blog_post.py  # Add blog post
│   └── requirements.txt
├── index.html            # Root with language detection
├── Gemfile               # Ruby dependencies
├── Makefile              # Commands
└── README.md             # Documentation
```

## Next Steps

1. Review and customize the content in `content/en/`
2. Update colors/branding in `assets/css/style.css`
3. Add your logo image (currently using text logo)
4. Set up Google Analytics (add to `_layouts/default.html`)
5. Configure SEO meta tags in `_config.yml`
6. Add more blog posts using `make add-post`
7. Deploy to GitHub Pages

## Support

For issues or questions:
- Check README.md for detailed documentation
- Join our Telegram: https://t.me/verusfi
- GitHub Issues: https://github.com/verusfi/website/issues

---

**Note**: Remember to set your `ANTHROPIC_API_KEY` before using translation scripts!
