// DARK MODE THEME

  const toggleButton = document.getElementById('theme-toggle');
  const body = document.body;

  // Check for saved preference
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    toggleButton.textContent = '🌙';
  }

  toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    toggleButton.textContent = '🌙';
    toggleButton.textContent = isDark ? '🌙' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });


  // Set current year in footer
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Set last modified date in footer
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

// working on the navbar
const navBar = document.getElementById("nav_bar");

// working on the hamburger
const hamburgerButton = document.getElementById("hamburger_button");
hamburgerButton.addEventListener("click", () =>{
    hamburgerButton.classList.toggle("show");
    navBar.classList.toggle("show");
});



async function loadPlaces() {
  try {
    const response = await fetch("scripts/places.json");
    const data = await response.json();

    const container = document.getElementById("places-container");

    data.forEach(place => {
      const card = document.createElement("div");
      card.classList.add("place-card");

      const title = document.createElement("h2");
      title.textContent = place.name;

      const figure = document.createElement("figure");
      const img = document.createElement("img");
      img.src = `images/${place.image}`;
      img.alt = place.name;
      figure.appendChild(img);

      const address = document.createElement("address");
      address.textContent = place.address;

      const description = document.createElement("p");
      description.textContent = place.description;

      const button = document.createElement("button");
      button.textContent = "Learn More";

      // Append all to the card
      card.appendChild(title);
      card.appendChild(figure);
      card.appendChild(address);
      card.appendChild(description);
      card.appendChild(button);

      // Append card to container
      container.appendChild(card);
    });
  } catch (err) {
    console.error("Failed to load places:", err);
  }
}

// Running the function
loadPlaces();

// ===== SIDEBAR VISITOR MESSAGE =====
function displayVisitMessage() {
  const sidebar = document.getElementById('sidebar-message');
  if (!sidebar) return;

  const lastVisit = localStorage.getItem('lastVisit');
  const now = Date.now();

  let message = "";

  if (!lastVisit) {
    message = "Welcome! Let us know if you have any questions.";
  } else {
    const timeDiff = now - parseInt(lastVisit, 10);
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff < 1) {
      message = "Back so soon! Awesome!";
    } else if (daysDiff === 1) {
      message = "You last visited 1 day ago.";
    } else {
      message = `You last visited ${daysDiff} days ago.`;
    }
  }

  // Display the message and store the current time
  sidebar.textContent = message;
  localStorage.setItem('lastVisit', now.toString());
}

// Calling it on page load
window.addEventListener('DOMContentLoaded', displayVisitMessage);
