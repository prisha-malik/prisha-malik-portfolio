/**
 * PRISHA MALIK — UX Portfolio
 * Indian × Organic Storytelling Engine:
 * - Hero organic sketch particle canvas
 * - Fig Tree scroll growth & interactive figs with handwritten notes
 * - Personal motifs micro-interactions & cursor tooltip bindings
 * - Sketchbook path drawing on scroll
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroCanvas();
  initFigTreeExperience();
  initChildhoodDraw();
  initMotifHoverTips();
});

/* -------------------------------------------------------------------------- */
/* 1. HERO ORGANIC WARM PARTICLES & SKETCH MARKS                              */
/* -------------------------------------------------------------------------- */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = canvas.parentElement.offsetWidth);
  let height = (canvas.height = canvas.parentElement.offsetHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  });

  const marks = [];
  const count = 26;
  // Indian summer organic palette: Coffee Bean, Canyon Clay, Aged Ochre, Vintage Blush
  const colors = [
    'rgba(84, 63, 46, ',   // Coffee bean
    'rgba(170, 108, 88, ', // Canyon clay
    'rgba(154, 125, 70, ', // Aged ochre
    'rgba(207, 149, 131, ' // Vintage blush
  ];

  for (let i = 0; i < count; i++) {
    marks.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      len: 25 + Math.random() * 65,
      angle: Math.random() * Math.PI * 2,
      curve: (Math.random() - 0.5) * 0.7,
      alpha: 0.12 + Math.random() * 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      isLeaf: Math.random() > 0.65
    });
  }

  let mouseX = width / 2;
  let mouseY = height / 2;
  let targetX = mouseX;
  let targetY = mouseY;

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    targetX = e.clientX - rect.left;
    targetY = e.clientY - rect.top;
  });

  function draw() {
    ctx.clearRect(0, 0, width, height);
    mouseX += (targetX - mouseX) * 0.05;
    mouseY += (targetY - mouseY) * 0.05;

    marks.forEach(m => {
      m.x += m.vx;
      m.y += m.vy;

      if (m.x < -80) m.x = width + 80;
      if (m.x > width + 80) m.x = -80;
      if (m.y < -80) m.y = height + 80;
      if (m.y > height + 80) m.y = -80;

      // Pointer repulsion
      const dx = m.x - mouseX;
      const dy = m.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 160) {
        const force = (160 - dist) / 160;
        m.x += (dx / dist) * force * 1.6;
        m.y += (dy / dist) * force * 1.6;
      }

      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = `${m.color}${m.alpha})`;
      ctx.lineWidth = 1.2;
      ctx.lineCap = 'round';

      const x2 = m.x + Math.cos(m.angle) * m.len;
      const y2 = m.y + Math.sin(m.angle) * m.len;
      const cpx = (m.x + x2) / 2 + Math.sin(m.angle) * 16 * m.curve;
      const cpy = (m.y + y2) / 2 - Math.cos(m.angle) * 16 * m.curve;

      ctx.moveTo(m.x, m.y);
      ctx.quadraticCurveTo(cpx, cpy, x2, y2);
      ctx.stroke();

      if (m.isLeaf) {
        // Tiny botanical bud or dot
        ctx.beginPath();
        ctx.fillStyle = `${m.color}${m.alpha * 1.4})`;
        ctx.arc(x2, y2, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    });

    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}

/* -------------------------------------------------------------------------- */
/* 2. THE FIG TREE THEORY & INTERACTIVE FIGS                                  */
/* -------------------------------------------------------------------------- */
function initFigTreeExperience() {
  const treeSection = document.querySelector('.chapter-fig-tree');
  const treeStage = document.querySelector('.fig-tree-stage');
  const tooltipCard = document.querySelector('.fig-tooltip-card');
  const tooltipName = document.querySelector('.fig-tooltip-name');
  const tooltipNote = document.querySelector('.fig-tooltip-note');
  const figs = document.querySelectorAll('.fig-node');

  if (!treeSection || !treeStage) return;

  // Scroll observer triggers tree growth
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        treeStage.classList.add('tree-grown');
      }
    });
  }, { threshold: 0.2 });

  observer.observe(treeSection);

  // Fig notes database
  const figData = {
    'drawing': { title: 'DRAWING', note: '"where it started."' },
    'science': { title: 'SCIENCE', note: '"the questions."' },
    'technology': { title: 'TECHNOLOGY', note: '"the curiosity."' },
    'ux': { title: 'UX', note: '"where everything met."' },
    'beach': { title: 'THE BEACH', note: '"where I remember to stop designing."' },
    'diet-coke': { title: 'DIET COKE', note: '"not everything needs a serious explanation."' },
    'systems': { title: 'SYSTEMS', note: '"how the invisible pieces connect."' },
    'people': { title: 'PEOPLE', note: '"the real reason for all of this."' },
    'healthcare': { title: 'HEALTHCARE', note: '"when clarity is lifesaving."' },
    'accessibility': { title: 'ACCESSIBILITY', note: '"radical grace in every interaction."' },
    'curiosity': { title: 'CURIOSITY', note: '"the engine that never turns off."' }
  };

  figs.forEach(fig => {
    const key = fig.getAttribute('data-fig');
    
    fig.addEventListener('mouseenter', () => {
      fig.classList.add('bouncing');
      setTimeout(() => fig.classList.remove('bouncing'), 800);

      if (figData[key] && tooltipCard) {
        tooltipName.textContent = figData[key].title;
        tooltipNote.textContent = figData[key].note;
        tooltipCard.classList.add('active');
      }
    });

    fig.addEventListener('mouseleave', () => {
      if (tooltipCard) {
        tooltipCard.classList.remove('active');
      }
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 3. CHILDHOOD SKETCHBOOK DRAWING PATHS                                     */
/* -------------------------------------------------------------------------- */
function initChildhoodDraw() {
  const paths = document.querySelectorAll('.sketch-path');
  const section = document.querySelector('.chapter-girl-drew');
  if (!paths.length || !section) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        paths.forEach((p, idx) => {
          setTimeout(() => p.classList.add('drawn'), idx * 240);
        });
      }
    });
  }, { threshold: 0.25 });

  observer.observe(section);
}

/* -------------------------------------------------------------------------- */
/* 4. PERSONAL MOTIFS CURSOR TOOLTIP BINDINGS                                */
/* -------------------------------------------------------------------------- */
function initMotifHoverTips() {
  const cursor = document.querySelector('.custom-cursor');
  const cursorText = cursor ? cursor.querySelector('.cursor-text') : null;
  const motifCards = document.querySelectorAll('[data-motif-tip]');

  if (!cursor || !cursorText) return;

  motifCards.forEach(card => {
    const tip = card.getAttribute('data-motif-tip');

    card.addEventListener('mouseenter', () => {
      cursorText.textContent = tip;
      cursor.classList.add('has-motif-tip');
    });

    card.addEventListener('mouseleave', () => {
      cursorText.textContent = '';
      cursor.classList.remove('has-motif-tip');
    });
  });
}
