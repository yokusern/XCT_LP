document.addEventListener('DOMContentLoaded', () => {
    // 1. URL Parameter Handling
    const urlParams = new URLSearchParams(window.location.search);
    const planParam = urlParams.get('plan') || urlParams.get('type');
    const planSelect = document.getElementById('plan');

    if (planSelect && planParam) {
        // Find matching option
        for (let i = 0; i < planSelect.options.length; i++) {
            if (planSelect.options[i].value === planParam) {
                planSelect.selectedIndex = i;
                break;
            }
        }
    }

    // 2. Form Submission
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');

    // Replace with actual GAS URL after deployment
    const GAS_ENDPOINT = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Simple Validation
            if (!contactForm.checkValidity()) {
                return;
            }

            // UI State Change
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>送信中...</span><svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>';

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            try {
                // In a real environment, we would use fetch(GAS_ENDPOINT, { method: 'POST', body: JSON.stringify(data) })
                // But since we don't have a real deployment ID, we'll simulate the response for now.
                console.log('Sending data to GAS:', data);

                // Simulation of API delay
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Success UI
                contactForm.classList.add('hidden');
                successMessage.classList.remove('hidden');
                
                // Scroll to top of the card
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

            } catch (error) {
                console.error('Submission failed:', error);
                alert('送信に失敗しました。時間をおいて再度お試しいただくか、直接メールにてご連絡ください。');
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span>送信する</span>';
            }
        });
    }

    // 3. Simple Animations on scroll (optional utility)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
});
