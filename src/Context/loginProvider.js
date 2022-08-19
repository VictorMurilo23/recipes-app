import React, { useState } from 'react';
import context from './loginContext';

function Provider({ children }) {
  const [loginInfo, setLoginInfo] = useState({ login: '', password: '' });
  const contextValue = {
    loginInfo,
    setLoginInfo,
  };

  return (
    <context.Provider value={ contextValue }>
      {children}
    </context.Provider>
  );
}

// Provider.propTypes = {
//   children: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.node),
//     PropTypes.node,
//   ]).isRequired,
// };

export default Provider;
