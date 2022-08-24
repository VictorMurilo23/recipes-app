import PropTypes from 'prop-types';
import React from 'react';

export default function RecipeDetails({ data, typePage }) {
  const imgUrl = typePage === 'drinks' ? data.strDrinkThumb : data.strMealThumb;
  const title = typePage === 'drinks' ? data.strDrink : data.strMeal;
  const instruction = data.strInstructions;
  const categoryText = typePage === 'drinks' ? data.strAlcoholic : data.strCategory;
  const ingredientsArray = Object.keys(data)
    .filter((ingredients) => ingredients
      .includes('strIngredient') && data[ingredients]);

  const endPointVideo = typePage === 'foods' && data.strYoutube.split('=')[1];

  const measureArray = ingredientsArray
    .map((_measure, index) => `strMeasure${index + 1}`);
  return (
    <div>
      <h2 data-testid="recipe-title">{title}</h2>
      <img
        src={ imgUrl }
        alt={ title }
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-category">{categoryText}</p>
      <p data-testid="instructions">{instruction}</p>
      { typePage === 'foods'
      && <iframe
        data-testid="video"
        width="560"
        height="315"
        src={ `https://www.youtube.com/embed/${endPointVideo}` }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer;
      autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />}
      <div>
        { ingredientsArray.map((_elem, index) => (
          <p
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {data[ingredientsArray[index]]}
            {data[measureArray[index]]}
          </p>
        ))}
      </div>
      <div data-testid="0-recomendation-card"> recommendation </div>
      {/* <div data-testid="${index}-recomendation-card"> recommendation </div> */}
    </div>
  );
}

RecipeDetails.propTypes = {
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

// O card de receitas recomendadas deve possuir o atributo data-testid="${index}-recomendation-card"
