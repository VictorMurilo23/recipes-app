import { screen, waitForElementToBeRemoved } from "@testing-library/react"
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

describe('Testes do DoneRecipes', () => {
  jest.spyOn(navigator.clipboard, "writeText");
  beforeAll(() => {
    copy();
  });

  beforeEach(requestsMock);

  it('FILTERS BUTTONS', async () => {
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

    const recipeZeroShare = await screen.findByTestId(`0-horizontal-share-btn`) // alterar index
    userEvent.click(recipeZeroShare);
  });

  it('Comida', async () => {
    const { history } =  renderWithRouter(<App />)
    history.push('/foods')
    expect(history.location.pathname).toBe('/foods')
    expect(screen.getByText('Loading...')).toBeDefined();
    await waitForElementToBeRemoved(() => screen.queryByText(/loading.../i));

    const recipeCard = await screen.findByTestId('3-recipe-card');
    userEvent.click(recipeCard);

    expect(screen.getByText('Loading...')).toBeDefined();
    await waitForElementToBeRemoved(() => screen.queryByText(/loading.../i));

    const btnStart = await screen.findByTestId("start-recipe-btn")
    userEvent.click(btnStart);

    expect(screen.getByText('Loading...')).toBeDefined();
    await waitForElementToBeRemoved(() => screen.queryByText(/loading.../i));
    
    const checkbox = await screen.findAllByRole('checkbox');
    for(let index = 0; index < checkbox.length; index += 1) {
      const check = screen.getByTestId(`${index}-ingredient-step`)
      userEvent.click(check);
    }

    const finishRecipe = screen.getByTestId('finish-recipe-btn')
    userEvent.click(finishRecipe)

    const filterDrink = await screen.findByAltText('Ícone Drink')
    userEvent.click(filterDrink);
    const filterFood = await screen.findByAltText('Ícone Food')
    userEvent.click(filterFood);

    const filterAll = await screen.findByTestId('filter-by-all-btn')
    userEvent.click(filterAll);
    const recipeOneShare = await screen.findByTestId(`1-horizontal-share-btn`) // alterar index
    userEvent.click(recipeOneShare);

    const redirect = await screen.findByTestId('0-horizontal-image')
    userEvent.click(redirect);
    expect(screen.getByText('Loading...')).toBeDefined();
    await waitForElementToBeRemoved(() => screen.queryByText(/loading.../i));

    history.push('/done-recipes')

    const redirect2 = await screen.findByTestId('1-horizontal-image')
    userEvent.click(redirect2);
    expect(screen.getByText('Loading...')).toBeDefined();
    await waitForElementToBeRemoved(() => screen.queryByText(/loading.../i));

    history.push('/done-recipes')

    const redirect3 = await screen.findByTestId('1-horizontal-done-date')
    userEvent.click(redirect3);

    expect(screen.getByText('Loading...')).toBeDefined();
    await waitForElementToBeRemoved(() => screen.queryByText(/loading.../i));

    history.push('/done-recipes')

    const redirect4 = await screen.findByTestId('1-horizontal-name')
    userEvent.click(redirect4);

    expect(screen.getByText('Loading...')).toBeDefined();
    await waitForElementToBeRemoved(() => screen.queryByText(/loading.../i));
  })
})