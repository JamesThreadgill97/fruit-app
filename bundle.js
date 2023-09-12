(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
    }
    
}

let cal = 0;
// Empty object that holds data of fruits that have been added
let fruitCal = {};
// Function that add the user inputted value into a li in section with the ul tag
function addFruit(fruit, dataImg) {
    console.log(dataImg);
    // // Create a list element
    // const li = document.createElement(`li`)
    // // Give that list element some text
    // li.textContent = fruit.name;
    // // Add on click event for delete list items
  
    // // Add that list element to the ul

    // // append vs appendChild

    // fruitList.appendChild(li);

    const fruitImage = document.createElement('img')
    fruitImage.src = dataImg.hits[0].previewURL;
    fruitImage.addEventListener(`click`, removeFruit);
    fruitList.appendChild(fruitImage);
//     fruitImage.src = fruit.previewurl;

//    console.log(fruit.previewurl);


    fruitCal[fruit.name] = fruit.nutritions.calories;
    // {apple: 23, banana: 45}

    // Adding the api information for calories to update the cal variable to be displayed in the p tag

    cal += fruit.nutritions.calories;
    fruitNutrition.textContent = cal;
}

// Function that removes the target element

function removeFruit(e) {
    // Grabbing the text of a li item and retrieving its calorie information
    const fruitName = e.target.textContent
    cal -= fruitCal[fruitName]
    fruitNutrition.textContent = cal;
    // deleting the objext
    delete fruitCal[fruitName];
    e.target.remove();
}
// Fetching data from fruit api using .then and .catch
// function fetchFruitData(fruit) {
//     fetch(`https://fruity-api.onrender.com/fruits/${fruit}`)
//         .then(processResponse) // Calling a function instead of the resp response object, allows dev to throw error status code depending on response status 
//              ALTERNATE // .then((resp) => resp.json)/* response object (could be res, or response, as long as they are the same) */ 
//         .then((data) => addFruit(data))
//         .catch((err) => console.log(err))
// }
// function below is the neater function for the .then .catch fetch function
// function processResponse(resp) {
//     if (resp.ok) {
//         return resp.json()
//     } else {
//         throw "Error: hhtp satus code = " + resp.status
//     }
// }


// ASYNC - AWAIT - cleaner and more readable that .then/.await
async function fetchFruitData(fruit) {
    try {
        // FETCHING
        const resp = await fetch(`https://fruity-api.onrender.com/fruits/${fruit}`) 
        const respImg = await fetch(`https://pixabay.com/api/?q=${fruit}+fruit&key=39381844-9706b8f92bb57a850b0b38165`)

        if (resp.ok) {
            const data = await resp.json();
            const dataImg = await respImg.json();
            addFruit(data, dataImg)
        } else {
            throw "Error: hhtp status code = " + resp.status
        }
    } catch (e) {
        // ERROR HANDLING
        console.log(e);
    }
}
// async function fetchFruitPhoto(fruit) {
//     try {
//         const resp = await fetch(`https://pixabay.com/api/?q=${fruit}+fruit&key=39381844-9706b8f92bb57a850b0b38165`)
//         if (resp.ok) {
//             const data = await resp.json();
//             addFruit(data)
//         } else {
//             throw "Error: http status code =" + resp.status
//         }
//     } catch (e) {
//         console.log(e);
//     }
// }

//preview url from pixabay in the src of the image

},{}]},{},[1]);
