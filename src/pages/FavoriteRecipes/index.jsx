import React, { useContext, useEffect } from 'react';
import FavoriteRecipesCard from '../../components/FavoritesRecipesCard';
import Header from '../../components/Header';
import context from '../../Context/context';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './style.css';

export default function FavoriteRecipes() {
  const {
    favRecipes,
    unfilteredFavRecipes,
    setFavRecipes,
    setUnfilteredFavRecipes,
  } = useContext(context);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setUnfilteredFavRecipes(favoriteRecipes);
    setFavRecipes(favoriteRecipes);
  }, []);

  useEffect(() => {}, [favRecipes]);

  const handleFilter = (foodName) => {
    const localFavorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (foodName === 'food') {
      setFavRecipes(unfilteredFavRecipes.filter(({ type }) => type === 'food'));
    } else if (foodName === 'drink') {
      setFavRecipes(unfilteredFavRecipes.filter(({ type }) => type === 'drink'));
    } else {
      setFavRecipes(localFavorite);
    }
  };

  return (
    <div>
      <Header pageName="Favorite Recipes" search={ false } />
      <div className="container-buttons">
        <button
          type="button"
          onClick={ () => { handleFilter('drink'); } }
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
          onClick={ () => { handleFilter('food'); } }
          data-testid="filter-by-food-btn"
          name="food"
          className="favorite-buttons"
        >
          <img src={ mealIcon } alt="Ícone Food" />
        </button>
        <button
          type="button"
          onClick={ () => { handleFilter('all'); } }
          data-testid="filter-by-all-btn"
          name="all"
          className="favorite-buttons"
        >
          ALL
        </button>
      </div>
      <div className="container-favorites">
        {
          favRecipes.map(
            (
              recipe,
              index,
            ) => (
              <FavoriteRecipesCard
                key={ index }
                recipe={ recipe }
                index={ index }
              />
            ),
          )
        }
      </div>
    </div>
  );
}
