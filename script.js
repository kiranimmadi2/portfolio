// ===== Kiran Immadi Portfolio - script.js =====

document.addEventListener('DOMContentLoaded', () => {

    // ===== Mobile Navigation Toggle =====
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');

            // Animate hamburger bars
            const bars = hamburger.querySelectorAll('.bar');
            if (hamburger.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }

    // Close mobile nav when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });

    // ===== Header Scroll Effect =====
    const header = document.getElementById('header');
    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
            header.style.background = 'rgba(10, 10, 15, 0.95)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(10, 10, 15, 0.85)';
            header.style.boxShadow = 'none';
        }

        lastScrollY = currentScrollY;
    });

    // ===== Active Nav Link on Scroll =====
    const sections = document.querySelectorAll('section[id]');

    function highlightNav() {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector('.nav-links a[href="#' + sectionId + '"]');

            if (navLink) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLink.style.color = '#e4e4e7';
                    navLink.classList.add('nav-active');
                } else {
                    navLink.style.color = '';
                    navLink.classList.remove('nav-active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNav);

    // ===== Scroll Reveal / Fade-In Animations =====
    const animateElements = document.querySelectorAll(
        '.about-grid, .about-text p, .stat-card, .timeline-item, ' +
        '.cert-card, .skill-category, .project-card, .contact-card, ' +
        '.section-title, .hero-content, .hero-visual, .contact-subtitle'
    );

    animateElements.forEach(el => {
        el.classList.add('fade-in');
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // ===== Staggered Animation for Grid Items =====
    function staggerChildren(parentSelector, childSelector) {
        const parents = document.querySelectorAll(parentSelector);
        parents.forEach(parent => {
            const children = parent.querySelectorAll(childSelector);
            children.forEach((child, index) => {
                child.style.transitionDelay = (index * 0.1) + 's';
            });
        });
    }

    staggerChildren('.projects-grid', '.project-card');
    staggerChildren('.skills-grid', '.skill-category');
    staggerChildren('.about-stats', '.stat-card');
    staggerChildren('.contact-grid', '.contact-card');
    staggerChildren('.cert-grid', '.cert-card');

    // ===== Typing Effect for Hero Title =====
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const roles = ['AI Engineer', 'GenAI Builder', 'LLM Developer', 'AI Agent Architect'];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        const dynamicSpan = document.createElement('span');
        dynamicSpan.className = 'typing-text';
        heroTitle.innerHTML = '';
        heroTitle.appendChild(dynamicSpan);

        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.textContent = '|';
        cursor.style.cssText = 'animation: blink 1s infinite; color: var(--accent); margin-left: 2px;';
        heroTitle.appendChild(cursor);

        const style = document.createElement('style');
        style.textContent = '@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } } .nav-active::after { width: 100% !important; }';
        document.head.appendChild(style);

        function typeRole() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                dynamicSpan.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                dynamicSpan.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 500;
            }

            setTimeout(typeRole, typingSpeed);
        }

        typeRole();
    }

    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== Parallax Effect on Hero Section =====
    const hero = document.querySelector('.hero');
    const codeBlock = document.querySelector('.code-block');

    if (hero && codeBlock) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                codeBlock.style.transform = 'translateY(' + (scrolled * 0.1) + 'px)';
            }
        });
    }

    // ===== Tilt Effect on Project Cards =====
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-5px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ===== Stat Counter Animation =====
    const statNumbers = document.querySelectorAll('.stat-number');

    function animateCounter(el) {
        const text = el.textContent.trim();
        const match = text.match(/^([\d,]+)(\+?)$/);

        if (!match) return;

        const target = parseInt(match[1].replace(/,/g, ''));
        const suffix = match[2];
        const duration = 2000;
        const start = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);

            el.textContent = current.toLocaleString() + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => {
        counterObserver.observe(el);
    });

    // ===== Back to Top Button =====
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = 'position:fixed;bottom:2rem;right:2rem;width:45px;height:45px;border-radius:12px;background:linear-gradient(135deg,#6C63FF,#00D4AA);color:white;border:none;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;opacity:0;visibility:hidden;transition:all 0.3s;z-index:999;box-shadow:0 5px 20px rgba(108,99,255,0.3);';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.transform = 'translateY(-3px)';
    });

    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.transform = 'translateY(0)';
    });

    // ===== Skill Tags Hover Glow Effect =====
    document.querySelectorAll('.skill-tags span').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 15px rgba(108, 99, 255, 0.3)';
        });
        tag.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });

    // ===== Console Easter Egg =====
    console.log(
        '%c Kiran Immadi Portfolio ',
        'background: linear-gradient(135deg, #6C63FF, #00D4AA); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 5px;'
    );
    console.log(
        '%c Looking for the source code? Check out: https://github.com/kiranimmadi2/portfolio',
        'color: #6C63FF; font-size: 12px;'
    );

});
