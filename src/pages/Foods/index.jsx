import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Recipes from '../../components/Recipes';

export default function Foods() {
  return (
    <div>
      Hello Word! estou no Foods
      <Header pageName="Foods" />
      <Recipes pageName="food" />
      <Footer />
    </div>
  );
}
