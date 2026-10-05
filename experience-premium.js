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
