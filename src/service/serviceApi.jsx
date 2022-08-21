async function getSearch(query) {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/${query}`);
  const data = await request.json();
  return data.meals;
}

function getRecipes(radio, search) {
  return {
    ingredient: getSearch(`filter.php?i=${search}`),
    name: getSearch(`search.php?s=${search}`),
    firstLetter: getSearch(`search.php?f=${search}`),
  }[radio];
}

export default getRecipes;
