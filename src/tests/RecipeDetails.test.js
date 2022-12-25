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

describe('Testes do MainRecipes', () => {
  jest.spyOn(navigator.clipboard, "writeText");
  beforeAll(() => {
    copy();
  });
  beforeEach(requestsMock);

  it('Verifica o carousel do ABC details', async () => {
    
    const { history } =  renderWithRouter(<App />)
    history.push('/drinks')

    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })

    expect(history.location.pathname).toBe('/drinks')
    const recipeCard = await screen.findByTestId('2-recipe-card')
    userEvent.click(recipeCard);
    
    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })

    
    const corbaRecipe = screen.getByText('Corba')
    const burekRecipe = screen.getByText('Burek')
    expect(corbaRecipe).toBeVisible();
    expect(burekRecipe).toBeVisible();
    
    const prevBtn = await screen.findByRole('button', { name: /prev/i })
    userEvent.click(prevBtn);
    expect(screen.getByText('Poutine')).toBeVisible()
    
    const nextBtn = await screen.findByRole('button', { name: /next/i })
    userEvent.click(nextBtn);
    userEvent.click(nextBtn);
    expect(screen.getByText('Kumpir')).toBeVisible()
    // screen.getByText('dawdgiugawiudgi')

    const btnStart = await screen.findByTestId("start-recipe-btn")
    userEvent.click(btnStart);

    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })
  });

  it('Verifica se ao clicar em Start Recipe, a pagina é redirecionada pra in-progress', async () => {
    
    const { history } =  renderWithRouter(<App />)
    history.push('/drinks')

    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })

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
    })

    expect(history.location.pathname).toBe('/drinks/13501/in-progress')
  });

  it('Verifica se é possível copiar o link da receita', async () => {
    const { history } =  renderWithRouter(<App />)
    history.push('/drinks')

    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })

    expect(history.location.pathname).toBe('/drinks')
    const recipeCard = await screen.findByTestId('2-recipe-card')
    userEvent.click(recipeCard);
    
    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })

    const btnShare = await screen.findByTestId('share-btn');
    userEvent.click(btnShare);
    expect(screen.getByText(/Link copied!/i)).toBeInTheDocument()
  });
  
  it('Verifica se é possível favoritar uma receita', async () => {
    const { history } =  renderWithRouter(<App />)
    history.push('/foods')

    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })

    const { pathname } = history.location;

    expect(pathname).toBe('/foods')
    const recipeCard = await screen.findByTestId('3-recipe-card');
    userEvent.click(recipeCard);

    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })

    expect(screen.getByAltText('no favorite')).toBeDefined()

    const btnFavorite = await screen.findByTestId('favorite-btn')
    userEvent.click(btnFavorite)
    
    expect(screen.getByAltText('favorite')).toBeDefined()
  })

  it('Verifica se é possível desfavoritar uma receita', async () => {
    const { history } =  renderWithRouter(<App />)
    history.push('/foods')

    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })

    const { pathname } = history.location;

    expect(pathname).toBe('/foods')
    const recipeCard = await screen.findByTestId('3-recipe-card');
    userEvent.click(recipeCard);

    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })

    expect(screen.getByAltText('favorite')).toBeDefined()

    const btnFavorite = await screen.findByTestId('favorite-btn')
    userEvent.click(btnFavorite)
    
    expect(screen.getByAltText('no favorite')).toBeDefined()
  })
})
