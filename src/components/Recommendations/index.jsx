import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getMealsOrDrinks } from '../../service/serviceApi';
import './style.css';

export default function Recommendations({ typePage }) {
  const [recipesRecommender, setRecipesRecommender] = useState([]);
  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(1);

  const imgUrl = typePage === 'drinks' ? 'strMealThumb' : 'strDrinkThumb';
  const title = typePage === 'drinks' ? 'strMeal' : 'strDrink';

  const invertTypePage = typePage === 'drinks' ? 'food' : 'drink';
  const SIX = 6;

  const BLOCK = { display: 'block' };
  const NONE = { display: 'none' };

  const updateIndexCarousel = (next) => {
    if (!next) {
      setCurrentIndex1((currentIndex1 + recipesRecommender
        .length - 1) % recipesRecommender.length);
      setCurrentIndex2((currentIndex2 + recipesRecommender
        .length - 1) % recipesRecommender.length);
    }
    if (next) {
      setCurrentIndex1((currentIndex1 + 1) % recipesRecommender.length);
      setCurrentIndex2((currentIndex2 + 1) % recipesRecommender.length);
    }
  };

  useEffect(() => {
    const getResults = async () => {
      const data = await getMealsOrDrinks(invertTypePage);
      setRecipesRecommender(data.slice(0, SIX));
    };
    getResults();
  }, [invertTypePage]);

  return (
    <div className="container-recommended">
      <button
        name="prev"
        type="button"
        onClick={ () => updateIndexCarousel(false) }
      >
        Prev
      </button>
      { recipesRecommender
        .map((elem, index) => (
          <div
            className="card-recommended"
            key={ index }
            style={ index === currentIndex1 || index === currentIndex2 ? BLOCK : NONE }
            data-testid={ `${index}-recomendation-card` }
          >
            <p data-testid={ `${index}-recomendation-title` }>{ elem[title] }</p>
            <img className="img-recommended" src={ elem[imgUrl] } alt={ elem[title] } />
          </div>
        )) }
      <button
        name="next"
        type="button"
        onClick={ () => updateIndexCarousel(true) }
      >
        Next
      </button>
    </div>
  );
}

Recommendations.propTypes = {
  typePage: PropTypes.string,
}.isRequired;
