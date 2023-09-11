const fruitForm = document.querySelector("#inputSection form");
const fruitList = document.querySelector("#fruitSection ul");
const fruitNutrition = document.querySelector("#nutritionSection p");
// Event Listeners
fruitForm.addEventListener(`submit`, extractFruit);
// fruitList.addEventListener(`click`, removeFruit);

// Functions
function extractFruit(e) {
    e.preventDefault();
    let fruit = e.target.fruitInput.value;
    if (fruit) {
        fetchFruitData(fruit);
        e.target.fruitInput.value = ""
        addFruit(fruit)
    }
    
}
// Function that add the user inputted value into a li in section with the ul tag
function addFruit(fruit) {
    console.log(fruit);
    // Create a list element
    const li = document.createElement(`li`)
    // Give that list element some text
    li.textContent = fruit;
    // Add on click event for delete list items
    li.addEventListener(`click`, removeFruit);
    // Add that list element to the ul
    // append vs appendChild
    fruitList.appendChild(li);
}
// Function that removes the target element
function removeFruit(e) {
    e.target.remove();
}

// Fetching data from fruit api
function fetchFruitData(fruit) {
    fetch(`https://fruity-api.onrender.com/fruits/${fruit}`)
        .then((resp) => resp.json()) /* response object (could be res, or response, as long as they are the same) */ 
        .then((data) => console.log(data))
        .catch((err) => console.log(err))
}
