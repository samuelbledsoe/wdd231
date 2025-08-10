// meals.js
import { initNav, markCurrent } from './nav.js';
import { fetchMeals } from './data.js';
import { renderMeals } from './render.js';
import { initModal } from './modal.js';
import { getPrefs, savePrefs } from './storage.js';

initNav();
markCurrent();
initModal();

const grid = document.getElementById('meal-grid');
const filter = document.getElementById('calorie-filter');
const viewSel = document.getElementById('view-select');
const search = document.getElementById('search');

const prefs = getPrefs();
if (prefs.view) viewSel.value = prefs.view;
if (prefs.cal) filter.value = prefs.cal;

let allMeals = [];
let shown = [];

function applyFilters() {
    const term = search.value.trim().toLowerCase();
    const cal = filter.value;

    shown = allMeals
        .filter(m => term ? (m.name.toLowerCase().includes(term) || m.tags.join(' ').includes(term)) : true)
        .filter(m => {
            if (cal === '1800') return m.calories <= 500;
            if (cal === '2200') return m.calories <= 650;
            if (cal === '2500') return m.calories <= 800;
            return true;
        });

    renderMeals(grid, shown, viewSel.value);

    // Example array method (reduce) to compute average cost
    const avg = (shown.reduce((sum, m) => sum + m.cost_usd, 0) / Math.max(1, shown.length)).toFixed(2);
    console.log(`Average cost of shown meals: $${avg}`);
}

filter.addEventListener('change', () => {
    savePrefs({ ...getPrefs(), cal: filter.value });
    applyFilters();
});

viewSel.addEventListener('change', () => {
    savePrefs({ ...getPrefs(), view: viewSel.value });
    applyFilters();
});

search.addEventListener('input', applyFilters);

fetchMeals().then(data => {
    allMeals = data;
    applyFilters(); // initial render
});
