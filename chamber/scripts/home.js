const weatherAPIKey = '2571416b4fbbf676b586c89f332f7478';
const city = 'Worden';
const stateCode = 'IL';
const countryCode = 'US';
const units = 'imperial';

async function getWeather() {
  const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${stateCode},${countryCode}&units=${units}&appid=${weatherAPIKey}`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${stateCode},${countryCode}&units=${units}&appid=${weatherAPIKey}`;

  try {
    const current = await fetch(currentWeatherURL).then(res => res.json());
    const forecast = await fetch(forecastURL).then(res => res.json());

    document.getElementById("weather-current").innerHTML = `
      <p>🌡️ ${current.main.temp.toFixed(0)}°F – ${current.weather[0].description}</p>
    `;

    const dailyForecasts = forecast.list
      .filter(item => item.dt_txt.includes("12:00:00"))
      .slice(0, 3);

    document.getElementById("weather-forecast").innerHTML = dailyForecasts.map(day => {
      const date = new Date(day.dt_txt);
      return `<div><strong>${date.toLocaleDateString('en-US', { weekday: 'short' })}:</strong> ${day.main.temp.toFixed(0)}°F</div>`;
    }).join('');
  } catch (error) {
    console.error("Weather fetch error:", error);
    document.getElementById("weather-current").textContent = "Weather unavailable.";
    document.getElementById("weather-forecast").textContent = "";
  }
}

function getMembershipLevel(num) {
  switch (num) {
    case 1: return 'Bronze';
    case 2: return 'Silver';
    case 3: return 'Gold';
    default: return 'Unknown';
  }
}

async function loadSpotlights() {
  try {
    const res = await fetch('data/members.json');
    const data = await res.json();
    const spotlightContainer = document.getElementById('spotlight-cards');

    const filtered = data.members.filter(m => m.membership === 2 || m.membership === 3);
    const selected = filtered.sort(() => 0.5 - Math.random()).slice(0, 3);

    selected.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('spotlight');

      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo">
        <h3>${member.name}</h3>
        <p>${member.phone}</p>
        <p>${member.address}</p>
        <a href="${member.website}" target="_blank">${member.website}</a>
        <p><strong>${getMembershipLevel(member.membership)} Member</strong></p>
      `;

      spotlightContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Spotlight fetch error:", error);
    document.getElementById('spotlight-cards').textContent = "Unable to load business spotlights.";
  }
}

getWeather();
loadSpotlights();

document.getElementById("menuBtn").addEventListener("click", function () {
  document.getElementById("navMenu").classList.toggle("open");
});

