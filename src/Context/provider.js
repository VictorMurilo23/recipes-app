import React, { useState } from 'react';
import PropTypes from 'prop-types';
import context from './context';

function Provider({ children }) {
  const [loginInfo, setLoginInfo] = useState({ login: '', password: '' });
  const [recipeData, setRecipeData] = useState([]);
  const [locationPage, setLocationPage] = useState('');
  const [unfilteredFavRecipes, setUnfilteredFavRecipes] = useState([]);
  const [favRecipes, setFavRecipes] = useState([]);
  const [unfilteredDoneRecipes, setUnfilteredDoneRecipes] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);

  const removeFavorite = (idComp) => {
    const filter = favRecipes.filter(({ id }) => id !== idComp);

    localStorage.setItem('favoriteRecipes', JSON.stringify(filter));
    setFavRecipes(filter);
  };

  const contextValue = {
    loginInfo,
    setLoginInfo,
    recipeData,
    setRecipeData,
    locationPage,
    setLocationPage,
    unfilteredFavRecipes,
    setUnfilteredFavRecipes,
    favRecipes,
    setFavRecipes,
    removeFavorite,
    unfilteredDoneRecipes,
    setUnfilteredDoneRecipes,
    doneRecipes,
    setDoneRecipes,
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
