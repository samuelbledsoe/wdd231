// storage.js - localStorage helpers
const KEY = 'bmm-prefs';

export function getPrefs() {
    try {
        return JSON.parse(localStorage.getItem(KEY)) || {};
    } catch {
        return {};
    }
}

export function savePrefs(p) {
    localStorage.setItem(KEY, JSON.stringify(p));
}
