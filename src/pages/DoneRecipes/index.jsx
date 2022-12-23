import React, { useContext, useEffect } from 'react';
import Header from '../../components/Header';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './style.css';
import DoneRecipesCard from '../../components/DoneRecipesCard';
import context from '../../Context/context';

export default function DoneRecipes() {
  const {
    doneRecipes,
    setDoneRecipes,
    unfilteredDoneRecipes,
    setUnfilteredDoneRecipes,
  } = useContext(context);

  useEffect(() => {
    const localDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setDoneRecipes(localDoneRecipes);
    setUnfilteredDoneRecipes(localDoneRecipes);
  }, []);

  useEffect(() => {}, [doneRecipes]);

  const handleFilter = (foodName) => {
    const localDone = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    if (foodName === 'food') {
      setDoneRecipes(unfilteredDoneRecipes.filter(({ type }) => type === 'food'));
    } else if (foodName === 'drink') {
      setDoneRecipes(unfilteredDoneRecipes.filter(({ type }) => type === 'drink'));
    } else {
      setDoneRecipes(localDone);
    }
  };

  return (
    <div>
      <Header pageName="Done Recipes" search={ false } />
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
          doneRecipes.map(
            (
              recipe,
              index,
            ) => (
              <DoneRecipesCard key={ index } recipe={ recipe } index={ index } />
            ),
          )
        }
      </div>
    </div>
  );
}
