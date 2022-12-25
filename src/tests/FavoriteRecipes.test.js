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

describe('Testes do FavoriteRecipes', () => {
  jest.spyOn(navigator.clipboard, "writeText");
  beforeAll(() => {
    copy();
  });

  beforeEach(requestsMock);

  it('Verifica se é renderizado um drink, de uma receita finalizada, na pagina DoneRecipes', async () => {
    const { history } =  renderWithRouter(<App />)
    history.push('/drinks')
    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    });
    
    expect(history.location.pathname).toBe('/drinks')

    const recipeCard = await screen.findByTestId('2-recipe-card')
    userEvent.click(recipeCard);

    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    });

    const btnFavorite = screen.getByTestId("favorite-btn")
    userEvent.click(btnFavorite);
    
    history.push('/favorite-recipes');
    
    await waitFor(async () => {
      expect(history.location.pathname).toBe('/favorite-recipes')
    });

    expect(screen.getByText('ABC')).toBeDefined()
  });

  it('Verifica se é possível remover uma receita favorita', async () => {
    const { history } =  renderWithRouter(<App />)
    history.push('/favorite-recipes');
    await waitFor(async () => {
      expect(history.location.pathname).toBe('/favorite-recipes');
    });

    const favoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');

    userEvent.click(favoriteBtn)

    expect(screen.queryByText('ABC')).not.toBeInTheDocument()
  });

  it('Verifica se é possível filtrar as receitas favoritas.', async () => {
    const { history } =  renderWithRouter(<App />)
    history.push('/foods')
    expect(history.location.pathname).toBe('/foods')
    
    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    });
    
    userEvent.click(await screen.findByTestId('3-recipe-card'));
    
    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    });
  
    userEvent.click(screen.getByTestId("favorite-btn"));

    history.push('/drinks')
    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    });
    
    expect(history.location.pathname).toBe('/drinks')

    userEvent.click(await screen.findByTestId('2-recipe-card'));

    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    });

    userEvent.click(screen.getByTestId("favorite-btn"));

    history.push('/favorite-recipes');
    await waitFor(async () => {
      expect(history.location.pathname).toBe('/favorite-recipes');
    });

    const filterDrink = await screen.findByAltText('Ícone Drink')
    userEvent.click(filterDrink);
    const doneDrinks = screen.getByText('ABC')
    expect(doneDrinks).toBeDefined();
    expect(screen.queryByTestId('1-horizontal-name')).not.toBeInTheDocument() // verifica se tem mais de uma comida.
    
    const filterFood = await screen.findByAltText('Ícone Food')
    userEvent.click(filterFood);
    
    expect(screen.getByText('Tamiya')).toBeDefined();

    expect(screen.queryByTestId('1-horizontal-name')).not.toBeInTheDocument() // verifica se tem mais de uma comida.

    const filterAll = await screen.findByTestId('filter-by-all-btn')
    userEvent.click(filterAll);

    expect(screen.queryByTestId('3-horizontal-name')).not.toBeInTheDocument() // verificando se não tem mais de 3 comidas.
  })

  it('Verifica se é renderizado um texto com o conteúdo "Link copied!" ao clicar no botão de copiar o link de um food', async () => {
    const { history } =  renderWithRouter(<App />)
    history.push('/favorite-recipes');
    await waitFor(async () => {
      expect(history.location.pathname).toBe('/favorite-recipes');
    });

    const recipeZeroShare = await screen.findByTestId(`0-horizontal-share-btn`);
    userEvent.click(recipeZeroShare);
    
    const linkCopied = screen.getByText('Link copied!')
    expect(linkCopied).toBeDefined()
    
    await waitFor(async () => {
      expect(screen.queryByText('Link copied!')).not.toBeInTheDocument()
    }, { timeout: 3000 });
  })

  it('Verifica se é renderizado um texto com o conteúdo "Link copied!" ao clicar no botão de copiar o link de um drink', async () => {
    const { history } =  renderWithRouter(<App />)
    history.push('/favorite-recipes');
    await waitFor(async () => {
      expect(history.location.pathname).toBe('/favorite-recipes');
    });

    const recipeZeroShare = await screen.findByTestId(`1-horizontal-share-btn`);
    userEvent.click(recipeZeroShare);
    
    const linkCopied = screen.getByText('Link copied!')
    expect(linkCopied).toBeDefined()
    
    await waitFor(async () => {
      expect(screen.queryByText('Link copied!')).not.toBeInTheDocument()
    }, { timeout: 3000 });
  })

  it('Verifica o redirecionamento dos cards de receitas', async () => {
    const { history } =  renderWithRouter(<App />)
    history.push('/favorite-recipes');
    await waitFor(async () => {
      expect(history.location.pathname).toBe('/favorite-recipes');
    });

    const redirect = await screen.findByTestId('0-horizontal-image')
    userEvent.click(redirect);
    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    });
    expect(history.location.pathname).toBe('/foods/53026')
    history.push('/favorite-recipes')

    const redirect2 = await screen.findByTestId('1-horizontal-name')
    userEvent.click(redirect2);
    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    });
    expect(history.location.pathname).toBe('/drinks/13501')
    history.push('/favorite-recipes')
  })
})