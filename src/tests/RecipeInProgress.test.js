import { screen, waitFor } from "@testing-library/react"
import App from "../App";
import renderWithRouter from "./helpers/renderWithRouter";
import userEvent from "@testing-library/user-event";
import copy from 'clipboard-copy'
import requestsMock from "./mocks/requestsMock";
import abcRecipe from "./mocks/mockAbc";

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe('Testes do RecipeInProgress', () => {
  jest.spyOn(navigator.clipboard, "writeText");
  beforeAll(() => {
    copy();
  });
  beforeEach(requestsMock);

  it('Verifica se todos os elementos necessarios estão renderizados na tela de detalhes da receita ABC', async () => {
    const { history } =  renderWithRouter(<App />)
    history.push('/drinks')
    await waitFor(async () => {
      expect(global.fetch).toBeCalled();
    });

    expect(history.location.pathname).toBe('/drinks')
    const recipeCard = await screen.findByTestId('2-recipe-card')
    userEvent.click(recipeCard);
  
    await waitFor(async () => {
      expect(global.fetch).toBeCalled();
    });

    const btnStart = await screen.findByTestId("start-recipe-btn")
    userEvent.click(btnStart);

    await waitFor(async () => {
      expect(global.fetch).toBeCalled();
    });

    const ingredientsCheckboxes = await screen.findAllByRole('checkbox');
    expect(ingredientsCheckboxes).toHaveLength(3);
    expect(screen.getByTestId('recipe-title')).toHaveTextContent(abcRecipe.drinks[0].strDrink);
    expect(screen.getByTestId('recipe-category')).toHaveTextContent(abcRecipe.drinks[0].strAlcoholic);
    expect(screen.getByTestId('instructions')).toHaveTextContent(abcRecipe.drinks[0].strInstructions);
    expect(screen.getByTestId('recipe-photo').src).toBe(abcRecipe.drinks[0].strDrinkThumb);
  });

  it('Verifica se é possível favoritar uma receita em progresso', async () => {
    const { history } =  renderWithRouter(<App />)
    history.push('/drinks')

    await waitFor(async () => {
      expect(global.fetch).toBeCalled();
    });

    expect(history.location.pathname).toBe('/drinks')
    const recipeCard = await screen.findByTestId('2-recipe-card')
    userEvent.click(recipeCard);
  
    await waitFor(async () => {
      expect(global.fetch).toBeCalled();
    });
    
    const btnStart = await screen.findByTestId("start-recipe-btn")
    userEvent.click(btnStart);
    
    await waitFor(async () => {
      expect(global.fetch).toBeCalled();
    });
    
    expect(screen.getByAltText('no favorite')).toBeDefined()

    const btnFavorite = await screen.findByTestId('favorite-btn')

    userEvent.click(btnFavorite);

    expect(screen.getByAltText('favorite')).toBeDefined();
  })

  it('Verifica se é possível desfavoritar uma receita em progresso', async () => {
    const { history } =  renderWithRouter(<App />)
    history.push('/drinks')

    await waitFor(async () => {
      expect(global.fetch).toBeCalled();
    });

    expect(history.location.pathname).toBe('/drinks')
    const recipeCard = await screen.findByTestId('2-recipe-card')
    userEvent.click(recipeCard);
  
    await waitFor(async () => {
      expect(global.fetch).toBeCalled();
    });
    
    const btnStart = await screen.findByTestId("start-recipe-btn")
    userEvent.click(btnStart);
    
    await waitFor(async () => {
      expect(global.fetch).toBeCalled();
    });
    
    expect(screen.getByAltText('favorite')).toBeDefined()

    const btnFavorite = await screen.findByTestId('favorite-btn')

    userEvent.click(btnFavorite);

    expect(screen.getByAltText('no favorite')).toBeDefined();
  })

  it('Verifica se é possível copiar o link de uma receita em progresso', async () => {
    const { history } =  renderWithRouter(<App />)
    history.push('/drinks')

    await waitFor(async () => {
      expect(global.fetch).toBeCalled();
    });

    expect(history.location.pathname).toBe('/drinks')
    const recipeCard = await screen.findByTestId('2-recipe-card')
    userEvent.click(recipeCard);
  
    await waitFor(async () => {
      expect(global.fetch).toBeCalled();
    });
    
    const btnStart = await screen.findByTestId("start-recipe-btn")
    userEvent.click(btnStart);
    
    await waitFor(async () => {
      expect(global.fetch).toBeCalled();
    });

    const btnShare = await screen.findByTestId('share-btn');
    userEvent.click(btnShare);
    expect(navigator.clipboard.writeText).toHaveBeenCalled()
    const linkCopied = screen.getByText(/link copied/i)
    expect(linkCopied).toBeDefined();
  })

  it('Verifica se é possivel copiar o link de uma receita de foods', async () => {
    const { history } =  renderWithRouter(<App />)
    history.push('/foods')
    await waitFor(async () => {
      expect(global.fetch).toBeCalled();
    });

    const { pathname } = history.location;

    expect(pathname).toBe('/foods')
    const recipeCard = await screen.findByTestId('3-recipe-card');
    userEvent.click(recipeCard);
    await waitFor(async () => {
      expect(global.fetch).toBeCalled();
    });

    const btnStart = await screen.findByTestId("start-recipe-btn")
    userEvent.click(btnStart);

    await waitFor(async () => {
      expect(global.fetch).toBeCalled();
    });

    const btnShare = await screen.findByTestId('share-btn');
    userEvent.click(btnShare);
    expect(navigator.clipboard.writeText).toHaveBeenCalled()
    const linkCopied = screen.getByText(/link copied/i)
    expect(linkCopied).toBeDefined();
  })

  it('Verifica se o botão de finalizar receita fica desablilitado ao deixar de marcar todas as checkboxes', async () => {
    const { history } =  renderWithRouter(<App />)
    history.push('/foods')
    await waitFor(async () => {
      expect(global.fetch).toBeCalled();
    });

    const { pathname } = history.location;

    expect(pathname).toBe('/foods')
    const recipeCard = await screen.findByTestId('3-recipe-card');
    userEvent.click(recipeCard);
    await waitFor(async () => {
      expect(global.fetch).toBeCalled();
    });

    const btnStart = await screen.findByTestId("start-recipe-btn")
    userEvent.click(btnStart);

    await waitFor(async () => {
      expect(global.fetch).toBeCalled();
    });

    const checkbox = await screen.findAllByRole('checkbox');
    for(let index = 0; index < checkbox.length - 1; index += 1) {
      userEvent.click(checkbox[index]);
    }

    const finishRecipe = screen.getByTestId('finish-recipe-btn')
    expect(finishRecipe).toBeDisabled()
  })

  it('Verifica se o botão de finalizar receita fica habilitado ao marcar todas as checkboxes', async () => {
    const { history } =  renderWithRouter(<App />)
    history.push('/drinks')
    await waitFor(async () => {
      expect(global.fetch).toBeCalled();
    });

    expect(history.location.pathname).toBe('/drinks')
    const recipeCard = await screen.findByTestId('2-recipe-card')
    userEvent.click(recipeCard);
  
    await waitFor(async () => {
      expect(global.fetch).toBeCalled();
    });

    const btnStart = await screen.findByTestId("start-recipe-btn")
    userEvent.click(btnStart);

    await waitFor(async () => {
      expect(global.fetch).toBeCalled();
    });

    const checkbox = await screen.findAllByRole('checkbox');
    for(let index = 0; index < checkbox.length; index += 1) {
      userEvent.click(checkbox[index]);
    }

    const finishRecipe = screen.getByTestId('finish-recipe-btn')
    expect(finishRecipe).toBeEnabled();
  })

  it('Verifica se ao voltar pra uma receita em que todas as checkboxes foram marcadas no passado, elas continuam marcadas', async () => {
    const { history } =  renderWithRouter(<App />)
    history.push('/drinks')
    await waitFor(async () => {
      expect(global.fetch).toBeCalled();
    });

    expect(history.location.pathname).toBe('/drinks')
    const recipeCard = await screen.findByTestId('2-recipe-card')
    userEvent.click(recipeCard);
  
    await waitFor(async () => {
      expect(global.fetch).toBeCalled();
    });

    const btnStart = await screen.findByTestId("start-recipe-btn")
    userEvent.click(btnStart);

    await waitFor(async () => {
      expect(global.fetch).toBeCalled();
    });

    const checkbox = await screen.findAllByRole('checkbox');
    for(let index = 0; index < checkbox.length; index += 1) {
      expect(checkbox[index]).toBeChecked()
    }

    userEvent.click(checkbox[0])

    expect(checkbox[0]).not.toBeChecked()
    userEvent.click(checkbox[0])

    const finishRecipe = screen.getByTestId('finish-recipe-btn')
    expect(finishRecipe).toBeEnabled()
    userEvent.click(finishRecipe);

    expect(history.location.pathname).toBe('/done-recipes')
  })
})
