import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './style.css';

export default function RecipeCard({ recipe, index }) {
  const history = useHistory();
  const id = !recipe.idDrink ? recipe.idMeal : recipe.idDrink;
  const image = !recipe.strDrinkThumb ? recipe.strMealThumb : recipe.strDrinkThumb;
  const name = !recipe.strDrink ? recipe.strMeal : recipe.strDrink;

  const redirect = () => {
    const path = !recipe.idDrink ? `/foods/${id}` : `/drinks/${id}`;
    history.push(path);
  };

  return (
    <div
      onClick={ redirect }
      aria-hidden="true"
      data-testid={ `${index}-recipe-card` }
      className="container-recipe"
    >
      <img
        className="image-foods"
        src={ image }
        alt="Imagem receita"
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ `${index}-card-name` }>{name}</p>
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    strDrinkThumb: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrink: PropTypes.string,
    strMeal: PropTypes.string,
    idDrink: PropTypes.string,
    idMeal: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
