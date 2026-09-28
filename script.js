(() => {
  'use strict';

  const nav = document.querySelector('#site-nav');
  const menuToggle = document.querySelector('#menu-toggle');
  const navLinks = document.querySelectorAll('.nav-links a');
  const stage = document.querySelector('#hero-stage');
  const portraitCard = document.querySelector('#portrait-card');
  const revealItems = document.querySelectorAll('.reveal');

  const closeMenu = () => {
    if (!nav || !menuToggle) return;
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    menuToggle.textContent = '+';
  };

  const toggleMenu = () => {
    if (!nav || !menuToggle) return;
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    menuToggle.textContent = isOpen ? '×' : '+';
  };

  menuToggle?.addEventListener('click', toggleMenu);
  navLinks.forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('visible'));
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion && stage && portraitCard) {
    stage.addEventListener('pointermove', event => {
      const bounds = portraitCard.getBoundingClientRect();
      const pointerEvent = event;
      const rotateX = ((pointerEvent.clientY - bounds.top) / bounds.height - 0.5) * -10;
      const rotateY = ((pointerEvent.clientX - bounds.left) / bounds.width - 0.5) * 12;
      portraitCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(16px)`;
    });

    stage.addEventListener('pointerleave', () => {
      portraitCard.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)';
    });
  }
})();