import React, { useContext, useEffect } from 'react';
import Header from '../../components/Header';
import context from '../../Context/loginContext';
import Footer from '../../components/Footer';
import Recipes from '../../components/Recipes';

export default function Drinks() {
  const { locationPage, setLocationPage, recipeData } = useContext(context);

  useEffect(() => {
    setLocationPage('drinks');
  }, [locationPage]);

  const MagicNum = 12;

  return (
    <div>
      <Header pageName="Drinks" />

      {recipeData && recipeData.filter((recipe, index) => index < MagicNum)
        .map(({ strDrink, strDrinkThumb }, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <p data-testid={ `${index}-card-name` }>{strDrink}</p>
            <img
              src={ strDrinkThumb }
              data-testid={ `${index}-card-img` }
              alt="receita"
            />
          </div>
        ))}
      <Recipes pageName="drinks" />
      <Footer />
    </div>
  );
}
