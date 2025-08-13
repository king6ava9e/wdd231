
// // Set current year in footer
// document.getElementById("currentyear").textContent = new Date().getFullYear();

// // Set last modified date in footer
// document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

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

// working with the url
const info = window.location.search;
console.log(info)

const userData = new URLSearchParams(info);
console.log(userData);
console.log(userData.get("email"));
console.log(userData.get("name"));
console.log(userData.get("comment"))

const thankYou = document.getElementById("thankyouMessage");
thankYou.innerHTML = `
<p> Name: ${userData.get("name")}</p>
<p> email: ${userData.get("email")}</p>
<p> Comment: ${userData.get("comment")}</p>

`
thankYou.classList.add("thankyou_class");
