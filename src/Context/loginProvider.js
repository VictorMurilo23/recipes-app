import React, { useState } from 'react';
import PropTypes from 'prop-types';
import context from './loginContext';

function Provider({ children }) {
  const [loginInfo, setLoginInfo] = useState({ login: '', password: '' });
  const [recipeData, setRecipeData] = useState([]);
  const contextValue = {
    loginInfo,
    setLoginInfo,
    recipeData,
    setRecipeData,
  };

  return (
    <context.Provider value={ contextValue }>
      {children}
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Provider;
