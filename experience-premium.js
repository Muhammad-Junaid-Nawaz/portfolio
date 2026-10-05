// Optional Experience-page motion enhancements. All effects respect reduced-motion preferences.
(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const roleObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      roleObserver.unobserve(entry.target);
    });
  }, { threshold: .18, rootMargin: '0px 0px -40px' });

  document.querySelectorAll('.role').forEach((role) => roleObserver.observe(role));

  const parallaxImages = document.querySelectorAll('.experience-hero-image img, .role-media img');
  let parallaxFrame = 0;

  const updateParallax = () => {
    const viewportHeight = window.innerHeight;

    parallaxImages.forEach((image) => {
      const bounds = image.getBoundingClientRect();
      if (bounds.top >= viewportHeight || bounds.bottom <= 0) return;

      const progress = (bounds.top + bounds.height / 2 - viewportHeight / 2) / viewportHeight;
      const offset = Math.max(-8, Math.min(8, progress * -10));
      image.style.objectPosition = `center calc(50% + ${offset}px)`;
    });

    parallaxFrame = 0;
  };

  const requestParallaxUpdate = () => {
    if (parallaxFrame) return;
    parallaxFrame = requestAnimationFrame(updateParallax);
  };

  updateParallax();
  window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
  window.addEventListener('resize', requestParallaxUpdate);

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!finePointer) return;

  document.querySelectorAll('.experience-close .button-primary').forEach((button) => {
    let buttonFrame = 0;

    const resetButton = () => {
      cancelAnimationFrame(buttonFrame);
      button.style.removeProperty('transform');
    };

    button.addEventListener('pointermove', (event) => {
      const bounds = button.getBoundingClientRect();
      const x = (event.clientX - bounds.left - bounds.width / 2) * .1;
      const y = (event.clientY - bounds.top - bounds.height / 2) * .15 - 3;

      cancelAnimationFrame(buttonFrame);
      buttonFrame = requestAnimationFrame(() => {
        button.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    });

    button.addEventListener('pointerleave', resetButton);
    button.addEventListener('pointercancel', resetButton);
    button.addEventListener('blur', resetButton);
  });
})();
