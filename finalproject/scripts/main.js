// main.js - shared behaviors for all pages
import { initNav, markCurrent } from './nav.js';

initNav();
markCurrent();

const videoLink = document.getElementById('video-link');
if (videoLink) {
    // Replace this link with your actual public video URL before submission
    videoLink.href = 'https://example.com/your-demo-video';
}
