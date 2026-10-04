/* Beyond motion preview: pointer-fine, reduced-motion-safe chapter glow. */
(() => {
  const canAnimate = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches;
  if (!canAnimate) return;

  document.querySelectorAll('.chapter').forEach((chapter) => {
    let frame = 0;
    let pointerX = 80;
    let pointerY = 10;

    chapter.addEventListener('pointermove', (event) => {
      const bounds = chapter.getBoundingClientRect();
      pointerX = Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100));
      pointerY = Math.max(0, Math.min(100, ((event.clientY - bounds.top) / bounds.height) * 100));
      if (frame) return;
      frame = requestAnimationFrame(() => {
        chapter.style.setProperty('--chapter-glow-x', `${pointerX}%`);
        chapter.style.setProperty('--chapter-glow-y', `${pointerY}%`);
        frame = 0;
      });
    });

    chapter.addEventListener('pointerleave', () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      chapter.style.removeProperty('--chapter-glow-x');
      chapter.style.removeProperty('--chapter-glow-y');
    });
  });
})();
