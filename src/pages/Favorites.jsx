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
  }

  componentDidMount() {
    getFavoriteSongs().then((favoriteSongs) => {
      this.setState(() => ({
        favoriteSongs,
        isLoading: false,
      }));
    });
  }

  render() {
    const { isLoading, favoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          isLoading ? <Loading /> : <MusicCard playlist={favoriteSongs}/>
        }
      </div>
    );
  }
}

export default Favorites;
