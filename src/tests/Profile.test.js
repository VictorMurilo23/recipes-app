import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import App from "../App";
import renderWithRouter from "./helpers/renderWithRouter";


describe('Teste da pagina profile', () => {
  it('Verifica se o button done recipes redireciona pra rota done-recipes', () => {
    const { history } =  renderWithRouter(<App />)
    history.push('/profile');
    const btnDoneRecipes = screen.getByTestId('profile-done-btn');
    userEvent.click(btnDoneRecipes)
    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  })
  
  it('Verifica se o button favorite recipes redireciona pra rota favorite-recipes', () => {
    const { history } =  renderWithRouter(<App />)
    history.push('/profile');
    const btnFavoriteRecipes = screen.getByTestId('profile-favorite-btn');
    userEvent.click(btnFavoriteRecipes)
    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  })
  
  it('Verifica se o button logout redireciona pra página de login', () => {
    const { history } =  renderWithRouter(<App />)
    history.push('/profile');
    const btnLogout= screen.getByTestId('profile-logout-btn');
    userEvent.click(btnLogout)
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  })
})