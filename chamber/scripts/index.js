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

// working on the chamber member spotlight
async function loadSpotlights() {
  // Fetch the JSON data
  const response = await fetch('scripts/members.json');
  const members = await response.json();

  // Filter for Gold (3) or Silver (2) members
  const spotlightMembers = members.filter(m => m.level === 2 || m.level === 3);

  // Shuffle the array
  spotlightMembers.sort(() => Math.random() - 0.5);

  // Pick 2 or 3 members randomly
  const count = Math.floor(Math.random() * 2) + 2; // 2 or 3
  const selected = spotlightMembers.slice(0, count);

  // Get the spotlights section
  const spotlightsSection = document.getElementById('Spotlights');
  spotlightsSection.innerHTML = ""; // Clear previous

  // Create and append spotlight cards
  selected.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('spotlight-card');

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" class="spotlight-logo">
      <h3 class="spotlight-name">${member.name}</h3>
      <p class="spotlight-level">${member.level === 3 ? 'Gold' : 'Silver'} Member</p>
      <p class="spotlight-phone"><strong>Phone:</strong> ${member.phone}</p>
      <p class="spotlight-address"><strong>Address:</strong> ${member.address}</p>
      <p class="spotlight-website"><strong>Website:</strong> ${member.website ? `<a href="${member.website}" target="_blank">${member.website}</a>` : 'N/A'}</p>
    `;
    spotlightsSection.appendChild(card);
  });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', loadSpotlights);

// WEATHER SECTION
// Grabing the ids
const hometown = document.getElementById("town");
const graphic = document.getElementById("graphic");
const description = document.getElementById("description");
const temperature = document.getElementById("temperature");

// create required info for the url
const myKey = "df2fd27f9683c0ca0f4d576d4872b2fb";
const myLatitude = "6.6674";
const myLongitude = "-1.6188";

// constructing a full path using template literals
const myURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLatitude}&lon=${myLongitude}&appid=${myKey}&units=metric`;
// Trying to grab weather date
async function apiFetch() {
  try {
    const response = await fetch(myURL);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // testing only
       displayResults(data); // uncomment when ready
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}

// displaying the json data to the web'
function displayResults(data){
    console.log("hello!");
    hometown.innerHTML= data.city.name;
    description.innerHTML=data.list[0].weather[0].description;
    temperature.innerHTML= `${data.list[0].main.temp}&deg;C`;
  iconsrc =`https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
  graphic.setAttribute("src",iconsrc);
  graphic.setAttribute("alt", data.list[0].weather[0].description);

    displayThreeDayForecast(data);
}


const main = document.getElementById("main");
 main.classList.add("weather-widget");

document.getElementById("town").classList.add("town-title");
document.getElementById("graphic").classList.add("weather-icon");
document.getElementById("temperature").classList.add("temperature");
document.getElementById("description").classList.add("description");


// function displayThreeDayForecast(data) {
//   const forecastContainer = document.getElementById("forecast");
//   forecastContainer.innerHTML = "<h3>3-Day Forecast</h3>";

//   // Get today's date
//   const today = new Date().getDate();
//   let daysFound = 0;
//   let lastDay = null;

//   // Loop through the forecast list
//   for (let i = 0; i < data.list.length && daysFound < 3; i++) {
//     const item = data.list[i];
//     const date = new Date(item.dt_txt);
//     const day = date.getDate();

//     // Only pick one forecast per new day (skip today)
//     if (day !== today && day !== lastDay) {
//       forecastContainer.innerHTML += `
//         <div class="forecast-day">
//           <strong>${date.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</strong>: 
//           ${item.main.temp}&deg;C
//         </div>
//       `;
//       lastDay = day;
//       daysFound++;
//     }
//   }
// }
function displayThreeDayForecast(data) {
  const forecastContainer = document.getElementById("forecast");
  forecastContainer.innerHTML = ""; // Clear previous

  const today = new Date().getDate();
  let daysFound = 0;
  let lastDay = null;

  for (let i = 0; i < data.list.length && daysFound < 3; i++) {
    const item = data.list[i];
    const date = new Date(item.dt_txt);
    const day = date.getDate();

    if (day !== today && day !== lastDay) {
      forecastContainer.innerHTML += `
        <div class="forecast-day">
          <strong>${date.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</strong>: 
          ${item.main.temp}&deg;C
        </div>
      `;
      lastDay = day;
      daysFound++;
    }
  }
}




apiFetch();