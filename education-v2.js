(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const splitAccessibleHeading = (heading) => {
    if (reducedMotion || heading.dataset.split) return;
    const text = heading.textContent.trim().replace(/\s+/g, ' ');
    if (!text) return;

    heading.setAttribute('aria-label', text);
    heading.dataset.split = 'true';
    const fragment = document.createDocumentFragment();

    text.split(' ').forEach((word, index) => {
      const wrapper = document.createElement('span');
      wrapper.setAttribute('aria-hidden', 'true');
      const animatedWord = document.createElement('span');
      animatedWord.className = 'education-word';
      animatedWord.style.animationDelay = `${(index + 1) * 0.06}s`;
      animatedWord.textContent = word;
      wrapper.appendChild(animatedWord);
      fragment.append(wrapper, document.createTextNode(' '));
    });

    heading.replaceChildren(fragment);
  };

  document.querySelectorAll('.degree header h2[data-split-words]').forEach(splitAccessibleHeading);

  if (reducedMotion || !window.matchMedia('(pointer: fine)').matches) return;

  const heroImage = document.querySelector('.education-hero-visual img');
  if (!heroImage) return;

  let frame;
  const reset = () => {
    cancelAnimationFrame(frame);
    heroImage.style.objectPosition = '';
  };

  heroImage.parentElement.addEventListener('pointermove', (event) => {
    const bounds = heroImage.getBoundingClientRect();
    const x = Math.max(-4, Math.min(4, ((event.clientX - bounds.left) / bounds.width - .5) * 8));
    const y = Math.max(-3, Math.min(3, ((event.clientY - bounds.top) / bounds.height - .5) * 6));
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      heroImage.style.objectPosition = `calc(50% + ${x}%) calc(50% + ${y}%)`;
    });
  });
  heroImage.parentElement.addEventListener('pointerleave', reset);
})();
