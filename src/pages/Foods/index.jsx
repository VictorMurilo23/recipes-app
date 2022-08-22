import React, { useContext, useEffect } from 'react';
import Header from '../../components/Header';
import context from '../../Context/loginContext';

export default function Foods() {
  const { locationPage, setLocationPage } = useContext(context);

  useEffect(() => {
    setLocationPage('foods');
  }, [locationPage]);

  return (
    <div>
      Hello Word! estou no Foods
      <Header pageName="Foods" />
    </div>
  );
}
