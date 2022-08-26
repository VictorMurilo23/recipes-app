import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import Recommendations from '../Recommendations';
import './style.css';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

export default function RecipeDetails({ data, typePage }) {
  const history = useHistory();
  const [validadeShare, setValidadeShare] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const area = data.strArea ? data.strArea : '';
  const alcoholic = data.strAlcoholic ? data.strAlcoholic : '';
  const type = typePage === 'drinks' ? 'drink' : 'food';
  const id = typePage === 'drinks' ? data.idDrink : data.idMeal;
  const imgUrl = typePage === 'drinks' ? data.strDrinkThumb : data.strMealThumb;
  const title = typePage === 'drinks' ? data.strDrink : data.strMeal;
  const instruction = data.strInstructions;
  const categoryText = typePage === 'drinks' ? data.strAlcoholic : data.strCategory;
  const ingredientsArray = Object.keys(data)
    .filter((ingredients) => ingredients
      .includes('strIngredient') && data[ingredients]);

  const endPointVideo = typePage === 'foods' && data.strYoutube.split('=')[1];

  const measureArray = ingredientsArray
    .map((_measure, index) => `strMeasure${index + 1}`);

  const isRecipeOnGoing = () => {
    if (localStorage.getItem('inProgressRecipes')) {
      const inProgressRecipes = localStorage.getItem('inProgressRecipes')
        && JSON.parse(localStorage.getItem('inProgressRecipes'));
      const key = typePage === 'foods' ? 'meals' : 'cocktails';
      const keys = Object.keys(inProgressRecipes[key]);
      return keys.includes(id);
    }
    return false;
  };

  const startRecipes = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
    const ingre = ingredientsArray
      .map((_elem, index) => data[ingredientsArray[index]]);
    const key = typePage === 'foods' ? 'meals' : 'cocktails';
    const invertKey = typePage === 'foods' ? 'cocktails' : 'meals';
    const teste = inProgressRecipes[key] && inProgressRecipes[key][id]
      ? [...inProgressRecipes[key][id]]
      : ingre;
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      [key]: {
        ...inProgressRecipes[key],
        [id]: teste,
      },
      [invertKey]: {
        ...inProgressRecipes[invertKey],
      },
    }));
    history.push(`/${typePage}/${id}/in-progress`);
  };

  const handleCopy = () => {
    copy(window.location.href);
    setValidadeShare(true);
  };

  const favoriteClick = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (favorite) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(
        favoriteRecipes.filter(({ id: idSome }) => idSome !== id),
      ));
      setFavorite(false);
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([
        ...favoriteRecipes,
        {
          id,
          type,
          nationality: area,
          category: data.strCategory,
          alcoholicOrNot: alcoholic,
          name: title,
          image: imgUrl,
        },
      ]));
      setFavorite(true);
    }
  };

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const validationFavorite = favoriteRecipes.some(({ id: idSome }) => idSome === id);
    setFavorite(validationFavorite);
  }, [id]);

  return (
    <div>
      <h2 data-testid="recipe-title">{title}</h2>
      <img
        src={ imgUrl }
        alt={ title }
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-category">{categoryText}</p>
      <p data-testid="instructions">{instruction}</p>
      { typePage === 'foods'
      && <iframe
        data-testid="video"
        width="560"
        height="315"
        src={ `https://www.youtube.com/embed/${endPointVideo}` }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer;
      autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />}
      <div>
        { ingredientsArray.map((_elem, index) => (
          <p
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {data[ingredientsArray[index]]}
            {data[measureArray[index]]}
          </p>
        ))}
      </div>
      <div>
        <div>
          <button
            className="handle-btn"
            type="button"
            data-testid="share-btn"
            onClick={ handleCopy }
          >
            <img src={ shareIcon } alt="share" />
          </button>
          <button
            className="handle-btn"
            type="button"
            data-testid="favorite-btn"
            onClick={ favoriteClick }
            src={ favorite ? blackHeartIcon : whiteHeartIcon }

          >
            { favorite ? <img src={ blackHeartIcon } alt="favorite" />
              : <img src={ whiteHeartIcon } alt="no favorite" /> }
          </button>
        </div>
        {
          validadeShare && <span>Link copied!</span>
        }
      </div>
      <Recommendations typePage={ typePage } />
      <button
        type="button"
        className="start-recipe-btn"
        data-testid="start-recipe-btn"
        onClick={ () => startRecipes() }
      >
        {
          isRecipeOnGoing() ? 'Continue Recipe' : 'Start Recipe'
        }
      </button>
    </div>
  );
}

RecipeDetails.propTypes = {
  data: PropTypes.shape({
    strCategory: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strInstructions: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }),
  typePage: PropTypes.string,
}.isRequired;
