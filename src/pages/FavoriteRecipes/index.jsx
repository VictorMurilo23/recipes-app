import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../../components/Header';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './style.css';

export default function FavoriteRecipes() {
  const history = useHistory();
  const [validateShare, setValidateShare] = useState(false);
  const [favRecipes, setFavRecipes] = useState([]);

  const handleCopy = (id, type) => {
    if (type === 'food') {
      copy(`http://localhost:3000/foods/${id}`);
      setValidateShare(true);
    } else {
      copy(`http://localhost:3000/drinks/${id}`);
      setValidateShare(true);
    }
  };

  const handleRedirect = (id, type) => {
    if (type === 'food') {
      history.push(`/foods/${id}`);
    } else {
      history.push(`/drinks/${id}`);
    }
  };

  const removeFavorite = (idComp) => {
    const filter = favRecipes.filter(({ id }) => id !== idComp);

    localStorage.setItem('favoriteRecipes', JSON.stringify(filter));
    setFavRecipes(filter);
  };

  const handleFilter = ({
    target: {
      parentNode: { name },
    },
  }) => {
    const localFavorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (name === 'food') {
      setFavRecipes(favRecipes.filter(({ type }) => type === 'food'));
    } else if (name === 'drink') {
      setFavRecipes(favRecipes.filter(({ type }) => type === 'drink'));
    } else {
      setFavRecipes(localFavorite);
    }
  };

  useEffect(() => {
    setFavRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')) || []);
  }, []);

  useEffect(() => {}, [favRecipes]);

  return (
    <div>
      <Header pageName="Favorite Recipes" search={ false } />
      <div className="container-buttons">
        <button
          type="button"
          onClick={ handleFilter }
          data-testid="filter-by-drink-btn"
          name="drink"
          className="favorite-buttons"
        >
          <img
            src={ drinkIcon }
            alt="Ícone Drink"
          />
        </button>
        <button
          type="button"
          onClick={ handleFilter }
          data-testid="filter-by-food-btn"
          name="food"
          className="favorite-buttons"
        >
          <img src={ mealIcon } alt="Ícone Food" />
        </button>
        <button
          type="button"
          onClick={ handleFilter }
          data-testid="filter-by-all-btn"
          name="all"
          className="favorite-buttons"
        >
          ALL
        </button>
      </div>
      <div className="container-favorites">
        {favRecipes.map(
          (
            { name, category, nationality, image, id, alcoholicOrNot, type },
            index,
          ) => (
            <div key={ index } className="favorite-recipe">
              <p
                data-testid={ `${index}-horizontal-name` }
                aria-hidden="true"
                onClick={ () => handleRedirect(id, type) }
              >
                {name}
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
                {validateShare && <span>Link copied!</span>}
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
