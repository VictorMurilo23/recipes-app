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

  const recipeDataMap = () => (
    recipeData.filter((recipe, i) => i < MagicNum)
      .map(({ strDrink, strDrinkThumb }, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
          <img
            src={ strDrinkThumb }
            data-testid={ `${index}-card-img` }
            alt="receita"
          />
        </div>
      )));

  const validadeObj = recipeData ? Object.values(recipeData) : [];

  return (
    <div>
      <Header pageName="Drinks" />

      {/* {recipeData[0] ? recipeDataMap() : <Recipes pageName="drinks" />} */}
      {/* {recipeData[0] ? recipeDataMap() : <Recipes pageName="drinks" />} */}
      { validadeObj && validadeObj.length >= 1
        ? recipeDataMap()
        : <Recipes pageName="drinks" />}
      <Footer />
    </div>
  );
}
