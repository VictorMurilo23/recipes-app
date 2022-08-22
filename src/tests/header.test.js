import App from "../App"
import React from "react"
import renderWithRouter from "./helpers/renderWithRouter"
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";


describe('Testes do Header', () => {
  it('Verifica se Header renderiza na tela', () => {
    const { history } =  renderWithRouter(<App />)
    
    const email = screen.getByTestId('email-input')
    const password = screen.getByTestId('password-input')
    const btnSubmit = screen.getByTestId('login-submit-btn')
    
    userEvent.type(email, 'test@test.com')
    userEvent.type(password, '1234567')
    userEvent.click(btnSubmit)
    
    const { pathname } = history.location;

    
    const btnProfile = screen.getByRole('button', {
      name: /imagem perfil/i
    })

    const btnSearch = screen.getByRole('button', {
      name: /ícone de pesquisa/i
    })
    
    userEvent.click(btnSearch)
    userEvent.click(btnProfile)
  })
})