async function fetchData() {
  try {
    const response = await fetch("./data.json");
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récuperation des données", error);
  }
}

// fonction pour générer les cartes
function generateCards(data, timeframe) {
  const cardsContainer = document.querySelector(".cards");
  cardsContainer.innerHTML = "";

  data.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card", item.title.toLowerCase().replace(" ", "-"));

    card.innerHTML = `
      <div class="card-header">
      <img src="./images/icon-${item.title.toLowerCase()}.svg" alt="${
      item.title
    }" class="card-icon">
      </div>
      <div class="card-body">
      <div class="card-header-info">
      <h3>${item.title}</h3>
      <img src="./images/icon-ellipsis.svg" alt="Option" class="options-icon">
      </div>
      <p class="current-time">${item.timeframes[timeframe].current}hrs</p>
      <small class="previous-time">Last ${
        timeframe === "daily"
          ? "Yesterday"
          : timeframe === "weekly"
          ? " Week"
          : " Month"
      } - ${item.timeframes[timeframe].previous}hrs</small>
      </div>
    `;
    cardsContainer.appendChild(card);
  });
}

function setupEventListeners(data) {
  document.querySelectorAll(".time-options button").forEach((button) => {
    button.addEventListener("click", (e) => {
      // Supprime la classe "active" des autres boutons
      document
        .querySelectorAll(".time-options button")
        .forEach((btn) => btn.classList.remove("active"));
      e.target.classList.add("active");

      // Génère les cartes pour la période choisie
      const timeframe = e.target.id; // daily, weekly, monthly
      generateCards(data, timeframe);
    });
  });
}

async function init() {
  const data = await fetchData(); // Récupère les données
  if (data) {
    generateCards(data, "weekly"); // Affiche les données "weekly" par défaut
    setupEventListeners(data); // Configure les événements
  }
}

init(); // Lance le script
