// Shared progressive enhancements for responsive gallery navigation.
(() => {
  const menuButton = document.querySelector('[data-menu]');
  const primaryNav = document.querySelector('#site-nav');

  const closeMenu = ({ restoreFocus = false } = {}) => {
    if (!menuButton || !primaryNav || menuButton.getAttribute('aria-expanded') !== 'true') return;
    menuButton.setAttribute('aria-expanded', 'false');
    primaryNav.classList.remove('open');
    if (restoreFocus) menuButton.focus();
  };

  if (menuButton && primaryNav) {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu({ restoreFocus: true });
    });

    primaryNav.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu();
    });

    window.matchMedia('(min-width: 1121px)').addEventListener('change', (event) => {
      if (event.matches) closeMenu();
    });
  }

  const galleries = document.querySelectorAll('.credential-gallery');
  if (!galleries.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  galleries.forEach((gallery, index) => {
    const galleryId = gallery.id || `credential-gallery-${index + 1}`;
    gallery.id = galleryId;
    gallery.tabIndex = 0;

    const shell = document.createElement('div');
    shell.className = 'credential-gallery-shell';
    gallery.parentNode.insertBefore(shell, gallery);
    shell.appendChild(gallery);

    const controls = document.createElement('div');
    controls.className = 'credential-gallery-controls';
    controls.setAttribute('aria-label', 'Gallery navigation');

    const previous = document.createElement('button');
    previous.className = 'credential-gallery-control';
    previous.type = 'button';
    previous.setAttribute('aria-controls', galleryId);
    previous.setAttribute('aria-label', 'Show previous gallery item');
    previous.innerHTML = '<span aria-hidden="true">&#8592;</span>';

    const next = document.createElement('button');
    next.className = 'credential-gallery-control';
    next.type = 'button';
    next.setAttribute('aria-controls', galleryId);
    next.setAttribute('aria-label', 'Show next gallery item');
    next.innerHTML = '<span aria-hidden="true">&#8594;</span>';

    controls.append(previous, next);
    shell.insertBefore(controls, gallery);

    const updateControls = () => {
      const maxScroll = Math.max(0, gallery.scrollWidth - gallery.clientWidth);
      previous.disabled = gallery.scrollLeft <= 2;
      next.disabled = gallery.scrollLeft >= maxScroll - 2;
    };

    const scrollGallery = (direction) => {
      gallery.scrollBy({
        left: direction * Math.max(gallery.clientWidth * .82, 280),
        behavior: reducedMotion ? 'auto' : 'smooth'
      });
    };

    previous.addEventListener('click', () => scrollGallery(-1));
    next.addEventListener('click', () => scrollGallery(1));
    gallery.addEventListener('scroll', updateControls, { passive: true });
    window.addEventListener('resize', updateControls);
    updateControls();
  });
})();
