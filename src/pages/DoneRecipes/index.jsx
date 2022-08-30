import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import shareIcon from '../../images/shareIcon.svg';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './style.css';

export default function DoneRecipes() {
  const [validateShare, setValidateShare] = useState(false);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const history = useHistory();

  const handleFilter = ({
    target: {
      parentNode: { name },
    },
  }) => {
    const localDone = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    if (name === 'food') {
      setDoneRecipes(doneRecipes.filter(({ type }) => type === 'food'));
    } else if (name === 'drink') {
      setDoneRecipes(doneRecipes.filter(({ type }) => type === 'drink'));
    } else {
      setDoneRecipes(localDone);
    }
  };

  useEffect(() => {
    setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')) || []);
  }, []);

  useEffect(() => {}, [setDoneRecipes]);

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

  return (
    <div>
      <Header pageName="Done Recipes" search={ false } />
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
        {doneRecipes.map(
          (
            { name, category, nationality, image, id, alcoholicOrNot, type, doneDate,
              tags },
            index,
          ) => (
            <div key={ index } className="done-recipe">
              <p
                data-testid={ `${index}-horizontal-name` }
                aria-hidden="true"
                onClick={ () => handleRedirect(id, type) }
              >
                {name}
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
                { tags.length > 0 && tags.map((element) => (
                  <p
                    data-testid={ `${index}-${element}-horizontal-tag` }
                    key={ element }
                  >
                    {element}
                  </p>))}
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
          ),
        )}
      </div>
    </div>
  );
}
