import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Recipes from '../../components/Recipes';

export default function Drinks() {
  return (
    <div>
      Hello Word! estou no Drinks
      <Header pageName="Drinks" />
      <Recipes pageName="drinks" />
      <Footer />
    </div>
  );
}
