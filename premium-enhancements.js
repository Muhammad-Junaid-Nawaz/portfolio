// Optional Home-page motion enhancements. All effects respect reduced-motion preferences.
(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const heading = document.querySelector('.hero-copy h1');

  if (heading && !heading.dataset.premiumEnhanced) {
    const fragment = document.createDocumentFragment();
    let delay = 0;

    const appendWords = (text, parent) => {
      text.split(/\s+/).filter(Boolean).forEach((word) => {
        const wordElement = document.createElement('span');
        wordElement.className = 'premium-word';
        delay += .07;
        wordElement.style.setProperty('--premium-word-delay', `${delay}s`);
        wordElement.textContent = word;
        parent.appendChild(wordElement);
        parent.appendChild(document.createTextNode(' '));
      });
    };

    Array.from(heading.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        appendWords(node.textContent, fragment);
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'EM') {
        const emphasis = node.cloneNode(false);
        appendWords(node.textContent, emphasis);
        fragment.appendChild(emphasis);
      } else {
        fragment.appendChild(node.cloneNode(true));
      }
    });

    heading.replaceChildren(fragment);
    heading.dataset.premiumEnhanced = 'true';
  }

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (finePointer) {
    document.querySelectorAll('.button-primary, .button-resume').forEach((button) => {
      let animationFrame = 0;

      const resetButton = () => {
        cancelAnimationFrame(animationFrame);
        button.style.removeProperty('transform');
      };

      button.addEventListener('pointermove', (event) => {
        const bounds = button.getBoundingClientRect();
        const x = (event.clientX - bounds.left - bounds.width / 2) * .12;
        const y = (event.clientY - bounds.top - bounds.height / 2) * .18 - 3;

        cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(() => {
          button.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
      });

      button.addEventListener('pointerleave', resetButton);
      button.addEventListener('pointercancel', resetButton);
      button.addEventListener('blur', resetButton);
    });
  }

})();
