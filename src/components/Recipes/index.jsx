import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  getMealsOrDrinks,
  getCategories,
  getRecipesByCategory,
} from '../../service/serviceApi';
import RecipeCard from '../RecipeCard';
import CategoryBtn from '../CategoryBtn';
import './style.css';

export default function Recipes({ pageName }) {
  const [origalRecipes, setOrigalRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);

  const getCategoryRecipes = async (categoryName) => {
    setRecipes([]);
    const categoriesByRecipe = await getRecipesByCategory(pageName, categoryName);
    setRecipes(categoriesByRecipe);
  };

  const showAllRecipes = () => {
    setRecipes(origalRecipes);
  };

  useEffect(() => {
    const getResults = async () => {
      const categoriesData = await getCategories(pageName);
      setCategories(categoriesData);
      const data = await getMealsOrDrinks(pageName);
      setRecipes(data);
      setOrigalRecipes(data);
    };
    getResults();
  }, []);

  if (recipes.length === 0) {
    return (<h1>Loading...</h1>);
  }

  const twelve = 12;
  const five = 5;
  const twelveRecipes = recipes.filter((_recipe, index) => index < twelve);
  const categoriesSet = categories
    .filter((_recipe, index) => index < five);
  return (
    <div>
      <div className="container-category-btn">
        {
          categoriesSet.map((category) => (<CategoryBtn
            getCategoryRecipes={ getCategoryRecipes }
            selectedCategory={ selectedCategory }
            setSelectedCategory={ setSelectedCategory }
            showAllRecipes={ showAllRecipes }
            key={ category.strCategory }
            category={ category.strCategory }
          />))
        }
        <CategoryBtn
          category="All"
          getCategoryRecipes={ showAllRecipes }
          setSelectedCategory={ setSelectedCategory }
          selectedCategory={ selectedCategory }
        />
      </div>

      <div className="container-recipes">
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
