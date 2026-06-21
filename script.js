/* ============================================
   Flying Eagle — script.js
   Shared JavaScript for all pages
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ========================================
    // 1. HAMBURGER MENU TOGGLE
    // ========================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');
    const navItems = document.querySelectorAll('.nav-links a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close menu on nav link click
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ========================================
    // 2. NAVBAR SCROLL EFFECT
    // ========================================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // ========================================
    // 3. SCROLL REVEAL (IntersectionObserver)
    // ========================================
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // ========================================
    // 4. ANIMATED COUNTER (for hero stats)
    // ========================================
    const counters = document.querySelectorAll('[data-count]');

    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-count'));
                    const suffix = el.getAttribute('data-suffix') || '';
                    let current = 0;
                    const increment = target / 60;
                    const duration = 1500;
                    const stepTime = duration / 60;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        el.textContent = Math.floor(current) + suffix;
                    }, stepTime);

                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.3 });

        counters.forEach(el => counterObserver.observe(el));
    }

});
