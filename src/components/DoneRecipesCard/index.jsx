import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../../images/shareIcon.svg';

export default function DoneRecipesCard({ recipe, index }) {
  const {
    name: recipeName,
    category,
    nationality,
    image,
    id,
    alcoholicOrNot,
    type,
    doneDate,
    tags,
  } = recipe;
  const history = useHistory();
  const [validateShare, setValidateShare] = useState(false);

  const twoSeconds = 2000;

  const handleCopy = (recipeId, recipeType) => {
    if (recipeType === 'food') {
      copy(`http://localhost:3000/foods/${recipeId}`);
      setValidateShare(true);
    } else {
      copy(`http://localhost:3000/drinks/${recipeId}`);
      setValidateShare(true);
    }

    setTimeout(() => {
      setValidateShare(false);
    }, twoSeconds);
  };

  const handleRedirect = (recipeId, recipeType) => {
    if (recipeType === 'food') {
      history.push(`/foods/${recipeId}`);
    } else {
      history.push(`/drinks/${recipeId}`);
    }
  };

  return (
    <div key={ index } className="done-recipe">
      <p
        data-testid={ `${index}-horizontal-name` }
        aria-hidden="true"
        onClick={ () => handleRedirect(id, type) }
      >
        {recipeName}
      </p>
      <p
        data-testid={ `${index}-horizontal-done-date` }
        aria-hidden="true"
        onClick={ () => handleRedirect(id, type) }
      >
        {doneDate}
      </p>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {`${nationality} - ${category} ${alcoholicOrNot}`}
      </p>
      <div>
        {tags.length > 0
          && tags.map((element) => (
            <p data-testid={ `${index}-${element}-horizontal-tag` } key={ element }>
              {element}
            </p>
          ))}
      </div>
      <button type="button" onClick={ () => handleRedirect(id, type) }>
        <img
          src={ image }
          alt="comidas-favoritas"
          data-testid={ `${index}-horizontal-image` }
          className="image-foods"
        />
      </button>
      <div>
        <button
          className="handle-btn"
          type="button"
          onClick={ () => handleCopy(id, type) }
        >
          <img
            src={ shareIcon }
            alt="share"
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>
        {validateShare && <span>Link copied!</span>}
      </div>
    </div>
  );
}

DoneRecipesCard.propTypes = {
  recipes: PropTypes.shape({
    name: PropTypes.string,
    category: PropTypes.string,
    nationality: PropTypes.string,
    image: PropTypes.string,
    id: PropTypes.number,
    alcoholicOrNot: PropTypes.string,
    type: PropTypes.string,
    doneDate: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
}.isRequired;
