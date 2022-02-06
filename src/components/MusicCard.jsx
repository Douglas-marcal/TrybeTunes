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
  }

  componentDidMount() {
    getFavoriteSongs().then((songData) => {
      this.setState(() => ({ songData, isLoading: false }));
    });
  }

  addFavoriteSong({ target: { id } }) {
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

  removeFavoriteSong({ target: { checked, id } }) {
    if (!checked) {
      const { playlist } = this.props;
      const objectSong = playlist.find(({ trackId }) => +id === +trackId);
      removeSong(objectSong).then(() => {
        this.setState(({ songData: prevSongData }) => ({
          songData: prevSongData.filter(({ trackId }) => +trackId !== +id),
        }));
      });
    }
  }

  render() {
    const { playlist } = this.props;
    const { isLoading, songData } = this.state;
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
                          onChange={ (event) => {
                            this.addFavoriteSong(event);
                            this.removeFavoriteSong(event);
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
};

export default MusicCard;
