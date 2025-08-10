// modal.js - accessible modal
let modal, title, img, cal, pro, cost, ingUL, stepsOL, closeBtn;
let lastActive = null; // <-- add this

export function initModal() {
  modal = document.getElementById('modal');
  if (!modal) return;

  title = document.getElementById('modal-title');
  img = document.getElementById('modal-image');
  cal = document.getElementById('m-cal');
  pro = document.getElementById('m-pro');
  cost = document.getElementById('m-cost');
  ingUL = document.getElementById('m-ingredients');
  stepsOL = document.getElementById('m-steps');
  closeBtn = document.getElementById('modal-close');

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
}

export function openModal(meal) {
  if (!modal) initModal();

  title.textContent = meal.name;
  img.src = meal.image;
  img.alt = meal.name;
  cal.textContent = meal.calories;
  pro.textContent = meal.protein_g;
  cost.textContent = meal.cost_usd;

  ingUL.innerHTML = meal.ingredients.map(i => `<li>${i}</li>`).join('');
  stepsOL.innerHTML = meal.steps.map(s => `<li>${s}</li>`).join('');

  lastActive = document.activeElement;                // <-- remember trigger
  modal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';

  // Move focus into the dialog
  const panel = modal.querySelector('.modal-content');
  // If you added tabindex="-1" to .modal-content in your HTML, this will work:
  setTimeout(() => panel && panel.focus(), 0);

  // (Optional) simple focus trap
  const focusables = panel.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  const first = focusables[0] || closeBtn;
  const last = focusables[focusables.length - 1] || closeBtn;
  panel.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }, { once: true });
}

export function closeModal() {
  modal.setAttribute('hidden', '');
  document.body.style.overflow = 'auto';
  if (lastActive && document.contains(lastActive)) lastActive.focus(); // <-- return focus
}
