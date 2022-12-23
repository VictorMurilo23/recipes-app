import { findByText, screen, waitFor } from "@testing-library/react"
import App from "../App";
import renderWithRouter from "./helpers/renderWithRouter";
import userEvent from "@testing-library/user-event";
import copy from 'clipboard-copy'
import requestsMock from "./helpers/requestsMock";

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

    const btnShare = await screen.findByTestId('share-btn');
    userEvent.click(btnShare);
    expect(navigator.clipboard.writeText).toHaveBeenCalled()
    const teste = screen.getByText(/link copied/i)
    expect(teste).toBeDefined();

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

    const btnStart = await screen.findByTestId("start-recipe-btn")
    userEvent.click(btnStart);

    const btnFavoriteInProgress = await screen.findByTestId('favorite-btn')
    
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
    const btnShare = await screen.findByTestId('share-btn');
    userEvent.click(btnShare);
    expect(navigator.clipboard.writeText).toHaveBeenCalled()
    // expect(navigator.clipboard.writeText).toHaveBeenCalledWith('')
    const teste = screen.getByText(/link copied/i)
    expect(teste).toBeDefined()

    const finishRecipe = screen.getByTestId('finish-recipe-btn')
    userEvent.click(finishRecipe)

    // const btnShare = await screen.findByTestId('dawidawiodn');
    
  })
})
