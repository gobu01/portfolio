document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const certificateLinks = document.querySelectorAll('.certificate-link');
    const modal = document.getElementById('certificate-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCloseButton = document.getElementById('modal-close-button');
    const downloadHtmlLink = document.getElementById('download-html');
    const backgroundGradient = document.querySelector('.background-gradient');

    // Mobile Menu Toggle
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when a link is clicked
    mobileMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            mobileMenu.classList.add('hidden');
        }
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Certificate Modal Logic
    certificateLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const certificateSrc = link.getAttribute('data-certificate-src');
            modalImg.src = certificateSrc;
            modal.classList.remove('hidden');
        });
    });

    const closeModal = () => {
        modal.classList.add('hidden');
        modalImg.src = ''; // Clear src to stop loading
    };

    modalCloseButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        // Close if clicked on the background overlay
        if (e.target === modal) {
            closeModal();
        }
    });

    // Download HTML Source Code
    downloadHtmlLink.addEventListener('click', (e) => {
        e.preventDefault();
        const htmlContent = document.documentElement.outerHTML;
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'index.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    // --- NEW: Scroll Animations ---
    const faders = document.querySelectorAll('.section-padding');
    const appearOptions = {
        threshold: 0.2, // Trigger when 20% of the section is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('is-visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        fader.classList.add('fade-in-section'); // Add class to apply initial state
        appearOnScroll.observe(fader);
    });
    
    // --- NEW: Active Nav Link Highlighting ---
    const navObserverOptions = {
      rootMargin: '-50% 0px -50% 0px'
    };

    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === entry.target.id) {
              link.classList.add('active');
            }
          });
        }
      });
    }, navObserverOptions);

    sections.forEach((section) => {
      navObserver.observe(section);
    });

    // --- NEW: Interactive Background Gradient ---
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth) * 30 - 15;
        const y = (clientY / window.innerHeight) * 30 - 15;

        if (backgroundGradient) {
            backgroundGradient.style.transform = `translateX(${x}px) translateY(${y}px)`;
        }
    });
});

