import { screen } from "@testing-library/react"
import App from "../App";
import renderWithRouter from "./helpers/renderWithRouter";
import userEvent from "@testing-library/user-event";
import drinksCategories from "./helpers/drinksCategories";
import drinks from "./helpers/drinksRecipesMock";
import tamiya from "./helpers/mockTamiya";
import beef from "./helpers/beefCategoryMock";
import recipes from './helpers/recipesMock';
import abcRecipe from "./helpers/mockAbc";
import categories from './helpers/categoriesMock'

describe('Testes do MainRecipes', () => {

  beforeEach(() => {
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
        return({
          json: async () => abcRecipe
        })
      }
    })
  })
  it('Verifica se é renderizado as receitas', async () => {
    const { history } =  renderWithRouter(<App />)
    history.push('/foods')
    const { pathname } = history.location;
    
    expect(pathname).toBe('/foods')

    const categoryBeef = await screen.findByTestId('Beef-category-filter')
    userEvent.click(categoryBeef);
    const teste = await screen.findByTestId('Beef-category-filter')
    userEvent.click(teste);
  })

  it('Verifica se você é redirecionado ao clicar em um card de receita', async () => {
    
    const { history } =  renderWithRouter(<App />)
    history.push('/drinks')

    expect(history.location.pathname).toBe('/drinks')
    const recipeCard = await screen.findByTestId('2-recipe-card')
    userEvent.click(recipeCard);
  });

  it('TAMIYA', async () => {
    const { history } =  renderWithRouter(<App />)
    history.push('/foods')
    const { pathname } = history.location;
    
    expect(pathname).toBe('/foods')
    const recipeCard = await screen.findByTestId('3-recipe-card');
    userEvent.click(recipeCard);
  })
})
