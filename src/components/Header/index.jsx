import PropTypes from 'prop-types';
import React from 'react';
import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';

export default function Header({ pageName, search }) {
  return (
    <header>
      <div>
        <h1 data-testid="page-title">{ pageName }</h1>
        {
          search && <img
            src={ searchIcon }
            data-testid="profile-top-btn"
            alt="Ícone de pesquisa"
          />
        }
        <img src={ profileIcon } data-testid="search-top-btn" alt="Imagem perfil" />
      </div>
    </header>
  );
}

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
  search: PropTypes.string,
};

Header.defaultProps = {
  search: true,
};
