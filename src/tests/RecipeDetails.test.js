import { screen, waitFor } from "@testing-library/react"
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
  it('ABC DETALHES', async () => {
    
    const { history } =  renderWithRouter(<App />)
    history.push('/drinks')

    expect(history.location.pathname).toBe('/drinks')
    const recipeCard = await screen.findByTestId('2-recipe-card')
    userEvent.click(recipeCard);
    const prevBtn = await screen.findByRole('button', { name: /prev/i })
    userEvent.click(prevBtn);
    const nextBtn = await screen.findByRole('button', { name: /next/i })
    userEvent.click(nextBtn);

    const btnStart = await screen.findByTestId("start-recipe-btn")
    userEvent.click(btnStart);
  });

  it('TAMIYA DETALHES', async () => {
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
    await waitFor( async () => {
      const btnShare = await screen.findByTestId('share-btn');
      console.log(btnShare);
      userEvent.click(btnShare);
      expect(screen.getByText(/Link copied!/i)).toBeInTheDocument()
    })
    
    // expect(window.document.execCommand).toHaveBeenCalledWith("copy");


    const btnStart = await screen.findByTestId("start-recipe-btn")
    userEvent.click(btnStart);
  })
})
