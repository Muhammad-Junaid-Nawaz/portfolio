/* Contact motion preview: bounded magnetic links for fine pointers only. */
(() => {
  const canAnimate = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches;
  if (!canAnimate) return;

  document.querySelectorAll('.contact-links a[data-magnetic]').forEach((link) => {
    let frame = 0;
    let offset = 0;

    link.addEventListener('pointermove', (event) => {
      const bounds = link.getBoundingClientRect();
      offset = Math.max(-6, Math.min(6, (event.clientX - bounds.left - bounds.width / 2) * .06));
      if (frame) return;
      frame = requestAnimationFrame(() => {
        link.style.setProperty('--contact-magnetic-x', `${offset.toFixed(1)}px`);
        frame = 0;
      });
    });

    link.addEventListener('pointerleave', () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      link.style.removeProperty('--contact-magnetic-x');
    });
  });
})();
