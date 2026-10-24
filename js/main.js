/**
 * PRISHA MALIK — UX Portfolio
 * Core interactive engine: Custom Cursor, Smooth Navigation, Scroll Reveals, Copy Actions
 */

document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initNavigation();
  initScrollObserver();
  initCopyEmail();
  initContactForm();
  highlightActiveNav();
});

/* -------------------------------------------------------------------------- */
/* 1. CUSTOM CURSOR WITH FLUID LERP & HOVER STATES                            */
/* -------------------------------------------------------------------------- */
function initCursor() {
  const cursor = document.querySelector('.custom-cursor');
  if (!cursor) return;

  const circle = cursor.querySelector('.cursor-circle');
  const dot = cursor.querySelector('.cursor-dot');
  const text = cursor.querySelector('.cursor-text');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let circleX = mouseX;
  let circleY = mouseY;
  let isHovering = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (dot) {
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }
  }, { passive: true });

  function render() {
    // Smooth lerp without CSS transition fighting
    circleX += (mouseX - circleX) * 0.18;
    circleY += (mouseY - circleY) * 0.18;

    if (circle) {
      circle.style.transform = `translate3d(${circleX}px, ${circleY}px, 0)`;
    }
    if (text && text.textContent) {
      text.style.transform = `translate3d(${circleX}px, ${circleY}px, 0)`;
    }

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  // Link & Button Hover
  const interactiveElements = document.querySelectorAll('a, button, .chip-tag, input, textarea');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hovering-link');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovering-link');
    });
  });

  // Project Card Hover (OPEN text)
  const projectCards = document.querySelectorAll('.project-visual-side, .project-feature-card, .related-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      cursor.classList.remove('hovering-link');
      cursor.classList.add('hovering-project');
      if (text) text.textContent = 'OPEN';
    });
    card.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovering-project');
      if (text) text.textContent = '';
    });
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });
}

/* -------------------------------------------------------------------------- */
/* 2. NAVIGATION & MOBILE DRAWER                                              */
/* -------------------------------------------------------------------------- */
function initNavigation() {
  const navOuter = document.querySelector('.site-nav-outer');
  const toggleBtn = document.querySelector('.nav-toggle-btn');
  const mobileMenu = document.querySelector('.mobile-nav-overlay');

  if (navOuter) {
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 40) {
        navOuter.classList.add('scrolled');
      } else {
        navOuter.classList.remove('scrolled');
      }
      lastScrollY = currentScrollY;
    }, { passive: true });
  }

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      toggleBtn.classList.toggle('open');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        toggleBtn.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Smooth in-page anchor scrolling with offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

function highlightActiveNav() {
  const path = window.location.pathname.toLowerCase();
  const navLinks = document.querySelectorAll('.nav-roll-link, .mobile-nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href').toLowerCase();
    if (
      (path.endsWith('/') || path.endsWith('index.html') || path === '') &&
      (href === './' || href === 'index.html' || href === '/')
    ) {
      link.classList.add('active');
    } else if (href.includes('projects-2') || href.includes('work')) {
      if (path.includes('projects') || path.includes('work')) {
        link.classList.add('active');
      }
    } else if (href.includes('contact') && path.includes('contact')) {
      link.classList.add('active');
    }
  });
}

/* -------------------------------------------------------------------------- */
/* 3. SCROLL REVEAL OBSERVER                                                 */
/* -------------------------------------------------------------------------- */
function initScrollObserver() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -6% 0px',
    threshold: 0.08
  });

  elements.forEach(el => observer.observe(el));
}

/* -------------------------------------------------------------------------- */
/* 4. EMAIL COPY BUTTON                                                       */
/* -------------------------------------------------------------------------- */
function initCopyEmail() {
  const copyButtons = document.querySelectorAll('[data-copy-email]');
  const toasts = document.querySelectorAll('.copy-toast');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const email = btn.getAttribute('data-copy-email') || 'prishamalik06@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        toasts.forEach(t => {
          t.classList.add('show');
          setTimeout(() => t.classList.remove('show'), 2200);
        });
      }).catch(() => {
        window.location.href = `mailto:${email}`;
      });
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 5. CONTACT FORM INTERACTION                                                */
/* -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit-btn');
    const originalText = btn.textContent;
    btn.textContent = 'Message Sent! Thank You ✦';
    btn.style.backgroundColor = 'var(--accent-olive)';
    form.reset();
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.backgroundColor = '';
    }, 3500);
  });
}
