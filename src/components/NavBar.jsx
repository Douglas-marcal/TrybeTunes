import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <ul className="menu-container-mobile">
        <NavLink to="/search" activeClassName="selected" className="link">
          <li data-testid="link-to-search">Pesquisa</li>
        </NavLink>
        <NavLink to="/favorites" activeClassName="selected" className="link">
          <li data-testid="link-to-favorites">Favoritos</li>
        </NavLink>
        <NavLink to="/profile" activeClassName="selected" className="link">
          <li data-testid="link-to-profile">Perfil</li>
        </NavLink>
      </ul>
    );
  }
}

export default NavBar;
