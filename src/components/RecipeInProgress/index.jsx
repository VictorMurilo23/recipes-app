import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import './style.css';

export default function RecipeInProgress({ data, typePage }) {
  const history = useHistory();
  const [favorite, setFavorite] = useState(false);
  const [validadeShare, setValidadeShare] = useState(false);
  const [updateIngredients, setUpdateIngredients] = useState([]);

  const key = typePage === 'foods' ? 'meals' : 'cocktails';
  const invertKey = typePage === 'foods' ? 'cocktails' : 'meals';
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

  const measureArray = ingredientsArray
    .map((_measure, index) => `strMeasure${index + 1}`);

  const handleCopy = () => {
    if (type === 'food') {
      copy(`http://localhost:3000/foods/${id}`);
    } else {
      copy(`http://localhost:3000/drinks/${id}`);
    }
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

  const saveDoneRecipe = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      [key]: {
        ...inProgressRecipes[key],
        [id]: updateIngredients,
      },
      [invertKey]: {
        ...inProgressRecipes[invertKey],
      },
    }));

    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const tags = data.strTags === null ? [] : data.strTags.split(',');
    const today = new Date().toLocaleDateString();
    localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, {
      id,
      type,
      nationality: area,
      category: data.strCategory,
      alcoholicOrNot: alcoholic,
      name: title,
      image: imgUrl,
      doneDate: today,
      tags,
    }]));
    history.push('/done-recipes');
  };

  const updateCheckedBox = (ingredient) => {
    if (!updateIngredients.some((elem) => elem === ingredient)) {
      setUpdateIngredients((prevState) => [...prevState, ingredient]);
    } else {
      setUpdateIngredients((prevState) => prevState
        .filter((element) => element !== ingredient));
    }
  };

  useEffect(() => {
    const ingre = ingredientsArray
      .map((_elem, index) => data[ingredientsArray[index]]);
    const getLocalStorageIngredientes = JSON
      .parse(localStorage.getItem('inProgressRecipes')) ? JSON
        .parse(localStorage.getItem('inProgressRecipes'))[key][id] : ingre;
    setUpdateIngredients(getLocalStorageIngredientes);
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const validationFavorite = favoriteRecipes.some(({ id: idSome }) => idSome === id);
    setFavorite(validationFavorite);
  }, []);

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      [key]: {
        ...inProgressRecipes[key],
        [id]: updateIngredients,
      },
      [invertKey]: {
        ...inProgressRecipes[invertKey],
      },
    }));
  }, [updateIngredients]);

  return (
    <div className="container-recipe-info">
      <h2 data-testid="recipe-title">{title}</h2>
      <p data-testid="recipe-category">{categoryText}</p>
      <img
        src={ imgUrl }
        alt={ title }
        data-testid="recipe-photo"
        className="image-recipe-detail"
      />

      <h3>Instructions</h3>
      <div className="container-info">
        <p data-testid="instructions">{instruction}</p>
      </div>
      <h3>Ingredients</h3>
      <div className="container-info">
        { ingredientsArray.map((_elem, index) => (
          <div
            key={ `${data[ingredientsArray[index]]}, ${index}` }
            className="row-ingredient"
          >
            <label
              className={ !updateIngredients
                .some((elem) => elem === data[ingredientsArray[index]])
                ? 'label-ingredient-checked' : 'label-ingredient' }
              htmlFor={ data[ingredientsArray[index]] }
              data-testid={ `${index}-ingredient-step` }
            >

              <input
                className="checked-progress"
                type="checkbox"
                name={ data[ingredientsArray[index]] }
                id={ data[ingredientsArray[index]] }
                checked={
                  !updateIngredients
                    .some((elem) => elem === data[ingredientsArray[index]])
                }
                onChange={ () => updateCheckedBox(data[ingredientsArray[index]]) }
              />
              <p>
                {data[ingredientsArray[index]]}
                {' '}
                -
                {' '}
                {data[measureArray[index]]}
              </p>
            </label>
          </div>
        ))}
      </div>
      <div className="buttonsContainer">
        <div className="btn-recipe-details">
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
        <div className="span-copy">
          {
            validadeShare && <span>Link copied!</span>
          }
        </div>
      </div>
      <button
        className="finishedRecipes"
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ updateIngredients.length !== 0 }
        onClick={ saveDoneRecipe }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

RecipeInProgress.propTypes = {
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
