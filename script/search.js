/*
Début
|
|--> Retourner recipes.filter(recette => recette.title contient query OU recette.ingredients contient query OU recette.description contient query)
|
Fin

 */
export function search(query, recipes) {
    const lowerCaseQuery = query.toLowerCase();
    const results = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(lowerCaseQuery) ||
        recipe.ingredients.join(' ').toLowerCase().includes(lowerCaseQuery) ||
        recipe.description.toLowerCase().includes(lowerCaseQuery)
    );
    // Convert results to Set to remove duplicates, then convert back to array
    return [...new Set(results)];
}

import {recipes} from '../data/recipes.js';
import {displayCards} from './card.js';

export function handleSearch() {
    const searchInput = document.getElementById('search');
    const totalRecette = document.getElementById('total_recette');
    let searchResults;
    // add event listener for the search input
    searchInput.addEventListener('input', (event) => {
        searchResults = search(event.target.value, recipes);
        console.log(searchResults);
        if (event.target.value.length === 0 || event.target.value.length < 3) {
            //keep the previous results
            displayCards(recipes);
            totalRecette.textContent = `${recipes.length} recettes trouvées`;
        } else if (event.target.value.length >= 3) {
            const filteredResults = searchResults;
            console.log(filteredResults);
            // Clear previous results
            document.getElementById('results').innerHTML = '';
            // Display new results
            displayCards(filteredResults);
            // Update total recette count
            totalRecette.textContent = `${filteredResults.length} recettes trouvées`;
        } else {
            // Clear previous results if no search results
            document.getElementById('results').innerHTML = '';
            // Update total recette count
            totalRecette.textContent = '0 recettes trouvées';
        }
    });
}
