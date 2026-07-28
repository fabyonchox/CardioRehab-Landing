// CardioRehab Landing Page - Interactive Script
document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.className = 'ph ph-x';
                } else {
                    icon.className = 'ph ph-list';
                }
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'ph ph-list';
            });
        });
    }

    // 2. FAQ Accordion Interactivity
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isOpen = faqItem.classList.contains('active');

            // Close all other open FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // If it wasn't open, open it
            if (!isOpen) {
                faqItem.classList.add('active');
            }
        });
    });

    // 3. Scroll Reveal Animations (IntersectionObserver)
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.slide-up').forEach(element => {
        observer.observe(element);
    });

    // 4. Video Player Auto-Pause / Intersection Observer
    const demoVideo = document.getElementById('demoVideo');
    if (demoVideo) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting && !demoVideo.paused) {
                    demoVideo.pause();
                }
            });
        }, { threshold: 0.3 });

        videoObserver.observe(demoVideo);
    }
});

// 5. Lightbox Functions (Global scope for inline onclick triggers)
function openLightbox(imgSrc, captionText) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    if (lightbox && lightboxImg) {
        lightboxImg.src = imgSrc;
        if (lightboxCaption) lightboxCaption.innerText = captionText || '';
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close Lightbox on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});
