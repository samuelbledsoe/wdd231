// hacks.js
import { initNav, markCurrent } from './nav.js';
import { getPrefs, savePrefs } from './storage.js';

initNav();
markCurrent();

const form = document.getElementById('calc-form');
const out = document.getElementById('calc-result');

// Restore last used values
const prefs = getPrefs();
if (prefs.calc) {
    document.getElementById('meals-per-day').value = prefs.calc.meals || 3;
    document.getElementById('cost-per-meal').value = prefs.calc.cost || 2.75;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const meals = Number(document.getElementById('meals-per-day').value);
    const cost = Number(document.getElementById('cost-per-meal').value);
    const weekly = (meals * cost * 7).toFixed(2);
    out.textContent = `Estimated weekly food cost: $${weekly}`;
    savePrefs({ ...getPrefs(), calc: { meals, cost } });
});
