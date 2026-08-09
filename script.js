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

    // Initial calculation for Karvonen
    calculateLiveMetrics();

    // Tab Switching for Live Calculators
    const calcTabBtns = document.querySelectorAll('.calc-tab-btn');
    const calcTabContents = document.querySelectorAll('.calc-tab-content');

    calcTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTabId = btn.getAttribute('data-tab');

            calcTabBtns.forEach(b => b.classList.remove('active'));
            calcTabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetContent = document.getElementById(targetTabId);
            if (targetContent) targetContent.classList.add('active');
        });
    });

    // --- 6.2 DASI Calculation Logic ---
    const dasiCheckboxes = document.querySelectorAll('.dasi-chk');
    const outDASIScore = document.getElementById('outDASIScore');
    const outDASIVO2 = document.getElementById('outDASIVO2');
    const outDASIMETs = document.getElementById('outDASIMETs');
    const outDASIClass = document.getElementById('outDASIClass');

    function calculateDASI() {
        let totalDASI = 0;
        dasiCheckboxes.forEach(chk => {
            if (chk.checked) {
                totalDASI += parseFloat(chk.getAttribute('data-weight') || '0');
            }
        });

        // VO2 peak (ml/kg/min) = (0.43 * DASI) + 9.6
        const vo2Peak = (0.43 * totalDASI) + 9.6;
        const mets = vo2Peak / 3.5;

        if (outDASIScore) outDASIScore.innerHTML = `${totalDASI.toFixed(1)} <small>/ 58.2 pts</small>`;
        if (outDASIVO2) outDASIVO2.innerHTML = `${vo2Peak.toFixed(1)} <small>ml/kg/min</small>`;
        if (outDASIMETs) outDASIMETs.innerHTML = `${mets.toFixed(1)} <small>METs</small>`;

        if (outDASIClass) {
            if (mets < 4.0) {
                outDASIClass.innerText = "Limitación Severa (Bajo Capacidad Funcional)";
            } else if (mets <= 7.0) {
                outDASIClass.innerText = "Capacidad Funcional Moderada (Apto RHB)";
            } else {
                outDASIClass.innerText = "Alta Capacidad Funcional (Excelente Pronóstico)";
            }
        }
    }

    dasiCheckboxes.forEach(chk => chk.addEventListener('change', calculateDASI));
    calculateDASI();

    // --- 6.3 IPAQ Corto Calculation Logic ---
    const ipaqVigDays = document.getElementById('ipaqVigDays');
    const ipaqVigMin = document.getElementById('ipaqVigMin');
    const ipaqModDays = document.getElementById('ipaqModDays');
    const ipaqModMin = document.getElementById('ipaqModMin');
    const ipaqWalkDays = document.getElementById('ipaqWalkDays');
    const ipaqWalkMin = document.getElementById('ipaqWalkMin');

    const valIpaqVigDays = document.getElementById('valIpaqVigDays');
    const valIpaqVigMin = document.getElementById('valIpaqVigMin');
    const valIpaqModDays = document.getElementById('valIpaqModDays');
    const valIpaqModMin = document.getElementById('valIpaqModMin');
    const valIpaqWalkDays = document.getElementById('valIpaqWalkDays');
    const valIpaqWalkMin = document.getElementById('valIpaqWalkMin');

    const outIPAQTotal = document.getElementById('outIPAQTotal');
    const outIPAQLevel = document.getElementById('outIPAQLevel');
    const outIPAQRec = document.getElementById('outIPAQRec');

    function calculateIPAQ() {
        if (!ipaqVigDays || !ipaqVigMin || !ipaqModDays || !ipaqModMin || !ipaqWalkDays || !ipaqWalkMin) return;

        const vDays = parseInt(ipaqVigDays.value, 10);
        const vMin = parseInt(ipaqVigMin.value, 10);
        const mDays = parseInt(ipaqModDays.value, 10);
        const mMin = parseInt(ipaqModMin.value, 10);
        const wDays = parseInt(ipaqWalkDays.value, 10);
        const wMin = parseInt(ipaqWalkMin.value, 10);

        if (valIpaqVigDays) valIpaqVigDays.innerText = vDays;
        if (valIpaqVigMin) valIpaqVigMin.innerText = vMin;
        if (valIpaqModDays) valIpaqModDays.innerText = mDays;
        if (valIpaqModMin) valIpaqModMin.innerText = mMin;
        if (valIpaqWalkDays) valIpaqWalkDays.innerText = wDays;
        if (valIpaqWalkMin) valIpaqWalkMin.innerText = wMin;

        // METs min/week formulas (OMS standard)
        const vigMETs = 8.0 * vMin * vDays;
        const modMETs = 4.0 * mMin * mDays;
        const walkMETs = 3.3 * wMin * wDays;
        const totalMETs = Math.round(vigMETs + modMETs + walkMETs);

        if (outIPAQTotal) outIPAQTotal.innerHTML = `${totalMETs} <small>MET-min/sem</small>`;

        if (outIPAQLevel && outIPAQRec) {
            if (totalMETs < 600) {
                outIPAQLevel.innerText = "BAJO / INACTIVO";
                outIPAQLevel.style.color = "#ff4d4d";
                outIPAQRec.innerText = "Priorizar prescripción de hábitos activos y caminata gradual";
            } else if (totalMETs <= 3000) {
                outIPAQLevel.innerText = "MODERADO";
                outIPAQLevel.style.color = "#00e5ff";
                outIPAQRec.innerText = "Mantener volumen e incrementar intensidad de manera progresiva";
            } else {
                outIPAQLevel.innerText = "ALTO / MUY ACTIVO";
                outIPAQLevel.style.color = "#39ff14";
                outIPAQRec.innerText = "Nivel óptimo. Mantener supervisión y prevención de sobrecarga";
            }
        }
    }

    [ipaqVigDays, ipaqVigMin, ipaqModDays, ipaqModMin, ipaqWalkDays, ipaqWalkMin].forEach(input => {
        if (input) input.addEventListener('input', calculateIPAQ);
    });
    calculateIPAQ();

    // --- 6.4 SARC-F Calculation Logic ---
    const sarcfSelects = [
        document.getElementById('sarcfQ1'),
        document.getElementById('sarcfQ2'),
        document.getElementById('sarcfQ3'),
        document.getElementById('sarcfQ4'),
        document.getElementById('sarcfQ5')
    ];

    const outSARCFScore = document.getElementById('outSARCFScore');
    const outSARCFStatus = document.getElementById('outSARCFStatus');
    const outSARCFAction = document.getElementById('outSARCFAction');
    const boxSARCFStatus = document.getElementById('boxSARCFStatus');

    function calculateSARCF() {
        let totalScore = 0;
        sarcfSelects.forEach(sel => {
            if (sel) totalScore += parseInt(sel.value, 10);
        });

        if (outSARCFScore) outSARCFScore.innerHTML = `${totalScore} <small>/ 10 pts</small>`;

        if (outSARCFStatus && outSARCFAction && boxSARCFStatus) {
            if (totalScore >= 4) {
                outSARCFStatus.innerText = "SOSPECHA CLÍNICA DE SARCOPENIA";
                outSARCFStatus.style.color = "#ff4d4d";
                outSARCFAction.innerText = "Se recomienda evaluar Dinamometría Palmar (<27kg ♂ / <16kg ♀) y STS 30s";
                boxSARCFStatus.className = "output-box danger-out";
            } else {
                outSARCFStatus.innerText = "SIN SOSPECHA DE SARCOPENIA";
                outSARCFStatus.style.color = "#39ff14";
                outSARCFAction.innerText = "Riesgo bajo de pérdida de masa muscular funcional";
                boxSARCFStatus.className = "output-box green-out";
            }
        }
    }

    sarcfSelects.forEach(sel => {
        if (sel) sel.addEventListener('change', calculateSARCF);
    });
    calculateSARCF();

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

