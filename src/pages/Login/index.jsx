import React, { useContext, useState } from 'react';
import context from '../../Context/loginContext';

export default function Login() {
  const {
    loginInfo: { login, password },
    setLoginInfo,
  } = useContext(context);

  const [disabled, setDisabled] = useState(true);

  // const validateEmail = () => {
  //   return String(login)
  //     .toLowerCase()
  //     .match(/^\S+@\S+\.\S+$/);
  // };

  const regexValidate = /^\S+@\S+\.\S+$/;
  const onValidate = regexValidate.test(login);

  const handleDisable = () => {
    const five = 5; // alterar para useEffect se necessario
    if ((onValidate && login.length > five) && password.length > five) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    handleDisable();
    return setLoginInfo((state) => ({ ...state, [name]: value }));
  };

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email: login }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
  };

  return (
    <div>
      <input
        data-testid="email-input"
        type="email"
        placeholder="Digite seu e-mail"
        onChange={ handleChange }
        value={ login }
        name="login"
      />
      <input
        data-testid="password-input"
        type="password"
        placeholder="Digite sua senha"
        onChange={ handleChange }
        value={ password }
        name="password"
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ disabled }
        onClick={ handleClick }
      >
        Enter
      </button>
    </div>
  );
}
