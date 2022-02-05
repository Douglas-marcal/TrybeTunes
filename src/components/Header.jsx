import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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
      <header data-testid="header-component">
        {
          isLoading
            ? <Loading />
            : (<h4 data-testid="header-user-name">{name}</h4>)
        }
        <nav>
          <ul>
            <Link to="/search">
              <li data-testid="link-to-search">Pesquisa</li>
            </Link>
            <Link to="/favorites">
              <li data-testid="link-to-favorites">Favoritos</li>
            </Link>
            {/*  <li></li> */}
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
