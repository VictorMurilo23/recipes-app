import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import App from "../App";
import renderWithRouter from "./helpers/renderWithRouter";
import requestsMock from "./mocks/requestsMock";

describe('Testes do Footer', () => {
  beforeEach(requestsMock);
  it('Verifica se os botões do footer são renderizados na tela de perfil', () => {
    const { history } =  renderWithRouter(<App />)
    history.push('/profile')
    const { pathname } = history.location;
    
    expect(pathname).toBe('/profile')

    const foodBtn = screen.getByTestId('food-bottom-btn')
    expect(foodBtn).toBeDefined()

    const drinkBtn = screen.getByTestId('drinks-bottom-btn')
    expect(drinkBtn).toBeDefined()
  })

  it('Verifica se é feito o redirecionamento ao clicar nos botões do Footer', async () => {
    const { history } =  renderWithRouter(<App />)
    history.push('/profile')
    const { pathname } = history.location;
    
    expect(pathname).toBe('/profile')

    const foodBtn = screen.getByTestId('food-bottom-btn')
    userEvent.click(foodBtn);
    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })
    expect(history.location.pathname).toBe('/foods')
    history.push('/profile')

    const drinkBtn = screen.getByTestId('drinks-bottom-btn')
    userEvent.click(drinkBtn);
    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })
    expect(history.location.pathname).toBe('/drinks')
  })
})
