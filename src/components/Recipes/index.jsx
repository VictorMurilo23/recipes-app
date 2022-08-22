import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getMealsOrDrinks } from '../../service/serviceApi';
import RecipeCard from '../RecipeCard';

export default function Recipes({ pageName }) {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const getResults = async () => {
      const data = await getMealsOrDrinks(pageName);
      setRecipes(data);
    };
    getResults();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (recipes.length === 0) {
    return (<h1>Loading...</h1>);
  }
  const twelve = 12;
  const twelveRecipes = recipes.filter((recipe, index) => index < twelve);
  return (
    <div>
      {
        twelveRecipes
          .map((recipe, index) => (<RecipeCard
            key={ index }
            recipe={ recipe }
            index={ index }
          />))
      }
    </div>
  );
}

Recipes.propTypes = {
  pageName: PropTypes.string.isRequired,
};
