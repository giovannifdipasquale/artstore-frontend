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
// navbar
const navbar = document.querySelector("nav");
// cards section
const cardsWrapper = document.querySelector(".cardsWrapper");
// buttons section
const radiowrapper = document.querySelector("#radiowrapper");

// FUNCTIONS 
// f creates / filters cards
function createCards(array, category) {
  // empty cards wrapper
  cardsWrapper.innerHTML = '';
  if (category == "All") {
    array.forEach(element => {
      let div = document.createElement("div");
      div.classList.add("col-12", "col-sm-6", "card");
      div.innerHTML = `
          <img src="${element.img}">
          <div class="card-body">
            <h5 class="card-title">${element.name}</h5>
            <p class="card-text"><strong>$ ${element.price}</strong></p>
            <p class="card-text category"><strong>${element.category}</strong></p>
            <p class="card-text"> ${element.date} </p>
          </div>`;
      cardsWrapper.appendChild(div);
    });
  }
  else {
    array.forEach(element => {
      if (element.category == category) {

        let div = document.createElement("div");
        div.classList.add("col-12", "col-sm-6", "card");
        div.innerHTML = `
            <img src="${element.img}">
            <div class="card-body">
              <h5 class="card-title">${element.name}</h5>
              <p class="card-text"><strong>$ ${element.price}</strong></p>
              <p class="card-text category"><strong>${element.category}</strong></p>
              <p class="card-text"> ${element.date} </p>
            </div>`;
        cardsWrapper.appendChild(div);
      }
    });
  }
}


// f that creates radio buttons 
function createBtns(array) {
  let uniqueCategories = [];
  array.forEach((product) => {
    if (!uniqueCategories.includes(product.category)) {
      uniqueCategories.push(product.category);
    }
  });

  console.log(uniqueCategories);
  // Attaching unique categories as radio buttons
  uniqueCategories.forEach(category => {
    let div = document.createElement("div");
    div.classList.add("form-check");
    div.innerHTML = `
    <div class="form-check">
      <input class="form-check-input" type="radio" name="flexRadioDefault" id="${category}">
      <label class="form-check-label" for="${category}">
        ${category}
      </label>
    </div>
      `;
    radiowrapper.appendChild(div);
  });
  // selecting new buttons from html
  const radioBtns = document.querySelectorAll('.form-check-input');
  // converting buttons nodeList into array
  let arrayBtns = Array.from(radioBtns);
  // triggering find when button clicked
  radioBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      let btnChecked = arrayBtns.find((btn) => btn.checked);
      let categoryChecked = btnChecked.id;
      console.log(categoryChecked);
      createCards(array, categoryChecked);
    });
  });
  let btnChecked = arrayBtns.find((btn) => btn.checked);
  console.log(arrayBtns);
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

// FETCH 
fetch("./products.json").then((result) => result.json()).then((data) => {
  createCards(data, "All");
  createBtns(data);
  // creating array of unique categories 
  // (Painting, Sculpture, Music, Book)

}) 