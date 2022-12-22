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
import copy from 'clipboard-copy'

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe('Testes do DoneRecipes', () => {
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
  it('FILTERS BUTTONS', async () => {
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
    const finishRecipe = screen.getByTestId('finish-recipe-btn')
    userEvent.click(finishRecipe)
    expect(history.location.pathname).toBe('/done-recipes')

    const recipeZeroShare = await screen.findByTestId(`0-horizontal-share-btn`) // alterar index
    userEvent.click(recipeZeroShare);

  });

  it('Comida', async () => {
    const { history } =  renderWithRouter(<App />)
    history.push('/foods')
    expect(history.location.pathname).toBe('/foods')

    const recipeCard = await screen.findByTestId('3-recipe-card');
    userEvent.click(recipeCard);

    const btnStart = await screen.findByTestId("start-recipe-btn")
    userEvent.click(btnStart);
    
    const checkbox = await screen.findAllByRole('checkbox');
    for(let index = 0; index < checkbox.length; index += 1) {
      const check = screen.getByTestId(`${index}-ingredient-step`)
      userEvent.click(check);
    }

    const finishRecipe = screen.getByTestId('finish-recipe-btn')
    userEvent.click(finishRecipe)

    const filterDrink = await screen.findByAltText('Ícone Drink')
    userEvent.click(filterDrink);
    const filterFood = await screen.findByAltText('Ícone Food')
    userEvent.click(filterFood);

    const filterAll = await screen.findByTestId('filter-by-all-btn')
    userEvent.click(filterAll);
    const recipeOneShare = await screen.findByTestId(`1-horizontal-share-btn`) // alterar index
    userEvent.click(recipeOneShare);

    const redirect = await screen.findByTestId('0-horizontal-image')
    userEvent.click(redirect);
    history.push('/done-recipes')

    const redirect2 = await screen.findByTestId('1-horizontal-image')
    userEvent.click(redirect2);
    history.push('/done-recipes')

    const redirect3 = await screen.findByTestId('1-horizontal-done-date')
    userEvent.click(redirect3);
    history.push('/done-recipes')

    const redirect4 = await screen.findByTestId('1-horizontal-name')
    userEvent.click(redirect4);
    
  })
})