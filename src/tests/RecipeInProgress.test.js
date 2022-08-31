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

function storageMock() {
  let storage = {};

  return {
    setItem: function(key, value) {
      storage[key] = value || '';
    },
    getItem: function(key) {
      return key in storage ? storage[key] : null;
    },
    removeItem: function(key) {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
    key: function(i) {
      const keys = Object.keys(storage);
      return keys[i] || null;
    }
  };
}

describe('Testes do MainRecipes', () => {
  beforeEach(() => {
    window.localStorage = storageMock();
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

    // let localStore = {};

    // jest.spyOn(window.localStorage, 'getItem').and.callFake((key) =>
    //   key in localStore ? localStore[key] : null
    // );
    // jest.spyOn(window.localStorage, 'setItem').and.callFake(
    //   (key, value) => (localStore[key] = value + '')
    // );
    // jest.spyOn(window.localStorage, 'clear').and.callFake(() => (localStore = {}));
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
    // const mockCopy = jest.spyOn(copy, 'link copiado')
    // expect(mockCopy).toBeCalled()
    // window.document.execCommand = jest.fn();
    // const btnShare = await screen.findByTestId('share-btn');
    
    // userEvent.click(btnShare);
    // expect(window.document.execCommand).toHaveBeenCalledWith("copy");
    // expect(screen.getByText(/Link copied!/i)).toBeInTheDocument()


    const btnStart = await screen.findByTestId("start-recipe-btn")
    userEvent.click(btnStart);

    const btnFavoriteInProgress = await screen.findByTestId('favorite-btn')
    // const teste = screen.getByText('dahiuwfgia')
    // expect(teste).toBeDefined();
    
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

    const finishRecipe = screen.getByTestId('finish-recipe-btn')
    userEvent.click(finishRecipe)
  })
})
