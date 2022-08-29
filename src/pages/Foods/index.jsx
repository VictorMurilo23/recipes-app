import React, { useContext, useEffect } from 'react';
import Header from '../../components/Header';
import context from '../../Context/loginContext';
import Footer from '../../components/Footer';
import Recipes from '../../components/Recipes';
import './style.css';

export default function Foods() {
  const { locationPage, setLocationPage, recipeData } = useContext(context);

  useEffect(() => {
    setLocationPage('foods');
  }, [locationPage]);

  const magicNum = 12;

  const validadeObj = recipeData ? Object.values(recipeData) : [];

  return (
    <div>
      <Header pageName="Foods" />
      <div className="container-recipes">
        {validadeObj && validadeObj.length >= 1
          ? recipeData.filter((recipe, i) => i < magicNum)
            .map(({ strMeal, strMealThumb }, index) => (
              <div
                key={ index }
                className="container-recipe"
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  className="image-foods"
                  src={ strMealThumb }
                  data-testid={ `${index}-card-img` }
                  alt="receita"
                />
                <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
              </div>
            )) : <Recipes pageName="food" />}
      </div>
      <Footer />
    </div>
  );
}
