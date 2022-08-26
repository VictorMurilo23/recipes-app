import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getDrinksDetail } from '../../service/serviceApi';
import RecipeInProgress from '../../components/RecipeInProgress';

export default function DrinksInProgress({ match: { params: { id } } }) {
  const [drinksInProgress, setDrinksInProgress] = useState([]);

  useEffect(() => {
    const getDrinks = async () => setDrinksInProgress(await getDrinksDetail(id));
    getDrinks();
  }, [id]);

  if (drinksInProgress.length === 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      Hello Word! estou no DrinksInProgress!
      <RecipeInProgress data={ drinksInProgress[0] } typePage="drinks" />
    </div>
  );
}

DrinksInProgress.propTypes = {
  match: PropTypes.shape(
    { params: PropTypes.shape(
      { id: PropTypes.number.isRequired },
    ).isRequired,
    }.isRequired,
  ).isRequired,
};
