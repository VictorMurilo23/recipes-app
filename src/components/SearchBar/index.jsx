import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../../Context/loginContext';

import getRecipes, { getRecipesDrinks } from '../../service/serviceApi';


export default function SearchBar() {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');
  const [toggleId, setToggleId] = useState('');
  const { recipeData, setRecipeData, locationPage } = useContext(context);

  useEffect(() => {
    // console.log(recipeData);
    if (!recipeData) {
      global.alert("Sorry, we haven't found any recipes for these filters.");
      return false;
    }
    if (recipeData.length === 1) {
      const { idMeal, idDrink } = recipeData[0];
      history.push(`/${locationPage}/${idMeal || idDrink}`);
    }
    if (recipeData.length > 1) {
      history.push(`/${locationPage}`);
    }
  }, [recipeData]);

  const handleSubmit = async () => {
    // console.log(searchValue.length);
    if (toggleId === 'firstLetter' && searchValue.length !== 1) {
      global.alert('Your search must have only 1 (one) character');
      return false;
    }
    if (locationPage === 'foods') {
      setRecipeData(await getRecipes(toggleId, searchValue));
    }
    if (locationPage === 'drinks') {
      setRecipeData(await getRecipesDrinks(toggleId, searchValue));
    }
  };

  return (
    <div>
      <input
        data-testid="search-input"
        value={ searchValue }
        onChange={ ({ target: { value } }) => setSearchValue(value) }
      />
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => handleSubmit() }
      >
        Search
      </button>
      <div className="container-radio">
        <label htmlFor="ingredient">
          <input
            type="radio"
            name="searchFilter"
            id="ingredient"
            data-testid="ingredient-search-radio"
            onClick={ ({ target: { id } }) => setToggleId(id) }
          />
          Ingredient
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            name="searchFilter"
            id="name"
            data-testid="name-search-radio"
            onClick={ ({ target: { id } }) => setToggleId(id) }
          />
          Name
        </label>
        <label htmlFor="firstLetter">
          <input
            type="radio"
            id="firstLetter"
            name="searchFilter"
            data-testid="first-letter-search-radio"
            onClick={ ({ target: { id } }) => setToggleId(id) }
          />
          First letter
        </label>
      </div>
    </div>
  );
}
