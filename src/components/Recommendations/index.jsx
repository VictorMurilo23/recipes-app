import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getMealsOrDrinks } from '../../service/serviceApi';
import './style.css';

export default function Recommendations({ typePage }) {
  const [recipesRecommender, setRecipesRecommender] = useState([]);
  const imgUrl = typePage === 'drinks' ? 'strMealThumb' : 'strDrinkThumb';
  const title = typePage === 'drinks' ? 'strMeal' : 'strDrink';

  const invertTypePage = typePage === 'drinks' ? 'food' : 'drink';
  const SIX = 6;

  useEffect(() => {
    const getResults = async () => {
      const data = await getMealsOrDrinks(invertTypePage);
      setRecipesRecommender(data.splice(0, SIX));
    };
    getResults();
  }, [invertTypePage]);

  console.log(recipesRecommender);

  return (
    <div className="container-recommended">
      { recipesRecommender.map((elem, index) => (
        <div
          className="card-recommended"
          key={ index }
          data-testid={ `${index}-recomendation-card` }
        >
          <span>{ elem[title] }</span>
          <img className="img-recommended" src={ elem[imgUrl] } alt={ elem[title] } />
        </div>
      )) }
    </div>
  );
}

Recommendations.propTypes = {
  typePage: PropTypes.string,
}.isRequired;
