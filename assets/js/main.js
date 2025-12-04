/**
 * VerusFi Landing Page - Main JavaScript
 * Native American English | Modern ES6+ Architecture
 * 
 * Features:
 * - Smooth scroll navigation
 * - Mobile menu toggle
 * - Scroll animations with Intersection Observer
 * - Navbar scroll effects
 * - Back to top button
 * - Icon initialization
 */

// ============================================
// CONFIGURATION & CONSTANTS
// ============================================
const CONFIG = {
    scrollOffset: 80,
    animationThreshold: 0.1,
    debounceDelay: 150,
    throttleDelay: 100,
};

// ============================================
// DOM ELEMENTS CACHE
// ============================================
const DOM = {
    navbar: document.getElementById('navbar'),
    mobileMenuToggle: document.getElementById('mobileMenuToggle'),
    navMenu: document.getElementById('navMenu'),
    backToTop: document.getElementById('backToTop'),
    navLinks: document.querySelectorAll('.nav-link'),
    animatedElements: document.querySelectorAll('[data-animate]'),
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function to limit function execution rate
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit function execution rate
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} True if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ============================================
// LUCIDE ICONS INITIALIZATION
// ============================================

/**
 * Initialize Lucide icons
 */
function initIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
        console.log('✓ Lucide icons initialized');
    } else {
        console.warn('⚠ Lucide library not loaded');
    }
}

// ============================================
// NAVBAR FUNCTIONALITY
// ============================================

/**
 * Handle navbar scroll effects
 */
function handleNavbarScroll() {
    if (!DOM.navbar) return;

    const scrolled = window.scrollY > 50;
    DOM.navbar.classList.toggle('scrolled', scrolled);
}

/**
 * Toggle mobile menu
 */
function toggleMobileMenu() {
    if (!DOM.navMenu || !DOM.mobileMenuToggle) return;

    const isActive = DOM.navMenu.classList.toggle('active');
    DOM.mobileMenuToggle.setAttribute('aria-expanded', isActive);

    // Prevent body scroll when menu is open
    document.body.style.overflow = isActive ? 'hidden' : '';
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
    if (!DOM.navMenu || !DOM.mobileMenuToggle) return;

    DOM.navMenu.classList.remove('active');
    DOM.mobileMenuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

/**
 * Handle smooth scroll navigation
 * @param {Event} e - Click event
 */
function handleSmoothScroll(e) {
    const href = e.currentTarget.getAttribute('href');

    // Only handle internal links
    if (!href || !href.startsWith('#')) return;

    e.preventDefault();

    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (!targetElement) return;

    const offsetTop = targetElement.offsetTop - CONFIG.scrollOffset;

    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
    });

    // Close mobile menu after navigation
    closeMobileMenu();

    // Update URL without scrolling
    history.pushState(null, null, href);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

/**
 * Initialize Intersection Observer for scroll animations
 */
function initScrollAnimations() {
    if (!DOM.animatedElements.length) return;

    const observerOptions = {
        threshold: CONFIG.animationThreshold,
        rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    DOM.animatedElements.forEach((element) => {
        observer.observe(element);
    });

    console.log(`✓ Scroll animations initialized for ${DOM.animatedElements.length} elements`);
}

// ============================================
// BACK TO TOP BUTTON
// ============================================

/**
 * Handle back to top button visibility
 */
function handleBackToTopVisibility() {
    if (!DOM.backToTop) return;

    const scrolled = window.scrollY > 300;
    DOM.backToTop.classList.toggle('visible', scrolled);
}

/**
 * Scroll to top of page
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}

// ============================================
// EVENT LISTENERS
// ============================================

/**
 * Initialize all event listeners
 */
function initEventListeners() {
    // Navbar scroll effect
    window.addEventListener('scroll', throttle(handleNavbarScroll, CONFIG.throttleDelay));

    // Mobile menu toggle
    if (DOM.mobileMenuToggle) {
        DOM.mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Smooth scroll for navigation links
    DOM.navLinks.forEach((link) => {
        link.addEventListener('click', handleSmoothScroll);
    });

    // Back to top button
    if (DOM.backToTop) {
        window.addEventListener('scroll', throttle(handleBackToTopVisibility, CONFIG.throttleDelay));
        DOM.backToTop.addEventListener('click', scrollToTop);
    }

    // Close mobile menu on window resize
    window.addEventListener('resize', debounce(() => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    }, CONFIG.debounceDelay));

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });

    // Handle external links (open in new tab)
    document.querySelectorAll('a[href^="http"]').forEach((link) => {
        if (!link.hasAttribute('target')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    console.log('✓ Event listeners initialized');
}

// ============================================
// LAZY LOADING IMAGES
// ============================================

/**
 * Initialize lazy loading for images
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        console.log('✓ Native lazy loading supported');
    } else {
        // Fallback for browsers that don't support native lazy loading
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach((img) => imageObserver.observe(img));
        console.log('✓ Lazy loading fallback initialized');
    }
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================

/**
 * Enhance keyboard navigation
 */
function initKeyboardNavigation() {
    // Add keyboard support for custom interactive elements
    const interactiveElements = document.querySelectorAll('[role="button"]:not(button)');

    interactiveElements.forEach((element) => {
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
    });

    console.log('✓ Keyboard navigation enhanced');
}

// ============================================
// PERFORMANCE MONITORING
// ============================================

/**
 * Log performance metrics
 */
function logPerformanceMetrics() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            const connectTime = perfData.responseEnd - perfData.requestStart;
            const renderTime = perfData.domComplete - perfData.domLoading;

            console.log('📊 Performance Metrics:');
            console.log(`  Page Load Time: ${pageLoadTime}ms`);
            console.log(`  Connect Time: ${connectTime}ms`);
            console.log(`  Render Time: ${renderTime}ms`);
        });
    }
}

// ============================================
// ERROR HANDLING
// ============================================

/**
 * Global error handler
 */
function initErrorHandling() {
    window.addEventListener('error', (e) => {
        console.error('❌ JavaScript Error:', e.message);
        // You can send errors to an analytics service here
    });

    window.addEventListener('unhandledrejection', (e) => {
        console.error('❌ Unhandled Promise Rejection:', e.reason);
        // You can send errors to an analytics service here
    });
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize all functionality when DOM is ready
 */
function init() {
    console.log('🚀 Initializing VerusFi Landing Page...');

    try {
        // Initialize icons
        initIcons();

        // Initialize event listeners
        initEventListeners();

        // Initialize scroll animations
        initScrollAnimations();

        // Initialize lazy loading
        initLazyLoading();

        // Initialize keyboard navigation
        initKeyboardNavigation();

        // Initialize error handling
        initErrorHandling();

        // Log performance metrics
        logPerformanceMetrics();

        // Initial navbar state
        handleNavbarScroll();

        // Initial back to top button state
        handleBackToTopVisibility();

        console.log('✅ VerusFi Landing Page initialized successfully');
    } catch (error) {
        console.error('❌ Initialization error:', error);
    }
}

// ============================================
// DOM CONTENT LOADED
// ============================================

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    // DOM is already loaded
    init();
}

// ============================================
// BROWSER COMPATIBILITY CHECK
// ============================================

/**
 * Check for required browser features
 */
(function checkBrowserCompatibility() {
    const requiredFeatures = {
        'IntersectionObserver': 'IntersectionObserver' in window,
        'Promise': 'Promise' in window,
        'fetch': 'fetch' in window,
    };

    const unsupportedFeatures = Object.entries(requiredFeatures)
        .filter(([, supported]) => !supported)
        .map(([feature]) => feature);

    if (unsupportedFeatures.length > 0) {
        console.warn('⚠ Browser missing features:', unsupportedFeatures.join(', '));
        console.warn('⚠ Some functionality may not work as expected');
    }
})();

// ============================================
// EXPORT FOR TESTING (if needed)
// ============================================

// Uncomment if you need to export functions for testing
// if (typeof module !== 'undefined' && module.exports) {
//     module.exports = {
//         debounce,
//         throttle,
//         isInViewport,
//     };
// }