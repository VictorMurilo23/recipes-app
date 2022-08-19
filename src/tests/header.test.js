import App from "../App"
import React from "react"
import renderWithRouter from "./helpers/renderWithRouter"
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";


describe('Testes do Header', () => {
  it('Verifica se Header renderiza na tela', () => {
    const { history } =  renderWithRouter(<App />)
    history.push('/foods')
    const { pathname } = history.location;
    
    expect(pathname).toBe('/foods')
    
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