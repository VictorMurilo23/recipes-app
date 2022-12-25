import { screen, waitFor } from "@testing-library/react"
import App from "../App";
import renderWithRouter from "./helpers/renderWithRouter";
import userEvent from "@testing-library/user-event";
import copy from 'clipboard-copy'
import requestsMock from "./mocks/requestsMock";

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

  beforeEach(requestsMock);

  it('Verifica se é renderizado um drink, de uma receita finalizada, na pagina DoneRecipes', async () => {
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

    const recipeName = screen.getByText('ABC');
    const recipeTags = screen.getByText('- Shot Alcoholic');

    expect(recipeName).toBeDefined();
    expect(recipeTags).toBeDefined();
  });

  it('Verifica se é possível filtrar as receitas feitas.', async () => {
    const { history } =  renderWithRouter(<App />)
    history.push('/foods')
    expect(history.location.pathname).toBe('/foods')
    
    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    });
    
    const recipeCard = await screen.findByTestId('3-recipe-card');
    userEvent.click(recipeCard);
    
    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    });
    
    const btnStart = await screen.findByTestId("start-recipe-btn")
    userEvent.click(btnStart);
    
    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    });
    
    const checkbox = await screen.findAllByRole('checkbox');
    for(let index = 0; index < checkbox.length; index += 1) {
      const check = screen.getByTestId(`${index}-ingredient-step`)
      userEvent.click(check);
    }
    
    const finishRecipe = screen.getByTestId('finish-recipe-btn')
    userEvent.click(finishRecipe)
    
    const filterDrink = await screen.findByAltText('Ícone Drink')
    userEvent.click(filterDrink);
    const doneDrinks = screen.getByText('ABC')
    expect(doneDrinks).toBeDefined();
    expect(screen.queryByTestId('1-horizontal-name')).not.toBeInTheDocument() // verifica se tem mais de uma comida.
    
    const filterFood = await screen.findByAltText('Ícone Food')
    userEvent.click(filterFood);
    
    expect(screen.getByText('Tamiya')).toBeDefined();

    expect(screen.queryByTestId('1-horizontal-name')).not.toBeInTheDocument() // verifica se tem mais de uma comida.

    const filterAll = await screen.findByTestId('filter-by-all-btn')
    userEvent.click(filterAll);

    expect(screen.queryByTestId('3-horizontal-name')).not.toBeInTheDocument() // verificando se não tem mais de 3 comidas.
  })

  it('Verifica se é renderizado um texto com o conteúdo "Link copied!" ao clicar no botão de copiar o link', async () => {
    const { history } =  renderWithRouter(<App />)
    history.push('/drinks')
    expect(history.location.pathname).toBe('/drinks')
    const recipeCard = await screen.findByTestId('2-recipe-card')
    userEvent.click(recipeCard);

    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })

    const btnStart = await screen.findByTestId("start-recipe-btn")
    userEvent.click(btnStart);

    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    });
  
    const finishRecipe = screen.getByTestId('finish-recipe-btn')
    expect(finishRecipe).toBeEnabled()
    userEvent.click(finishRecipe)

    expect(history.location.pathname).toBe('/done-recipes')
    const recipeZeroShare = await screen.findByTestId(`0-horizontal-share-btn`);
    userEvent.click(recipeZeroShare);
    
    const linkCopied = screen.getByText('Link copied!')
    expect(linkCopied).toBeDefined()
    
    await waitFor(async () => {
      expect(screen.queryByText('Link copied!')).not.toBeInTheDocument()
    }, { timeout: 3000 });

    const recipeOneShare = await screen.findByTestId(`1-horizontal-share-btn`);
    userEvent.click(recipeOneShare);
  })

  it('Verifica o redirecionamento dos cards de receitas', async () => {
    const { history } =  renderWithRouter(<App />)
    history.push('/foods')
    expect(history.location.pathname).toBe('/foods')
    
    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    });
    
    const recipeCard = await screen.findByTestId('3-recipe-card');
    userEvent.click(recipeCard);
    
    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    });
    
    const btnStart = await screen.findByTestId("start-recipe-btn")
    userEvent.click(btnStart);
    
    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    });
    
    const finishRecipe = screen.getByTestId('finish-recipe-btn')
    userEvent.click(finishRecipe)
    
    // screen.getByText('duagwyidgayidgwyg')
    const redirect = await screen.findByTestId('0-horizontal-image')
    userEvent.click(redirect);
    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    });
    expect(history.location.pathname).toBe('/drinks/13501')
    history.push('/done-recipes')

    const redirect2 = await screen.findByTestId('0-horizontal-done-date')
    userEvent.click(redirect2);
    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    });
    expect(history.location.pathname).toBe('/drinks/13501')
    history.push('/done-recipes')

    const redirect3 = await screen.findByTestId('1-horizontal-name')
    userEvent.click(redirect3);
    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    });
    expect(history.location.pathname).toBe('/foods/53026')
    history.push('/done-recipes')
  })
})