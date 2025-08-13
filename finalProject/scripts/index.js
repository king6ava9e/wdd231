// Set current year in footer
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Set last modified date in footer
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

// working on the navbar
const navBar = document.getElementById("navigation_bar");

// working on the hamburger
const hamburgerButton = document.getElementById("hamburger_button");
hamburgerButton.addEventListener("click", () =>{
    hamburgerButton.classList.toggle("show");
    navBar.classList.toggle("show");
});

// working on the dark mode
const darkModeButton = document.getElementById("header_icon_button");
const body = document.body;

// 1. Load saved theme when page opens
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    body.classList.add(savedTheme);}


darkModeButton.addEventListener("click",() => {
    body.classList.toggle("dark");

        // 2. Save current theme
    const currentTheme = body.classList.contains("dark") ? "dark" : "";
    localStorage.setItem("theme", currentTheme);

})



/// Main work
// Utility: format date as YYYY-MM-DD
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

// Store keys (per day)
const TODAY = formatDate(new Date());
const MOOD_KEY = 'soulSync_mood_' + TODAY;
const TASKS_KEY = 'soulSync_tasks_' + TODAY;
const PROD_KEY = 'soulSync_prod_' + TODAY;

// Select DOM elements
const moodButtons = document.querySelectorAll('.mood-btn');
const tasksList = document.querySelector('.tasks-list');
const productivitySelect = document.getElementById('productivity-select');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const entriesList = document.getElementById('entries-list');

let quotesData = null;
let journalEntriesData = null;

// ----------- Mood Tracker ------------

// Load saved mood and highlight
function loadMood() {
  const savedMood = localStorage.getItem(MOOD_KEY);
  if (!savedMood) return;

  moodButtons.forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.mood === savedMood);
  });
}

// Save selected mood with timestamp
function saveMood(mood) {
  const timestamp = new Date().toISOString();
  localStorage.setItem(MOOD_KEY, mood);
  localStorage.setItem(MOOD_KEY + '_time', timestamp);
}

// Handle mood click
moodButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const selectedMood = btn.dataset.mood;
    saveMood(selectedMood);

    moodButtons.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  });
});

// ----------- Tasks List ------------

// Load tasks from localStorage and check checkboxes
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem(TASKS_KEY)) || {};
  tasksList.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    const taskName = checkbox.dataset.task;
    checkbox.checked = savedTasks[taskName] || false;
  });
}

// Save current task completion states
function saveTasks() {
  const tasksState = {};
  tasksList.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    tasksState[checkbox.dataset.task] = checkbox.checked;
  });
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasksState));
}

// Handle task checkbox changes
tasksList.addEventListener('change', e => {
  if (e.target && e.target.matches('input[type="checkbox"]')) {
    saveTasks();
  }
});

// ----------- Productivity Score ------------

// Load productivity score from localStorage
function loadProductivity() {
  const savedScore = localStorage.getItem(PROD_KEY);
  if (savedScore) {
    productivitySelect.value = savedScore;
  }
}

// Save productivity score on change
productivitySelect.addEventListener('change', () => {
  const val = productivitySelect.value;
  if (val) {
    localStorage.setItem(PROD_KEY, val);
  } else {
    localStorage.removeItem(PROD_KEY);
  }
});

// ----------- Load Quotes & Journal Entries ------------

// Fetch JSON data from file
async function fetchDashboardData() {
  try {
    const response = await fetch('scripts/project.json');
    const data = await response.json();
    quotesData = data.quotes;
    journalEntriesData = data.journalEntries;
    displayRandomQuote();
    displayJournalEntries();
  } catch (error) {
    console.error('Failed to load dashboard data:', error);
    quoteText.textContent = 'Failed to load quotes.';
  }
}

// Display a random quote
function displayRandomQuote() {
  if (!quotesData || quotesData.length === 0) return;
  const randomIndex = Math.floor(Math.random() * quotesData.length);
  const quote = quotesData[randomIndex];
  quoteText.textContent = `“${quote.text}”`;
  quoteAuthor.textContent = `— ${quote.author}`;
}

// Display last 15 journal entries
function displayJournalEntries() {
  if (!journalEntriesData || journalEntriesData.length === 0) return;

  // Sort descending by date
  const sortedEntries = journalEntriesData
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 15);

  entriesList.innerHTML = '';

  sortedEntries.forEach(entry => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="entry-date">${entry.date}</div>
      <div class="entry-mood">${getMoodEmoji(entry.mood)}</div>
      <div class="entry-reflection">${entry.reflection}</div>
      <div class="entry-tag">${entry.tag}</div>
    `;
    entriesList.appendChild(li);
  });
}

// Helper: map mood string to emoji
function getMoodEmoji(mood) {
  const moodMap = {
    happy: '😊',
    calm: '😌',
    motivated: '💪',
    tired: '😴',
    reflective: '🤔',
    excited: '🤩',
    content: '😌',
    hopeful: '🌟',
    grateful: '🙏'
  };
  return moodMap[mood] || '🙂';
}

// ----------- Initialize ------------

function initDashboard() {
  loadMood();
  loadTasks();
  loadProductivity();
  fetchDashboardData();
}

document.addEventListener('DOMContentLoaded', initDashboard);

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