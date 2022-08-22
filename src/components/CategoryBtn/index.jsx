import React from 'react';
import PropTypes from 'prop-types';

export default function CategoryBtn({ category, getCategoryRecipes }) {
  return (
    <button
      type="button"
      onClick={ () => getCategoryRecipes(category) }
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
