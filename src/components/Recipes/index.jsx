import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getMealsOrDrinks, getCategories } from '../../service/serviceApi';
import RecipeCard from '../RecipeCard';
import CategoryBtn from '../CategoryBtn';

export default function Recipes({ pageName }) {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getResults = async () => {
      const categoriesData = await getCategories(pageName);
      setCategories(categoriesData);
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
  const five = 5;
  const twelveRecipes = recipes.filter((recipe, index) => index < twelve);
  // const categories = recipes.map(({ strCategory }) => strCategory);
  console.log(categories);
  const categoriesSet = categories
    .filter((recipe, index) => index < five);
  return (
    <div>
      <div>
        {
          categoriesSet.map((category) => (<CategoryBtn
            key={ category.strCategory }
            category={ category.strCategory }
          />))
        }
      </div>

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
    </div>
  );
}

Recipes.propTypes = {
  pageName: PropTypes.string.isRequired,
};
