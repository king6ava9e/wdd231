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


// adding the members 

  const url = 'scripts/members.json';
  const container = document.getElementById('businesses');
  const gridButton = document.getElementById('grid');
  const listButton = document.getElementById('list');

  async function getMembers() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data);
  }

  function displayMembers(members) {
    container.innerHTML = ''; // Clear before re-rendering
    members.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('member-card');

      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo">
        <h3>${member.name}</h3>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
        <p><strong>Level:</strong> ${getMembershipLevel(member.level)}</p>
        <p>${member.description}</p>
      `;
      container.appendChild(card);
    });
  }

  function getMembershipLevel(level) {
    if (level === 3) return 'Gold Member';
    if (level === 2) return 'Silver Member';
    return 'Member';
  }

  // Toggle Views
  gridButton.addEventListener('click', () => {
    container.classList.add('grid');
    container.classList.remove('list');
  });

  listButton.addEventListener('click', () => {
    container.classList.add('list');
    container.classList.remove('grid');
  });

  getMembers();

