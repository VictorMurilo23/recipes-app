import React, { useContext, useEffect } from 'react';
import Header from '../../components/Header';
import context from '../../Context/context';
import Footer from '../../components/Footer';
import Recipes from '../../components/Recipes';

export default function Drinks() {
  const { locationPage, setLocationPage, recipeData } = useContext(context);

  useEffect(() => {
    setLocationPage('drinks');
  }, [locationPage]);

  const MagicNum = 12;

  const recipeDataMap = () => (
    <div className='className="container-recipes"'>
      {
        recipeData.filter((recipe, i) => i < MagicNum)
          .map(({ strDrink, strDrinkThumb }, index) => (
            <div
              key={ index }
              className="container-recipe"
              data-testid={ `${index}-recipe-card` }
            >
              <img
                src={ strDrinkThumb }
                className="image-foods"
                data-testid={ `${index}-card-img` }
                alt="receita"
              />
              <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
            </div>
          ))
      }
    </div>
  );

  const validadeObj = recipeData ? Object.values(recipeData) : [];

  return (
    <div>
      <Header pageName="Drinks" />
      { validadeObj && validadeObj.length >= 1
        ? recipeDataMap()
        : <Recipes pageName="drinks" />}
      <Footer />
    </div>
  );
}
