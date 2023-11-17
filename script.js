// script.js

function generateMealPlan() {
    // Fetch values from input fields
    var numMeals = document.getElementById('numMeals').value;
    var dietPreference = document.getElementById('dietPreference').value;
    var healthSpec = document.getElementById('healthSpec').value;
    var calories = document.getElementById('calories').value;
    var age = document.getElementById('age').value;
    var height = document.getElementById('height').value;
    var weight = document.getElementById('weight').value;
    var gender = document.getElementById('gender').value;

    // Check if any of the required fields are empty
    if (!numMeals || !dietPreference || !healthSpec || !calories || !age || !height || !weight || !gender) {
        alert("Please fill in all fields before generating the meal plan.");
    } else {
        // Add your logic for generating the meal plan here
        // For now, let's make a simple API request to Edamam for demonstration purposes
        getMealPlan(numMeals, dietPreference, healthSpec, calories, age, height, weight, gender);
    }
}

function getMealPlan(numMeals, dietPreference, healthSpec, calories, age, height, weight, gender) {
    // Replace 'YOUR_APP_ID' and 'YOUR_APP_KEY' with your actual Edamam API credentials
    var appId = '663cc83f';
    var appKey = '7611bfc4265d25cf09cedc4ced8a43e0';


    // Edamam API endpoint for recipe search
    var apiUrl = 'https://api.edamam.com/search';

    // Build the query parameters
    var queryParams = {
        q: dietPreference, // Use diet preference as the query term for simplicity
        app_id: appId,
        app_key: appKey,
        from: 0,
        to: numMeals * 7 // Adjusted to retrieve meals for the entire week
    };

    // Make the API request
    fetch(apiUrl + '?' + new URLSearchParams(queryParams))
        .then(response => response.json())
        .then(data => displayMealPlan(data.hits))
        .catch(error => console.error('Error:', error));
}

function displayMealPlan(recipes) {
    var table = document.getElementById('mealPlanTable');
    table.innerHTML = ''; // Clear existing table content

    // Create table header
    var headerRow = table.insertRow(0);
    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    days.forEach(day => {
        var th = headerRow.insertCell();
        th.innerHTML = day;
    });

    // Create table rows with recipe information
    var recipeIndex = 0;
    for (var i = 1; i <= Math.ceil(recipes.length / 7); i++) {
        var row = table.insertRow(i);

        for (var j = 0; j < 7; j++) {
            var cell = row.insertCell(j);

            if (recipeIndex < recipes.length) {
                var recipe = recipes[recipeIndex].recipe;
                cell.innerHTML = `
                    <strong>${recipe.label}</strong><br>
                    <img src="${recipe.image}" alt="${recipe.label}"><br>
                    <ul>${recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
                `;
                recipeIndex++;
            }
        }
    }
}
