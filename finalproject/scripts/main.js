// main.js - shared behaviors for all pages
import { initNav, markCurrent } from './nav.js';

initNav();
markCurrent();

const videoLink = document.getElementById('video-link');
if (videoLink) {
    videoLink.href = 'https://www.youtube.com/watch?v=Oyy6BmG9-LU';
}
