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
    
    // 5. Logik für die Passwort-Dialogbox (ROBUSTE VERSION)
    const passwordModal = document.getElementById('password-modal');
    if (passwordModal) {
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
            const correctPassword = 'pytales123!';
            if (passwordInput.value === correctPassword) {
                window.open('https://drive.google.com/drive/folders/1F9jhJqdfBxscQVkbdkt17bXBC5bphCJZ?usp=sharing', '_blank');
                closeModal();
            } else {
                errorMessage.textContent = 'Passwort ist nicht korrekt.';
                passwordModal.querySelector('.modal-content').animate([
                    { transform: 'translateX(0)' }, { transform: 'translateX(-10px)' },
                    { transform: 'translateX(10px)' }, { transform: 'translateX(0)' }
                ], { duration: 300, iterations: 1 });
                passwordInput.value = '';
                passwordInput.focus();
            }
        };

        // Event Delegation: Wir hören auf Klicks im gesamten Dokument
        document.addEventListener('click', function(event) {
            // Prüfen, ob der Klick auf dem Öffnen-Button war
            if (event.target && event.target.id === 'password-btn') {
                openModal();
            }
            // Prüfen, ob der Klick auf dem Schließen-Button war
            if (event.target && event.target.id === 'password-cancel') {
                closeModal();
            }
            // Prüfen, ob der Klick auf dem Bestätigen-Button war
            if (event.target && event.target.id === 'password-submit') {
                checkPassword();
            }
            // Prüfen, ob der Klick auf den Hintergrund war
            if (event.target && event.target.id === 'password-modal') {
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
