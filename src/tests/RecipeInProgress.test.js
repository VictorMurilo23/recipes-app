import { findByText, screen, waitFor } from "@testing-library/react"
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
import copy from 'clipboard-copy'

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe('Testes do MainRecipes', () => {
  jest.spyOn(navigator.clipboard, "writeText");
  beforeAll(() => {
    copy();
  });
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
  it('ABC IN PROGRESS', async () => {
    
    const { history } =  renderWithRouter(<App />)
    history.push('/drinks')

    expect(history.location.pathname).toBe('/drinks')
    const recipeCard = await screen.findByTestId('2-recipe-card')
    userEvent.click(recipeCard);
  
    const btnStart = await screen.findByTestId("start-recipe-btn")
    userEvent.click(btnStart);
    const checkbox = await screen.findAllByRole('checkbox');
    for(let index = 0; index < checkbox.length; index += 1) {
      const check = screen.getByTestId(`${index}-ingredient-step`)
      userEvent.click(check);
    }

    const btnShare = await screen.findByTestId('share-btn');
    userEvent.click(btnShare);
    expect(navigator.clipboard.writeText).toHaveBeenCalled()
    const teste = screen.getByText(/link copied/i)
    expect(teste).toBeDefined();

    const finishRecipe = screen.getByTestId('finish-recipe-btn')
    userEvent.click(finishRecipe)
  });
  it('TAMIYA IN PROGRESS', async () => {
    const { history } =  renderWithRouter(<App />)
    history.push('/foods')
    const { pathname } = history.location;

    expect(pathname).toBe('/foods')
    const recipeCard = await screen.findByTestId('3-recipe-card');
    userEvent.click(recipeCard);
    const btnFavorite = await screen.findByTestId('favorite-btn')
    userEvent.click(btnFavorite)
    userEvent.click(btnFavorite)

    const btnStart = await screen.findByTestId("start-recipe-btn")
    userEvent.click(btnStart);

    const btnFavoriteInProgress = await screen.findByTestId('favorite-btn')
    
    userEvent.click(btnFavoriteInProgress)
    userEvent.click(btnFavoriteInProgress)
    
    const checkbox = await screen.findAllByRole('checkbox');
    for(let index = 0; index < checkbox.length; index += 1) {
      const check = screen.getByTestId(`${index}-ingredient-step`)
      userEvent.click(check);
    }
    const check = screen.getByTestId(`0-ingredient-step`)
    userEvent.click(check)
    userEvent.click(check)
    const btnShare = await screen.findByTestId('share-btn');
    userEvent.click(btnShare);
    expect(navigator.clipboard.writeText).toHaveBeenCalled()
    // expect(navigator.clipboard.writeText).toHaveBeenCalledWith('')
    const teste = screen.getByText(/link copied/i)
    expect(teste).toBeDefined()

    const finishRecipe = screen.getByTestId('finish-recipe-btn')
    userEvent.click(finishRecipe)

    // const btnShare = await screen.findByTestId('dawidawiodn');
    
  })
})
