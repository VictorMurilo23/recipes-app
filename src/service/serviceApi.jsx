async function getSearch(query) {
  try {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/${query}`);
    const data = await request.json();
    return data.meals;
  } catch (e) {
    console.log(e);
  }
}

function getRecipes(radio, search) {
  if (radio === 'ingredient') return getSearch(`filter.php?i=${search}`);
  if (radio === 'name') return getSearch(`search.php?s=${search}`);
  if (radio === 'firstLetter') return getSearch(`search.php?f=${search}`);
}

export default getRecipes;

async function getSearchDrinks(query) {
  try {
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/${query}`);
    const data = await request.json();
    return data.drinks;
  } catch (e) {
    console.log(e);
  }
}

export function getRecipesDrinks(radio, search) {
  if (radio === 'ingredient') return getSearchDrinks(`filter.php?i=${search}`);
  if (radio === 'name') return getSearchDrinks(`search.php?s=${search}`);
  if (radio === 'firstLetter') return getSearchDrinks(`search.php?f=${search}`);
}
