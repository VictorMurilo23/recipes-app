import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './style.css';

export default function Profile() {
  function userVerify() {
    if (localStorage.getItem('user')) {
      const { email } = JSON.parse(localStorage.getItem('user'));
      return email;
    }
    return '';
  }
  const history = useHistory();

  const handleLogout = () => {
    history.push('/');
    localStorage.removeItem('user');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
  };

  return (
    <div>
      <Header pageName="Profile" search={ false } />
      <span className="container-email">
        <p data-testid="profile-email" className="email">{userVerify()}</p>
      </span>
      <div className="user">
        <button
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => history.push('/done-recipes') }
          className="profile-btn"
        >
          Done Recipes

        </button>
        <button
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => history.push('/favorite-recipes') }
          className="profile-btn"
        >
          Favorite Recipes

        </button>
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ handleLogout }
          className="profile-btn"
        >
          Logout

        </button>
      </div>
      <Footer />
    </div>
  );
}
