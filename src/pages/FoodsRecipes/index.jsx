import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getMealDetail } from '../../service/serviceApi';
import RecipeDetails from '../../components/RecipeDetails';

export default function FoodsRecipes({ match: { params: { id } } }) {
  const [recipeMeal, setRecipeMeal] = useState('');
  useEffect(() => {
    const getMeal = async () => {
      const data = await getMealDetail(id);
      setRecipeMeal(data);
    };
    getMeal();
  }, []);

  if (recipeMeal === '') {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <RecipeDetails data={ recipeMeal[0] } typePage="foods" />
    </div>
  );
}

FoodsRecipes.propTypes = {
  match: PropTypes.shape(
    { params: PropTypes.shape(
      { id: PropTypes.number.isRequired },
    ).isRequired,
    }.isRequired,
  ).isRequired,
};
