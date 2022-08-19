import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';

export default function Header({ pageName, search }) {
  const history = useHistory();
  const [showSearch, setShowSearch] = useState(false);
  const redirectProfile = () => {
    history.push('/profile');
  };

  return (
    <header>
      <div>
        <h1 data-testid="page-title">{ pageName }</h1>
        {
          search
          && (
            <button
              type="button"
              onClick={
                () => setShowSearch((prevState) => !prevState)
              }
            >
              <img
                src={ searchIcon }
                data-testid="search-top-btn"
                alt="Ícone de pesquisa"
              />
            </button>)
        }
        {
          showSearch && <input
            data-testid="search-input"
          />
        }
        <button type="button" onClick={ redirectProfile }>
          <img src={ profileIcon } data-testid="profile-top-btn" alt="Imagem perfil" />
        </button>
      </div>
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
