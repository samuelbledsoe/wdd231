// data.js - fetch data with robust error handling

export async function fetchMeals() {
    try {
        const res = await fetch('data/meals.json');
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        return data;
    } catch (err) {
        console.error('Failed to fetch meals:', err);
        return [];
    }
}
