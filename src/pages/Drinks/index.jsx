import React, { useContext, useEffect } from 'react';
import Header from '../../components/Header';
import context from '../../Context/loginContext';

export default function Drinks() {
  const { locationPage, setLocationPage } = useContext(context);

  useEffect(() => {
    setLocationPage('drinks');
  }, [locationPage]);

  return (
    <div>
      Hello Word! estou no Drinks
      <Header pageName="Drinks" />
    </div>
  );
}
