document.getElementById("subscriptionForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent normal form submit

    const dialog = document.getElementById("successDialog");
    dialog.showModal(); // Show dialog
});

document.getElementById("closeDialog").addEventListener("click", function() {
    const dialog = document.getElementById("successDialog");
    dialog.close(); // Close dialog

    // Get form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const comment = document.getElementById("comment").value;

    // Redirect to thank you page with query parameters
    const url = `thank_you.html?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&comment=${encodeURIComponent(comment)}`;
    window.location.href = url;
});



// Set current year in footer
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Set last modified date in footer
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

// Navbar hamburger toggle
const navBar = document.getElementById("navigation_bar");
const hamburgerButton = document.getElementById("hamburger_button");
hamburgerButton.addEventListener("click", () => {
    hamburgerButton.classList.toggle("show");
    navBar.classList.toggle("show");
});

// Dark mode toggle
const darkModeButton = document.getElementById("header_icon_button");
const body = document.body;
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    body.classList.add(savedTheme);
}
darkModeButton.addEventListener("click", () => {
    body.classList.toggle("dark");
    const currentTheme = body.classList.contains("dark") ? "dark" : "";
    localStorage.setItem("theme", currentTheme);
});