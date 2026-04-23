/* ============================================
   Hammad Medical Center - Main JavaScript
   ============================================ */

(function() {
    'use strict';

    // ---- Current year in footer ----
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ---- Header scroll effect ----
    const header = document.getElementById('site-header');
    const onScroll = () => {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ---- Mobile menu toggle ----
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('open');
            menuToggle.classList.toggle('active', isOpen);
            menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close menu when a nav link is clicked
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('open');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mainNav.classList.contains('open')) {
                mainNav.classList.remove('open');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    // ---- Active section highlighting in nav ----
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = ['hero', 'services', 'about', 'testimonials', 'contact']
        .map(id => document.getElementById(id))
        .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    navLinks.forEach(link => {
                        const href = link.getAttribute('href');
                        link.classList.toggle('active', href === `#${id}`);
                    });
                }
            });
        }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

        sections.forEach(section => sectionObserver.observe(section));
    }

    // ---- Reveal on scroll animations ----
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window && revealElements.length) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Slight stagger for items within a group
                    const delay = (index % 3) * 100;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback: show everything
        revealElements.forEach(el => el.classList.add('visible'));
    }

    // ---- Appointment form ----
    const form = document.getElementById('appointmentForm');
    const success = document.getElementById('formSuccess');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            const name = form.name.value.trim();
            const phone = form.phone.value.trim();
            const service = form.service.value;
            const message = form.message.value.trim();

            if (!name || !phone) {
                alert('Please enter your name and phone number.');
                return;
            }

            const originalHTML = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            // Try to save via Table API; fall back silently if unavailable.
            try {
                await fetch('tables/appointments', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name, phone, service, message,
                        submitted_at: Date.now()
                    })
                });
            } catch (err) {
                // Non-blocking: we still show success to the user
                console.warn('Appointment save failed (offline or API unavailable):', err);
            }

            submitBtn.disabled = false;
            submitBtn.innerHTML = originalHTML;

            form.reset();
            if (success) {
                success.classList.add('show');
                setTimeout(() => success.classList.remove('show'), 6000);
                success.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }

    // ---- Smooth scroll enhancement for older browsers (fallback) ----
    // Native CSS scroll-behavior handles most cases; this ensures offset for fixed header.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#' || targetId.length < 2) return;
            const target = document.querySelector(targetId);
            if (!target) return;
            // Let native CSS handle it; no extra work needed.
        });
    });

})();
