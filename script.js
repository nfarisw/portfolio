// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// Theme toggle with persisted preference
const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');

function getStoredTheme() {
  try { return localStorage.getItem('portfolio-theme'); } catch (e) { return null; }
}
function storeTheme(value) {
  try { localStorage.setItem('portfolio-theme', value); } catch (e) {}
}

const stored = getStoredTheme();
if (stored === 'dark' || stored === 'light') {
  root.setAttribute('data-theme', stored);
}

themeToggle.addEventListener('click', () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const current = root.getAttribute('data-theme') || (prefersDark ? 'dark' : 'light');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  storeTheme(next);
});

// Scroll reveal animation
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));
