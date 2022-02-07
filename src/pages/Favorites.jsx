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
      <div data-testid="page-favorites">
        <Header />
        {
          isLoading
            ? <Loading />
            : (
              <MusicCard
                playlist={ favoriteSongs }
                checkForUpdate={ this.checkForUpdate }
              />
            )
        }
      </div>
    );
  }
}

export default Favorites;
