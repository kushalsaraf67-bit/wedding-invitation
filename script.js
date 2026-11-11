/* ============================================
   WEDDING INVITATION - Rupesh & Laxmi
   Envelope · Music · Countdown · Scroll Reveal
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    const envelopeOverlay = document.getElementById('envelopeOverlay');
    const mainContent     = document.getElementById('mainContent');
    const bgMusic         = document.getElementById('bgMusic');
    const musicToggle     = document.getElementById('musicToggle');
    const musicIcon       = document.getElementById('musicIcon');

    let isMusicPlaying = false;

    // Lock scroll while envelope is visible
    document.body.classList.add('no-scroll');

    /* ============================
       ENVELOPE OPEN
       ============================ */
    envelopeOverlay.addEventListener('click', openEnvelope);

    function openEnvelope() {
        envelopeOverlay.removeEventListener('click', openEnvelope);

        // *** Play music IMMEDIATELY inside the click handler ***
        // This is critical — browsers only allow audio playback
        // as a direct result of a user gesture (click/tap).
        playMusic();

        // Start envelope animation
        envelopeOverlay.classList.add('opening');

        // After animation completes, reveal main content
        setTimeout(() => {
            envelopeOverlay.classList.add('hidden');
            mainContent.classList.add('visible');
            document.body.classList.remove('no-scroll');
            musicToggle.style.display = 'flex';
            initScrollReveal();
            startCountdown();
        }, 1800);
    }

    /* ============================
       MUSIC CONTROLS
       ============================ */
    function playMusic() {
        if (!bgMusic) return;
        bgMusic.volume = 0.4;

        const p = bgMusic.play();
        if (p !== undefined) {
            p.then(() => {
                isMusicPlaying = true;
                updateMusicIcon();
            }).catch(() => {
                // Autoplay blocked — user can retry via toggle
                isMusicPlaying = false;
                updateMusicIcon();
            });
        }
    }

    function toggleMusic() {
        if (!bgMusic) return;
        if (isMusicPlaying) {
            bgMusic.pause();
            isMusicPlaying = false;
            updateMusicIcon();
        } else {
            bgMusic.play().then(() => {
                isMusicPlaying = true;
                updateMusicIcon();
            }).catch(() => {});
        }
    }

    function updateMusicIcon() {
        if (isMusicPlaying) {
            musicIcon.classList.add('playing');
            musicIcon.classList.remove('paused');
            musicIcon.textContent = '♫';
        } else {
            musicIcon.classList.remove('playing');
            musicIcon.classList.add('paused');
            musicIcon.textContent = '♪';
        }
    }

    musicToggle.addEventListener('click', toggleMusic);

    /* ============================
       COUNTDOWN TIMER
       ============================ */
    const weddingDate = new Date('2026-12-05T12:30:00+05:30').getTime();

    function startCountdown() {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    function updateCountdown() {
        const diff = weddingDate - Date.now();
        if (diff <= 0) {
            setCountdownValues(0, 0, 0, 0);
            return;
        }
        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000)  / 60000);
        const s = Math.floor((diff % 60000)     / 1000);
        setCountdownValues(d, h, m, s);
    }

    function setCountdownValues(d, h, m, s) {
        document.getElementById('days').textContent    = String(d).padStart(2, '0');
        document.getElementById('hours').textContent   = String(h).padStart(2, '0');
        document.getElementById('minutes').textContent = String(m).padStart(2, '0');
        document.getElementById('seconds').textContent = String(s).padStart(2, '0');
    }

    /* ============================
       SCROLL REVEAL
       ============================ */
    function initScrollReveal() {
        const els = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
        if (!('IntersectionObserver' in window)) {
            els.forEach(el => el.classList.add('revealed'));
            return;
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        els.forEach(el => observer.observe(el));
    }

    /* ============================
       SUBTLE PARALLAX ON HERO
       ============================ */
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                const hero = document.querySelector('.hero-content');
                if (hero && scrollY < window.innerHeight) {
                    hero.style.transform = 'translateY(' + (scrollY * 0.15) + 'px)';
                    hero.style.opacity = Math.max(0, 1 - scrollY / (window.innerHeight * 0.8));
                }
                ticking = false;
            });
            ticking = true;
        }
    });

});
