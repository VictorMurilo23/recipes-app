import { screen } from "@testing-library/react"
import App from "../App";
import renderWithRouter from "./helpers/renderWithRouter";
import userEvent from "@testing-library/user-event";

describe('1. Login page tests', () => {
  it('Renderiza corretamente', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const enterBtn = screen.getByTestId('login-submit-btn');

    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(enterBtn).toBeDefined();
  })

  it('Verifica se o botão de submit continua desabilitado ao inserir um email inválido', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const enterBtn = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'teste')
    userEvent.type(passwordInput, '2234567890')

    expect(enterBtn).toBeDisabled()
  })

  it('Verifica se o botão de submit continua desabilitado ao inserir uma senha com menos de 6 caracteres', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const enterBtn = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'teste@gmail.com')
    userEvent.type(passwordInput, '1111')

    expect(enterBtn).toBeDisabled()
  })

  it('Habilita o botão enter corretamente', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const enterBtn = screen.getByTestId('login-submit-btn');
    
    userEvent.type(emailInput, 'teste@teste.com')
    userEvent.type(passwordInput, '1234567')
    expect(enterBtn).toBeEnabled()
    userEvent.click(enterBtn)
  })
})