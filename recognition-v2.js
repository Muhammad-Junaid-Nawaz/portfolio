(() => {
  if (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    !window.matchMedia('(pointer: fine)').matches
  ) return;

  document.querySelectorAll('.recognition-hero-grid article').forEach((card) => {
    let frame;
    const reset = () => {
      cancelAnimationFrame(frame);
      card.style.transform = '';
    };

    card.addEventListener('pointermove', (event) => {
      const bounds = card.getBoundingClientRect();
      const x = Math.max(-6, Math.min(6, (event.clientX - bounds.left - bounds.width / 2) * .035));
      const y = Math.max(-5, Math.min(5, (event.clientY - bounds.top - bounds.height / 2) * .04));
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        card.style.transform = `translate(${x}px, ${y}px)`;
      });
    });
    card.addEventListener('pointerleave', reset);
  });
})();
