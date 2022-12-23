import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import context from '../../Context/context';
import './style.css';

export default function Login({ history }) {
  const {
    loginInfo: { login, password },
    setLoginInfo,
  } = useContext(context);

  const [disabled, setDisabled] = useState(true);

  const regexValidate = /^\S+@\S+\.\S+$/;
  const onValidate = regexValidate.test(login);

  const handleDisable = () => {
    const five = 5; // alterar para useEffect se necessário
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
    history.push('/foods');
  };

  return (
    <div className="container-login">
      <div className="container-input">
        <h1>Login</h1>
        <input
          className="input"
          data-testid="email-input"
          type="email"
          placeholder="Digite seu e-mail"
          onChange={ handleChange }
          value={ login }
          name="login"
        />
        <input
          className="input"
          data-testid="password-input"
          type="password"
          placeholder="Digite sua senha"
          onChange={ handleChange }
          value={ password }
          name="password"
        />
      </div>
      <button
        className="button"
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

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
