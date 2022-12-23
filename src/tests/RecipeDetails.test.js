import { screen, waitFor } from "@testing-library/react"
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

  it('ABC DETALHES', async () => {
    
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


    const prevBtn = await screen.findByRole('button', { name: /prev/i })
    userEvent.click(prevBtn);
    const nextBtn = await screen.findByRole('button', { name: /next/i })
    userEvent.click(nextBtn);

    const btnStart = await screen.findByTestId("start-recipe-btn")
    userEvent.click(btnStart);

    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })
  });

  it('TAMIYA DETALHES', async () => {
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

    const btnFavorite = await screen.findByTestId('favorite-btn')
    userEvent.click(btnFavorite)
    userEvent.click(btnFavorite)
    const btnShare = await screen.findByTestId('share-btn');
    userEvent.click(btnShare);
    expect(screen.getByText(/Link copied!/i)).toBeInTheDocument()

    const btnStart = await screen.findByTestId("start-recipe-btn")
    userEvent.click(btnStart);

    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })

  })
})
