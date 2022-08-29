import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getMealDetail } from '../../service/serviceApi';
import RecipeInProgress from '../../components/RecipeInProgress';

export default function FoodsInProgress({ match: { params: { id } } }) {
  const [foodsInProgress, setFoodsInProgress] = useState([]);

  useEffect(() => {
    const getFoods = async () => setFoodsInProgress(await getMealDetail(id));
    getFoods();
  }, [id]);

  if (foodsInProgress.length === 0) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <RecipeInProgress data={ foodsInProgress[0] } typePage="foods" />
    </div>
  );
}

FoodsInProgress.propTypes = {
  match: PropTypes.shape(
    { params: PropTypes.shape(
      { id: PropTypes.number.isRequired },
    ).isRequired,
    }.isRequired,
  ).isRequired,
};
