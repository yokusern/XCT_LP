/**
 * XCT Main Script - Professional UX & Logic
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Sticky Header Logic ---
    const header = document.querySelector('.sticky-nav');
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 2. Scroll Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 3. Step Highlight Logic (for business.html) ---
    const stepCards = document.querySelectorAll('.step-card');
    if (stepCards.length > 0) {
        const stepObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('highlight');
                } else {
                    entry.target.classList.remove('highlight');
                }
            });
        }, { threshold: 0.6, rootMargin: '0px 0px -100px 0px' });

        stepCards.forEach(card => stepObserver.observe(card));
    }

    // --- 4. URL Parameter Handling (contact.html) ---
    const urlParams = new URLSearchParams(window.location.search);
    const planParam = urlParams.get('plan') || urlParams.get('type');
    const planSelect = document.getElementById('plan');

    if (planSelect && planParam) {
        for (let i = 0; i < planSelect.options.length; i++) {
            if (planSelect.options[i].value === planParam) {
                planSelect.selectedIndex = i;
                break;
            }
        }
    }

    // --- 5. Form Submission (GAS API) ---
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');

    // Use environment variables / constants for API URLs
    const GAS_ENDPOINT = window.XCT_GAS_CONFIG || 'https://script.google.com/macros/s/AKfycbz_XXXXXXXXXXXXXX/exec';

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Native Validation Check
            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            // UI State: Loading
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-70', 'cursor-not-allowed');
            submitBtn.innerHTML = '<span>送信しています...</span>';

            const formData = new FormData(contactForm);
            const payload = Object.fromEntries(formData.entries());

            try {
                // In production, replace with actual fetch call if GAS_ENDPOINT is provided
                console.log('[XCT Log] Submitting to GAS:', payload);

                // Simulation for demonstration (Replace with real Fetch for production)
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Success UI transition
                contactForm.style.transition = 'opacity 0.5s ease';
                contactForm.style.opacity = '0';

                setTimeout(() => {
                    contactForm.classList.add('hidden');
                    successMessage.classList.remove('hidden');
                    successMessage.classList.add('reveal', 'active');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 500);

            } catch (error) {
                console.error('[XCT Error] Submission failed:', error);
                alert('送信に失敗しました。お手数ですが、時間をおいて再度お試しいただくか、直接メールにてご連絡ください。');
                submitBtn.disabled = false;
                submitBtn.classList.remove('opacity-70', 'cursor-not-allowed');
                submitBtn.innerHTML = originalBtnContent;
            }
        });
    }
});
