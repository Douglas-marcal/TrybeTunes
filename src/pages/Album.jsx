import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header } from '../components';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      musics: [],
    };

    this.requestMusic = this.requestMusic.bind(this);
  }

  componentDidMount() {
    this.requestMusic();
  }

  requestMusic() {
    const { match: { params: { id } } } = this.props;
    getMusics(id).then((musics) => {
      this.setState(() => ({ musics }));
    });
  }

  render() {
    const { musics } = this.state;
    const [firstArtist] = musics;
    let artistName;
    let collectionName;
    if (firstArtist) {
      artistName = firstArtist.artistName;
      collectionName = firstArtist.collectionName;
    }
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{artistName}</h2>
        <h3 data-testid="album-name">{collectionName}</h3>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
