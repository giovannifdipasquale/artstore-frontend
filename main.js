// SELECTORS
const navbar = document.querySelector("nav");
// VARIABLES

// FUNCTIONS

// TRIGGERS
window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    navbar.classList.add("navbar-scroll");
  }
  else {
    navbar.classList.remove("navbar-scroll");
  }
});
window.addEventListener("scroll", () => {
  console.log(window.scrollY);
  
});