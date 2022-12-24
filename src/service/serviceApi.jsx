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
    console.log(`https://www.thecocktaildb.com/api/json/v1/1/${query}`);
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/${query}`);
    const data = await request.json();
    // console.log(data.drinks[1]);
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

export async function getMealsOrDrinks(type) {
  if (type === 'food') {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    return data.meals;
  }
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data.drinks;
}

export async function getCategories(type) {
  if (type === 'food') {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    return data.meals;
  }
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  return data.drinks;
}

export async function getRecipesByCategory(type, categoryName) {
  if (type === 'food') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
    const data = await response.json();
    return data.meals;
  }
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryName}`);
  const data = await response.json();
  return data.drinks;
}

export async function getMealDetail(id) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data.meals;
}
export async function getDrinksDetail(id) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data.drinks;
}
