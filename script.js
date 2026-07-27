// script.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll animations using Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements that need to slide up
    const slideUpElements = document.querySelectorAll('.slide-up');
    slideUpElements.forEach(el => observer.observe(el));

    // 2. Navbar style change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(7, 10, 16, 0.95)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
            navbar.style.borderBottom = '1px solid rgba(0, 229, 255, 0.2)';
        } else {
            navbar.style.background = 'rgba(7, 10, 16, 0.7)';
            navbar.style.boxShadow = 'none';
            navbar.style.borderBottom = '1px solid rgba(0, 229, 255, 0.08)';
        }
    });

    // 3. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });
});

// Lightbox functions for Gallery
window.openLightbox = function(src, caption) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const captionText = document.getElementById('lightbox-caption');
    if (lightbox && img && captionText) {
        lightbox.style.display = "flex";
        img.src = src;
        captionText.innerHTML = caption;
        document.body.style.overflow = "hidden"; // Disable scroll when open
    }
};

window.closeLightbox = function() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = "none";
        document.body.style.overflow = "auto"; // Re-enable scroll
    }
};

