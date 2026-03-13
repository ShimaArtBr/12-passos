// nav.js — BAZILAR Didático
// Injeta a nav com indicador de nível e toggle de tema

export function initNav({ current = 0, total = 12 } = {}) {
  // ── Toggle de tema ──────────────────────────────────
  const saved = localStorage.getItem('bz-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);

  window.toggleTheme = () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('bz-theme', next);
    const icon = document.getElementById('theme-icon');
    if (icon) icon.textContent = next === 'dark' ? '☀️' : '🌙';
  };

  // ── Progress bar de scroll ──────────────────────────
  const fill = document.querySelector('.scroll-bar-fill');
  if (fill) {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
      fill.style.width = pct + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ── Indicador de nível (injetado via data-attr na nav) ──
  const badge = document.querySelector('.nav-progress');
  if (badge && current > 0) {
    badge.innerHTML = `Nível <span>${current}</span> / ${total}`;
  }

  // ── Atualiza ícone do toggle conforme tema salvo ────
  const icon = document.getElementById('theme-icon');
  if (icon) icon.textContent = saved === 'dark' ? '☀️' : '🌙';

  // ── Animação de entrada dos glifos (::before dos cards) ──
  const glyphTargets = document.querySelectorAll('[data-glyph]');
  if (glyphTargets.length && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('glyph-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    glyphTargets.forEach(el => obs.observe(el));
  }
}
