import { screen, waitFor } from "@testing-library/react";
import App from "../App";
import renderWithRouter from "./helpers/renderWithRouter";
import userEvent from "@testing-library/user-event";
import requestsMock from "./mocks/requestsMock";
import beef from "./mocks/beefCategoryMock";
import recipes from "./mocks/recipesMock";

describe("Testes do MainRecipes", () => {
  beforeEach(requestsMock);

  it("Verifica se é renderizado as receitas", async () => {
    const { history } = renderWithRouter(<App />);
    history.push("/foods");

    await waitFor(async () => {
      expect(global.fetch).toBeCalled();
    });

    const { pathname } = history.location;

    expect(pathname).toBe("/foods");

    for (let index = 0; index <= 11; index += 1) {
      const recipe = screen.getByTestId(`${index}-card-name`);
      const mockElement = recipes.meals[index].strMeal;
      expect(recipe).toHaveTextContent(mockElement);
    }

    const recipeThatShouldntExist = screen.queryByTestId("12-card-name");
    expect(recipeThatShouldntExist).not.toBeInTheDocument();
  });

  it("Verifica se é renderizado as receitas de uma categoria especifica", async () => {
    const { history } = renderWithRouter(<App />);
    history.push("/foods");

    await waitFor(async () => {
      expect(global.fetch).toBeCalled();
    });

    const { pathname } = history.location;

    expect(pathname).toBe("/foods");

    const categoryBeef = await screen.findByTestId("Beef-category-filter");
    userEvent.click(categoryBeef);

    await waitFor(async () => {
      expect(global.fetch).toBeCalled();
    });

    for (let index = 0; index <= 11; index += 1) {
      const recipe = screen.getByTestId(`${index}-card-name`);
      const mockElement = beef.meals[index].strMeal;
      expect(recipe).toHaveTextContent(mockElement);
    }

    const recipeThatShouldntExist = screen.queryByTestId("12-card-name");
    expect(recipeThatShouldntExist).not.toBeInTheDocument();
  });

  it('Verifica se ao clicar em uma categoria duas vezes todas as receitas são renderizadas', async () => {
    const { history } = renderWithRouter(<App />);
    history.push("/foods");

    await waitFor(async () => {
      expect(global.fetch).toBeCalled();
    });

    const { pathname } = history.location;

    expect(pathname).toBe("/foods");

    const categoryBeef = await screen.findByTestId("Beef-category-filter");
    userEvent.click(categoryBeef);
    await waitFor(async () => {
      expect(global.fetch).toBeCalled();
    });

    userEvent.click(await screen.findByTestId("Beef-category-filter"));

    for (let index = 0; index <= 11; index += 1) {
      const recipe = screen.getByTestId(`${index}-card-name`);
      const mockElement = recipes.meals[index].strMeal;
      expect(recipe).toHaveTextContent(mockElement);
    }

    const recipeThatShouldntExist = screen.queryByTestId("12-card-name");
    expect(recipeThatShouldntExist).not.toBeInTheDocument();
  })

  it("Verifica se você é redirecionado ao clicar em um card de receita na pagina de Drinks", async () => {
    const { history } = renderWithRouter(<App />);
    history.push("/drinks");
    await waitFor(async () => {
      expect(global.fetch).toBeCalled();
    });

    expect(history.location.pathname).toBe("/drinks");
    const recipeCard = await screen.findByTestId("2-recipe-card");
    userEvent.click(recipeCard);
    await waitFor(async () => {
      expect(global.fetch).toBeCalled();
    });
    expect(history.location.pathname).toBe("/drinks/13501");
  });

  it("Verifica se você é redirecionado ao clicar em um card de receita na pagina de Foods", async () => {
    const { history } = renderWithRouter(<App />);
    history.push("/foods");

    await waitFor(async () => {
      expect(global.fetch).toBeCalled();
    });

    const { pathname } = history.location;

    expect(pathname).toBe("/foods");
    const recipeCard = await screen.findByTestId("3-recipe-card");
    userEvent.click(recipeCard);

    await waitFor(async () => {
      expect(global.fetch).toBeCalled();
    });

    expect(history.location.pathname).toBe("/foods/53026");
  });
});
