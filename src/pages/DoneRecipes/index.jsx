import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
// import { useHistory } from 'react-router-dom';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

export default function DoneRecipes() {
  const done = JSON.parse(localStorage.getItem('doneRecipes'));
  return (
    <div>
      <Header pageName="Done Recipes" search={ false } />
      <button
        type="button"
        // onClick={ handleFilter }
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
        // onClick={ handleFilter }
        data-testid="filter-by-food-btn"
        name="food"
      >
        <img src={ mealIcon } data-testid="food-bottom-btn" alt="Ícone Food" />
      </button>
      <button
        type="button"
        // onClick={ handleFilter }
        data-testid="filter-by-all-btn"
        name="all"
      >
        ALL
      </button>
      <div>
        {done.map(
          (
            { name, category, nationality, image, id, alcoholicOrNot, type, doneDate,
              tags },
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
                <div>
                  {tags.map((element) => (
                    <p
                      data-testid={ `${index}-${element}-horizontal-tag` }
                      key={ element }
                    >
                      {element}
                    </p>))}
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

// [{
//   id: id-da-receita,
//   type: comida-ou-bebida,
//   nationality: nacionalidade-da-receita-ou-texto-vazio,
//   category: categoria-da-receita-ou-texto-vazio,
//   alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
//   name: nome-da-receita,
//   image: imagem-da-receita,
//   doneDate: quando-a-receita-foi-concluida,
//   tags: array-de-tags-da-receita-ou-array-vazio
// }]

// let today = new Date().toLocaleDateString()

// console.log(today)
