/* ============================================================
   RONY GHOSH — PORTFOLIO JAVASCRIPT
   script.js
   ============================================================ */

/* ── CUSTOM CURSOR ─────────────────────────────────────────── */
const cur  = document.getElementById('cur');
const curR = document.getElementById('cur-r');
let rx = 0, ry = 0, mx = 0, my = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
});

(function animateRing() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  curR.style.left = rx + 'px';
  curR.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
})();

/* ── SCROLL PROGRESS BAR ───────────────────────────────────── */
window.addEventListener('scroll', () => {
  const prog = document.getElementById('progress');
  const pct  = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  prog.style.width = pct + '%';

  // Nav shadow on scroll
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── MOBILE MENU ───────────────────────────────────────────── */
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobMenu').classList.add('open');
});
document.getElementById('mobClose').addEventListener('click', () => {
  document.getElementById('mobMenu').classList.remove('open');
});
function closeMob() {
  document.getElementById('mobMenu').classList.remove('open');
}

/* ── SCROLL REVEAL ─────────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    entry.target.classList.add('visible');

    // Animate skill bars when their parent card becomes visible
    entry.target.querySelectorAll('.sk-bar').forEach(bar => {
      setTimeout(() => {
        bar.style.width = bar.dataset.width + '%';
      }, 150);
    });
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

/* ── ACTIVE NAV LINK ON SCROLL ─────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 140) {
      current = section.id;
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}, { passive: true });

/* ── BACK TO TOP ───────────────────────────────────────────── */
document.querySelector('footer a').addEventListener('click', e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});