// selecting the hamburger button
const hamburgerButton = document.getElementById("hamburger_button")
// constant for nav links
const navLinks = document.getElementById("nav-bar")


//toggling the show class on and off
hamburgerButton.addEventListener("click", () => {
    hamburgerButton.classList.toggle("show");
    navLinks.classList.toggle("show");
});

