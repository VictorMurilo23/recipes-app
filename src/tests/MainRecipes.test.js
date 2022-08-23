import { screen, waitFor } from "@testing-library/react"
import App from "../App";
import renderWithRouter from "./helpers/renderWithRouter";
import userEvent from "@testing-library/user-event";
// import { getMealsOrDrinks } from "../service/serviceApi";
import drinksCategories from "./helpers/drinksCategories";
import drinks from "./helpers/drinksRecipesMock";
import beef from "./helpers/beefCategoryMock";
import recipes from './helpers/recipesMock';
import categories from './helpers/categoriesMock'

describe('Testes do MainRecipes', () => {
  it('Verifica se é renderizado as receitas', async () => {
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
      }
    })

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
      }
    })

    const { history } =  renderWithRouter(<App />)
    history.push('/foods')

    const recipeCard = await screen.findByTestId('0-recipe-card')
    userEvent.click(recipeCard);

    const { pathname } = history.location;
    expect(pathname).toBe('/foods/52977');
  });

  it('Verifica existe botão de categoria', async () => {
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
      }
    })
    const { history } =  renderWithRouter(<App />)
    history.push('/foods')
    const { pathname } = history.location;
    
    expect(pathname).toBe('/foods')
    const recipeCard = await screen.findByTestId('0-recipe-card');
    userEvent.click(recipeCard);
    userEvent.click(recipeCard);
  })

  it('Verifica se as bebidas são renderizadas', async () => {
    jest.spyOn(global, 'fetch').mockImplementation((url) => {
      if (url.includes('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')) {
        return ({
          json: async () => drinks,
        });
      } else if (url.includes('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')) {
        return ({
          json: async () => drinksCategories,
        });
      }
    })

    const { history } =  renderWithRouter(<App />)
    history.push('/drinks')
    const { pathname } = history.location;
    
    expect(pathname).toBe('/drinks')

    const recipeCard = await screen.findByTestId('0-recipe-card')
    userEvent.click(recipeCard);
  })
})
