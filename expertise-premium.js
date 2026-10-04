(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reducedMotion && 'IntersectionObserver' in window) {
    const projectValues = [...document.querySelectorAll('.project-value')];
    if (projectValues.length) {
      document.documentElement.classList.add('expertise-premium-motion');
      const valueObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const siblings = [...entry.target.parentElement.querySelectorAll('.project-value')];
          entry.target.style.transitionDelay = `${siblings.indexOf(entry.target) * 0.08}s`;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.15 });

      projectValues.forEach((item) => valueObserver.observe(item));
    }
  }

  if (reducedMotion || !window.matchMedia('(pointer: fine)').matches) return;

  document.querySelectorAll('.expertise-index > div').forEach((card) => {
    let frame;
    const reset = () => {
      cancelAnimationFrame(frame);
      card.style.transform = '';
    };

    card.addEventListener('pointermove', (event) => {
      const bounds = card.getBoundingClientRect();
      const x = Math.max(-8, Math.min(8, (event.clientX - bounds.left - bounds.width / 2) * 0.04));
      const y = Math.max(-6, Math.min(6, (event.clientY - bounds.top - bounds.height / 2) * 0.05));
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        card.style.transform = `translate(${x}px, ${y}px)`;
      });
    });
    card.addEventListener('pointerleave', reset);
  });

  document.querySelectorAll('.expertise-domain .domain-visual img').forEach((image) => {
    let frame;
    const reset = () => {
      cancelAnimationFrame(frame);
      image.style.objectPosition = '';
    };

    image.parentElement.addEventListener('pointermove', (event) => {
      const bounds = image.getBoundingClientRect();
      const x = Math.max(-4, Math.min(4, ((event.clientX - bounds.left) / bounds.width - 0.5) * 8));
      const y = Math.max(-3, Math.min(3, ((event.clientY - bounds.top) / bounds.height - 0.5) * 6));
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        image.style.objectPosition = `calc(50% + ${x}%) calc(50% + ${y}%)`;
      });
    });
    image.parentElement.addEventListener('pointerleave', reset);
  });
})();
