// index.js - homepage behavior
import './main.js';
import { fetchMeals } from './data.js';
import { buildMealCard } from './render.js';

const target = document.getElementById('featured-grid');
if (target) {
    fetchMeals().then(data => {
        const featured = data.slice(0, 3);
        const frag = document.createDocumentFragment();
        featured.forEach(m => frag.appendChild(buildMealCard(m)));
        target.appendChild(frag);
    });
}
