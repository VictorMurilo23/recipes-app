import beef from "./beefCategoryMock";
import categories from "./categoriesMock";
import drinksCategories from "./drinksCategories";
import drinks from "./drinksRecipesMock";
import abcRecipe from "./mockAbc";
import arrabiataRecipe from "./mockArrabiata";
import aRecipes from "./mockFirstLetterARecipes";
import mRecipes from "./mockFirstLetterMRecipes";
import garlicRecipes from "./mockGarlic";
import margaritaSeach from "./mockMargarita";
import tamiya from "./mockTamiya";
import searchTequila from "./mockTequila";
import recipes from "./recipesMock";
import testeRecipe from "./testeRecipeMock";

const requestsMock = () => {
  jest.spyOn(global, 'fetch').mockImplementation((url) => {
    if (url.includes('https://www.themealdb.com/api/json/v1/1/search.php?s=')) {
      return ({
        json: async () => recipes,
      });
    } else if (url.includes('https://www.themealdb.com/api/json/v1/1/list.php?c=list')) {
      return ({
        json: async () => categories,
      });
    } else if (url.includes('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef')) {
      return ({
        json: async () => beef,
      });
    } else if (url.includes('https://www.themealdb.com/api/json/v1/1/lookup.php?i=53026')) {
      return ({
        json: async () => tamiya,
      });
    } else if (url.includes('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')) {
      return ({
        json: async () => drinks,
      });
    } else if (url.includes('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')) {
      return ({
        json: async () => drinksCategories,
      });
    } else if (url.includes('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=13501')) {
      return ({
        json: async () => abcRecipe
      })
    } else if (url.includes('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata')) {
      return ({
        json: async () => arrabiataRecipe
      })
    } else if (url.includes('https://www.themealdb.com/api/json/v1/1/filter.php?i=garlic')) {
      return ({
        json: async () => garlicRecipes
      })
    } else if (url.includes('https://www.themealdb.com/api/json/v1/1/search.php?f=A')) {
      return ({
        json: async () => aRecipes
      })
    } else if (url.includes('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Margarita')) {
      return ({
        json: async () => margaritaSeach
      })
    } else if (url.includes('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Tequila')) {
      return ({
        json: async () => searchTequila
      })
    } else if (url.includes('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=M')) {
      return ({
        json: async () => mRecipes
      })
    } else if (url.includes('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=xablau')) {
      return ({
        json: async () => undefined
      })
    } else if (url.includes('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=p')) {
      return ({
        json: async () => testeRecipe
      })
    } else if (url.includes('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=12776')) {
      return ({
        json: async () => abcRecipe
      })
    }
  })
}

export default requestsMock;
