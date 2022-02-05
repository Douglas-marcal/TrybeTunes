import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
              ? <Loading />
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
            <Link to="/search">
              <li data-testid="link-to-search">Pesquisa</li>
            </Link>
            <Link to="/favorites">
              <li data-testid="link-to-favorites">Favoritos</li>
            </Link>
            <Link to="/profile">
              <li data-testid="link-to-profile">Perfil</li>
            </Link>
          </ul>
        </div>
      </header>
    );
  }
}

export default Header;
