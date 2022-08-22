import React from 'react';
import PropTypes from 'prop-types';

export default function CategoryBtn({ category }) {
  return (
    <button
      type="button"
      data-testid={ `${category}-category-filter` }
    >
      {category}
    </button>
  );
}

CategoryBtn.propTypes = {
  category: PropTypes.string.isRequired,
};
