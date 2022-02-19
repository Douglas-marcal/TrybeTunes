import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
