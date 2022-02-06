import React, { Component } from 'react';
import { Header, Loading } from '../components';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends Component {
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
      const { songData } = this.state;
      const objectSong = songData.find(({ trackId }) => +trackId === +id);
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
      const { songData } = this.state;
      const objectSong = songData.find(({ trackId }) => +id === +trackId);
      removeSong(objectSong).then(() => {
        this.getFavoriteSong();
      });
    }
  }

  render() {
    const { isLoading, songData } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          isLoading ? <Loading /> : (
            songData
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
          )
        }
      </div>
    );
  }
}

export default Favorites;
