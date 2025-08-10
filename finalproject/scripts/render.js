// render.js - DOM rendering helpers & modal
import { openModal } from './modal.js';

export function buildMealCard(meal) {
    const el = document.createElement('article');
    el.className = 'card';
    el.innerHTML = `
        <img src="${meal.image}" alt="${meal.name}" loading="lazy">
        <div class="p">
            <h3>${meal.name}</h3>
            <p>${meal.calories} kcal • ${meal.protein_g}g protein • $${meal.cost_usd}</p>
            <p>${meal.tags.map(t => `<span>#${t}</span>`).join(' ')}</p>
            <button class="details">Details</button>
        </div>
    `;
    el.querySelector('.details').addEventListener('click', () => openModal(meal));
    return el;
}

export function renderMeals(target, meals, view = 'grid') {
    target.innerHTML = '';
    target.classList.toggle('list', view === 'list');

    const frag = document.createDocumentFragment();
    meals.forEach(m => frag.appendChild(buildMealCard(m)));
    target.appendChild(frag);
}
