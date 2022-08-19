import React from 'react';
// import context from '../../Context/loginContext';

export default function Login() {
  // const { value } = useContext(context);

  // console.log(value);

  // const handleChange = ({ target }) => {
  //   const { name, value } = target;
  //   setAlguma([name]: value);
  // };

  return (
    <div>
      <input
        data-testid="email-input"
        type="email"
        placeholder="Digite seu e-mail"
        // onChange={ handleChange() }
        // value={ value.loginInfo.login }
      />
      <input
        data-testid="password-input"
        type="password"
        placeholder="Digite sua senha"
        // onChange={ handleChange() }
        // value={ value.loginInfo.password }
      />
      <button type="button" data-testid="login-submit-btn">
        Enter
      </button>
    </div>
  );
}
