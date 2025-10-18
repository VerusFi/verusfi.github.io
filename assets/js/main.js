// ===========================
// Language Selector
// ===========================

function toggleLangDropdown() {
    const selector = document.querySelector('.lang-selector');
    const dropdown = document.getElementById('langDropdown');

    selector.classList.toggle('open');
}

function changeLanguage(newLang, currentSection) {
    // Get URL mappings from the global variable set in the layout
    const mappings = window.urlMappings;

    // Map current section to the new language URL
    let newUrl = '/';

    if (mappings && currentSection && mappings[currentSection]) {
        newUrl = mappings[currentSection][newLang] || `/${newLang}/`;
    } else {
        // Fallback to home page of the selected language
        newUrl = mappings.home[newLang] || `/${newLang}/`;
    }

    // Navigate to the new URL
    window.location.href = newUrl;
}

// Close language dropdown when clicking outside
document.addEventListener('click', function(event) {
    const selector = document.querySelector('.lang-selector');
    const langButton = document.querySelector('.lang-button');

    if (selector && !selector.contains(event.target)) {
        selector.classList.remove('open');
    }
});

// Close dropdown on ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const selector = document.querySelector('.lang-selector');
        if (selector) {
            selector.classList.remove('open');
        }

        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu && mobileMenu.classList.contains('open')) {
            toggleMobileMenu();
        }
    }
});

// ===========================
// Mobile Menu
// ===========================

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const body = document.body;

    mobileMenu.classList.toggle('open');
    menuBtn.classList.toggle('active');

    // Prevent body scroll when menu is open
    if (mobileMenu.classList.contains('open')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
}

// Close mobile menu when clicking on a link
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuLinks = document.querySelectorAll('.mobile-nav-links a');

    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu.classList.contains('open')) {
                toggleMobileMenu();
            }
        });
    });
});

// ===========================
// Smooth Scroll for Anchor Links
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 100;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// ===========================
// Header Scroll Effect
// ===========================

let lastScroll = 0;

window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 10) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ===========================
// External Links
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const externalLinks = document.querySelectorAll('a[href^="http"]');

    externalLinks.forEach(link => {
        // Skip if already has target and rel attributes
        if (!link.hasAttribute('target')) {
            link.setAttribute('target', '_blank');
        }
        if (!link.hasAttribute('rel')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
});

// ===========================
// Console Welcome Message
// ===========================

console.log('%cVerusFi', 'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #26A17B, #3B82F6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cBuilding freedom technology for financial sovereignty', 'font-size: 14px; color: #94A3B8;');
console.log('%cGitHub: https://github.com/verusfi', 'font-size: 12px; color: #26A17B;');
console.log('%cTelegram: https://t.me/verusfi', 'font-size: 12px; color: #26A17B;');
