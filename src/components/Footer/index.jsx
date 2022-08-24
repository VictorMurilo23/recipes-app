import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './Footer.css';

export default function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer" className="footer">
      <button type="button" onClick={ () => history.push('/drinks') }>
        <img src={ drinkIcon } data-testid="drinks-bottom-btn" alt="Ícone Drink" />
      </button>
      <button type="button" onClick={ () => history.push('/foods') }>
        <img
          src={ mealIcon }
          data-testid="food-bottom-btn"
          alt="Ícone Food"
        />
      </button>
    </footer>
  );
}
