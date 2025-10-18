# Prompt for VerusFi Website Creation

Create a complete multilingual website using Jekyll for GitHub Pages with the following specifications:

## 1. BASIC STRUCTURE

### Technologies:
- Jekyll 4.3+ for static generation
- 4 supported languages: English (en), Portuguese (pt-br), Spanish (es), Urdu (ur - RTL), Arabic (ar - RTL)
- Localized URLs by language (e.g., /en, /pt-br/produtos/, /es/productos/)
- RTL support for languages such as Urdu and Arabic
- Mobile-first and fully responsive

### Architecture:
- `_config.yml` must be lean and contain minimal translations. All translations must be inside `.md` files.
- Single layout (`_layouts/default.html`) using Liquid templates
- URL mapping system by language (`url_mappings`)
- Automatic browser language detection in root `index.html`
- All `.md` files must be in a subfolder called `content`, then organized into separate subfolders according to their language
- All blog posts must be in a folder named `posts`

## 2. DESIGN AND VISUAL STYLE

### Inspiration:
- Modern and clean design inspired by Web3 sites such as https://tether.to/ or https://nubank.com.br/
- Professional dark theme
- Minimalist yet impactful aesthetic
- Focus on readability and clear visual hierarchy

### Color Palette:
- Primary: Green (#26A17B) — for CTAs and highlights
- Secondary: Blue (#3B82F6) — for secondary elements
- Background: Very dark blue (#0A0E27, #1A1F3A)
- Text: White (#FFFFFF) for titles, light gray (#94A3B8) for body
- Gradient: Linear gradient from green to blue for logo and main headings
- Borders: rgba(255, 255, 255, 0.1) for subtle dividers

### Typography:
- Font: Inter (Google Fonts) throughout the site
- Headings: 800 weight, responsive sizes (clamp)
- Body: 400–500 weight, line-height 1.8 for legibility
- Logo: "Verus" in white + "Fi" with gradient

### Visual Components:
- Sticky header with backdrop-filter blur
- Modern dropdown for language selection with emoji flags
- Cards with subtle borders and hover effects
- Footer with links to Telegram and GitHub
- Smooth animations (fade-in when pages load)
- Soft shadows for depth

## 3. LAYOUT AND STRUCTURE

### Header (Desktop):
- Logo on the left
- Centered navigation: Home | Products | About | Blog
- Language selector on the right (dropdown with flags)
- Height: 80px
- Background: semi-transparent with blur
- Sticky at top when scrolling

### Header (Mobile):
- Logo on the left
- Hamburger menu on the right
- Compact language selector (flag only)
- Mobile menu: slide-in with dark overlay
- Height: 70px

### Navigation:
- Links with hover underline animation
- Active state for current page
- Smooth transitions for all interactions
- Mobile menu with vertically stacked links

### Language Selector:
- Button with emoji flag + language name
- Animated dropdown appearing on click
- Scrollable list of all languages if necessary
- When changing language, preserves page context (produtos → products → productos)
- Closes when clicking outside or pressing ESC
- On mobile, shows only the flag

### Main Content:
- Centered container (max-width: 1280px)
- Generous padding (80px vertical, 24px horizontal)
- Large gradient headings
- Well-spaced, legible paragraphs
- Product link cards with colored left border

### Footer:
- Darker background than body
- Repeated logo
- Project tagline
- Copyright and social links
- Flexible layout adapting to mobile

## 4. SITE CONTENT

### Pages (4 per language):

#### Home (/, /pt-br/, etc.):
```markdown
# Mission

We believe in a future where individuals have complete control over their financial lives. Through open-source development and cryptographic innovation, we’re building tools that enable true financial sovereignty.

## Core Values

**Freedom:** Unrestricted access to financial tools without gatekeepers

**Privacy:** Your financial data belongs to you alone

**Sovereignty:** Complete control over your assets and identity

## Manifesto

Since 2009, when Satoshi Nakamoto introduced Bitcoin to the world, a new technological era was born — an era of freedom, transparency, and decentralization. These innovations paved the way for a future where people can control their own money, their identity, and their digital destiny.

But despite the immense potential of these technologies, access to them remains restricted. Technical complexity, lack of user-friendly interfaces, and absence of practical education have created a barrier that separates millions of people from the power that decentralization can offer.

The VerusFi organization was born to break down this barrier.

Our mission is to bring decentralized technologies within everyone’s reach, transforming innovation into inclusion. We do this by supporting and developing open-source projects that simplify the use of tools that liberate — tools that give people control over their own money, their privacy, and their future.

Through donations and collaborative funding, our nonprofit organization supports developers, educators, and creators who share this vision: a freer, fairer, and more autonomous world, built on decentralized foundations.

We believe that decentralization is the true infrastructure of human freedom.

VerusFi — bringing true finance to the world.
```

#### About (/pt-br/sobre/, /es/acerca/, etc.):
```markdown
# About

VerusFi is an organization dedicated to building freedom technology and financial software that promotes individual liberty, privacy, and sovereignty in the digital age.

## Our Vision

We envision a world where financial systems are:

**Decentralized:** No single point of control or failure

**Transparent:** Open-source code that anyone can audit

**Permissionless:** Accessible to anyone, anywhere

**Private:** Protecting user confidentiality by default

## Our Focus

**Decentralized Finance (DeFi):** Creating financial tools that operate without intermediaries, giving users direct control over their assets.

**Privacy-Preserving Technology:** Implementing cryptographic protocols that protect user data while maintaining system integrity.

**Self-Sovereign Identity:** Building identity systems where individuals control their own data and credentials.

**Open-Source Infrastructure:** Contributing to the commons through freely available, auditable code.

## Join Us

VerusFi is a movement toward financial freedom. Whether you’re a developer, designer, researcher, or advocate, there’s a place for you in building the future of freedom technology.

Become a member of the VerusFi movement by joining our Telegram group: https://t.me/verusfi
```

#### Products (/products/, /pt-br/produtos/, etc.):
```markdown
# VerusInvest

VerusInvest is open-source software that implements a Web3 wallet for desktop with a user experience inspired by traditional investment banks, hiding DeFi’s technical complexities and making Web3 access simple and intuitive even for non-technical users.

With AI support, the system understands the user’s profile and needs to structure a multi-signature wallet, delivered as a joint digital account — a solution created from scratch for inheritance and estate succession in digital assets, without relying on lawyers, holdings, or court procedures.

VerusInvest integrates leading DeFi protocols through an intelligent curation layer operated by VerusFi’s DAO, allowing users to invest in decentralized tokenized products — in the form of investment funds — directly through the app, without needing to navigate multiple sites, wallets, or bridges.

The purpose of VerusInvest is to democratize access to DeFi, putting the power of financial self-sovereignty in people’s hands through a secure, transparent, and open-source interface.

**Download**: github.com/verusfi/verusinvest/releases

**GitHub**: github.com/verusfi/verusinvest
```

#### Blog (/blog/, /pt-br/blog/, etc.):
```markdown
# Where does the name VerusFi come from?

Verus means "Truth" in Latin, and Fi comes from "Finance."
```

### Translations:
- All content must be fully translated into its respective languages.
- You must also create a Python script that allows easy addition of a new language, using Claude AI to translate all existing content automatically.
- You must also create another script allowing the addition of a new blog post in English, which will detect all site languages and automatically prepare translations using Claude AI and generate the necessary files.

## 5. TECHNICAL FEATURES

### Translation System:
- All UI strings stored in `_config.yml` under the key `t:`
- Access via Liquid: `{{ site.t[page.lang].key }}`
- URL mapping in `url_mappings:` for each section and language
- Front matter in each `.md`: layout, lang, title, permalink, dir (for RTL)

### JavaScript (assets/js/main.js):
```javascript
// Core functions:
- toggleLangDropdown() - opens/closes language dropdown
- toggleMobileMenu() - opens/closes mobile menu
- changeLanguage(newLang) - changes language while preserving context
- Event listeners for:
  * Outside click to close dropdowns
  * ESC key to close modals
  * Click on mobile overlay
```

### Auxiliary Files:
- Gemfile with jekyll ~> 4.3 and webrick
- Makefile with commands: install, serve, build, clean
- Standard Jekyll .gitignore
- README.md with setup instructions
- CLAUDE-PROMPT.md containing this prompt

## 6. RESPONSIVENESS

### Breakpoints:
- Desktop: > 968px (horizontal navigation)
- Tablet: 768px–968px (mobile nav)
- Mobile: < 768px (vertical layout, reduced padding)
- Small mobile: < 480px (smaller fonts, hides language name)

### Mobile Adjustments:
- Compact header (70px)
- Hamburger menu visible
- Vertical navigation list
- Footer stacks elements
- Reduced padding in containers
- Font sizes adapt using clamp()
- Simplified product links

## 7. SPECIAL CONSIDERATIONS

### Performance:
- Minified CSS whenever possible
- Vanilla JavaScript (no jQuery)
- Optimized font loading
- Emoji flags instead of external assets

### Accessibility:
- Keyboard navigation
- Proper labels (aria-label)
- Adequate contrast (WCAG AA)
- Correct HTML5 semantics

### SEO:
- Proper meta tags
- Unique titles per page
- Relevant descriptions
- Correct heading hierarchy

### Maintainability:
- Clean, commented code
- Modular structure
- Easy to add new languages
- Clear documentation in README

## 8. PROJECT VISUAL IDENTITY

### Name and Meaning:
- **VerusFi**: “Verus” (Latin: Truth) + “Fi” (Finance)
- Concept: True, transparent, and decentralized finance

### Project Values:
- Freedom
- Privacy
- Sovereignty
- Decentralization as the infrastructure of human freedom

## 9. EXPECTED RESULT
A complete Jekyll site that:
- Runs locally
- Works perfectly on GitHub Pages
- Seamless navigation across 11 languages
- Professional and modern design
- Fully responsive (desktop, tablet, mobile)
- Full content in all languages
- Optimized performance
- Ready for production
