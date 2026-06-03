document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('#header');
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('#navLinks');
    const navItems = document.querySelectorAll('.nav-link');
    const animatedElements = document.querySelectorAll('.fade-in');
    const currentYear = document.querySelector('#currentYear');

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    const toggleHeaderShadow = () => {
        if (!header) return;
        header.classList.toggle('scrolled', window.scrollY > 20);
    };

    toggleHeaderShadow();
    window.addEventListener('scroll', toggleHeaderShadow);

    if (mobileMenuButton && navLinks) {
        mobileMenuButton.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            mobileMenuButton.classList.toggle('open', isOpen);
            mobileMenuButton.setAttribute('aria-expanded', String(isOpen));
        });
    }

    navItems.forEach((item) => {
        item.addEventListener('click', () => {
            if (!navLinks || !mobileMenuButton) return;
            navLinks.classList.remove('open');
            mobileMenuButton.classList.remove('open');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const targetId = anchor.getAttribute('href');
            const targetElement = targetId ? document.querySelector(targetId) : null;

            if (!targetElement) return;

            event.preventDefault();
            const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - 72;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    animatedElements.forEach((element) => observer.observe(element));

    const sections = document.querySelectorAll('main section[id]');

    const setActiveLink = () => {
        let currentSection = '';

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id') || '';
            }
        });

        navItems.forEach((link) => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === `#${currentSection}`);
        });
    };

    setActiveLink();
    window.addEventListener('scroll', setActiveLink);
});
