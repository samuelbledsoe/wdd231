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
    links.forEach(a => {
        if (a.getAttribute('href') && location.pathname.endsWith(a.getAttribute('href'))) {
            a.setAttribute('aria-current', 'page');
            a.classList.add('current');
        }
    });
}
