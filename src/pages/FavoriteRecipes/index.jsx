import React from 'react';
// import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

const copy = require('clipboard-copy');

export default function FavoriteRecipes() {
  // const history = useHistory();
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  console.log(favoriteRecipes);

  const handleCopy = () => {
    copy(window.location.href);
  };

  const removeFavorite = (idComp) => {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(favoriteRecipes.filter(({ id }) => id !== idComp)),
    );
  };

  return (
    <div>
      <Header pageName="Favorite Recipes" search={ false } />
      <button
        type="button"
        onClick={ () => {} }
        data-testid="filter-by-drink-btn"
      >
        <img
          src={ drinkIcon }
          data-testid="drinks-bottom-btn"
          alt="Ícone Drink"
        />
      </button>
      <button type="button" onClick={ () => {} } data-testid="filter-by-food-btn">
        <img src={ mealIcon } data-testid="food-bottom-btn" alt="Ícone Food" />
      </button>
      <button type="button" onClick={ () => {} } data-testid="filter-by-all-btn">
        ALL
      </button>
      <div>
        {favoriteRecipes
          .map(({
            name,
            category,
            nationality,
            image,
            id,
            alcoholicOrNot,
          }, index) => (
            <div key={ index }>
              <p data-testid={ `${index}-horizontal-name` }>{name}</p>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${nationality} - ${category} ${alcoholicOrNot}`}
              </p>
              <img
                src={ image }
                alt="comidas-favoritas"
                data-testid={ `${index}-horizontal-image` }
              />
              <div>
                <button
                  className="handle-btn"
                  type="button"
                  onClick={ handleCopy }
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
            </div>
          ))}
      </div>
    </div>
  );
}
