import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';
import SearchBar from '../SearchBar';
import './style.css';

export default function Header({ pageName, search }) {
  const history = useHistory();
  const [showSearch, setShowSearch] = useState(false);
  const redirectProfile = () => {
    history.push('/profile');
  };

  return (
    <header className="container-header">
      <div>
        <h1 data-testid="page-title" className="page-name">{ pageName }</h1>
        <div className="input-button">
          {
            search
          && (
            <button
              type="button"
              onClick={
                () => setShowSearch((prevState) => !prevState)
              }
              className="header-button"
            >
              <img
                src={ searchIcon }
                data-testid="search-top-btn"
                alt="Ícone de pesquisa"
              />
            </button>)
          }
          <button type="button" onClick={ redirectProfile } className="header-button">
            <img
              src={ profileIcon }
              data-testid="profile-top-btn"
              alt="Imagem perfil"
            />
          </button>

        </div>
      </div>

      {
        showSearch && <SearchBar />
      }
    </header>
  );
}

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
  search: PropTypes.bool,
};

Header.defaultProps = {
  search: true,
};
