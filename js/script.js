document.addEventListener('DOMContentLoaded', function() {

    // 1. Mobiles Hamburger-Menü
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) { /* ... bleibt unverändert ... */ }

    // 2. Scroll-to-Top Button
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (scrollToTopBtn) { /* ... bleibt unverändert ... */ }

    // 3. Einblend-Animationen beim Scrollen
    const sections = document.querySelectorAll('.fade-in-section');
    /* ... bleibt unverändert ... */

    // 4. Maus-Leuchteffekt im Hero-Bereich
    const heroSection = document.querySelector('.hero');
    if (heroSection) { /* ... bleibt unverändert ... */ }
    
    // 5. Logik für die Passwort-Dialogbox (FINALE, STABILE VERSION)
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
                // Wichtig: Erst nach der Animation unsichtbar machen
                passwordModal.style.display = 'none'; 
            }, 300); // Muss zur CSS-Transition-Dauer passen
            errorMessage.textContent = '';
            passwordInput.value = '';
        };
        
        const openModal = () => {
            // Wichtig: Zuerst sichtbar machen, dann animieren
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

    // --- Unveränderter Code ---
    if (hamburger && navLinks) { hamburger.addEventListener('click', () => { navLinks.classList.toggle('nav-active'); hamburger.classList.toggle('toggle'); }); }
    if (scrollToTopBtn) { window.onscroll = function() { if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) { scrollToTopBtn.style.display = "block"; } else { scrollToTopBtn.style.display = "none"; } }; scrollToTopBtn.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); }); }
    const observer = new IntersectionObserver((entries, observer) => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }); }, { root: null, rootMargin: '0px', threshold: 0.1 }); sections.forEach(section => { observer.observe(section); });
    if (heroSection) { heroSection.addEventListener('mousemove', (e) => { const rect = heroSection.getBoundingClientRect(); const x = e.clientX - rect.left; const y = e.clientY - rect.top; heroSection.style.setProperty('--mouse-x', x + 'px'); heroSection.style.setProperty('--mouse-y', y + 'px'); }); }
});