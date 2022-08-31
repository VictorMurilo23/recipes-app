import { screen } from "@testing-library/react"
import App from "../App";
import renderWithRouter from "./helpers/renderWithRouter";
import userEvent from "@testing-library/user-event";
import drinksCategories from "./helpers/drinksCategories";
import drinks from "./helpers/drinksRecipesMock";
import tamiya from "./helpers/mockTamiya";
import doneRecipes from "./helpers/doneRecipesMock";
import beef from "./helpers/beefCategoryMock";
import recipes from './helpers/recipesMock';
import abcRecipe from "./helpers/mockAbc";
import categories from './helpers/categoriesMock'
import copy from 'clipboard-copy'

describe('Testes do DoneRecipes', () => {

  // jest.spyOn(Storage.prototype, 'setItem');
  // Storage.prototype.setItem = jest.fn();

  // jest.spyOn(Storage.prototype, 'getItem');
  // Storage.prototype.getItem = jest.fn(() => ({JSON: { parse: () => doneRecipes}}));

  // function storageMock() {
  //   let storage = {};
  
  //   return {
  //     setItem: function(key, value) {
  //       storage[key] = value || '';
  //     },
  //     getItem: function(key) {
  //       return key in storage ? storage[key] : null;
  //     },
  //     removeItem: function(key) {
  //       delete storage[key];
  //     },
  //     get length() {
  //       return Object.keys(storage).length;
  //     },
  //     key: function(i) {
  //       const keys = Object.keys(storage);
  //       return keys[i] || null;
  //     }
  //   };
  // }
  beforeEach(() => {
    // window.localStorage = storageMock();
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
    const filterDrink = await screen.findByTestId('filter-by-drink-btn')
    userEvent.click(filterDrink);

    const filterFood = await screen.findByTestId('filter-by-food-btn')
    userEvent.click(filterFood);

    const filterAll = await screen.findByTestId('filter-by-all-btn')
    userEvent.click(filterAll);

    const recipeOne = await screen.findByTestId(`dwahfwa9f`) // alterar index
    // userEvent.click(recipeOne);

  });
})