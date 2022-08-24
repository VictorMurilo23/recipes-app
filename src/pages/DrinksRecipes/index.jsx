import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getDrinksDetail } from '../../service/serviceApi';
import RecipeDetails from '../../components/RecipeDetails';

export default function DrinksRecipes({ match: { params: { id } } }) {
  const [recipeDrink, setRecipeDrink] = useState('');
  useEffect(() => {
    const getDrinks = async () => {
      const data = await getDrinksDetail(id);
      setRecipeDrink(data);
    };
    getDrinks();
  }, []);

  if (recipeDrink === '') {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <RecipeDetails data={ recipeDrink[0] } typePage="drinks" />
    </div>
  );
}

DrinksRecipes.propTypes = {
  match: PropTypes.shape(
    { params: PropTypes.shape(
      { id: PropTypes.number.isRequired },
    ).isRequired,
    }.isRequired,
  ).isRequired,
};
