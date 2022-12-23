import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import context from '../../Context/context';

export default function FavoriteRecipesCard({ recipe, index }) {
  const { removeFavorite } = useContext(context);
  const {
    name: recipeName,
    category,
    nationality,
    image,
    id,
    alcoholicOrNot,
    type,
  } = recipe;
  const history = useHistory();
  const [validateShare, setValidateShare] = useState(false);

  const handleCopy = (recipeId, recipeType) => {
    if (recipeType === 'food') {
      copy(`http://localhost:3000/foods/${recipeId}`);
      setValidateShare(true);
    } else {
      copy(`http://localhost:3000/drinks/${recipeId}`);
      setValidateShare(true);
    }
  };

  const handleRedirect = (recipeId, recipeType) => {
    if (recipeType === 'food') {
      history.push(`/foods/${recipeId}`);
    } else {
      history.push(`/drinks/${recipeId}`);
    }
  };

  return (
    <div key={ index } className="favorite-recipe">
      <p
        data-testid={ `${index}-horizontal-name` }
        aria-hidden="true"
        onClick={ () => handleRedirect(id, type) }
      >
        {recipeName}
      </p>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {`${nationality} - ${category} ${alcoholicOrNot}`}
      </p>
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
        <button
          className="handle-btn"
          type="button"
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ blackHeartIcon }
          onClick={ () => removeFavorite(id) }
        >
          <img src={ blackHeartIcon } alt="favorite" />
        </button>
      </div>
      {validateShare && <span>Link copied!</span>}
    </div>
  );
}

FavoriteRecipesCard.propTypes = {
  recipes: PropTypes.shape({
    name: PropTypes.string,
    category: PropTypes.string,
    nationality: PropTypes.string,
    image: PropTypes.string,
    id: PropTypes.number,
    alcoholicOrNot: PropTypes.string,
    type: PropTypes.string,
  }),
}.isRequired;
