
// search field ---------------
document.getElementById('search_btn').addEventListener('click',() => {
    const inputField = document.getElementById('search_field');
    const inputFieldValue = inputField.value;
    inputField.value = '';
    // check input value
    if(inputFieldValue.length > 0){
        document.getElementById('spinner').classList.remove('d-none');
        getMealsItems(inputFieldValue)
    }
    else{
        document.getElementById('not_found').innerText = 'please enter a food name'
    }
})

// get meals item
const getMealsItems = (mealsData) => {
    if(mealsData.length == 1){
        mealCardItem(
            `https://www.themealdb.com/api/json/v1/1/search.php?f=${mealsData}`
        )
    }
    else{
        mealCardItem(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealsData}`
        )
    }
}

// display item
const mealCardItem = async (url) => {
    const res = await fetch(url)
    const data = await res.json()
    displayMealItem(data.meals);
}

const displayMealItem = (meals) => {
    if(!meals){
        document.getElementById('result_uncought').innerText = 'Your Result Not Found';
    }
    document.getElementById('spinner').classList.add('d-none');
    // document.getElementById('not_found').innerText = '';
    const mealsContainer = document.getElementById('meals_container');
    mealsContainer.textContent = '';
    meals.forEach(meal => {
        console.log(meal);
        const div = document.createElement('div');
        div.className = 'col';
        div.innerHTML = `
            <div class="card">
                 <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
              <div class="card-body">
                 <h5 class="card-title">${meal.strMeal}</h5>
                 <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
                 <button onclick="loadMealDetailsById('${meal.idMeal}')" class="btn btn-success">Show Details</button>
              </div>
            </div>
        `
        mealsContainer.appendChild(div)
    })
    
}

// meal details 
// www.themealdb.com/api/json/v1/1/lookup.php?i=52772
const loadMealDetailsById = async (mealId) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    const res = await fetch(url)
    const data = await res.json()
    displaySingleMealDetail(data.meals[0]);
}

const displaySingleMealDetail = (mealDetail) => {
    const ppContent = document.querySelector('.pp_content');
    ppContent.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="pp_header">
            <div class="pp_thumbnail">
                <img class="img-fluid" src="${mealDetail.strMealThumb}" alt="">
            </div>
            <h3 class="my-3">${mealDetail.strMeal}</h3>
        </div>
        <div class="pp_body">
            <ul class="mb-3">
                <li class="list_item"> <i class="fas fa-check"></i> ${mealDetail.strIngredient1}</li>
                <li class="list_item"> <i class="fas fa-check"></i> ${mealDetail.strIngredient2}</li>
                <li class="list_item"> <i class="fas fa-check"></i> ${mealDetail.strIngredient3}</li>
                <li class="list_item"> <i class="fas fa-check"></i> ${mealDetail.strIngredient4}</li>
                <li class="list_item"> <i class="fas fa-check"></i> ${mealDetail.strIngredient5}</li>
            </ul>
        </div>
        <div class="pp_footer">
            <button onclick="togglePopup()" class="btn btn-warning text-white fw-bold px-3 fs-5">Close</button>
        </div>
    `
    ppContent.appendChild(div)
    togglePopup();
}


function togglePopup(){
    const popup = document.querySelector('.popup_details');
    popup.classList.toggle('open')
}