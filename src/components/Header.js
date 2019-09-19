import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>Expensify</h1>
    <NavLink to="/" activeClassName="is-active" exact={true}>Home</NavLink>
    <NavLink to="/browse" activeClassName="is-active">Browse</NavLink>
    <NavLink to="/test" activeClassName="is-active">test</NavLink>
  </header>
);

export default Header;
