/* ============================================================
   DENI WENDA – SOCIAL HUB | script.js
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. Fade-Up Intersection Observer ─────────────────── */
  function initFadeUp() {
    const elements = document.querySelectorAll('.fade-up');
    if (!elements.length) return;

    // Check if user prefers reduced motion
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      elements.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = parseInt(el.dataset.delay || '0', 10);
            setTimeout(() => el.classList.add('visible'), delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    elements.forEach(el => observer.observe(el));
  }

  /* ── 2. Scroll-to-Top Button ───────────────────────────── */
  function initScrollTop() {
    const btn = document.getElementById('scrollTop');
    if (!btn) return;

    const THRESHOLD = 300;

    function onScroll() {
      if (window.scrollY > THRESHOLD) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Initial check
    onScroll();
  }

  /* ── 3. Link Card Ripple Effect ────────────────────────── */
  function initRipple() {
    const cards = document.querySelectorAll('.link-card');

    cards.forEach(card => {
      card.addEventListener('pointerdown', function (e) {
        const existing = card.querySelector('.ripple');
        if (existing) existing.remove();

        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 1.8;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top  - size / 2;

        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          border-radius: 50%;
          background: rgba(255,255,255,0.07);
          transform: scale(0);
          animation: rippleAnim 0.5s ease-out forwards;
          pointer-events: none;
          z-index: 0;
        `;

        card.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
      });
    });

    // Inject ripple keyframe once
    if (!document.getElementById('ripple-style')) {
      const style = document.createElement('style');
      style.id = 'ripple-style';
      style.textContent = `
        @keyframes rippleAnim {
          to { transform: scale(1); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  /* ── 4. Active (touch) state for cards ─────────────────── */
  function initTouchFeedback() {
    const cards = document.querySelectorAll('.link-card');
    cards.forEach(card => {
      card.addEventListener('touchstart', () => {
        card.style.transform = 'translateY(-2px) scale(0.99)';
      }, { passive: true });
      card.addEventListener('touchend', () => {
        card.style.transform = '';
      }, { passive: true });
      card.addEventListener('touchcancel', () => {
        card.style.transform = '';
      }, { passive: true });
    });
  }

  /* ── 5. Boot ───────────────────────────────────────────── */
  function boot() {
    initFadeUp();
    initScrollTop();
    initRipple();
    initTouchFeedback();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

/* ── PRELOADER───────────────────────────────────────────── */
window.addEventListener("load", () => {

  const preloader =
  document.getElementById("preloader");

  setTimeout(() => {
    preloader.classList.add("hide");
  }, 3000);

});