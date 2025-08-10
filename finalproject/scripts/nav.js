// nav.js - responsive nav and wayfinding

export function initNav() {
    const btn = document.getElementById('nav-toggle');
    const nav = document.getElementById('site-nav');
    if (!btn || !nav) return;

    btn.addEventListener('click', () => {
        const open = nav.hasAttribute('hidden');
        if (open) {
            nav.removeAttribute('hidden');
        } else {
            nav.setAttribute('hidden', '');
        }
        btn.setAttribute('aria-expanded', String(open));
    });
}

export function markCurrent() {
  const links = document.querySelectorAll('#site-nav a');
  // Normalize current path so "/" and "/index.html" both match "index.html"
  let current = location.pathname;
  if (current.endsWith('/')) current += 'index.html';

  links.forEach(a => {
    const linkPath = new URL(a.href, location.href).pathname;
    const normalizedLink =
      linkPath.endsWith('/') ? linkPath + 'index.html' : linkPath;

    if (current === normalizedLink) {
      a.setAttribute('aria-current', 'page'); // CSS will style this
    } else {
      a.removeAttribute('aria-current');
    }
  });
}

