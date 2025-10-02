document.addEventListener('DOMContentLoaded', function() {

    // --- TEIL 1: GLOBALE FUNKTIONEN (laufen auf jeder Seite) ---

    // 1. Mobiles Hamburger-Menü
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            hamburger.classList.toggle('toggle');
        });
    }

    // 2. Scroll-to-Top Button
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (scrollToTopBtn) {
        window.onscroll = function() {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                scrollToTopBtn.style.display = "block";
            } else {
                scrollToTopBtn.style.display = "none";
            }
        };
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 3. Einblend-Animationen beim Scrollen (für Unterseiten)
    const sections = document.querySelectorAll('.fade-in-section');
    if (sections.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { root: null, rootMargin: '0px', threshold: 0.1 });
        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // --- TEIL 2: SEITEN-SPEZIFISCHE FUNKTIONEN ---

    // 4. Code nur für die STARTSEITE (Hero-Effekt & Scroll-Stack)
    const heroSection = document.querySelector('.hero');
    const stackContainer = document.querySelector('.scroll-stack-container');
    if (heroSection && stackContainer) {
        // Maus-Leuchteffekt
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            heroSection.style.setProperty('--mouse-x', x + 'px');
            heroSection.style.setProperty('--mouse-y', y + 'px');
        });

        // Scroll Stack Logik
        const stackCards = document.querySelectorAll('.stack-card');
        const stackObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const card = entry.target;
                if (entry.isIntersecting) {
                    stackCards.forEach(c => c.classList.remove('is-focused'));
                    card.classList.add('is-focused');
                }
            });
        }, { rootMargin: '-150px 0px -40% 0px' });

        stackCards.forEach((card, index) => {
            const scaleValue = 1 - ((stackCards.length - 1 - index) * 0.05);
            card.style.setProperty('--scale', scaleValue);
            stackObserver.observe(card);
        });
    }
    
    // 5. Code nur für die "RECORDED HISTORY"-SEITE (Passwort-Dialogbox)
    const passwordBtn = document.getElementById('password-btn');
    const passwordModal = document.getElementById('password-modal');
    
    if (passwordBtn && passwordModal) {
        const passwordCancelBtn = document.getElementById('password-cancel');
        const passwordSubmitBtn = document.getElementById('password-submit');
        const passwordInput = document.getElementById('password-input');
        const errorMessage = document.getElementById('error-message');

        const closeModal = () => {
            passwordModal.style.opacity = '0';
            setTimeout(() => {
                passwordModal.style.display = 'none';
            }, 300);
            errorMessage.textContent = '';
            passwordInput.value = '';
        };
        
        const openModal = () => {
            passwordModal.style.display = 'flex';
            setTimeout(() => {
                passwordModal.style.opacity = '1';
                passwordInput.focus();
            }, 10);
        };

        const checkPassword = () => {
            if (passwordInput.value === 'pytales123!') {
                window.open('https://drive.google.com/drive/folders/1F9jhJqdfBxscQVkbdkt17bXBC5bphCJZ?usp=sharing', '_blank');
                closeModal();
            } else {
                errorMessage.textContent = 'Passwort ist nicht korrekt.';
                passwordInput.value = '';
                passwordInput.focus();
            }
        };

        passwordBtn.addEventListener('click', openModal);
        passwordCancelBtn.addEventListener('click', closeModal);
        passwordSubmitBtn.addEventListener('click', checkPassword);
        
        passwordModal.addEventListener('click', (event) => {
            if (event.target === passwordModal) {
                closeModal();
            }
        });
        
        passwordInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                checkPassword();
            }
        });
    }
});