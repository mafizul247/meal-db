const loadMealDb = (searchText) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
        .then(res => res.json())
        .then(data => displayMealDb(data.meals))
}

const displayMealDb = (meals) => {
    // console.log(meals);
    const mealContainer = document.getElementById('meals-db');
    mealContainer.innerHTML = '';

    meals.forEach(meal => {
        // console.log(meal);
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');

        mealDiv.innerHTML = `
            <div class="card h-100">
                <img src="${meal.strMealThumb}" class="card-img-top img-fluid" alt="${meal.strMeal}">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in toadditional content. This content is a little bit longer.</p>
                </div>
                <div class="card-footer">
                    <button onClick="handleDetails(${meal.idMeal})" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mealDB">Details</button>
                </div>
            </div>
        `
        mealContainer.appendChild(mealDiv);
    })
}

const handleDetails = async(idMeal) => {
    // console.log(idMeal);
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
    const data = await res.json();
    displayMealDetails(data.meals[0])
}

const displayMealDetails = (meal) => {
    console.log(meal);
    const mealCoantainer = document.getElementById('meal-container');
    mealCoantainer.innerHTML = '';

    const mealDiv = document.createElement('div');
    mealDiv.classList.add('modal-content');

    mealDiv.innerHTML = `
    <div class="modal-header">
        <h1 class="modal-title fs-5" id="mealDBLabel">${meal.strMeal}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
    <img class="img-fluid" src=${meal.strMealThumb} alt="">
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
    `

    mealCoantainer.appendChild(mealDiv)
}

// document.getElementById('search-btn').addEventListener('click', function() {
//     const searchField = document.getElementById('input-search').value;
//     console.log(searchField)
//     loadMealDb(searchField);
// })

const searchField = () => {
    const searchField = document.getElementById('input-search').value;
    console.log(searchField)
    loadMealDb(searchField);
}


loadMealDb('fish');