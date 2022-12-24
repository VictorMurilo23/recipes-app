import App from "../App"
import React from "react"
import renderWithRouter from "./helpers/renderWithRouter"
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/react";
import requestsMock from "./mocks/requestsMock";

jest.spyOn(global, 'alert');
global.alert.mockImplementation(() => {});

// afterEach(() => jest.clearAllMocks())

describe('Testes do Header', () => {
  
  beforeEach(requestsMock)

  it('Verifica se Header renderiza na tela Foods', async () => {
    const { history } =  renderWithRouter(<App />)
    
    const email = screen.getByTestId('email-input')
    const password = screen.getByTestId('password-input')
    const btnSubmit = screen.getByTestId('login-submit-btn')
    
    userEvent.type(email, 'test@test.com')
    userEvent.type(password, '1234567')
    userEvent.click(btnSubmit)

    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })

    const headerTitle = screen.getByText('Foods');
    const btnProfile = screen.getByRole('button', {
      name: /imagem perfil/i
    })
    const btnSearch = screen.getByRole('button', {
      name: /ícone de pesquisa/i
    })
    
    expect(headerTitle).toBeDefined()
    expect(btnProfile).toBeDefined()
    expect(btnSearch).toBeDefined()
  })

  it('Verifica se é feito um redirecionamento pra tela de perfil ao clicar no icone de perfil', async () => {
    const { history } =  renderWithRouter(<App />)
    
    const email = screen.getByTestId('email-input')
    const password = screen.getByTestId('password-input')
    const btnSubmit = screen.getByTestId('login-submit-btn')
    
    userEvent.type(email, 'test@test.com')
    userEvent.type(password, '1234567')
    userEvent.click(btnSubmit)

    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })

    const btnProfile = screen.getByRole('button', {
      name: /imagem perfil/i
    })
    userEvent.click(btnProfile)

    expect(history.location.pathname).toBe('/profile')
  })

  it('Verifica se é possível pesquisar receitas no Header de Foods', async () => {
    const { history } =  renderWithRouter(<App />)
    
    const email = screen.getByTestId('email-input')
    const password = screen.getByTestId('password-input')
    const btnSubmit = screen.getByTestId('login-submit-btn')
    
    userEvent.type(email, 'test@test.com')
    userEvent.type(password, '1234567')
    userEvent.click(btnSubmit)

    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })

    const btnSearch = screen.getByRole('button', {
      name: /ícone de pesquisa/i
    })

    userEvent.click(btnSearch)

    const inputSearch = screen.getByTestId('search-input')
    const btnSearchRecipe = screen.getByTestId('exec-search-btn')
    const radioName = screen.getByRole('radio', {
      name: /name/i
    })
    const radioIngredient = screen.getByRole('radio', {
      name: /ingredient/i
    })
    const radioFirstLetter = screen.getByRole('radio', {
      name: /first letter/i
    })
    
    userEvent.type(inputSearch, 'Arrabiata')
    userEvent.click(radioName)
    userEvent.click(btnSearchRecipe)
    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })
    for(let index = 0; index <= 11; index += 1 ) {
      const recipe = screen.getByTestId(`${index}-card-name`)
      expect(recipe).toBeDefined();
    }

    userEvent.type(inputSearch, 'garlic')
    userEvent.click(radioIngredient)
    userEvent.click(btnSearchRecipe)
    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })
    for(let index = 0; index <= 11; index += 1 ) {
      const recipe = screen.getByTestId(`${index}-card-name`)
      expect(recipe).toBeDefined();
    }

    userEvent.type(inputSearch, 'A')
    userEvent.click(radioFirstLetter)
    userEvent.click(btnSearchRecipe)

    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })
    for(let index = 0; index <= 3; index += 1 ) {
      const recipe = screen.getByTestId(`${index}-card-name`)
      expect(recipe).toBeDefined();
    }
  })

  it('Verifica se Header renderiza na tela Foods', async () => {
    const { history } =  renderWithRouter(<App />)

    history.push('/drinks')
    
    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })

    expect(history.location.pathname).toBe('/drinks')

    const headerTitle = screen.getByText('Drinks');
    const btnProfile = screen.getByRole('button', {
      name: /imagem perfil/i
    })
    const btnSearch = screen.getByRole('button', {
      name: /ícone de pesquisa/i
    })
    
    expect(headerTitle).toBeDefined()
    expect(btnProfile).toBeDefined()
    expect(btnSearch).toBeDefined()
  })
  
  it('Verifica se é possível fazer pesquisas no Header de drinks', async () => {
    const { history } =  renderWithRouter(<App />)

    history.push('/drinks')

    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })

    const btnSearch = screen.getByRole('button', {
      name: /ícone de pesquisa/i
    })
    userEvent.click(btnSearch)
    
    const inputSearch = screen.getByTestId('search-input')
    const btnSearchRecipe = screen.getByTestId('exec-search-btn')
    const radioName = screen.getByRole('radio', {
      name: /name/i
    })

    userEvent.type(inputSearch, 'Margarita')
    userEvent.click(radioName)
    userEvent.click(btnSearchRecipe)
    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })

    for(let index = 0; index <= 11; index += 1 ) {
      const recipe = screen.getByTestId(`${index}-card-name`)
      expect(recipe).toBeDefined();
    }

    expect(history.location.pathname).toBe('/drinks')
  })

  it('Verifica se ao tentar fazer uma pesquisa com mais de uma letra, com o radio de first letter marcado, o alert é chamado', async () => {
    const { history } =  renderWithRouter(<App />)

    history.push('/drinks')

    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })

    const btnSearch = screen.getByRole('button', {
      name: /ícone de pesquisa/i
    })
    userEvent.click(btnSearch)
    
    const inputSearch = screen.getByTestId('search-input')
    const btnSearchRecipe = screen.getByTestId('exec-search-btn')
    const radioFirstLetter = screen.getByRole('radio', {
      name: /first letter/i
    })

    userEvent.type(inputSearch, 'Teste')
    userEvent.click(radioFirstLetter)
    userEvent.click(btnSearchRecipe)

    expect(global.alert).toBeCalledWith('Your search must have only 1 (one) character');
  })

  it('Verifica se ao tentar fazer uma pesquisa de uma receita que não existe, o alert é chamado', async () => {
    const { history } =  renderWithRouter(<App />)

    history.push('/drinks')

    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })

    const btnSearch = screen.getByRole('button', {
      name: /ícone de pesquisa/i
    })
    userEvent.click(btnSearch)
    
    const inputSearch = screen.getByTestId('search-input')
    const btnSearchRecipe = screen.getByTestId('exec-search-btn')

    userEvent.type(inputSearch, 'xablau')
    userEvent.click(btnSearchRecipe)
    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })
    expect(global.alert).toBeCalledWith("Sorry, we haven't found any recipes for these filters.");
  })

  it('Verifica se ao fazer uma pesquisa que retorne só uma receita, a página é redirecionada', async () => {
    const { history } =  renderWithRouter(<App />)

    history.push('/drinks')

    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })

    const btnSearch = screen.getByRole('button', {
      name: /ícone de pesquisa/i
    })
    userEvent.click(btnSearch)
    
    const inputSearch = screen.getByTestId('search-input')
    const btnSearchRecipe = screen.getByTestId('exec-search-btn')
    const radioFirstLetter = screen.getByRole('radio', {
      name: /first letter/i
    })

    userEvent.type(inputSearch, 'p')
    userEvent.click(radioFirstLetter)
    // expect(radioName).toBeChecked()
    userEvent.click(btnSearchRecipe)
    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })
    // expect(global.alert).toBeCalled()
    await waitFor(async () => {
    expect(history.location.pathname).toBe('/drinks/12776') 
      // expect(global.fetch).toBeCalled()
    })
  })
})