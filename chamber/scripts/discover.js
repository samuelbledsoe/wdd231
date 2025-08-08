document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery");

  fetch("data/discover.json")
    .then(res => res.json())
    .then(data => {
      data.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("discover-card");

        card.innerHTML = `
          <h2>${item.name}</h2>
          <figure>
            <img src="${item.image}" alt="${item.name}" loading="lazy" width="300" height="200">
          </figure>
          <address>${item.address}</address>
          <p>${item.description}</p>
          <button type="button" aria-label="Learn more about ${item.name}">Learn More</button>
        `;

        gallery.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Failed to fetch gallery data:", err);
      gallery.innerHTML = `<p>Sorry, we couldn't load the gallery items right now.</p>`;
    });

  // Visit tracking
  const visitDisplay = document.getElementById("visitor-message");
  const now = Date.now();
  const lastVisit = localStorage.getItem("lastVisit");

  if (!lastVisit) {
    visitDisplay.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    visitDisplay.textContent =
      days === 0 ? "Back so soon! Awesome!" :
      days === 1 ? "You last visited 1 day ago." :
      `You last visited ${days} days ago.`;
  }

  localStorage.setItem("lastVisit", now);
});
