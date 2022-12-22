import App from "../App"
import React from "react"
import renderWithRouter from "./helpers/renderWithRouter"
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/react";
import requestsMock from "./helpers/requestsMock";

jest.spyOn(global, 'alert');
global.alert.mockImplementation(() => {});

afterEach(() => jest.clearAllMocks())

describe('Testes do Header', () => {
  
  beforeEach(requestsMock)

  it('Verifica se Header renderiza na tela', async () => {
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

    userEvent.type(inputSearch, 'garlic')
    userEvent.click(radioIngredient)
    userEvent.click(btnSearchRecipe)

    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })

    userEvent.type(inputSearch, 'A')
    userEvent.click(radioFirstLetter)
    userEvent.click(btnSearchRecipe)

    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })
    
    userEvent.click(btnProfile)
  })

  it('Tela drinks', async () => {
    const { history } =  renderWithRouter(<App />)

    history.push('/drinks')
    
    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })

    expect(history.location.pathname).toBe('/drinks')

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

    userEvent.type(inputSearch, 'Margarita')
    userEvent.click(radioName)
    userEvent.click(btnSearchRecipe)
  
    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })

    userEvent.type(inputSearch, 'Tequila')
    userEvent.click(radioIngredient)
    userEvent.click(btnSearchRecipe)

    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    });

    userEvent.type(inputSearch, 'M')
    userEvent.click(radioFirstLetter)
    userEvent.click(btnSearchRecipe)
    
    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    });
  })
  
  it('Rotas foods', async () => {

    const { history } =  renderWithRouter(<App />)
    
    history.push('/foods')

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

    userEvent.type(inputSearch, 'Tamiya')
    userEvent.click(radioName)
    userEvent.click(btnSearchRecipe)

    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })
    
    expect(history.location.pathname).toBe('/foods')
  })

  it('Rotas drinks', async () => {
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

    userEvent.type(inputSearch, 'abc')
    userEvent.click(radioName)
    userEvent.click(btnSearchRecipe)

    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })

    expect(history.location.pathname).toBe('/drinks')
  })

  it('teste', async () => {
    const { history } =  renderWithRouter(<App />)

    history.push('/foods');

    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })

    const btnSearch = screen.getByRole('button', {
      name: /ícone de pesquisa/i
    })
    userEvent.click(btnSearch)

    const btnSearchRecipe = screen.getByTestId('exec-search-btn')
    userEvent.click(btnSearchRecipe);

    await waitFor(async () => {
      expect(global.fetch).toBeCalled()
    })
  })
})