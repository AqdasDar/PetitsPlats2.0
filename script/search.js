/*
Début
|
|--> Retourner recipes.filter(recette => recette.title contient query OU recette.ingredients contient query OU recette.description contient query)
|
Fin

 */
export function search(query, recipes) {
    const safeQuery = encodeURIComponent(query).toLowerCase();
    const results = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(safeQuery) ||
        recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(safeQuery)) ||
        recipe.description.toLowerCase().includes(safeQuery)
    );
    // Convert results to Set to remove duplicates, then convert back to array
    return [...new Set(results)];
}

import {recipes} from '../data/recipes.js';
import {displayCards} from './card.js';

import {updateFilterTags} from './filter.js';

export function handleSearch() {
    const searchInput = document.getElementById('search');
    const totalRecette = document.getElementById('total_recette');
    let searchResults;
    // add event listener for the search input
    searchInput.addEventListener('input', (event) => {
        searchResults = search(event.target.value, recipes);
        // console.log(searchResults);
        if (event.target.value.length === 0 || event.target.value.length < 3) {
            //keep the previous results
            displayCards(recipes);
            totalRecette.textContent = `${recipes.length} recettes trouvées`;
            updateFilterTags(recipes); // Update filters with all recipes
        } else if (event.target.value.length >= 3) {
            const filteredResults = searchResults;
            // console.log(filteredResults);
            // Clear previous results
            document.getElementById('results').innerHTML = '';
            // Display new results
            if (filteredResults.length === 0) {
                totalRecette.textContent = `Aucune recette ne contient '${event.target.value}' vous pouvez chercher "tarte aux pommes", "poisson", etc.`;
            } else {
                displayCards(filteredResults);
                // Update total recette count
                totalRecette.textContent = `${filteredResults.length} recettes trouvées`;
                updateFilterTags(filteredResults); // Update filters with search results
                console.log(filteredResults);
            }
        }
    });
}
