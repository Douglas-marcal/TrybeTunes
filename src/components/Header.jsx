import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/Header.css';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
    };

    this.getUserName = this.getUserName.bind(this);
  }

  componentDidMount() {
    this.getUserName();
  }

  getUserName() {
    this.setState({ isLoading: true }, () => {
      getUser().then(({ name }) => {
        this.setState(() => ({ name, isLoading: false }));
      });
    });
  }

  render() {
    const { name, isLoading } = this.state;
    return (
      <header data-testid="header-component" className="header-container">
        <h2>Só Sucesso ⚡</h2>
        <div className="nav-bar">
          {
            isLoading
              ? <Loading isHeader />
              : (
                <h4
                  data-testid="header-user-name"
                  className="user-name"
                >
                  <span className="separator">|</span>
                  {name}
                </h4>
              )
          }
          <ul className="menu-container">
            <NavLink
              to="/search"
              style={ (isActive) => ({
                color: isActive ? 'yellow' : 'white',
              }) }
            >
              <li data-testid="link-to-search">Pesquisa</li>
            </NavLink>
            <NavLink
              to="/favorites"
              style={ (isActive) => ({
                color: isActive ? 'yellow' : 'white',
              }) }
            >
              <li data-testid="link-to-favorites">Favoritos</li>
            </NavLink>
            <NavLink
              to="/profile"
              style={ (isActive) => ({
                color: isActive ? 'yellow' : 'white',
              }) }
            >
              <li data-testid="link-to-profile">Perfil</li>
            </NavLink>
          </ul>
        </div>
      </header>
    );
  }
}

export default Header;
