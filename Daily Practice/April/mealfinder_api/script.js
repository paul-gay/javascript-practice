const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    mealsEl = document.getElementById('meals'),
    resutlHeading = document.getElementById('result-heading'),
    single_mealEl = document.getElementById('single-meal');



// FUNCTIONS

// search meal and fetch from API
function searchMeal(e) {
    // want to prevent submit default behavior -- of submitting form
    e.preventDefault();

    // clear single meal
    single_mealEl.innerHTML = "";

    // get search term
    const term = search.value;
    // console.log(term);

    // check for empty -- check to see that something was actually submitted
    // trim -- removes any whitespace
    if(term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            // fetch api returns a promise -- use .then to catch a promise
            // .then gives a response that you need to format to json
            .then(response => response.json())
            // response.json returns another promise -- need to catch promise
            // with another .then -- which gives you the actual data
            .then(data => {
                console.log(data);

                resutlHeading.innerHTML = `<h2>Search results for '${term}':</h2>`

                if(data.meals === null ) {
                    resutlHeading.innerHTML = `<p>There are no search results. Try again.</p>`;
                } else {
                    // loop through each returned meal in meals array
                    mealsEl.innerHTML = data.meals.map(meal => `
                        <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                            <div class="meal-info" data-mealID="${meal.idMeal}">
                                <h3>${meal.strMeal}</h3>
                            </div>
                        </div>
                    `)
                    // .map loops through meal array
                    // need it to display as a string
                    .join('');
                }
            });

            // clear seach text
            search.value = '';

    } else {
        alert("Please enter a search term");
    }

}

// fetch meal by id 
function getMealById(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(response => response.json())
    .then(data => {
        const meal = data.meals[0];

        addMealToDom(meal);
    });
}

// fetch random meal
function getRandomMeal() {
    // clear any meals and headings that are present
    mealsEl.innerHTML = '';
    resutlHeading.innerHTML = '';

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(response => response.json())
    .then(data => {
        const meal = data.meals[0];

        addMealToDom(meal);
    });
}



// add meal to DOM
function addMealToDom(meal) {
    const ingredients = [];

    for(let i = 1; i <= 20; i++) {
        if(meal[`strIngredient${i}`]) {
            ingredients.push(`
                ${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}
            `);
        } else {
            break;
        }
    }

    single_mealEl.innerHTML = `
        <div class="single-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class="single-meal-info">
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
            </div>
            <div class="main">
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                    ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}



// EVENT LISTENERS

submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);

// mealsEl is basically the container of each meal
mealsEl.addEventListener('click', e => {
    // find out if mealInfo div belongs to element that user clicked
    /* 
    path.find -- goes through all the child elements and returns whichever one has meal-info class
    -- basically when user clicks on mealsEl which is entire meal element -- goes through all child elements 
    -- returns the item that has class of meal-info
    */
    const mealInfo = e.path.find(item => {
        // logs each element inside mealInfo
        // console.log(item);

        // need to narrow it down to only return the element with meal-info
        if(item.classList) {
            return item.classList.contains('meal-info');
        } else {
            return false
        }
    });

    // console.log(mealInfo);

    // check for meal-info
    if (mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealid');
        // console.log(mealID);
        getMealById(mealID);
    }
});