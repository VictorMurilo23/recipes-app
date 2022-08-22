import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeCard({ recipe, index }) {
  const image = !recipe.strDrinkThumb ? recipe.strMealThumb : recipe.strDrinkThumb;
  const name = !recipe.strDrink ? recipe.strMeal : recipe.strDrink;
  return (
    <div
      data-testid={ `${index}-recipe-card` }
    >
      <img src={ image } alt="Imagem receita" data-testid={ `${index}-card-img` } />
      <p data-testid={ `${index}-card-name` }>{name}</p>
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    strDrinkThumb: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
