import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import { Loading } from '.';

class MusicCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };

    this.addOrRemoveFavorite = this.addOrRemoveFavorite.bind(this);
  }

  addOrRemoveFavorite({ target: { id } }) {
    this.setState({ isLoading: true });
    const { playlist } = this.props;
    const objectSong = playlist.find(({ trackId }) => +trackId === +id);
    addSong(objectSong).then(() => {
      this.setState({ isLoading: false });
    });
  }

  render() {
    const { playlist } = this.props;
    const { isLoading } = this.state;
    return (
      <div>
        {
          isLoading ? <Loading /> : (
            <div>
              {
                playlist
                  .filter(({ trackName }) => trackName)
                  .map(({ trackName, previewUrl, trackId }) => (
                    <div key={ trackId }>
                      <p>{trackName}</p>
                      <audio data-testid="audio-component" src={ previewUrl } controls>
                        <track kind="captions" />
                        O seu navegador não suporta o elemento
                        {' '}
                        <code>audio</code>
                        .
                      </audio>
                      <label htmlFor={ trackId }>
                        Favorita
                        <input
                          data-testid={ `checkbox-music-${trackId}` }
                          type="checkbox"
                          id={ trackId }
                          onChange={ (event) => this.addOrRemoveFavorite(event) }
                        />
                      </label>
                    </div>
                  ))
              }
            </div>
          )
        }

      </div>

    );
  }
}

MusicCard.propTypes = {
  playlist: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MusicCard;
