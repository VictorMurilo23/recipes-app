import React, { useContext, useEffect } from 'react';
import Header from '../../components/Header';
import context from '../../Context/loginContext';
import Footer from '../../components/Footer';
import Recipes from '../../components/Recipes';

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
      {validadeObj && validadeObj.length >= 1
        ? recipeData.filter((recipe, i) => i < magicNum)
          .map(({ strMeal, strMealThumb }, index) => (
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
              <img
                src={ strMealThumb }
                data-testid={ `${index}-card-img` }
                alt="receita"
              />
            </div>
          )) : <Recipes pageName="food" />}
      <Footer />
    </div>
  );
}
