/* =========================================================
   ASSEMBLIO — Animations JavaScript
   Scroll Reveal, Counter, Parallax, Marquee
   ========================================================= */

'use strict';

/* ─── SCROLL REVEAL ─── */
(function initScrollReveal() {
  const elements = document.querySelectorAll('[data-reveal]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  elements.forEach(el => observer.observe(el));
})();

/* ─── COUNTER ANIMATION ─── */
(function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  function animateCounter(el) {
    const target = parseInt(el.dataset.counter, 10);
    const duration = parseInt(el.dataset.duration, 10) || 2000;
    const decimals = parseInt(el.dataset.decimals, 10) || 0;
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const start = performance.now();

    function easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      const value = Math.round(eased * target * Math.pow(10, decimals)) / Math.pow(10, decimals);

      el.textContent = prefix + value.toLocaleString() + suffix;

      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
})();

/* ─── PARALLAX SCROLL ─── */
(function initParallax() {
  const elements = document.querySelectorAll('[data-parallax]');
  if (!elements.length) return;

  function updateParallax() {
    const scrollY = window.scrollY;

    elements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.3;
      const rect = el.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const offset = (elementCenter - viewportCenter) * speed;

      el.style.transform = `translateY(${offset}px)`;
    });
  }

  window.addEventListener('scroll', updateParallax, { passive: true });
  updateParallax();
})();

/* ─── MARQUEE SETUP ─── */
(function initMarquee() {
  const tracks = document.querySelectorAll('.marquee-track');

  tracks.forEach(track => {
    const content = track.innerHTML;
    // Duplicate content for seamless loop
    track.innerHTML = content + content;
  });
})();

/* ─── TILT EFFECT ─── */
(function initTilt() {
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -8;
      const rotateY = (x - centerX) / centerX * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    });
  });
})();

/* ─── GALLERY MASONRY LIGHTBOX ─── */
(function initGallery() {
  const galleryItems = document.querySelectorAll('[data-gallery-item]');
  if (!galleryItems.length) return;

  // Create lightbox
  const lightbox = document.createElement('div');
  lightbox.id = 'gallery-lightbox';
  lightbox.style.cssText = `
    position: fixed; inset: 0; z-index: 9000;
    background: rgba(32,33,36,0.97); backdrop-filter: blur(20px);
    display: flex; align-items: center; justify-content: center;
    opacity: 0; visibility: hidden; transition: opacity 0.4s ease, visibility 0.4s ease;
    padding: 20px;
  `;

  lightbox.innerHTML = `
    <button id="lb-close" style="position:absolute;top:20px;right:20px;width:44px;height:44px;background:rgba(247,243,235,0.1);border:1px solid rgba(247,243,235,0.2);border-radius:50%;color:#F7F3EB;cursor:pointer;display:flex;align-items:center;justify-content:center;" aria-label="Close">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <button id="lb-prev" style="position:absolute;left:20px;width:44px;height:44px;background:rgba(247,243,235,0.1);border:1px solid rgba(247,243,235,0.2);border-radius:50%;color:#F7F3EB;cursor:pointer;display:flex;align-items:center;justify-content:center;" aria-label="Previous">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
    </button>
    <img id="lb-image" src="" alt="" style="max-width:90vw;max-height:85vh;object-fit:contain;border-radius:8px;box-shadow:0 24px 80px rgba(0,0,0,0.5);">
    <button id="lb-next" style="position:absolute;right:20px;width:44px;height:44px;background:rgba(247,243,235,0.1);border:1px solid rgba(247,243,235,0.2);border-radius:50%;color:#F7F3EB;cursor:pointer;display:flex;align-items:center;justify-content:center;" aria-label="Next">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
  `;
  document.body.appendChild(lightbox);

  const lbImage = lightbox.querySelector('#lb-image');
  const items = [...galleryItems];
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const item = items[index];
    const img = item.querySelector('img') || item;
    lbImage.src = img.src || img.dataset.src;
    lbImage.alt = img.alt || '';
    lightbox.style.opacity = '1';
    lightbox.style.visibility = 'visible';
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.style.opacity = '0';
    lightbox.style.visibility = 'hidden';
    document.body.style.overflow = '';
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    const item = items[currentIndex];
    const img = item.querySelector('img') || item;
    lbImage.src = img.src || img.dataset.src;
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % items.length;
    const item = items[currentIndex];
    const img = item.querySelector('img') || item;
    lbImage.src = img.src || img.dataset.src;
  }

  galleryItems.forEach((item, i) => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => openLightbox(i));
  });

  lightbox.querySelector('#lb-close').addEventListener('click', closeLightbox);
  lightbox.querySelector('#lb-prev').addEventListener('click', prevImage);
  lightbox.querySelector('#lb-next').addEventListener('click', nextImage);

  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener('keydown', (e) => {
    if (lightbox.style.visibility === 'visible') {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    }
  });
})();

/* ─── STAGGER ANIMATION FOR GRID ITEMS ─── */
(function initStagger() {
  const grids = document.querySelectorAll('[data-stagger-grid]');

  grids.forEach(grid => {
    const items = grid.querySelectorAll(':scope > *');
    items.forEach((item, i) => {
      item.classList.add('stagger-item');
      item.setAttribute('data-reveal', 'up');
      item.setAttribute('data-delay', String(i * 80));
    });
  });
})();

/* ─── STATS SECTION TRIGGER ─── */
(function initStats() {
  const statsSection = document.querySelector('.stats-section');
  if (!statsSection) return;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      statsSection.classList.add('animate');
      observer.disconnect();
    }
  }, { threshold: 0.3 });

  observer.observe(statsSection);
})();
