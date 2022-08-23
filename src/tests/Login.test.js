import { render, screen } from "@testing-library/react"
import App from "../App";
import renderWithRouter from "./helpers/renderWithRouter";
import userEvent from "@testing-library/user-event";

describe('1. Login page tests', () => {
  it('a. renders correctly', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const enterBtn = screen.getByTestId('login-submit-btn');

    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(enterBtn).toBeDefined();
  })
  it('a. enables "enter" button correctly', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const enterBtn = screen.getByTestId('login-submit-btn');
    
    userEvent.type(emailInput, 'teste@teste.com')
    userEvent.type(passwordInput, '1234567')
    userEvent.click(enterBtn)
  })
})