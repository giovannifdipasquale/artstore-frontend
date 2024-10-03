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
const radioWrapper = document.querySelector("#radioWrapper");
// price range
const formRange = document.querySelector(".form-range");
const formLabel = document.querySelector(".form-label");
const searchName = document.querySelector(".search-name");


// FUNCTIONS 
// create cards function 
function createCards(array) {
  // empty cards wrapper
  cardsWrapper.innerHTML = '';
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

// filterByCategory function 
function filterByCategory(array) {
  // select all the radio buttons (as Node List)
  const radioBtns = document.querySelectorAll('.form-check-input');
  // converting buttons nodeList into Array
  let arrayBtns = Array.from(radioBtns);
  // selecting the one button checked with find()
  let btnChecked = arrayBtns.find((btn) => btn.checked);
  // selecting the category of the checked button
  let category = btnChecked.id;
  if (category == "All") {
    return array;
  }
  let filteredByCategory = array.filter(element => element.category === category);
  // returning filtered array by category
  return filteredByCategory;
}

// filterByPrice function 
function filterByPrice(array) {
  let price = formRange.value;
  let filteredByPrice = array.filter(element => element.price <= price).sort((a, b) => (b.price - a.price));
  return filteredByPrice;
}

// filterByName function
function filterByName(array) {
  let currentInput = searchName.value;
  if (currentInput == '') {
    return array;
  }
  let filteredByName = array.filter((element) => element.name.toLowerCase().includes(currentInput.toLowerCase()));
  
  return filteredByName;
}

// global filter function 
function globalFilter(array) {
  let filteredByCategory = filterByCategory(array);
  let filteredByPrice = filterByPrice(filteredByCategory);
  let filteredByName = filterByName(filteredByPrice);
  createCards(filteredByName);
}

// creates radio buttons function
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
    radioWrapper.appendChild(div);
  });
  const radioBtns = document.querySelectorAll('.form-check-input');
  radioBtns.forEach(element => {
    element.addEventListener('click', () => {
      globalFilter(array);
    })
  });
}

// function filter by price
// function filterByPrice(array) {
//   let filteredByPrice = array.filter((el) => (el.price < formRange.value));
//   createCards(filteredByPrice);

// }

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
  createCards(data);
  createBtns(data);
  // function filterByPrice(array) {


  // }
  // event listener for input range
  formRange.addEventListener("input", (event) => {
    const formattedValue = new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(event.target.value);

    formLabel.innerText = formattedValue;


    globalFilter(data);
  });
  searchName.addEventListener("input", (event) => {
    globalFilter(data);
  });

}) 
