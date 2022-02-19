import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Header, Loading, MusicCard } from '../components';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../styles/Favorites.css';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      favoriteSongs: [],
    };

    this.getFavoriteSong = this.getFavoriteSong.bind(this);
    this.checkForUpdate = this.checkForUpdate.bind(this);
  }

  componentDidMount() {
    this.getFavoriteSong();
  }

  getFavoriteSong() {
    getFavoriteSongs().then((favoriteSongs) => {
      this.setState({
        favoriteSongs,
        isLoading: false,
      });
    });
  }

  checkForUpdate() {
    this.getFavoriteSong();
  }

  render() {
    const { isLoading, favoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites" className="page-favorites">
        <Header />
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

        {
          favoriteSongs.length
            ? <h2>Músicas Favoritas</h2>
            : <h2>Não há músicas favoritas</h2>
        }

        {
          isLoading
            ? <Loading />
            : (
              <div>
                <MusicCard
                  playlist={ favoriteSongs }
                  checkForUpdate={ this.checkForUpdate }
                />
              </div>
            )
        }
      </div>
    );
  }
}

export default Favorites;
