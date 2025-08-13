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

// reflection.js

// Constants
const STORAGE_KEY = 'soulSyncJournalEntries';
const MAX_INITIAL_ENTRIES = 3;

// DOM Elements
const journalTextarea = document.getElementById('journal-textarea');
const saveButton = document.getElementById('journal-save-button');
const entriesList = document.getElementById('reflection-entries-list');
const toggleViewButton = document.getElementById('toggle-view-button');

let entries = [];
let showingAll = false;

// Load entries from localStorage
function loadEntries() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      entries = JSON.parse(saved);
    } catch {
      entries = [];
    }
  } else {
    entries = [];
  }
}

// Save entries to localStorage
function saveEntries() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

// Clear all entries
function clearAllEntries() {
  if (confirm("Are you sure you want to delete ALL your reflection entries? This cannot be undone.")) {
    entries = [];
    saveEntries();
    renderEntries();
  }
}

// Delete a single entry (by timestamp)
function deleteEntry(timestamp) {
  if (confirm("Delete this entry?")) {
    entries = entries.filter(entry => entry.timestamp !== timestamp);
    saveEntries();
    renderEntries();
  }
}

// Render entries to the list
function renderEntries() {
  entriesList.innerHTML = '';

  // Determine entries to show
  const toShow = showingAll ? entries : entries.slice(-MAX_INITIAL_ENTRIES);

  // Show newest entries first
  toShow.reverse().forEach(entry => {
    const li = document.createElement('li');
    li.className = 'reflection-entry-card';

    const dateEl = document.createElement('div');
    dateEl.className = 'reflection-entry-date';
    dateEl.textContent = new Date(entry.timestamp).toLocaleString();

    const textEl = document.createElement('div');
    textEl.className = 'reflection-entry-text';
    textEl.textContent = entry.text;

     // Add delete button for each entry
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-entry-button';
    deleteBtn.textContent = '❌';
    deleteBtn.addEventListener('click', () => deleteEntry(entry.timestamp));

    li.appendChild(dateEl);
    li.appendChild(textEl);
     li.appendChild(deleteBtn); // Add delete button
    entriesList.appendChild(li);
  });

  // Update button text
  toggleViewButton.textContent = showingAll ? 'View Less' : 'View More';

  // Hide toggle button if entries less or equal to MAX_INITIAL_ENTRIES
  toggleViewButton.style.display = entries.length <= MAX_INITIAL_ENTRIES ? 'none' : 'inline-block';
}

// Handle save button click
function handleSave() {
  const text = journalTextarea.value.trim();
  if (!text) {
    alert('Please write something before saving.');
    return;
  }

  const newEntry = {
    text,
    timestamp: Date.now()
  };

  entries.push(newEntry);
  saveEntries();
  renderEntries();

  // Clear textarea
  journalTextarea.value = '';
}

// Toggle between showing all or few entries
function toggleView() {
  showingAll = !showingAll;
  renderEntries();
}

// Initialize page
function init() {
  loadEntries();
  renderEntries();

  saveButton.addEventListener('click', handleSave);
  toggleViewButton.addEventListener('click', toggleView);
}

// Add clear all button listener (if the button exists)
  const clearAllButton = document.getElementById('clear-all-button');
  if (clearAllButton) {
    clearAllButton.addEventListener('click', clearAllEntries);
  }

// Run initialization
document.addEventListener('DOMContentLoaded', init);

// Export functions to reuse in planner page
export const getJournalEntries = () => {
  return entries;} // Returns the array of journal entries


// delete all
