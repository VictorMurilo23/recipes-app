import React, { useState, useEffect, useContext } from 'react';
import context from '../../Context/loginContext';
import getRecipes from '../../service/serviceApi';

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const [toggleId, setToggleId] = useState('');
  const { recipeData, setRecipeData } = useContext(context);

  useEffect(() => {
    setToggleId(toggleId);
  }, [toggleId]);

  console.log(recipeData);

  const handleSubmit = async () => {
    if (toggleId === 'firstLetter' && searchValue.length !== 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    setRecipeData(await getRecipes(toggleId, searchValue));
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
