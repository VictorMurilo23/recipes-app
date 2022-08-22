async function getSearch(query) {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/${query}`);
  const data = await request.json();
  return data.meals;
}

export function getRecipes(radio, search) {
  return {
    ingredient: getSearch(`filter.php?i=${search}`),
    name: getSearch(`search.php?s=${search}`),
    firstLetter: getSearch(`search.php?f=${search}`),
  }[radio];
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
