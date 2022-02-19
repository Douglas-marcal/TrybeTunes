import React, { Component } from 'react';
import { Header, Loading, MusicCard, NavBar } from '../components';
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
        <NavBar />

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
