import { render, screen } from "@testing-library/react"
import App from "../App";
import renderWithRouter from "./helpers/renderWithRouter";
import userEvent from "@testing-library/user-event";

describe('Testes do Footer', () => {
  it('Verifica se Header renderiza na tela', () => {
    const { history } =  renderWithRouter(<App />)
    history.push('/profile')
    const { pathname } = history.location;
    
    expect(pathname).toBe('/profile')

    userEvent.click(screen.getByTestId('food-bottom-btn'))
    userEvent.click(screen.getByTestId('drinks-bottom-btn'));
  })
})
