import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Foods from '../pages/Foods';
import FoodsRecipes from '../pages/FoodsRecipes';
import FoodsInProgress from '../pages/FoodsInProgress';
import Drinks from '../pages/Drinks';
import DrinksRecipes from '../pages/DrinksRecipes';
import DrinksInProgress from '../pages/DrinksInProgress';
import Profile from '../pages/Profile';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/foods" component={ Foods } />
      <Route path="/foods/:id" component={ FoodsRecipes } />
      <Route path="/foods/:id/in-progress" component={ FoodsInProgress } />
      <Route path="/drinks" component={ Drinks } />
      <Route path="/drinks/:id/" component={ DrinksRecipes } />
      <Route path="/drinks/:id/in-progress" component={ DrinksInProgress } />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}
