AOS.init();

// SELECTORS
const navbar = document.querySelector("nav");
const piecesNumber = document.querySelector(".pieces-number");
const costumersNumber = document.querySelector(".costumers-number");
const numbers = document.querySelectorAll(".numbers");
const swiperWrapper = document.querySelector(".swiper-wrapper");
if (swiperWrapper) {
  console.log('Swiper wrapper exists');
  console.log(swiperWrapper);
}
// VARIABLES

fetch('./reviews.json')
  .then(response => response.json()) // Parses JSON string into a JavaScript object/array
  .then(reviews => reviews.forEach((review) => {
    let i = 0;
    let div = document.createElement("div");
    div.classList.add("swiper-slide", "d-flex", "justify-content-center", "align-items-center");
    div.innerHTML = `
    
      <div class="box-reviews d-flex flex-column justify-content-start align-items-center p-5 h-100">
            <div class="user-div d-flex flex-column  align-items-center p-3">
              <h3> ${review['user']} </h3>
              <img src="${review['image']}" alt="" class="img-slide my-2">
            </div>
            <div class="star-div fs-5 w-100 text-center">
            ${printStars(review['stars'])}
            </div >
    <p>${review['description']}</p>
          </div >

    `;
    swiperWrapper.appendChild(div);
  }));


// FUNCTIONS
function printStars(stars) {
  let i = 0;
  let starsDiv = "";
  while (i < 5) {
    if (i < stars) {
      starsDiv += '<i class="bi bi-star-fill text-warning" ></i >';
    }
    else {
      starsDiv += '<i class="bi bi-star-fill" ></i >';
    }
    i++;
  }
  return starsDiv;
}

// TRIGGERS
window.onload = () => {

}
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