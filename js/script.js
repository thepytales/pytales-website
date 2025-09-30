document.addEventListener('DOMContentLoaded', function() {

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

    // 3. Einblend-Animationen beim Scrollen
    const sections = document.querySelectorAll('.fade-in-section');
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

    // 4. Maus-Leuchteffekt im Hero-Bereich (nur auf der Startseite)
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            heroSection.style.setProperty('--mouse-x', x + 'px');
            heroSection.style.setProperty('--mouse-y', y + 'px');
        });
    }
    
    // 5. Logik für die Passwort-Dialogbox
    const passwordBtn = document.getElementById('password-btn');
    const passwordModal = document.getElementById('password-modal');
    
    if (passwordBtn && passwordModal) {
        const passwordCancelBtn = document.getElementById('password-cancel');
        const passwordSubmitBtn = document.getElementById('password-submit');
        const passwordInput = document.getElementById('password-input');
        const errorMessage = document.getElementById('error-message');

        const closeModal = () => {
            passwordModal.style.opacity = '0';
            // Nach der Animation das Modal wieder aus dem Event-Fluss nehmen
            setTimeout(() => {
                passwordModal.style.display = 'none';
            }, 300); // Muss zur Transition-Dauer im CSS passen
            errorMessage.textContent = '';
            passwordInput.value = '';
        };
        
        const openModal = () => {
            passwordModal.style.display = 'flex';
            // Ein kleiner Timeout, damit die CSS-Transition greift
            setTimeout(() => {
                passwordModal.style.opacity = '1';
                passwordInput.focus();
            }, 10);
        };

        passwordBtn.addEventListener('click', openModal);
        passwordCancelBtn.addEventListener('click', closeModal);

        passwordModal.addEventListener('click', (event) => {
            if (event.target === passwordModal) {
                closeModal();
            }
        });

        const checkPassword = () => {
            const correctPassword = 'pytales123!';
            const enteredPassword = passwordInput.value;
            const targetUrl = 'https://drive.google.com/drive/folders/1F9jhJqdfBxscQVkbdkt17bXBC5bphCJZ?usp=sharing';

            if (enteredPassword === correctPassword) {
                window.open(targetUrl, '_blank');
                closeModal();
            } else {
                errorMessage.textContent = 'Passwort ist nicht korrekt.';
                // Kurzes Schütteln zur visuellen Rückmeldung
                passwordModal.querySelector('.modal-content').animate([
                    { transform: 'translateX(0)' },
                    { transform: 'translateX(-10px)' },
                    { transform: 'translateX(10px)' },
                    { transform: 'translateX(0)' }
                ], {
                    duration: 300,
                    iterations: 1
                });
                passwordInput.value = '';
                passwordInput.focus();
            }
        };

        passwordSubmitBtn.addEventListener('click', checkPassword);
        
        passwordInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                checkPassword();
            }
        });
    }
});