/* =========================================================
   ASSEMBLIO — Main JavaScript
   Core: Dark Mode, RTL, Navbar, Slider, Scroll-to-top
   ========================================================= */

'use strict';

/* ─── UTILITY ─── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const on = (el, ev, fn, opts) => el && el.addEventListener(ev, fn, opts);

/* ─── PAGE LOADER ─── */
(function initLoader() {
  const loader = $('#page-loader');
  if (!loader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.classList.add('page-transition');
    }, 600);
  });
})();

/* ─── DARK MODE ─── */
(function initTheme() {
  const root = document.documentElement;
  const stored = localStorage.getItem('assemblio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored || (prefersDark ? 'dark' : 'light');

  root.setAttribute('data-theme', theme);
  updateThemeIcons(theme);

  $$('[data-theme-toggle]').forEach(btn => {
    on(btn, 'click', () => {
      const current = root.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('assemblio-theme', next);
      updateThemeIcons(next);
    });
  });

  function updateThemeIcons(theme) {
    $$('[data-theme-toggle]').forEach(btn => {
      const iconSun  = btn.querySelector('.icon-sun');
      const iconMoon = btn.querySelector('.icon-moon');
      if (iconSun)  iconSun.style.display  = theme === 'dark'  ? 'block' : 'none';
      if (iconMoon) iconMoon.style.display  = theme === 'light' ? 'block' : 'none';
    });
  }
})();

/* ─── RTL / LTR TOGGLE ─── */
(function initRTL() {
  const root = document.documentElement;
  const stored = localStorage.getItem('assemblio-dir') || 'ltr';
  root.setAttribute('dir', stored);
  updateDirIcons(stored);

  $$('[data-dir-toggle]').forEach(btn => {
    on(btn, 'click', () => {
      const current = root.getAttribute('dir');
      const next = current === 'rtl' ? 'ltr' : 'rtl';
      root.setAttribute('dir', next);
      localStorage.setItem('assemblio-dir', next);
      updateDirIcons(next);
    });
  });

  function updateDirIcons(dir) {
    $$('[data-dir-toggle]').forEach(btn => {
      btn.setAttribute('title', dir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL');
      const label = btn.querySelector('.dir-label');
      if (label) label.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
    });
  }
})();

/* ─── STICKY NAVBAR ─── */
(function initNavbar() {
  const navbar = $('#navbar');
  if (!navbar) return;

  const SCROLL_THRESHOLD = 80;

  function onScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      navbar.classList.add('scrolled');
      navbar.classList.remove('transparent');
    } else {
      navbar.classList.remove('scrolled');
      if (navbar.dataset.transparent === 'true') {
        navbar.classList.add('transparent');
      }
    }
  }

  on(window, 'scroll', onScroll, { passive: true });
  onScroll();
})();

/* ─── MOBILE MENU ─── */
(function initMobileMenu() {
  const hamburger = $('#hamburger');
  const mobileMenu = $('#mobile-menu');
  const closeBtn = $('#mobile-menu-close');

  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.documentElement.classList.add('mobile-menu-open');
    document.body.classList.add('mobile-menu-open');
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.documentElement.classList.remove('mobile-menu-open');
    document.body.classList.remove('mobile-menu-open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  on(hamburger, 'click', () => {
    hamburger.classList.contains('open') ? closeMenu() : openMenu();
  });

  on(closeBtn, 'click', closeMenu);

  // Close on overlay click
  on(mobileMenu, 'click', (e) => {
    if (e.target === mobileMenu) closeMenu();
  });

  // Close on Escape
  on(document, 'keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Mobile nav links close menu
  $$('.mobile-nav-link', mobileMenu).forEach(link => {
    on(link, 'click', closeMenu);
  });

  // Prevent background scroll on touch & wheel inside mobile menu
  on(mobileMenu, 'touchmove', (e) => {
    const isScrollableContent = e.target.closest('.mobile-nav-links');
    if (!isScrollableContent) {
      e.preventDefault();
    }
  }, { passive: false });

  on(mobileMenu, 'wheel', (e) => {
    const navLinks = mobileMenu.querySelector('.mobile-nav-links');
    if (!navLinks || !e.target.closest('.mobile-nav-links')) {
      e.preventDefault();
      return;
    }
    const isAtTop = navLinks.scrollTop <= 0 && e.deltaY < 0;
    const isAtBottom = (navLinks.scrollTop + navLinks.clientHeight >= navLinks.scrollHeight - 1) && e.deltaY > 0;
    if (isAtTop || isAtBottom) {
      e.preventDefault();
    }
  }, { passive: false });
})();

/* ─── HERO SLIDER ─── */
(function initHeroSlider() {
  const slider = $('#hero-slider');
  if (!slider) return;

  const track = slider.querySelector('.hero-slides');
  const slides = $$('.hero-slide', slider);
  const dots = $$('.slider-dot', slider);
  const prevBtn = slider.querySelector('.slider-prev');
  const nextBtn = slider.querySelector('.slider-next');
  const counterEl = slider.querySelector('.slide-counter-current');
  const progressBar = slider.querySelector('.slider-progress');

  let current = 0;
  let total = slides.length;
  let autoplayTimer = null;
  let isTransitioning = false;
  const AUTOPLAY_DELAY = 5000;

  function goTo(index, skipProgress = false) {
    if (isTransitioning || index === current) return;
    isTransitioning = true;

    // Reset current slide animations
    slides[current].classList.remove('active');

    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    slides[current].classList.add('active');

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });

    // Update counter
    if (counterEl) {
      counterEl.textContent = String(current + 1).padStart(2, '0');
    }

    // Reset progress bar
    if (progressBar && !skipProgress) {
      progressBar.style.transition = 'none';
      progressBar.style.width = '0%';
      requestAnimationFrame(() => {
        progressBar.style.transition = `width ${AUTOPLAY_DELAY}ms linear`;
        progressBar.style.width = '100%';
      });
    }

    setTimeout(() => { isTransitioning = false; }, 900);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => goTo(current + 1), AUTOPLAY_DELAY);
    if (progressBar) {
      progressBar.style.transition = `width ${AUTOPLAY_DELAY}ms linear`;
      progressBar.style.width = '100%';
    }
  }

  function stopAutoplay() {
    clearInterval(autoplayTimer);
    if (progressBar) {
      progressBar.style.transition = 'none';
      progressBar.style.width = '0%';
    }
  }

  // Init first slide
  slides[0].classList.add('active');
  if (counterEl) counterEl.textContent = '01';
  startAutoplay();

  // Controls
  on(nextBtn, 'click', () => { goTo(current + 1); startAutoplay(); });
  on(prevBtn, 'click', () => { goTo(current - 1); startAutoplay(); });

  dots.forEach((dot, i) => {
    on(dot, 'click', () => { goTo(i); startAutoplay(); });
  });

  // Touch/swipe support
  let touchStartX = 0;
  on(slider, 'touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
  on(slider, 'touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      dx < 0 ? goTo(current + 1) : goTo(current - 1);
      startAutoplay();
    }
  });

  // Pause on hover
  on(slider, 'mouseenter', stopAutoplay);
  on(slider, 'mouseleave', startAutoplay);

  // Keyboard navigation
  on(document, 'keydown', (e) => {
    if (e.key === 'ArrowLeft') { goTo(current - 1); startAutoplay(); }
    if (e.key === 'ArrowRight') { goTo(current + 1); startAutoplay(); }
  });
})();

/* ─── TESTIMONIALS SLIDER ─── */
(function initTestimonialsSlider() {
  const outer = $('#testimonials-scroll');
  if (!outer) return;

  const track = outer.querySelector('.testimonials-track');
  const prevBtn = $('#testi-prev');
  const nextBtn = $('#testi-next');
  if (!track || !prevBtn || !nextBtn) return;

  const cards = $$('.testimonial-card', outer);
  if (!cards.length) return;

  let index = 0;

  function update() {
    const gap = parseFloat(getComputedStyle(track).gap) || 24;
    const cardWidth = cards[0].getBoundingClientRect().width;
    if (!cardWidth) return;
    const step = cardWidth + gap;
    const outerWidth = outer.clientWidth;
    const perView = Math.max(1, Math.round((outerWidth + gap) / step));
    const maxIndex = Math.max(0, cards.length - perView);

    index = Math.min(Math.max(index, 0), maxIndex);
    track.style.transform = `translateX(-${index * step}px)`;
    prevBtn.disabled = index <= 0;
    nextBtn.disabled = index >= maxIndex;
  }

  on(prevBtn, 'click', () => { index -= 1; update(); });
  on(nextBtn, 'click', () => { index += 1; update(); });

  let resizeTimer;
  on(window, 'resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(update, 100);
  });

  update();
})();

/* ─── SCROLL TO TOP ─── */
(function initScrollTop() {
  const btn = $('#scroll-top');
  if (!btn) return;

  on(window, 'scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  on(btn, 'click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ─── FAQ ACCORDION ─── */
(function initAccordion() {
  $$('.accordion-trigger').forEach(trigger => {
    on(trigger, 'click', () => {
      const item = trigger.closest('.accordion-item');
      const isOpen = item.classList.contains('active');

      // Close all in same group
      const group = item.closest('[data-accordion-group]');
      if (group) {
        $$('.accordion-item.active', group).forEach(openItem => {
          if (openItem !== item) {
            openItem.classList.remove('active');
            openItem.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
          }
        });
      }

      item.classList.toggle('active', !isOpen);
      trigger.setAttribute('aria-expanded', String(!isOpen));
    });
  });
})();

/* ─── TABS ─── */
(function initTabs() {
  $$('[data-tab]').forEach(btn => {
    on(btn, 'click', () => {
      const target = btn.dataset.tab;
      const container = btn.closest('[data-tabs-container]') || document;

      $$('[data-tab]', container).forEach(b => b.classList.toggle('active', b === btn));
      $$('[data-tab-panel]', container).forEach(panel => {
        panel.classList.toggle('active', panel.dataset.tabPanel === target);
      });
    });
  });
})();

/* ─── TOAST NOTIFICATION ─── */
function showToast(message, duration = 3500) {
  const existing = $('#toast-notification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toast-notification';
  toast.className = 'toast';
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

window.showToast = showToast;

/* ─── ACTIVE NAV LINK ─── */
(function setActiveNavLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  $$('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === path || href.endsWith(path))) {
      link.classList.add('active');
    }
  });
})();

/* ─── SMOOTH LINK TRANSITIONS ─── */
(function initPageTransitions() {
  $$('a[href]').forEach(link => {
    const href = link.href;
    if (
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('#') ||
      link.target === '_blank' ||
      !href.includes(window.location.host)
    ) return;

    on(link, 'click', (e) => {
      e.preventDefault();
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.3s ease';
      setTimeout(() => window.location = href, 300);
    });
  });

  // Fade in on load
  document.body.style.opacity = '1';
  document.body.style.transition = 'opacity 0.4s ease';
})();

/* ─── CUSTOM CURSOR ─── */
(function initCursor() {
  if (window.matchMedia('(hover: none)').matches) return;

  const dot  = document.createElement('div');
  const ring = document.createElement('div');
  dot.className  = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.append(dot, ring);

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  on(document, 'mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  $$('a, button, .card, .service-card, .blog-card, [role="button"]').forEach(el => {
    on(el, 'mouseenter', () => ring.classList.add('expand'));
    on(el, 'mouseleave', () => ring.classList.remove('expand'));
  });
})();
