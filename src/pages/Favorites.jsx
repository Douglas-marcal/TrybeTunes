import React, { Component } from 'react';
import { Header, Loading, MusicCard } from '../components';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      favoriteSongs: [],
    };

    this.updateFavoriteSongs = this.updateFavoriteSongs.bind(this);
    this.getFavoriteSong = this.getFavoriteSong.bind(this);
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

  updateFavoriteSongs() {
    this.getFavoriteSong();
  }

  render() {
    const { isLoading, favoriteSongs } = this.state;
    this.updateFavoriteSongs();
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          isLoading ? <Loading /> : <MusicCard playlist={ favoriteSongs } />
        }
      </div>
    );
  }
}

export default Favorites;
