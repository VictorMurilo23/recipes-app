import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

const copy = require('clipboard-copy');

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
    // console.log(name);
    const localFavorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (name === 'food') {
      // setFavRecipes(localFavorite);
      // console.log(favRecipes);
      setFavRecipes(favRecipes.filter(({ type }) => type === 'food'));
    } else if (name === 'drink') {
      // setFavRecipes(localFavorite);
      // console.log(favRecipes);
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
      <button
        type="button"
        onClick={ handleFilter }
        data-testid="filter-by-drink-btn"
        name="drink"
      >
        <img
          src={ drinkIcon }
          data-testid="drinks-bottom-btn"
          alt="Ícone Drink"
        />
      </button>
      <button
        type="button"
        onClick={ handleFilter }
        data-testid="filter-by-food-btn"
        name="food"
      >
        <img src={ mealIcon } data-testid="food-bottom-btn" alt="Ícone Food" />
      </button>
      <button
        type="button"
        onClick={ handleFilter }
        data-testid="filter-by-all-btn"
        name="all"
      >
        ALL
      </button>
      <div>
        {favRecipes.map(
          (
            { name, category, nationality, image, id, alcoholicOrNot, type },
            index,
          ) => (
            <div key={ index }>
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
                  style={ { width: '100px' } }
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
