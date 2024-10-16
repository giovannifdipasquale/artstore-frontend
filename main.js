AOS.init();
// SELECTORS
const navbar = document.querySelector("nav");
const piecesNumber = document.querySelector(".pieces-number");
const costumersNumber = document.querySelector(".costumers-number");
const numbers = document.querySelectorAll(".numbers");
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


// ASYNC FUNCTIONS
// function create interval
function createInterval(element, maxValue, interval) {
  let index = 0;
  let newInterval = setInterval(() => {
    if (index < maxValue) {
      index++;
      element.innerText = index;
    }
    else {
      clearInterval(newInterval);
    }
  }, interval)
}


// set interval pieces

let isIntersected = true;
// intersection observer
let observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && isIntersected == true) {
      // set intervals
      createInterval(costumersNumber, 50, 50);
      createInterval(piecesNumber, 40, 100);
      isIntersected = false;
      let timeout = setTimeout(() => {
        isIntersected = true;
      }, 10000);
    }
  })
})
var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});

observer.observe(costumersNumber);