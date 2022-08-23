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

  // console.log(recipeData)

  return (
    <div>
      <Header pageName="Foods" />
      {recipeData && recipeData.filter((recipe, index) => index < 12)
      .map(({strMeal, strMealThumb}, index) => (
        <div key={index} data-testid={`${index}-recipe-card`}>
          <p data-testid={`${index}-card-name`}>{strMeal}</p>
          <img src={strMealThumb} data-testid={`${index}-card-img`} alt="receita" />
        </div>
      ))}
      <Recipes pageName="food" />
      <Footer />
    </div>
  );
}
