import { screen, waitFor } from "@testing-library/react"
import App from "../App";
import renderWithRouter from "./helpers/renderWithRouter";
import userEvent from "@testing-library/user-event";
import requestsMock from "./mocks/requestsMock";

describe('Testes do MainRecipes', () => {

  beforeEach(requestsMock);

  it('Verifica se é renderizado as receitas', async () => {
    const { history } =  renderWithRouter(<App />)
    history.push('/foods')

    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })

    const { pathname } = history.location;
    
    expect(pathname).toBe('/foods')

    const categoryBeef = await screen.findByTestId('Beef-category-filter')
    userEvent.click(categoryBeef);

    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })
  })

  it('Verifica se você é redirecionado ao clicar em um card de receita', async () => {
    
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

  });

  it('TAMIYA', async () => {
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
  })
})
