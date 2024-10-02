/* CARD EXAMPLE :
  <div class="col-12 col-sm-4 card">
    <img src="./media/robert_colescott.png" class="card-img-top" alt="Robert Colescott Image">
      <div class="card-body">
        <h5 class="card-title">Robert Colescott</h5>
        <p class="card-text">Work on Paper</p>
        <p class="card-text"><strong>$5,500 (2 bids)</strong></p>
        <p class="card-text">Register by Sep 27</p>
      </div>
  </div>
*/

// SELECTORS
const navbar = document.querySelector("nav");
const numbers = document.querySelectorAll(".numbers");
const cardsWrapper = document.querySelector(".cardsWrapper");
const radiowrapper = document.querySelector("#radiowrapper");
// VARIABLES

// FUNCTIONS 
// f creates card 
function createCards(array) {
  // classes for the cards: col-12 col-sm-6 card
  array.forEach(element => {
    let div = document.createElement("div");
    div.classList.add("col-12", "col-sm-6", "card");
    div.innerHTML = `
      <img src="${element.img}">
      <div class="card-body">
        <h5 class="card-title">${element.name}</h5>
        <p class="card-text"><strong>$ ${element.price}</strong></p>
        <p class="card-text"> ${element.date} </p>
      </div>`;
    cardsWrapper.appendChild(div);
  });
}

// f that creates radio buttons 
function createBtns(array) {
  let uniqueCategories = [];
  array.forEach((product) => {
    if (!uniqueCategories.includes(product.category)) {
      uniqueCategories.push(product.category);
    }
  })
  console.log(uniqueCategories);
  // Attaching unique categories as radio buttons
  uniqueCategories.forEach(category => {
    let div = document.createElement("div");
    div.classList.add("form-check");
    div.innerHTML = `
    <div class="form-check">
      <input class="form-check-input" type="radio" name="flexRadioDefault" id="${category}" checked>
      <label class="form-check-label" for="${category}">
        ${category}
      </label>
    </div>
      `;
    radiowrapper.appendChild(div);
  });
}




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

// FETCH 
fetch("./products.json").then((result) => result.json()).then((data) => {
  createCards(data);
  createBtns(data);
  // creating array of unique categories 
  // (Painting, Sculpture, Music, Book)

}) 