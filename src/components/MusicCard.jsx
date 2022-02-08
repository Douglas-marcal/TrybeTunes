import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      songData: [],
    };

    this.addFavoriteSong = this.addFavoriteSong.bind(this);
    this.removeFavoriteSong = this.removeFavoriteSong.bind(this);
    this.getFavoriteSong = this.getFavoriteSong.bind(this);
  }

  componentDidMount() {
    this.getFavoriteSong();
  }

  getFavoriteSong() {
    getFavoriteSongs().then((songData) => {
      this.setState(() => ({ songData, isLoading: false }));
    });
  }

  addFavoriteSong({ target: { checked, id } }) {
    if (checked) {
      this.setState({ isLoading: true });
      const { playlist } = this.props;
      const objectSong = playlist.find(({ trackId }) => +trackId === +id);
      addSong(objectSong).then(() => {
        this.setState((prevState) => ({
          isLoading: false,
          songData: [...prevState.songData, objectSong],
        }
        ));
      });
    }
  }

  removeFavoriteSong({ target: { checked, id } }) {
    if (!checked) {
      this.setState({ isLoading: true });
      const { playlist } = this.props;
      const objectSong = playlist.find(({ trackId }) => +id === +trackId);
      removeSong(objectSong).then(() => {
        this.getFavoriteSong();
      });
    }
  }

  render() {
    const { playlist, checkForUpdate } = this.props;
    const { isLoading, songData } = this.state;
    return (
      <div>
        {
          isLoading ? <Loading /> : (
            <div className="music-card-container">
              {
                playlist
                  .filter(({ trackName }) => trackName)
                  .map(({
                    trackName,
                    previewUrl,
                    trackId,
                    artworkUrl100,
                    collectionName,
                  }) => (
                    <div className="music-card" key={ trackId }>
                      <p>{trackName}</p>
                      <img src={ artworkUrl100 } alt={ collectionName } />
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
                          className="favorite-checkbox"
                          id={ trackId }
                          onChange={ (event) => {
                            this.addFavoriteSong(event);
                            this.removeFavoriteSong(event);
                            if (checkForUpdate) {
                              checkForUpdate();
                            }
                          } }
                          checked={
                            songData
                              .some(({ trackId: songID }) => songID === trackId)
                          }
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
  checkForUpdate: PropTypes.func,
};

MusicCard.defaultProps = {
  checkForUpdate: undefined,
};

export default MusicCard;
