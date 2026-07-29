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
        element.classList.add('visible');
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
        closeDocxModal();
    }
});

// 6. Live Interactive Clinical Calculator Logic
document.addEventListener('DOMContentLoaded', () => {
    const ageInput = document.getElementById('calcAge');
    const restHRInput = document.getElementById('calcRestHR');
    const heightInput = document.getElementById('calcHeight');
    const bbCheckbox = document.getElementById('calcBB');

    const valAge = document.getElementById('valAge');
    const valRestHR = document.getElementById('valRestHR');
    const valHeight = document.getElementById('valHeight');

    const outFCMax = document.getElementById('outFCMax');
    const outFormulaTag = document.getElementById('outFormulaTag');
    const outKarvonen = document.getElementById('outKarvonen');
    const outTM6M = document.getElementById('outTM6M');

    function calculateLiveMetrics() {
        if (!ageInput || !restHRInput || !heightInput) return;

        const age = parseInt(ageInput.value, 10);
        const restHR = parseInt(restHRInput.value, 10);
        const height = parseInt(heightInput.value, 10);
        const isBB = bbCheckbox ? bbCheckbox.checked : false;

        if (valAge) valAge.innerText = age;
        if (valRestHR) valRestHR.innerText = restHR;
        if (valHeight) valHeight.innerText = height;

        // 1. FC Max Formula
        let fcMax = 0;
        if (isBB) {
            fcMax = Math.round(164 - (0.7 * age));
            if (outFormulaTag) outFormulaTag.innerText = "Ajustada por Betabloqueadores (Brawner 2004)";
        } else {
            fcMax = Math.round(208 - (0.7 * age));
            if (outFormulaTag) outFormulaTag.innerText = "Fórmula Estándar Tanaka (2001)";
        }

        if (outFCMax) outFCMax.innerHTML = `${fcMax} <small>bpm</small>`;

        // 2. Karvonen Zone (50% - 70% FC Reserva)
        const fcReserve = fcMax - restHR;
        const targetMin = Math.round(restHR + (0.50 * fcReserve));
        const targetMax = Math.round(restHR + (0.70 * fcReserve));

        if (outKarvonen) outKarvonen.innerHTML = `${targetMin} - ${targetMax} <small>bpm</small>`;

        // 3. TM6M Enright Predicted (Male standard reference: (7.57 * height_cm) - (5.02 * age) - (1.76 * 70kg) - 309)
        const predTM6M = Math.round((7.57 * height) - (5.02 * age) - (1.76 * 70) - 309);
        if (outTM6M) outTM6M.innerHTML = `${Math.max(200, predTM6M)} <small>metros</small>`;
    }

    if (ageInput) ageInput.addEventListener('input', calculateLiveMetrics);
    if (restHRInput) restHRInput.addEventListener('input', calculateLiveMetrics);
    if (heightInput) heightInput.addEventListener('input', calculateLiveMetrics);
    if (bbCheckbox) bbCheckbox.addEventListener('change', calculateLiveMetrics);

    // Initial calculation
    calculateLiveMetrics();

    // 7. AACVPR Risk Stratification Quiz Logic
    let quizState = { fevi: 'high', arrhythmia: 'no', mets: 'good' };

    function updateQuizResult() {
        const badge = document.getElementById('resultBadge');
        const desc = document.getElementById('resultDesc');
        const guideline = document.getElementById('resultGuideline');

        if (!badge || !desc || !guideline) return;

        if (quizState.fevi === 'low' || quizState.arrhythmia === 'yes' || quizState.mets === 'poor') {
            badge.className = 'result-badge high-risk';
            badge.innerHTML = '<i class="ph ph-warning"></i> RIESGO ALTO AACVPR';
            desc.innerText = 'Paciente de alto riesgo de eventos durante el ejercicio. Requiere monitoreo EKG continuo y supervisión kinesiológica 1:1.';
            guideline.innerHTML = '<i class="ph ph-info"></i> <strong>Recomendación EKG:</strong> Monitoreo de telemetría continua en todas las sesiones iniciales.';
        } else if (quizState.fevi === 'mid') {
            badge.className = 'result-badge mid-risk';
            badge.innerHTML = '<i class="ph ph-shield-warning"></i> RIESGO MODERADO AACVPR';
            desc.innerText = 'Paciente con capacidad moderada. Requiere supervisión médica / kinesiológica directa y monitoreo EKG intermitente.';
            guideline.innerHTML = '<i class="ph ph-info"></i> <strong>Recomendación EKG:</strong> Monitoreo en sesiones 1 a 6 y reevaluación funcional.';
        } else {
            badge.className = 'result-badge low-risk';
            badge.innerHTML = '<i class="ph ph-shield-check"></i> RIESGO BAJO AACVPR';
            desc.innerText = 'Paciente apto para entrenamiento con supervisión no continua. Bajo riesgo de eventos hemodinámicos severos durante el ejercicio.';
            guideline.innerHTML = '<i class="ph ph-info"></i> <strong>Recomendación EKG:</strong> Monitoreo aleatorio o intermitente según evolución clínica.';
        }
    }

    const quizGroups = [
        { id: 'quizFEVI', key: 'fevi' },
        { id: 'quizArrhythmia', key: 'arrhythmia' },
        { id: 'quizMETs', key: 'mets' }
    ];

    quizGroups.forEach(group => {
        const container = document.getElementById(group.id);
        if (container) {
            const btns = container.querySelectorAll('.quiz-btn');
            btns.forEach(btn => {
                btn.addEventListener('click', () => {
                    btns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    quizState[group.key] = btn.getAttribute('data-val');
                    updateQuizResult();
                });
            });
        }
    });

    // 8. Sticky Bar Scroll Trigger
    const stickyBar = document.getElementById('stickyBar');
    window.addEventListener('scroll', () => {
        if (stickyBar) {
            if (window.scrollY > 600) {
                stickyBar.classList.add('visible');
            } else {
                stickyBar.classList.remove('visible');
            }
        }
        }
    });
});

// 9. DOCX Preview Modal Functions (Global scope)
function openDocxModal() {
    const modal = document.getElementById('docxModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeDocxModal() {
    const modal = document.getElementById('docxModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

