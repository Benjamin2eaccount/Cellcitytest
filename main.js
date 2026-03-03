(() => {
  // Mobile nav
  const navToggle = document.getElementById('navToggle');
  const header    = document.querySelector('.site-header');
  const nav       = header ? header.querySelector('.nav') : null;

  if (navToggle && nav) {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target)) nav.classList.remove('open');
    });
  }

  // Year
  document.querySelectorAll('.js-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // Active nav link
  (() => {
    let file = (location.pathname.split('/').pop() || '').toLowerCase();
    if (!file || file === '/') file = 'index.html';
    document.querySelectorAll('.nav-link').forEach(a => {
      const href = (a.getAttribute('href') || '').toLowerCase();
      a.classList.toggle('active', href === file);
    });
  })();

  // Contact form
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type=submit]');
      btn.textContent = 'Verstuurd ✓';
      btn.disabled = true;
      setTimeout(() => { btn.textContent = 'Versturen'; btn.disabled = false; form.reset(); }, 3000);
    });
  }
})();
