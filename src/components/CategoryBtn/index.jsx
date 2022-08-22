import React from 'react';
import PropTypes from 'prop-types';

export default function CategoryBtn({
  category, getCategoryRecipes, showAllRecipes, setSelectedCategory, selectedCategory,
}) {
  const handleClick = () => {
    if (category === selectedCategory) {
      showAllRecipes();
    } else {
      setSelectedCategory(category);
      getCategoryRecipes(category);
    }
  };

  return (
    <button
      type="button"
      onClick={ handleClick }
      data-testid={ `${category}-category-filter` }
    >
      {category}
    </button>
  );
}

CategoryBtn.propTypes = {
  category: PropTypes.string,
  getCategoryRecipes: PropTypes.func,
}.isRequired;
