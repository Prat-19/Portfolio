
(function() {
    'use strict';

    var theme = localStorage.getItem('pm-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    var lenis = null;
    var loaderDone = false;

    // ===== Loading Screen =====
    var loaderBar = document.getElementById('loader-bar-inner');
    var loaderCounter = document.getElementById('loader-counter');
    var loader = document.getElementById('loader');
    var loaderProgress = 0;

    var loaderInterval = setInterval(function() {
        loaderProgress += Math.random() * 15 + 5;
        if (loaderProgress >= 100) {
            loaderProgress = 100;
            clearInterval(loaderInterval);
            setTimeout(function() {
                if (loader) loader.classList.add("hidden");
                loaderDone = true;
            }, 400);
        }
        if (loaderBar) loaderBar.style.width = loaderProgress + '%';
        if (loaderCounter) { var num = Math.floor(loaderProgress); loaderCounter.textContent = num < 10 ? '00' + num : num < 100 ? '0' + num : num; }
    }, 100);
    setTimeout(function() { if (loader && !loaderDone) { loader.classList.add("hidden"); loader.style.display = "none"; } loaderDone = true; }, 3000);

    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);

    function applyTheme(t) {
        theme = t;
        document.documentElement.setAttribute('data-theme', t);
        document.body.setAttribute('data-theme', t);
        try {
            var toggleEl = document.getElementById('themeToggle');
            if (toggleEl) toggleEl.innerHTML = t === 'dark' ? '<i class="fas fa-sun"></i> Light' : '<i class="fas fa-moon"></i> Dark';
            localStorage.setItem('pm-theme', t);
        } catch(e) {}


    
    }// ===== Theme Toggle Click =====
    (function() {
        try {
            var toggleEl = document.getElementById("themeToggle");
            if (!toggleEl) return;
            toggleEl.addEventListener("click", function() {
                var current = document.documentElement.getAttribute("data-theme");
                var next = current === "dark" ? "light" : "dark";
                applyTheme(next);
            });
        } catch(e) {}
    })();

    

    // ===== Lenis Smooth Scroll =====
    function initLenis() {
        try {
            if (typeof Lenis === 'undefined') return;
            if (prefersReducedMotion || isTouchDevice) return;
            lenis = new Lenis({
                lerp: 0.08,
                duration: 1.2,
                smoothWheel: true,
                autoRaf: false,
                syncTouch: false,
                easing: function(t) { return Math.min(1, 1.005 - Math.pow(2, -10 * t)); }
            });
            lenis.on("scroll", ScrollTrigger.update);
            gsap.ticker.add(function(time) { lenis.raf(time * 1000); });
            gsap.ticker.lagSmoothing(0);
            // Also sync on scroll as fallback
            window.addEventListener("scroll", function() { if (typeof ScrollTrigger !== "undefined") ScrollTrigger.update(); });
        } catch(e) {}

        }// ===== Mouse-Reactive Background Parallax =====
    function initMouseParallax() {
        try {
            if (prefersReducedMotion) return;
            var orb1 = document.getElementById('orb1');
            var orb2 = document.getElementById('orb2');
            var orb3 = document.getElementById('orb3');
            if (!orb1 || !orb2 || !orb3) return;

            var mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;

            // GSAP quickTo for smooth interpolation
            var xTo1 = gsap.quickTo('#orb1', 'x', { duration: 0.8, ease: 'power2.out' });
            var yTo1 = gsap.quickTo('#orb1', 'y', { duration: 0.8, ease: 'power2.out' });
            var xTo2 = gsap.quickTo('#orb2', 'x', { duration: 0.8, ease: 'power2.out' });
            var yTo2 = gsap.quickTo('#orb2', 'y', { duration: 0.8, ease: 'power2.out' });
            var xTo3 = gsap.quickTo('#orb3', 'x', { duration: 0.8, ease: 'power2.out' });
            var yTo3 = gsap.quickTo('#orb3', 'y', { duration: 0.8, ease: 'power2.out' });

            // Update CSS custom properties for radial-gradient centers
            var bx1 = 50, by1 = 50, bx2 = 50, by2 = 50, bx3 = 50, by3 = 50;

            document.addEventListener('mousemove', function(e) {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });

            document.addEventListener('pointerleave', function() {
                mouseX = window.innerWidth / 2;
                mouseY = window.innerHeight / 2;
            });

            function animateOrbs() {
                var cx = window.innerWidth / 2;
                var cy = window.innerHeight / 2;
                var dx = (mouseX - cx) / cx;
                var dy = (mouseY - cy) / cy;

                // Ambient drift when mouse is near center
                var time = Date.now() * 0.0005;
                var ambient1 = Math.sin(time) * 20;
                var ambient2 = Math.cos(time * 0.7) * 15;
                var ambient3 = Math.sin(time * 0.5) * 10;

                // Target positions with depth multipliers
                var t1x = dx * 60 + ambient1;
                var t1y = dy * 40 + ambient1;
                var t2x = dx * -40 + ambient2;
                var t2y = dy * -30 + ambient2;
                var t3x = dx * 25 + ambient3;
                var t3y = dy * 20 + ambient3;

                // Update CSS custom properties for gradient centers
                bx1 = 50 + dx * 15;
                by1 = 50 + dy * 10;
                bx2 = 50 + dx * -10;
                by2 = 50 + dy * -8;
                bx3 = 50 + dx * 5;
                by3 = 50 + dy * 4;

                orb1.style.setProperty('--bx1', bx1 + '%');
                orb1.style.setProperty('--by1', by1 + '%');
                orb2.style.setProperty('--bx2', bx2 + '%');
                orb2.style.setProperty('--by2', by2 + '%');
                orb3.style.setProperty('--bx3', bx3 + '%');
                orb3.style.setProperty('--by3', by3 + '%');

                // Smooth mouse-following parallax
                xTo1(t1x);
                yTo1(t1y);
                xTo2(t2x);
                yTo2(t2y);
                xTo3(t3x);
                yTo3(t3y);

                requestAnimationFrame(animateOrbs);
            }
            animateOrbs();
        } catch(e) {}
    }

    // ===== GSAP Scroll Animations =====
    function initGSAP() {
        try {
            if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
            gsap.registerPlugin(ScrollTrigger);

            // Hero entrance
            initHeroAnimations();

            // Section header reveals
            var sectionHeaders = ['.about', '#skills .section-header', '#experience .section-header', '#education .section-header', '#certifications .section-header', '#projects .section-header', '#contact .section-header'];
            sectionHeaders.forEach(function(sel) {
                var el = document.querySelector(sel);
                if (!el) return;
                var children = el.querySelectorAll('.section-label, .section-heading, .section-description');
                if (children.length > 0) {
                    gsap.from(children, {
                        y: 30, duration: 0.7, stagger: 0.15,
                        ease: 'power3.out',
                        scrollTrigger: { trigger: sel, start: 'top 85%', toggleActions: 'play none none none' }
                    });
                }
            });

            // Skill cards stagger
            var skillEls = gsap.utils.toArray('.skill-card');
            if (skillEls.length > 0) {
                gsap.from(skillEls, {
                    y: 40, duration: 0.6, stagger: 0.08,
                    ease: 'power2.out', scale: 0.98,
                    willChange: 'transform, opacity',
                    scrollTrigger: { trigger: '.skills-grid', start: 'top 80%', toggleActions: 'play none none none' }
                });
            }

            // Stat cards
            var statEls = gsap.utils.toArray('.stat-card');
            if (statEls.length > 0) {
                gsap.from(statEls, {
                    y: 40, duration: 0.6, stagger: 0.12,
                    ease: 'power2.out', scale: 0.98,
                    willChange: 'transform, opacity',
                    scrollTrigger: { trigger: '.about-stats', start: 'top 80%', toggleActions: 'play none none none' }
                });
            }

            // Timeline cards
            var timelineEls = gsap.utils.toArray('.timeline-card');
            if (timelineEls.length > 0) {
                gsap.from(timelineEls, {
                    x: -40, duration: 0.7, stagger: 0.15,
                    ease: 'power2.out', scale: 0.98,
                    willChange: 'transform, opacity',
                    scrollTrigger: { trigger: '.timeline', start: 'top 75%', toggleActions: 'play none none none' }
                });
            }

            // Education cards
            var eduEls = gsap.utils.toArray('.education-card');
            if (eduEls.length > 0) {
                gsap.from(eduEls, {
                    y: 40, duration: 0.6, stagger: 0.1,
                    ease: 'power2.out', scale: 0.98,
                    willChange: 'transform, opacity',
                    scrollTrigger: { trigger: '.education-grid', start: 'top 80%', toggleActions: 'play none none none' }
                });
            }

            // Cert cards
            var certEls = gsap.utils.toArray('.cert-card');
            if (certEls.length > 0) {
                gsap.from(certEls, {
                    y: 40, duration: 0.6, stagger: 0.1,
                    ease: 'power2.out', scale: 0.98,
                    willChange: 'transform, opacity',
                    scrollTrigger: { trigger: '.certs-grid', start: 'top 80%', toggleActions: 'play none none none' }
                });
            }

            // Project card
            var projectEls = gsap.utils.toArray('.project-card');
            if (projectEls.length > 0) {
                gsap.from(projectEls, {
                    y: 40, duration: 0.7, stagger: 0.1,
                    ease: 'power2.out', scale: 0.98,
                    willChange: 'transform, opacity',
                    scrollTrigger: { trigger: '#projects .section-header', start: 'top 80%', toggleActions: 'play none none none' }
                });
            }

            // Contact items
            var contactEls = gsap.utils.toArray('.contact-item');
            if (contactEls.length > 0) {
                gsap.from(contactEls, {
                    x: -30, duration: 0.6, stagger: 0.12,
                    ease: 'power2.out',
                    willChange: 'transform, opacity',
                    scrollTrigger: { trigger: '.contact-info', start: 'top 80%', toggleActions: 'play none none none' }
                });
            }

            // Form fields
            var forms = gsap.utils.toArray('.contact-form input, .contact-form textarea');
            if (forms.length > 0) {
                gsap.from(forms, {
                    y: 20, duration: 0.5, stagger: 0.1,
                    ease: 'power2.out',
                    willChange: 'transform, opacity',
                    scrollTrigger: { trigger: '.contact-form', start: 'top 90%', toggleActions: 'play none none none' }
                });
            }

            // Scroll progress
            ScrollTrigger.create({
                trigger: '#scrollProgress', start: 'top top', end: 'bottom bottom',
                onUpdate: function(s) {
                    var el = document.getElementById('scrollProgress');
                    if (el) el.style.width = (s.progress * 100) + '%';
                }
            });

            // Parallax
            
            setTimeout(function() { ScrollTrigger.refresh(); }, 500);
            window.addEventListener("load", function() { ScrollTrigger.refresh(); });
        } catch(e) {}
    }

    // ===== Hero Entrance =====
    function initHeroAnimations() {
        try {
            if (typeof gsap === 'undefined') return;
            gsap.from('.hero-eyebrow', { y: 40, duration: 0.8, ease: 'power3.out', delay: 0.2 });
            gsap.from('.hero-title', { y: 50, duration: 0.9, ease: 'power3.out', delay: 0.4 });
            gsap.from('.hero-subtitle', { y: 30, duration: 0.7, ease: 'power2.out', delay: 0.65 });
            gsap.from('.hero-cta-group', { y: 30, duration: 0.7, ease: 'power2.out', delay: 0.85 });
            gsap.from('.hero-scroll-indicator', { y: 20, duration: 0.5, ease: 'power2.out', delay: 1.1 });
        } catch(e) {}
    }

    // ===== Form =====
    function initForm() {
        try {
            var form = document.getElementById('contactForm');
            if (!form) return;
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                var btn = form.querySelector('.form-submit');
                if (btn) {
                    btn.innerHTML = 'Message Sent <i class="fas fa-circle-check"></i>';
                    btn.style.background = '#6c5ce7';
                    btn.style.color = '#fff';
                    setTimeout(function() {
                        btn.textContent = 'Send Message';
                        btn.style.background = '';
                        btn.style.color = '';
                        form.reset();
                    }, 3000);
                }
            });
        } catch(e) {}
    }

    // ===== Nav Scroll =====
    function initNav() {
        try {
            if (lenis) {
                lenis.on('scroll', function(p) {
                    var nav = document.getElementById('nav');
                    if (nav) nav.classList.toggle('scrolled', p.scroll > 80);
                });
            }
        } catch(e) {}
    }

    // ===== Unified Init =====
    function init() {
        initLenis();
        initGSAP();
        initForm();
        initNav();
        initMouseParallax();
        setTimeout(initSectionReveals, 500);
        setTimeout(function() { ScrollTrigger.refresh(); }, 1000);
    }

    if (document.readyState === 'loading') {
        setTimeout(init, 0);
    } else {
        init();
    }

    // ===== Custom Cursor =====
    (function() {
        try {
            var cursor = document.getElementById('cursor');
            var cursorDot = document.getElementById('cursorDot');
            if (!cursor || !cursorDot) return;
            var mouseX = 0, mouseY = 0;
            var cursorX = 0, cursorY = 0;
            var dotX = 0, dotY = 0;
            
            document.addEventListener('mousemove', function(e) {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });
            document.addEventListener('mousedown', function() {
                if (cursor) { cursor.style.transform = 'scale(0.8)'; cursor.style.borderColor = '#fff'; } if (cursorDot) { cursorDot.style.background = '#fff'; } });
            document.addEventListener('mouseup', function() {
                if (cursor) { cursor.style.transform = 'scale(1)'; cursor.style.borderColor = '#7c6ce0'; } if (cursorDot) { cursorDot.style.background = '#7c6ce0'; } });
            
            function animateCursor() {
                cursorX += (mouseX - cursorX) * 0.15;
                cursorY += (mouseY - cursorY) * 0.15;
                dotX += (mouseX - dotX) * 0.3;
                dotY += (mouseY - dotY) * 0.3;
                
                cursor.style.left = cursorX - 10 + 'px';
                cursor.style.top = cursorY - 10 + 'px';
                cursorDot.style.left = mouseX - 2 + 'px';
                cursorDot.style.top = mouseY - 2 + 'px';
                requestAnimationFrame(animateCursor);
            }
            animateCursor();
            
            // Hover effect on interactive elements
            var hoverEls = document.querySelectorAll('a, button, .project-card, .skill-card, .stat-card, .timeline-card, .education-card, .cert-card, .contact-item, .form-input');
            hoverEls.forEach(function(el) {
                el.addEventListener('mouseenter', function() { cursor.classList.add('hover'); });
                el.addEventListener('mouseleave', function() { cursor.classList.remove('hover'); });
            });
        } catch(e) {}
    })();

    // ===== GSAP ScrollTrigger Section Reveals =====
    function initSectionReveals() {
        try {
            if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
            gsap.registerPlugin(ScrollTrigger);
            var revealSections = document.querySelectorAll('.reveal-section');
            revealSections.forEach(function(section) {
                gsap.from(section, {

                    y: 60,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                        onEnter: function() { section.classList.add('revealed'); },
                        onEnterBack: function() { section.classList.add('revealed'); }
                    }
                });
            });
        } catch(e) {}
    }

    // ===== Nav CTA Background Fix =====
    // ===== Fallback Reveal: IntersectionObserver independent of GSAP =====
    var fallbackRevealSections = document.querySelectorAll(".reveal-section");
    if (fallbackRevealSections.length > 0) {
        var fallbackObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    fallbackObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
        fallbackRevealSections.forEach(function(section) {
            fallbackObserver.observe(section);
        });
        setTimeout(function() {
            fallbackRevealSections.forEach(function(s) { s.classList.add("revealed"); });
        }, 3000);
    }
    
    // ===== Mouse-Following Gradient =====
    (function() {
        try {
            var grad = document.getElementById('mouseGradient');
            if (!grad) return;
            document.addEventListener('mousemove', function(e) {
                grad.style.setProperty('--mx', e.clientX + 'px');
                grad.style.setProperty('--my', e.clientY + 'px');
            });
        } catch(e) {}
    })();
    
    // ===== Horizontal Scroll for Projects =====
    (function() {
        try {
            var wrapper = document.querySelector('.projects-scroll-wrapper');
            if (!wrapper) return;
            // Make project cards scrollable horizontally
            wrapper.style.display = 'flex';
            wrapper.style.gap = '30px';
            wrapper.style.overflowX = 'auto';
            wrapper.style.scrollSnapType = 'x mandatory';
            var cards = wrapper.querySelectorAll('.project-card');
            cards.forEach(function(card) {
                card.style.flexShrink = '0';
                card.style.scrollSnapAlign = 'start';
            });
            wrapper.addEventListener('wheel', function(e) {
                if (e.deltaX === 0) {
                    e.preventDefault();
                    wrapper.scrollLeft += e.deltaY;
                }
            }, { passive: false });
        } catch(e) {}
    })();
    
    // ===== Section Stagger Reveal =====
    (function() {
        try {
            var staggerEls = document.querySelectorAll('.stagger-children');
            staggerEls.forEach(function(el) {
                var observer = new IntersectionObserver(function(entries) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            el.classList.add('visible');
                        }
                    });
                }, { threshold: 0.1 });
                observer.observe(el);
            });
        } catch(e) {}
    })();
            setTimeout(function() { document.querySelectorAll(".stagger-children").forEach(function(el) { el.classList.add("visible"); }); }, 2000);
            setTimeout(function() { document.querySelectorAll(".reveal-section").forEach(function(el) { el.classList.add("revealed"); }); document.querySelectorAll(".section-heading, .section-label, .section-description").forEach(function(el) { el.style.cssText = "opacity: 1 !important; visibility: visible !important;"; }); }, 3000);

})();
